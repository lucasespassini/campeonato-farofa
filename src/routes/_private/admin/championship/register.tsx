import { Await, createFileRoute, useNavigate } from "@tanstack/react-router";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useAppForm } from "~/components/form/form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  createChampionship,
  findChampionshipModalities,
} from "~/server/championship/championship";
import {
  createChampionshipSchema,
  CreateChampionshipType,
} from "~/server/championship/championship-schema";
import { findDrivers } from "~/server/driver/driver";
import { CardSelectDriver } from "./-components/card-select-driver";

export const Route = createFileRoute("/_private/admin/championship/register")({
  loader: async ({ context }) => {
    const driversDeferred = context.queryClient.ensureQueryData({
      queryKey: ["find-drivers"],
      queryFn: () => findDrivers(),
    });

    const championshipModalities = await context.queryClient.ensureQueryData({
      queryKey: ["find-championship-modalities"],
      queryFn: () => findChampionshipModalities(),
    });

    return { driversDeferred, championshipModalities };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { queryClient } = Route.useRouteContext();
  const { driversDeferred, championshipModalities } = Route.useLoaderData();
  const navigate = useNavigate();

  async function handleSubmit(data: CreateChampionshipType) {
    await createChampionship({ data });
    await queryClient.invalidateQueries({ queryKey: ["find-championships"] });
  }

  const form = useAppForm({
    defaultValues: {
      name: "",
      modality: "",
      races: [],
    } as CreateChampionshipType,
    validators: { onSubmit: createChampionshipSchema },
    async onSubmit({ formApi, value }) {
      await handleSubmit(value);
      navigate({ to: "/admin/championship" });
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
      <h3 className="text-2xl font-bold">Campeonato</h3>

      <div className="grid grid-cols-2 gap-5">
        <form.AppField
          name="name"
          children={(field) => <field.FormInput label="Nome" />}
        />
        <form.AppField
          name="modality"
          children={(field) => (
            <field.FormSelect
              label="Modalidade"
              options={championshipModalities.map((modality) => ({
                value: modality.chmd_id,
                label: (
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://campeonato-farofa.netlify.app/${modality.chmd_image_url || ""}`}
                      className="w-10"
                    />
                    <p className="font-semibold">{modality.chmd_name}</p>
                  </div>
                ),
              }))}
            />
          )}
        />
      </div>

      <form.Field name="races" mode="array">
        {(field) => {
          return (
            <div>
              <div className="mb-2 flex justify-between">
                <h3 className="text-2xl font-bold">Corridas</h3>

                <Button
                  type="button"
                  size="sm"
                  onClick={() =>
                    field.pushValue({ name: "", date: "" as unknown as Date })
                  }
                >
                  <PlusIcon /> Adicionar corrida
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                {field.state.value?.map((_, i) => {
                  return (
                    <div key={i} className="flex items-end gap-3">
                      <div className="flex w-full gap-5">
                        <form.AppField name={`races[${i}].name` as const}>
                          {(subField) => (
                            <subField.FormInput label={`Nome da corrida ${i + 1}`} />
                          )}
                        </form.AppField>

                        <form.AppField key={i} name={`races[${i}].date`}>
                          {(subField) => (
                            <subField.FormInput label={`Data da corrida ${i + 1}`} />
                          )}
                        </form.AppField>
                      </div>

                      <Button onClick={() => field.removeValue(i)} type="button">
                        <Trash2Icon />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }}
      </form.Field>

      <form.Field name="drivers" mode="array">
        {(field) => {
          return (
            <div>
              <h3 className="mb-2 text-2xl font-bold">Pilotos</h3>

              <div className="grid h-[400px] grid-cols-2 gap-5">
                <Card>
                  <CardHeader>
                    <CardTitle>Todos os Pilotos</CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-2">
                    <Await
                      promise={driversDeferred}
                      children={(drivers) =>
                        drivers
                          .filter(
                            (driver) =>
                              !field.state.value?.some((d) => d.id === driver.drv_id),
                          )
                          .map((driver) => (
                            <div
                              key={driver.drv_id}
                              onClick={() =>
                                field.pushValue({
                                  id: driver.drv_id,
                                  name: driver.drv_name,
                                  nickname: driver.drv_nickname!,
                                })
                              }
                            >
                              <CardSelectDriver driver={driver} />
                            </div>
                          ))
                      }
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pilotos Selecionados</CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-2">
                    {field.state.value?.map((driver, i) => {
                      return (
                        <div
                          key={driver.id}
                          className="flex items-end gap-3"
                          onClick={() => field.removeValue(i)}
                        >
                          <CardSelectDriver
                            driver={{
                              drv_id: driver.id,
                              drv_name: driver.name,
                              drv_nickname: driver.nickname,
                              drv_created_at: null!,
                            }}
                            isSelected
                          />
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
