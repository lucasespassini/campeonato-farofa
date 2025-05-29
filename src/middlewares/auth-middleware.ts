import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest, setResponseStatus } from "@tanstack/react-start/server";
import jwt from "jsonwebtoken";
import { clientEnv } from "~/lib/env";
import { parseCookie } from "~/utils/parse-cookie";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const { headers } = getWebRequest()!;

  const cookie = headers.get("cookie");

  if (!cookie) {
    setResponseStatus(401);
    throw new Error("Unauthorized");
  }

  const token = parseCookie(cookie)["admin_token"];
  const admin = jwt.verify(token, clientEnv.VITE_JWT_SECRET);

  return next({ sendContext: { admin } });
});
