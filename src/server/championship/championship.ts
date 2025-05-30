import { createServerFn } from "@tanstack/react-start";
import { DateTime } from "luxon";
import { prisma } from "~/lib/database";
import { authMiddleware } from "~/middlewares/auth-middleware";
import { createChampionshipSchema } from "./championship-schema";

export const findChampionships = createServerFn({ method: "GET" }).handler(async () => {
  const championships = await prisma.championship.findMany({
    include: { championship_modality: true },
  });

  return championships;
});

export const findChampionshipModalities = createServerFn({ method: "GET" }).handler(
  async () => {
    const championshipModalities = await prisma.championshipModality.findMany();

    return championshipModalities;
  },
);

export const createChampionship = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(createChampionshipSchema)
  .handler(async ({ data }) => {
    const findedChampionship = await prisma.championship.findFirst({
      where: { chmp_name: data.name },
    });

    if (findedChampionship) {
      throw new Error(`O campeonato ${data.name} já está cadastrado`);
    }

    await prisma.championship.create({
      data: {
        chmp_name: data.name,
        chmp_chmd_id: data.modality,
        races:
          data.races && data.races.length > 0
            ? {
                createMany: {
                  data: data.races.map((race) => ({
                    race_name: race.name,
                    race_date: DateTime.fromISO(race.date).toJSDate(),
                  })),
                },
              }
            : undefined,
        championship_participations:
          data.drivers && data.drivers.length > 0
            ? {
                createMany: {
                  data: data.drivers.map((driver) => ({ chpt_drv_id: driver.id })),
                },
              }
            : undefined,
      },
    });
  });
