import { createFileRoute } from "@tanstack/react-router";
import { findAdmins } from "~/server/admin/admin";
import { formatDate } from "~/utils/format-date";

export const Route = createFileRoute("/_private/admin/")({
  loader: async ({ context }) => {
    const admins = await context.queryClient.ensureQueryData({
      queryKey: ["find-admins"],
      queryFn: () => findAdmins(),
    });

    return { admins };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { admins } = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold">Administradores</h1>
        <p className="text-muted-foreground">Visualize quem administra a plataforma</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {admins.map((admin) => (
          <div key={admin.adm_id} className="rounded-md border px-3 py-2">
            <p className="font-semibold">
              {admin.adm_name} -{" "}
              <span className="text-muted-foreground text-sm">
                {admin.adm_is_active ? "Ativo" : "Inativo"}
              </span>
            </p>
            <p className="text-muted-foreground text-sm">
              Admin desde{" "}
              {formatDate({ date: admin.adm_created_at, toFormat: "dd/MM/yyyy" })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
