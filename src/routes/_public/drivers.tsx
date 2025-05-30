import { createFileRoute } from "@tanstack/react-router";
import { findDrivers } from "~/server/driver/driver";
import { formatDate } from "~/utils/format-date";

export const Route = createFileRoute("/_public/drivers")({
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
        </div>
      ))}
    </div>
  );
}
