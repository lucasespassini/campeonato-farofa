import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAppForm } from "~/components/form/form";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { signIn } from "~/server/admin/admin";
import { SignInType } from "~/server/admin/admin-schema";

export const Route = createFileRoute("/_private/admin/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  async function handleSubmit(data: SignInType) {
    try {
      await signIn({ data });
    } catch (error) {
      alert((error as Error).message);
    }
  }

  const form = useAppForm({
    defaultValues: { name: "", password: "" } as SignInType,
    async onSubmit({ value }) {
      await handleSubmit(value);
      navigate({ to: "/admin/dashboard", replace: true });
    },
  });

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Card className="w-[350px]">
        <form
          className="flex flex-col gap-5"
          onSubmit={async (e) => {
            e.preventDefault();
            await form.handleSubmit();
          }}
        >
          <CardHeader>
            <CardTitle>Realizar Login</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
            <form.AppField
              name="name"
              children={(field) => <field.FormInput label="Login" />}
            />

            <form.AppField
              name="password"
              children={(field) => <field.FormInput type="password" label="Senha" />}
            />
          </CardContent>

          <CardFooter className="flex justify-end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button disabled={!canSubmit || isSubmitting}>Login</Button>
              )}
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
