import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";

export const bankSelect = {
  id: true,
  name: true,
  branches: {
    select: { id: true, name: true, district: true, routingNumber: true },
  },
  updatedAt: true,
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const banks = await prisma.bank.findMany({
    select: bankSelect,
  });
  res.status(200).json(banks);
}
