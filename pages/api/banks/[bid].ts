import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { bid } = req.query;

  if (!bid) {
    res.status(400).json({ error: "Missing bank id" });
    return;
  }

  const bank = await prisma.bank.findUnique({
    select: {
      id: true,
      name: true,
      branches: {
        select: { id: true, name: true, district: true, routingNumber: true },
      },
      updatedAt: true,
    },
    where: { id: bid as string },
  });

  if (!bank) {
    res.status(404).json({ error: "Bank not found" });
    return;
  }

  res.status(200).json(bank);
}
