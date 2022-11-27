import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import { bankSelect } from "../banks";

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
    select: bankSelect,
    where: { id: bid as string },
  });

  if (!bank) {
    res.status(404).json({ error: "Bank not found" });
    return;
  }

  res.status(200).json(bank);
}
