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
} from "../../../models/menuModel";

import getUser from "../../../lib/getUser";

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
    });
  } else if (req.method === "POST") {
    /**
     * @desc creat a new menu item
     * @route POST /api/menu/
     * @access Private
     */
    if (!req.headers.cookie || !req.headers.cookie.startsWith("Bearer ")) {
      res.status(403).json({ message: "No token provided. Not Authorized " });
      return;
    }

    try {
      /**
       * @desc Get user session
       */
      const session = await getSession({ req });
      /**
       * @desc check to see if their is a user session
       */
      if (!session) {
        res.status(401).json({ message: "Not Authorized" });
        return;
      }

      const userData = await getUser(req);

      if (!userData.isAdmin) {
        res.status(401).json({
          message:
            "Not Authorized. You do not have permission to perform this operation.",
        });
        return;
      }

      const { type, name, name_english, price, ingredients, types, subtitle } =
        req.body;
      await db.connectDB();
      if (type === "Antipasti") {
        const antipasti = new Antipasti({
          name: name,
          name_english: name_english,
          price: price,
        });
        const createdAntipasti = await antipasti.save();
        await db.disconnect();
        res.status(200).json(createdAntipasti);
      }
      if (type === "Contorni") {
        const contorni = new Contorni({
          name: name,
          name_english: name_english,
          price: price,
        });
        const createdContorni = await contorni.save();
        await db.disconnect();
        res.status(200).json(createdContorni);
      }
      if (type === "Letempure") {
        const letempure = new Letempure({
          name: name,
          name_english: name_english,
          price: price,
        });
        const createdLetempure = await letempure.save();
        await db.disconnect();
        res.status(200).json(createdLetempure);
      }
      if (type === "Secondi") {
        const secondi = new Secondi({
          name: name,
          name_english: name_english,
          price: price,
        });
        const createdSecondi = await secondi.save();
        await db.disconnect();
        res.status(200).json(createdSecondi);
      }

      if (type === "Desserts") {
        const desserts = new Desserts({
          name: name,
          price: price,
        });
        const createdDesserts = await desserts.save();
        await db.disconnect();
        res.status(200).json(createdDesserts);
      }

      if (type === "GourmetPizza") {
        const gourmetPizza = new GourmetPizza({
          name: name,
          price: price,
          ingredients: ingredients,
        });
        const createdGourmetPizza = await gourmetPizza.save();
        await db.disconnect();
        res.status(200).json(createdGourmetPizza);
      }

      if (type === "Pizzas") {
        const pizzas = new Pizzas({
          name: name,
          price: price,
          ingredients: ingredients,
        });
        const createdPizzas = await pizzas.save();
        await db.disconnect();
        res.status(200).json(createdPizzas);
      }
      if (type === "Cantina") {
        const cantina = new Cantina({
          subtitle: subtitle,
          types: types,
        });
        const createdCantina = await cantina.save();
        await db.disconnect();
        res.status(200).json(createdCantina);
      }
      if (type === "Bianche") {
        const bianche = new Bianche({
          name: name,
          price: price,
          ingredients: ingredients,
        });
        const createdBianche = await bianche.save();
        await db.disconnect();
        res.status(200).json(createdBianche);
      }
    } catch (error) {
      res.status(401).json({
        error: error.message,
        message: "Invalid token. Not Authorized ",
      });
      return;
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
