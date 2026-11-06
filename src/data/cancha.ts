/**
 * Pizarra táctica: dónde juega cada proyecto. La usan la cancha del inicio y las tarjetas de proyectos.
 * Coordenadas en unidades del viewBox de la cancha (100 × 140); la portería de ataque está arriba.
 * El dorsal es el número clásico de cada puesto.
 */
export type Posicion = { x: number; y: number; puesto: string; corto: string; dorsal: number };

export const posiciones: Record<string, Posicion> = {
  ascua: { x: 50, y: 26, puesto: 'Delantero', corto: 'Ascua', dorsal: 9 },
  hp: { x: 19, y: 56, puesto: 'Extremo izquierdo', corto: 'HP', dorsal: 11 },
  kalma: { x: 81, y: 56, puesto: 'Extremo derecho', corto: 'Kalma', dorsal: 7 },
  prestalab: { x: 50, y: 114, puesto: 'Defensa central', corto: 'PrestaLab', dorsal: 4 },
};

/** Miguel, el 10: el que conecta todo. */
export const jugador = { x: 50, y: 84 };
