import { perfil } from '@/data/perfil';

/** Mensaje inicial para pedir un proyecto, con el servicio si se eligió uno. */
export function mensajeSolicitud(servicio?: string): string {
  return servicio
    ? `Hola, Miguel. Me interesa: ${servicio}. Mi negocio es… y necesito…`
    : 'Hola, Miguel. Quiero solicitar un proyecto. Mi negocio es… y necesito…';
}

/**
 * A dónde lleva «Solicitar»: WhatsApp con el mensaje listo si hay número en perfil.whatsapp;
 * si no, al formulario de contacto (el script de Servicios llena el mensaje).
 */
export function enlaceSolicitud(servicio?: string): { href: string; externo: boolean } {
  const numero = perfil.whatsapp.replace(/\D/g, '');
  if (numero) {
    return {
      href: `https://wa.me/${numero}?text=${encodeURIComponent(mensajeSolicitud(servicio))}`,
      externo: true,
    };
  }
  return { href: '/#contacto', externo: false };
}
