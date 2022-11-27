import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { withBranches } = req.query;

  const select: Prisma.BankSelect = {
    id: true,
    name: true,
    updatedAt: true,
  };

  if (withBranches === "true") {
    select.branches = {
      select: { id: true, name: true, district: true, routingNumber: true },
    };
  }

  const banks = await prisma.bank.findMany({
    select,
  });
  res.status(200).json(banks);
}
