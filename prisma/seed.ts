import { PrismaClient } from "@prisma/client";
import * as data from "./banks.json";

const prisma = new PrismaClient();

async function seed() {
  const createdBanks = await prisma.$transaction(
    data.banks.map((bank) => prisma.bank.create({ data: { name: bank.name } }))
  );

  for (const bank of data.banks) {
    await prisma.branch.createMany({
      data: bank.branches.map((branch) => ({
        name: branch.name,
        routingNumber: branch.routingNumber,
        district: branch.district,
        bankId: createdBanks.find((b) => b.name === bank.name)!.id,
      })),
    });
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export {};
