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

import getUser from "../../../lib/getUser";

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
    await db.connectDB();
    // if (search) {
    //   queryObj.position = { $regex: search, $options: "i" };
    // }

    let result;
    if (queryObj.menuType === "antipasti") {
      result = Antipasti.find({});
    }
    if (queryObj.menuType === "contorni") {
      result = Contorni.find({});
    }
    if (queryObj.menuType === "letempure") {
      result = Letempure.find({});
    }
    if (queryObj.menuType === "secondi") {
      result = Secondi.find({});
    }

    if (queryObj.menuType === "desserts") {
      result = Desserts.find({});
    }

    if (queryObj.menuType === "gourmetPizza") {
      result = GourmetPizza.find({});
    }
    if (queryObj.menuType === "pizzaSpeciali") {
      result = PizzaSpeciali.find({});
    }

    if (queryObj.menuType === "pizzas") {
      result = Pizzas.find({});
    }
    if (queryObj.menuType === "cantina") {
      result = Cantina.find({});
    }
    if (queryObj.menuType === "bianche") {
      result = Bianche.find({});
    }
    // Chain sort conditions
    if (sort === "latest") {
      result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
      result = result.sort("createdAt");
    }
    if (sort === "a-z") {
      result = result.sort("position");
    }
    if (sort === "z-a") {
      result = result.sort("-position");
    }

    const menu = await result;

    await db.disconnect();
    res.status(200).json({ menu });
  } else if (req.method === "POST") {
    /**
     * @desc creat a new menu item
     * @route POST /api/menu/
     * @access Private
     */
    /**
     * @desc Get user session
     */
    const session = await getSession({ req });

    /**
     * @desc check to see if their is a user session
     */
    if (!session) {
      console.log("no session");
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    const userData = await getUser(req);
    console.log(userData);

    if (!userData.isAdmin) {
      console.log("not admin");
      res.status(401).json({
        message:
          "Not Authorized. You do not have permission to perform this operation.",
      });
      return;
    }
    console.log(req.body);
    const { name, name_english, ingredients, subtitle, price, type, types } =
      req.body;
    console.log(name, name_english, ingredients, subtitle, price, type, types);
    try {
      await db.connectDB();
      if (type === "antipasti") {
        const antipasti = new Antipasti({
          name: name,
          name_english: name_english,
          price: price,
        });
        const createdAntipasti = await antipasti.save();
        await db.disconnect();
        res.status(200).json(createdAntipasti);
      }
      if (type === "contorni") {
        const contorni = new Contorni({
          name: name,
          name_english: name_english,
          price: price,
        });
        const createdContorni = await contorni.save();
        await db.disconnect();
        res.status(200).json(createdContorni);
      }
      if (type === "letempure") {
        const letempure = new Letempure({
          name: name,
          name_english: name_english,
          price: price,
        });
        const createdLetempure = await letempure.save();
        await db.disconnect();
        res.status(200).json(createdLetempure);
      }
      if (type === "secondi") {
        const secondi = new Secondi({
          name: name,
          name_english: name_english,
          price: price,
        });
        const createdSecondi = await secondi.save();
        await db.disconnect();
        res.status(200).json(createdSecondi);
      }

      if (type === "desserts") {
        const desserts = new Desserts({
          name: name,
          price: price,
        });
        const createdDesserts = await desserts.save();
        await db.disconnect();
        res.status(200).json(createdDesserts);
      }

      if (type === "gourmetPizza") {
        const gourmetPizza = new GourmetPizza({
          name: name,
          price: price,
          ingredients: ingredients,
        });
        const createdGourmetPizza = await gourmetPizza.save();
        await db.disconnect();
        res.status(200).json(createdGourmetPizza);
      }

      if (type === "pizzaSpeciali") {
        const pizzaSpeciali = new PizzaSpeciali({
          name: name,
          price: price,
          ingredients: ingredients,
        });
        const createdPizzaSpeciali = await pizzaSpeciali.save();
        await db.disconnect();
        res.status(200).json(createdPizzaSpeciali);
      }

      if (type === "pizzas") {
        const pizzas = new Pizzas({
          name: name,
          price: price,
          ingredients: ingredients,
        });
        const createdPizzas = await pizzas.save();
        await db.disconnect();
        res.status(200).json(createdPizzas);
      }
      if (type === "cantina") {
        const cantina = new Cantina({
          subtitle: subtitle,
          types: types,
        });
        const createdCantina = await cantina.save();
        await db.disconnect();
        res.status(200).json(createdCantina);
      }
      if (type === "bianche") {
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
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
