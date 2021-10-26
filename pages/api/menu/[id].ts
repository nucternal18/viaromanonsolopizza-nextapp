import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import Menu from "../../../models/menuModel";

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
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
