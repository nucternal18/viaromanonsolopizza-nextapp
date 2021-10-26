import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import Menu from "../../../models/menuModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    /**
     * @desc Fetch all menu items
     * @route GET /api/menu
     * @access Publick
     */
  } else if (req.method === "POST") {
    /**
     * @desc creat a new menu item
     * @route POST /api/menu/
     * @access Private
     */
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
