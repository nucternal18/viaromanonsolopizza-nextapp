import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

import prisma from "@lib/prisma";
import { MenuCategory } from "@prisma/client";

type QueryObjProps = {
  menuType?: string | string[];
  sort?: string | string[];
  page?: number;
  position?: { $regex: string | string[]; $options: string };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /**
   * @desc Get user session
   */
  const session: Session = await getSession({ req });

  /**
   * @desc check to see if their is a user session
   */
  if (!session) {
    res.status(401).json({ success: false, message: "Non autorizzato" });
    return;
  }

  if (!session.user?.isAdmin) {
    res.status(401).json({
      success: false,
      message: "Non autorizzato.",
    });
    return;
  }

  if (req.method === "GET") {
    const { sort, menuType }: Partial<QueryObjProps> = req.query;
    /**
     * @desc Fetch all menu items
     * @route GET /api/menu
     * @access Public
     */
    const queryObj: QueryObjProps = {};

    if (menuType && menuType !== "all") {
      queryObj.menuType = menuType;
    }

    const result = await prisma.menu.findMany({
      where: {
        category: menuType as MenuCategory,
      },
      orderBy: {
        createdAt: sort === "latest" ? "asc" : "desc",
      },
    });

    res.status(200).json(result);
  } else if (req.method === "POST") {
    /**
     * @desc creat a new menu item
     * @route POST /api/menu/
     * @access Private
     */

    const { name, name_english, ingredients, subtitle, price, type, types } =
      req.body;
    try {
      await prisma.menu.create({
        data: {
          category: type,
          name: name,
          name_english: name_english,
          price: price,
          ingredients: ingredients,
          subtitle: type === "Cantina" ? subtitle : "",
          types: type === "Cantina" ? types : [],
        },
      });

      await prisma.$disconnect();
      res
        .status(200)
        .json({ success: true, message: "Menu item created successfully" });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error.message,
        message: "Invalid token. Not Authorized ",
      });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res
      .status(405)
      .json({ success: false, message: `Method ${req.method} not allowed` });
  }
}
