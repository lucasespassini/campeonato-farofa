import { createFileRoute } from "@tanstack/react-router";
import { CardDriver } from "~/components/cards/card-driver";
import { findDrivers } from "~/server/driver/driver";

export const Route = createFileRoute("/_public/drivers")({
  loader: async () => {
    const drivers = await findDrivers();

    return { drivers };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { drivers } = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-3">
      {drivers.length === 0 ? (
        <div>
          <h3 className="text-xl font-bold">Nenhum Piloto Cadastrado.</h3>
        </div>
      ) : (
        drivers.map((driver) => <CardDriver key={driver.drv_id} driver={driver} />)
      )}
    </div>
  );
}
