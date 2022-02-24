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
import { getSession } from "next-auth/react";
import getUser from "../../../lib/getUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }
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
    res.status(401).json({ message: "Not Authorized " });
    return;
  }

  if (req.method === "PUT") {
    /**
     * @desc update a menu item
     * @route PUT /api/menu/:id
     * @access Private
     */
    const { id } = req.query;
    try {
      await db.connectDB();
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
  } else if (req.method === "DELETE") {
    /**
     * @desc delete a menu item
     * @route DELETE /api/menu/:id
     * @access Private
     */
    try {
      await db.connectDB();
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
