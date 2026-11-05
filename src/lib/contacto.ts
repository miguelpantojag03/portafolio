/**
 * Validación del formulario de contacto, compartida entre el navegador y la función del servidor.
 * Los mensajes dicen qué pasó y cómo arreglarlo.
 */

export type Campo = 'nombre' | 'email' | 'mensaje';
export type DatosContacto = Record<Campo, string>;
export type Errores = Partial<Record<Campo, string>>;

export const LIMITES = {
  nombre: 80,
  email: 120,
  mensajeMin: 10,
  mensajeMax: 3000,
} as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validarCampo(campo: Campo, valor: string): string | undefined {
  const v = valor.trim();
  switch (campo) {
    case 'nombre':
      if (!v) return 'Escribe tu nombre.';
      if (v.length > LIMITES.nombre) return `Tu nombre puede tener hasta ${LIMITES.nombre} caracteres.`;
      return undefined;
    case 'email':
      if (!v) return 'Escribe tu email para poder responderte.';
      if (v.length > LIMITES.email || !EMAIL.test(v))
        return 'Escribe un email válido, por ejemplo nombre@correo.com.';
      return undefined;
    case 'mensaje':
      if (v.length < LIMITES.mensajeMin)
        return `Cuéntame un poco más: el mensaje necesita al menos ${LIMITES.mensajeMin} caracteres.`;
      if (v.length > LIMITES.mensajeMax)
        return `El mensaje puede tener hasta ${LIMITES.mensajeMax} caracteres. Ahora tiene ${v.length}.`;
      return undefined;
  }
}

export function validarContacto(datos: DatosContacto): Errores {
  const errores: Errores = {};
  for (const campo of ['nombre', 'email', 'mensaje'] as const) {
    const error = validarCampo(campo, datos[campo]);
    if (error) errores[campo] = error;
  }
  return errores;
}

/** Respuesta JSON de /api/contacto. */
export type RespuestaContacto = { ok: true } | { ok: false; mensaje: string; errores?: Errores };
