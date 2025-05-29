import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAppForm } from "~/components/form/form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { createDriver } from "~/server/driver/driver";
import { createDriverSchema, CreateDriverType } from "~/server/driver/driver-schema";

export const Route = createFileRoute("/_private/admin/driver/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const { queryClient } = Route.useRouteContext();
  const navigate = useNavigate();

  async function handleSubmit(data: CreateDriverType) {
    await createDriver({ data });
    await queryClient.invalidateQueries({ queryKey: ["find-drivers"] });
  }

  const form = useAppForm({
    defaultValues: {
      name: "",
      nickname: "",
    } satisfies CreateDriverType,
    validators: { onBlur: createDriverSchema },
    async onSubmit({ formApi, value }) {
      await handleSubmit(value);
      navigate({ to: "/admin/driver" });
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

      <h3 className="text-2xl font-bold">Campeonatos</h3>

      <div className="grid grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Campeonatos Disponíveis</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campeonatos Selecionados</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button>Cadastrar</Button>
      </div>
    </form>
  );
}
