import { z } from "zod/v4";

export const createChampionshipSchema = z.object({
  name: z.string().min(3).max(50),
  modality: z.string().nonempty(),
  drivers: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        nickname: z.string(),
      }),
    )
    .optional(),
  races: z
    .array(
      z.object({
        name: z.string(),
        date: z.date(),
      }),
    )
    .optional(),
});

export type CreateChampionshipType = z.infer<typeof createChampionshipSchema>;
