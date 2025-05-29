import { z } from "zod";

export const signInSchema = z.object({
  name: z.string().nonempty(),
  password: z.string().nonempty(),
});
