import { Await, createFileRoute, useNavigate } from "@tanstack/react-router";
import { use } from "react";
import { useAppForm } from "~/components/form/form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { findChampionships } from "~/server/championship/championship";
import { createDriver } from "~/server/driver/driver";
import { createDriverSchema, CreateDriverType } from "~/server/driver/driver-schema";
import { CardSelect } from "../-components/card-select";

export const Route = createFileRoute("/_private/admin/driver/register")({
  loader: async ({ context }) => {
    const championshipsDeferred = context.queryClient.ensureQueryData({
      queryKey: ["find-championships"],
      queryFn: () => findChampionships(),
    });

    return { championshipsDeferred };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { queryClient } = Route.useRouteContext();
  const { championshipsDeferred } = Route.useLoaderData();
  const navigate = useNavigate();

  const championships = use(championshipsDeferred);

  async function handleSubmit(data: CreateDriverType) {
    await createDriver({ data });
    await queryClient.invalidateQueries({ queryKey: ["find-drivers"] });
    await queryClient.refetchQueries({ queryKey: ["find-drivers"] });
  }

  const form = useAppForm({
    defaultValues: {
      name: "",
      nickname: "",
    } as CreateDriverType,
    validators: { onBlur: createDriverSchema },
    async onSubmit({ formApi, value }) {
      await handleSubmit(value);
      navigate({ to: "/admin/driver", replace: true });
      formApi.reset();
    },
  });

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={async (e) => {
        e.preventDefault();
        await form.handleSubmit();
      }}
    >
      <h3 className="text-2xl font-bold">Piloto</h3>

      <div className="grid grid-cols-2 gap-5">
        <form.AppField
          name="name"
          children={(field) => <field.FormInput label="Nome" />}
        />

        <form.AppField
          name="nickname"
          children={(field) => <field.FormInput label="Nickname" />}
        />
      </div>

      <form.Field name="championships" mode="array">
        {(field) => {
          return (
            <div>
              <h3 className="mb-5 text-2xl font-bold">Campeonatos</h3>

              <div className="grid grid-cols-2 gap-5">
                <Card className="h-[400px]">
                  <CardHeader>
                    <CardTitle>Todos os campeonatos</CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-2 overflow-auto">
                    <Await
                      promise={championshipsDeferred}
                      children={(championship) =>
                        championship
                          .filter(
                            (championship) =>
                              !field.state.value?.some(
                                (championshipId) =>
                                  championshipId === championship.chmp_id,
                              ),
                          )
                          .map((championship) => (
                            <div
                              key={championship.chmp_id}
                              onClick={() => field.pushValue(championship.chmp_id)}
                            >
                              <CardSelect>
                                <div
                                  key={championship.chmp_id}
                                  className="flex items-center justify-between rounded-md"
                                >
                                  <div>
                                    <p className="font-semibold">
                                      {championship.chmp_name} -{" "}
                                      <span className="text-muted-foreground text-sm">
                                        {championship.chmp_started
                                          ? "Iniciado"
                                          : "Não iniciado"}
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
                              </CardSelect>
                            </div>
                          ))
                      }
                    />
                  </CardContent>
                </Card>

                <Card className="h-[400px]">
                  <CardHeader>
                    <CardTitle>Campeonatos selecionados</CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-2 overflow-auto">
                    {field.state.value?.map((championshipId, i) => {
                      const championship = championships.find(
                        (c) => c.chmp_id === championshipId,
                      )!;

                      return (
                        <div
                          key={championshipId}
                          className="flex items-end gap-3"
                          onClick={() => field.removeValue(i)}
                        >
                          <CardSelect isSelected>
                            <div className="flex items-center justify-between rounded-md">
                              <div>
                                <p className="font-semibold">
                                  {championship.chmp_name} -{" "}
                                  <span className="text-muted-foreground text-sm">
                                    {championship.chmp_started
                                      ? "Iniciado"
                                      : "Não iniciado"}
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
                          </CardSelect>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        }}
      </form.Field>

      <div className="flex justify-end">
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button disabled={!canSubmit || isSubmitting}>Cadastrar</Button>
          )}
        />
      </div>
    </form>
  );
}
