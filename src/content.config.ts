import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const proyectosCollection = defineCollection({
  loader: glob({
    pattern: "*.{md,mdx}",
    base: "src/content/proyectos",
  }),
  schema: z.object({
    title: z.string(),
    description: z
      .string()
      .max(160, "La descripción no debe pasar los 160 caracteres"),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()),
    githubUrl: z.string().url(),
    liveUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    image: z.string().optional(), // 👈 ¡NUEVA PROPIEDAD DE IMAGEN!
  }),
});

export const collections = {
  proyectos: proyectosCollection,
};
