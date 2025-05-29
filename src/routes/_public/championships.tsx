import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/championships")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_public/championships"!</div>;
}
