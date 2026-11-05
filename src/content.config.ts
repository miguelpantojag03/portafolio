import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Proyectos: un archivo Markdown por proyecto en src/content/proyectos.
 * El cuerpo del archivo es el caso de estudio; el frontmatter, los datos que se listan.
 */
const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      /** Una línea: qué es y para quién. */
      resumen: z.string().max(110),
      orden: z.number(),
      area: z.string(),
      stack: z.array(z.string()).min(1),
      contexto: z.string(),
      rol: z.string(),
      fecha: z.string(),
      /** Fecha ISO (AAAA-MM) para ordenar y para <time>. */
      fechaIso: z.string().regex(/^\d{4}-\d{2}$/),
      destacado: z.boolean().default(true),
      portada: z
        .object({
          src: image(),
          alt: z.string(),
        })
        .optional(),
      galeria: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            pie: z.string().optional(),
          }),
        )
        .default([]),
      enlaces: z
        .array(
          z.object({
            texto: z.string(),
            url: z.url(),
          }),
        )
        .default([]),
    }),
});

export const collections = { proyectos };
