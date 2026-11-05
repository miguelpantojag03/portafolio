import type { APIRoute } from 'astro';
import { validarContacto, type DatosContacto, type RespuestaContacto } from '@/lib/contacto';
import { perfil } from '@/data/perfil';
import { CONTACT_FROM, CONTACT_TO, RESEND_API_KEY } from 'astro:env/server';

// Esta ruta corre en el servidor (función serverless en Vercel); el resto del sitio es estático.
export const prerender = false;

const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 5;
const TIEMPO_MINIMO_MS = 3000;

/**
 * Límite de envíos por IP. Vive en memoria de la instancia: frena ráfagas de un mismo origen,
 * pero no es global entre instancias. Para algo estricto, usa un almacén compartido (ver README).
 */
const envios = new Map<string, number[]>();

function excedeLimite(ip: string, ahora: number): boolean {
  const recientes = (envios.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  recientes.push(ahora);
  envios.set(ip, recientes);
  return recientes.length > MAX_POR_VENTANA;
}

function quiereJson(request: Request): boolean {
  return (request.headers.get('accept') ?? '').includes('application/json');
}

/** Con JS responde JSON; sin JS, redirige a una página con el resultado. */
function responder(request: Request, cuerpo: RespuestaContacto, estado: number): Response {
  if (quiereJson(request)) {
    return new Response(JSON.stringify(cuerpo), {
      status: estado,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
  const destino = new URL('/mensaje-enviado', request.url);
  if (!cuerpo.ok) destino.searchParams.set('error', cuerpo.mensaje);
  return Response.redirect(destino, 303);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ahora = Date.now();
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return responder(request, { ok: false, mensaje: 'El formulario llegó vacío. Vuelve a intentarlo.' }, 400);
  }

  const texto = (k: string) => {
    const v = form.get(k);
    return typeof v === 'string' ? v : '';
  };

  // Anti-spam: campo trampa lleno o envío demasiado rápido para una persona.
  // Respondemos "ok" para no darle pistas al bot.
  const inicio = Number(texto('inicio'));
  if (texto('sitio_web') || (inicio && ahora - inicio < TIEMPO_MINIMO_MS)) {
    return responder(request, { ok: true }, 200);
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'desconocida';
  // En desarrollo no se limita: las pruebas envían muchas peticiones seguidas desde la misma IP.
  if (!import.meta.env.DEV && excedeLimite(ip, ahora)) {
    return responder(
      request,
      {
        ok: false,
        mensaje: `Enviaste varios mensajes seguidos. Espera unos minutos o escríbeme directo a ${perfil.email}.`,
      },
      429,
    );
  }

  const datos: DatosContacto = {
    nombre: texto('nombre').trim(),
    email: texto('email').trim(),
    mensaje: texto('mensaje').trim(),
  };
  const errores = validarContacto(datos);
  if (Object.keys(errores).length > 0) {
    return responder(request, { ok: false, mensaje: 'Revisa los campos marcados.', errores }, 422);
  }

  const apiKey = RESEND_API_KEY;
  const para = CONTACT_TO ?? perfil.email;
  const de = CONTACT_FROM ?? 'Portafolio <onboarding@resend.dev>';

  if (!apiKey) {
    return responder(
      request,
      {
        ok: false,
        mensaje: `El formulario todavía no está conectado. Escríbeme directo a ${perfil.email}.`,
      },
      503,
    );
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: de,
        to: [para],
        reply_to: datos.email,
        subject: `Portafolio: mensaje de ${datos.nombre}`,
        text: `${datos.mensaje}\n\n${datos.nombre} <${datos.email}>`,
      }),
    });
    if (!res.ok) throw new Error(`Resend respondió ${res.status}`);
  } catch (error) {
    console.error('[contacto] No se pudo enviar el correo:', error);
    return responder(
      request,
      {
        ok: false,
        mensaje: `No se pudo enviar el mensaje por un error del servidor. Vuelve a intentarlo en unos minutos o escríbeme a ${perfil.email}.`,
      },
      502,
    );
  }

  return responder(request, { ok: true }, 200);
};
