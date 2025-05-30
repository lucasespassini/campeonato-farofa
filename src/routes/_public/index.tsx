import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "~/components/ui/card";

export const Route = createFileRoute("/_public/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-5">
      <Card className="h-[300px]">
        <CardContent>Colocar alguma coisa em destaque</CardContent>
      </Card>

      <Card className="h-[300px]">
        <CardContent>Colocar alguma coisa em destaque</CardContent>
      </Card>
    </div>
  );
}
