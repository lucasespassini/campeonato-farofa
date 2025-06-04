import { createServerFn } from "@tanstack/react-start";
import { prisma } from "~/lib/database";
import { authMiddleware } from "~/server/middlewares/auth-middleware";
import {
  createChampionshipSchema,
  editChampionshipSchema,
  findChampionshipByIdSchema,
} from "./championship-schema";

export const findChampionshipById = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(findChampionshipByIdSchema)
  .handler(async ({ data: { id } }) => {
    const championship = await prisma.championship.findUnique({
      include: {
        races: true,
        championship_participations: { include: { driver: true } },
      },
      where: { chmp_id: id },
    });

    return championship;
  });

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
                    race_date: race.date,
                  })),
                },
              }
            : undefined,
        championship_participations:
          data.drivers && data.drivers.length > 0
            ? {
                createMany: {
                  data: data.drivers.map((driverId) => ({ chpt_drv_id: driverId })),
                },
              }
            : undefined,
      },
    });
  });

export const editChampionship = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(editChampionshipSchema)
  .handler(async ({ data }) => {
    const [findedChampionshipWithId, findedChampionshipWithName] = await Promise.all([
      prisma.championship.findFirst({
        include: { races: true, championship_participations: true },
        where: { chmp_id: data.id },
      }),
      prisma.championship.findFirst({
        where: { chmp_name: data.name },
      }),
    ]);

    if (!findedChampionshipWithId) {
      throw new Error(`O campeonato não foi encontrado`);
    }

    if (findedChampionshipWithName && findedChampionshipWithName.chmp_id !== data.id) {
      throw new Error(`O campeonato ${data.name} já está cadastrado`);
    }

    const driversToAdd =
      data.drivers?.filter(
        (driverId) =>
          !findedChampionshipWithId.championship_participations.some(
            (driver) => driver.chpt_drv_id === driverId,
          ),
      ) ?? [];

    const driversToRemove = findedChampionshipWithId.championship_participations
      .filter((participation) => !data.drivers?.includes(participation.chpt_drv_id))
      .map((participation) => participation.chpt_drv_id);

    const racesToCreate = data.races?.filter((race) => !race.id) ?? [];
    const racesToUpdate = data.races?.filter((race) => !!race.id) ?? [];

    const existingRaceIds = findedChampionshipWithId.races.map((r) => r.race_id);
    const updatedRaceIds = racesToUpdate.map((r) => r.id);
    const racesToDelete = existingRaceIds.filter((id) => !updatedRaceIds.includes(id));

    await prisma.$transaction(async (tx) => {
      if (driversToAdd.length > 0) {
        await tx.championshipParticipation.createMany({
          data: driversToAdd.map((driverId) => ({
            chpt_chmp_id: data.id,
            chpt_drv_id: driverId,
          })),
        });
      }

      if (driversToRemove.length > 0) {
        await tx.championshipParticipation.deleteMany({
          where: {
            chpt_chmp_id: data.id,
            chpt_drv_id: { in: driversToRemove },
          },
        });
      }

      await tx.championship.update({
        data: {
          chmp_name: data.name,
          races: {
            createMany:
              racesToCreate.length === 0
                ? undefined
                : {
                    data: racesToCreate.map((race) => ({
                      race_name: race.name,
                      race_date: race.date,
                    })),
                  },
            updateMany: racesToUpdate.map((race) => ({
              data: { race_name: race.name, race_date: race.date },
              where: { race_id: race.id },
            })),
          },
        },
        where: { chmp_id: data.id },
      });

      await tx.race.deleteMany({
        where: { race_id: { in: racesToDelete } },
      });
    });
  });
