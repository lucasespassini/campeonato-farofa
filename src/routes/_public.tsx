import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ContentLayout } from "~/components/layout/content-layout";

export const Route = createFileRoute("/_public")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentLayout>
      <Outlet />
    </ContentLayout>
  );
}
