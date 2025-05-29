import { z } from "zod/v4";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string(),
});

const clientEnvSchema = z.object({
  VITE_JWT_SECRET: z.string(),
});

export const serverEnv = serverEnvSchema.parse(process.env);
export const clientEnv = clientEnvSchema.parse(import.meta.env);
