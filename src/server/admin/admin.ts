import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "~/lib/database";
import { clientEnv } from "~/lib/env";
import { authMiddleware } from "~/middlewares/auth-middleware";
import { signInSchema } from "./admin-schema";

export const signIn = createServerFn({ method: "POST" })
  .validator(signInSchema)
  .handler(async ({ data }) => {
    const findedAdmin = await prisma.admin.findUnique({
      where: { adm_name: data.name, adm_is_active: true },
    });

    if (!findedAdmin) {
      throw new Error("Admin not found");
    }

    if (!compareSync(data.password, findedAdmin.adm_password)) {
      throw new Error("Invalid password");
    }

    const payload = {
      adm_id: findedAdmin.adm_id,
      adm_name: findedAdmin.adm_name,
      adm_created_at: findedAdmin.adm_created_at,
      adm_is_active: findedAdmin.adm_is_active,
    };

    const token = jwt.sign(payload, clientEnv.VITE_JWT_SECRET, {
      expiresIn: "1d",
    });

    setCookie("admin_token", token, {
      maxAge: 60 * 60 * 24,
    });
  });

export const findAdmins = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(() => {
    return prisma.admin.findMany({
      select: {
        adm_id: true,
        adm_name: true,
        adm_is_active: true,
        adm_created_at: true,
      },
      orderBy: { adm_created_at: "desc" },
    });
  });

export const createAdmin = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async () => {
    return prisma.admin.findMany({});
  });

export const updateAdmin = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async () => {
    return prisma.admin.findMany({});
  });
