import { NextApiRequest, NextApiResponse } from "next";
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
} from "../../../models/menuModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    /**
     * @desc update a menu item
     * @route PUT /api/menu/:id
     * @access Private
     */
  } else if (req.method === "DELETE") {
    /**
     * @desc delete a menu item
     * @route DELETE /api/menu/:id
     * @access Private
     */
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
