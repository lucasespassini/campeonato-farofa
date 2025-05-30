import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/admin/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Administrativo</h1>
        <p className="text-muted-foreground">
          Acompanhe e gerencie os principais recursos da plataforma de forma centralizada.
        </p>
      </div>

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

        <Link to="/admin/championship">
          <div className="rounded-md border px-3 py-2">
            <p className="font-semibold">Campeonatos</p>
            <p className="text-muted-foreground text-sm">
              Cadastre e edite informações dos campeonatos
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
