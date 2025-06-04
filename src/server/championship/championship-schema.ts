import { z } from "zod/v4";

export const findChampionshipByIdSchema = z.object({
  id: z.string(),
});

export const createChampionshipSchema = z.object({
  name: z.string().min(3).max(50),
  modality: z.string().nonempty(),
  drivers: z.array(z.string()).optional(),
  races: z
    .array(
      z.object({
        name: z.string().nonempty(),
        date: z.date(),
        sprint: z.boolean(),
      }),
    )
    .optional(),
});

export type CreateChampionshipType = z.infer<typeof createChampionshipSchema>;

export const editChampionshipSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(50),
  modality: z.string().nonempty(),
  drivers: z.array(z.string()).optional(),
  races: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().nonempty(),
        date: z.date(),
        sprint: z.boolean(),
      }),
    )
    .optional(),
});

export type EditChampionshipType = z.infer<typeof editChampionshipSchema>;
