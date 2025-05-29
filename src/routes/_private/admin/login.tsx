import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useTransition } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { signIn } from "~/server/admin/admin";

export const Route = createFileRoute("/_private/admin/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, startSubmitTransition] = useTransition();

  async function handleSubmit() {
    startSubmitTransition(async () => {
      try {
        await signIn({ data: { name, password } });
        navigate({ to: "/admin/dashboard" });
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <Card className="w-[350px]">
      <form
        className="flex flex-col gap-5"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit();
        }}
      >
        <CardHeader>
          <CardTitle>Realizar Login</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
