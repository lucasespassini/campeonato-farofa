import { z } from "zod/v4";

export const signInSchema = z.object({
  name: z.string().nonempty(),
  password: z.string().nonempty(),
});

export type SignInType = z.infer<typeof signInSchema>;
