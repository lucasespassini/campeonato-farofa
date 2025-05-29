import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/admin/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Link to="/admin">
        <div className="rounded-md border px-3 py-2">
          <p className="font-semibold">Administradores</p>
          <p className="text-muted-foreground text-sm">
            Visualize quem administra a plataforma
          </p>
        </div>
      </Link>

      <Link to="/admin/driver">
        <div className="rounded-md border px-3 py-2">
          <p className="font-semibold">Pilotos</p>
          <p className="text-muted-foreground text-sm">
            Cadastre e edite informações dos pilotos
          </p>
        </div>
      </Link>

      <Link to="/admin">
        <div className="rounded-md border px-3 py-2">
          <p className="font-semibold">Campeonatos</p>
          <p className="text-muted-foreground text-sm">Cadastre e edite campeonatos</p>
        </div>
      </Link>
    </div>
  );
}
