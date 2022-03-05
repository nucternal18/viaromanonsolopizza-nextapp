import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import db from "../../../lib/db";
import {
  Antipasti,
  Contorni,
  Letempure,
  Secondi,
  Desserts,
  GourmetPizza,
  Pizzas,
  Cantina,
  Bianche,
  PizzaSpeciali,
} from "../../../models/menuModel";

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

    await db.connectDB();
    const antipasti = await Antipasti.find({});
    const contorni = await Contorni.find({});
    const letempure = await Letempure.find({});
    const secondi = await Secondi.find({});
    const desserts = await Desserts.find({});
    const gourmetPizza = await GourmetPizza.find({});
    const pizzas = await Pizzas.find({});
    const cantina = await Cantina.find({});
    const bianche = await Bianche.find({});
    const pizzaSpeciali = await PizzaSpeciali.find({});
    await db.disconnect();
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
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
