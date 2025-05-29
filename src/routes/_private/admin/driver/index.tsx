import { createFileRoute, Link } from "@tanstack/react-router";
import { EditIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { findDrivers } from "~/server/driver/driver";
import { formatDate } from "~/utils/format-date";

export const Route = createFileRoute("/_private/admin/driver/")({
  loader: async ({ context }) => {
    const drivers = await context.queryClient.ensureQueryData({
      queryKey: ["find-drivers"],
      queryFn: () => findDrivers(),
    });

    return { drivers };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { drivers } = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pilotos</h1>
          <p className="text-muted-foreground">
            Cadastre e edite informações dos pilotos
          </p>
        </div>

        <Link to="/admin/driver/register">
          <Button>Cadastre</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {drivers.map((driver) => (
          <div
            key={driver.drv_id}
            className="flex items-center justify-between rounded-md border px-3 py-2"
          >
            <div>
              <p className="font-semibold">
                {driver.drv_name} - {driver.drv_nickname}
              </p>
              <p className="text-muted-foreground text-sm">
                Membro desde{" "}
                {formatDate({ date: driver.drv_created_at, toFormat: "dd/MM/yyyy" })}
              </p>
            </div>

            <Button variant="outline" className="h-9 w-9 rounded-full p-0">
              <EditIcon size={18} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
