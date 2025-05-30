import { Admin } from "@prisma/client";
import { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import { getHeaders } from "@tanstack/react-start/server";
import { jwtDecode } from "jwt-decode";
import * as React from "react";
import { z } from "zod/v4";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { Header } from "~/components/layout/header";
import { NotFound } from "~/components/NotFound";
import appCss from "~/styles/app.css?url";
import { parseCookie } from "~/utils/parse-cookie";
import { seo } from "~/utils/seo";

z.config(z.locales.pt());

export type ContextAdmin = Omit<Admin, "adm_password">;

type RootRouterContext = {
  queryClient: QueryClient;
  admin: ContextAdmin | null;
};

const getAdmin = createServerFn().handler(() => {
  const { cookie } = getHeaders();
  let admin: ContextAdmin | null = null;

  if (cookie) {
    const token = parseCookie(cookie)["admin_token"];
    admin = token ? jwtDecode<ContextAdmin>(token) : null;
  }

  return { admin };
});

export const Route = createRootRouteWithContext<RootRouterContext>()({
  async beforeLoad() {
    return getAdmin();
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  const { admin } = Route.useRouteContext();

  return (
    <RootDocument>
      <Header admin={admin} />
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
