import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    /**
     * @desc Fetch all menu items
     * @route GET /api/menu
     * @access Public
     */

    const antipasti = await prisma.menu.findMany({
      where: {
        category: "ANTIPASTI",
      },
    });
    const contorni = await prisma.menu.findMany({
      where: {
        category: "CONTORNI",
      },
    });
    const letempure = await prisma.menu.findMany({
      where: {
        category: "LETEMPURE",
      },
    });
    const secondi = await prisma.menu.findMany({
      where: {
        category: "SECONDI",
      },
    });
    const desserts = await prisma.menu.findMany({
      where: {
        category: "DESSERT",
      },
    });
    const gourmetPizza = await prisma.menu.findMany({
      where: {
        category: "GOURMET_PIZZA",
      },
    });
    const pizzas = await prisma.menu.findMany({
      where: {
        category: "PIZZA",
      },
    });
    const cantina = await prisma.menu.findMany({
      where: {
        category: "CANTINA",
      },
    });
    const bianche = await prisma.menu.findMany({
      where: {
        category: "BIANCHE",
      },
    });
    const pizzaSpeciali = await prisma.menu.findMany({
      where: {
        category: "PIZZA_SPECIALI",
      },
    });
    await prisma.$disconnect();

    res.status(200).json({
      antipasti,
      contorni,
      letempure,
      secondi,
      desserts,
      gourmetPizza,
      pizzas,
      cantina,
      bianche,
      pizzaSpeciali,
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res
      .status(405)
      .json({ success: false, message: `Method ${req.method} not allowed` });
  }
}
