import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import { Prisma } from "@prisma/client";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "HEAD"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

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
