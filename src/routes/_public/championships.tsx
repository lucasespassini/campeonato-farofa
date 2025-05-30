import { createFileRoute } from "@tanstack/react-router";
import { findChampionships } from "~/server/championship/championship";

export const Route = createFileRoute("/_public/championships")({
  loader: async ({ context }) => {
    const championships = await context.queryClient.ensureQueryData({
      queryKey: ["find-championships"],
      queryFn: () => findChampionships(),
    });

    return { championships };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { championships } = Route.useLoaderData();

  return (
    <div className="grid grid-cols-2 gap-3">
      {championships.map((championship) => (
        <div
          key={championship.chmp_id}
          className="flex items-center justify-between rounded-md border px-3 py-2"
        >
          <div>
            <p className="font-semibold">
              {championship.chmp_name} -{" "}
              <span className="text-muted-foreground text-sm">
                {championship.chmp_started ? "Iniciado" : "Não iniciado"}
              </span>
            </p>

            <div className="flex items-center gap-2">
              <img
                src={`https://campeonato-farofa.netlify.app/${championship.championship_modality.chmd_image_url || ""}`}
                className="w-10"
              />
              <p className="font-semibold">
                {championship.championship_modality.chmd_name}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
