import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
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
