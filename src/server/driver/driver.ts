import { createServerFn } from "@tanstack/react-start";
import { prisma } from "~/lib/database";
import { authMiddleware } from "~/middlewares/auth-middleware";
import { createDriverSchema } from "./driver-schema";

export const findDrivers = createServerFn({ method: "GET" }).handler(async () => {
  const drivers = await prisma.driver.findMany();

  return drivers;
});

export const createDriver = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(createDriverSchema)
  .handler(async ({ data }) => {
    const findedDriver = await prisma.driver.findFirst({
      where: { drv_nickname: data.nickname },
    });

    if (findedDriver) {
      throw new Error(`O nickname ${data.nickname} já está em uso`);
    }

    await prisma.driver.create({
      data: {
        drv_name: data.name,
        drv_nickname: data.nickname,
      },
    });
  });
