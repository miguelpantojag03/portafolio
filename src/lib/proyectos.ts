import { getCollection, type CollectionEntry } from 'astro:content';

export type Proyecto = CollectionEntry<'proyectos'>;

/** Proyectos destacados, en el orden definido en el frontmatter. */
export async function obtenerProyectos(): Promise<Proyecto[]> {
  const todos = await getCollection('proyectos', (p) => p.data.destacado);
  return todos.sort((a, b) => a.data.orden - b.data.orden);
}

/** Títulos de proyecto por slug, para enlazar tecnologías con proyectos. */
export async function titulosPorSlug(): Promise<Map<string, string>> {
  const todos = await getCollection('proyectos');
  return new Map(todos.map((p) => [p.id, p.data.titulo]));
}

export type Capa = { nombre: string; detalle: string };

/**
 * Capas de la arquitectura de un proyecto, leídas de su sección «## Arquitectura» en el Markdown.
 * Cada línea tiene la forma `1. **Nombre** Qué hace.` Así el diagrama interactivo del inicio
 * y el caso de estudio cuentan lo mismo, sin copiar el texto en dos lugares.
 */
export function capasDe(proyecto: Proyecto): Capa[] {
  const cuerpo = proyecto.body ?? '';
  const seccion = cuerpo.split(/^## Arquitectura\s*$/m)[1]?.split(/^## /m)[0] ?? '';
  return Array.from(seccion.matchAll(/^\d+\.\s+\*\*(.+?)\*\*\s+(.+)$/gm), (m) => ({
    nombre: m[1]!.trim(),
    detalle: m[2]!.trim(),
  }));
}
