import { z } from "zod/v4";

export const createDriverSchema = z.object({
  name: z.string().min(3).max(50),
  nickname: z.string().min(3).max(50),
  championships: z.array(z.string()).optional(),
});

export type CreateDriverType = z.infer<typeof createDriverSchema>;
