import { defineCollection, z } from "astro:content";
import { glob } from "astro:loaders"; // El nuevo cargador estándar de Astro v7+

const proyectosCollection = defineCollection({
  // Le indicamos dónde buscar los archivos .md y cómo cargarlos
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/proyectos",
  }),
  schema: z.object({
    title: z.string(),
    description: z
      .string()
      .max(160, "La descripción no debe pasar los 160 caracteres"),
    pubDate: z.coerce.date(), // Usamos z.coerce.date() para que convierta el texto del Markdown a tipo Date sin fallos
    tags: z.array(z.string()),
    githubUrl: z.string().url(),
    liveUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  proyectos: proyectosCollection,
};
