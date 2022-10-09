import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

import prisma from "@lib/prisma";

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
    res.status(401).json({ success: false, message: "Non autorizzato" });
    return;
  }
  const { id } = req.query;

  if (req.method === "GET") {
    /**
     * @desc Get a menu item
     * @route GET /api/menu/:id
     * @access Private/admin
     */
    try {
      const menuItem = await prisma.menu.findUnique({
        where: { id: id as string },
      });
      res.status(200).json(menuItem);
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error.message,
        message: "Unable to get menu item",
      });
      return;
    }
  } else if (req.method === "PUT") {
    /**
     * @desc update a menu item
     * @route PUT /api/menu/:id
     * @access Private/admin
     */
    const { name, name_english, ingredients, price, types } = req.body;

    const existingMenuItem = await prisma.menu.findUnique({
      where: { id: id as string },
    });

    if (!existingMenuItem) {
      res
        .status(404)
        .json({ success: false, message: "Voce di menu non trovata" });
      return;
    }

    try {
      await prisma.menu.update({
        where: { id: id as string },
        data: {
          name: name ? name : existingMenuItem.name,
          name_english: name_english
            ? name_english
            : existingMenuItem.name_english,
          ingredients: ingredients ? ingredients : existingMenuItem.ingredients,
          price: price ? price : existingMenuItem.price,
          types: types ? types : existingMenuItem.types,
        },
      });
      await prisma.$disconnect();
      res
        .status(200)
        .json({ success: true, message: "Voce di menu aggiornata" });
    } catch (error) {
      res.status(401).json({
        error: error.message,
        message: "Errore durante l'aggiornamento del menu",
      });
    }
  } else if (req.method === "DELETE") {
    /**
     * @desc delete a menu item
     * @route DELETE /api/menu/:id
     * @access Private/admin
     */
    try {
      await prisma.menu.delete({
        where: { id: id as string },
      });
      await prisma.$disconnect();
      res
        .status(200)
        .json({ success: true, message: "Voce di menu eliminata" });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error.message,
        message: "impossibile eliminare la voce di menu",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
