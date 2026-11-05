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
