import { z } from "zod/v4";

export const createRaceSchema = z.object({
  name: z.string(),
  date: z.date(),
});
