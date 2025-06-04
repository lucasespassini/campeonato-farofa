import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import jwt from "jsonwebtoken";
import { clientEnv } from "~/lib/env";
import { parseCookie } from "~/utils/parse-cookie";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    const { headers } = getWebRequest()!;

    const cookie = headers.get("cookie");

    if (!cookie) {
      throw redirect({ to: "/admin/login" });
    }

    const token = parseCookie(cookie)["admin_token"];

    if (!token) {
      throw redirect({ to: "/admin/login" });
    }

    const admin = jwt.verify(token, clientEnv.VITE_JWT_SECRET);

    return next({ sendContext: { admin } });
  } catch {
    throw redirect({ to: "/admin/login" });
  }
});
