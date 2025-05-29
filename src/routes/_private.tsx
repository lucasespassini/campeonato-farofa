import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { ContentLayout } from "~/components/layout/content-layout";

export const Route = createFileRoute("/_private")({
  beforeLoad({ location, context }) {
    if (!context.admin && location.pathname !== "/admin/login") {
      throw redirect({ to: "/admin/login" });
    }

    if (context.admin && location.pathname == "/admin/login") {
      throw redirect({ to: "/admin" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentLayout>
      <Outlet />
    </ContentLayout>
  );
}
