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
      res.status(401).json({ message: "Non autorizzato" });
      return;
    }

    const userData = await getUser(req);

    if (!userData.isAdmin) {
      res.status(401).json({
        message: "Non autorizzato.",
      });
      return;
    }
    const { name, name_english, ingredients, subtitle, price, type, types } =
      req.body;
    try {
      await db.connectDB();
      if (type === "antipasti") {
        const antipasti = new Antipasti({
          name: name,
          name_english: name_english,
          price: price,
        });
        await antipasti.save();
        await db.disconnect();
        res.status(200).json({ message: "Menu item created successfully" });
      }
      if (type === "contorni") {
        const contorni = new Contorni({
          name: name,
          name_english: name_english,
          price: price,
        });
        await contorni.save();
        await db.disconnect();
        res.status(200).json({ message: "Menu item created successfully" });
      }
      if (type === "letempure") {
        const letempure = new Letempure({
          name: name,
          name_english: name_english,
          price: price,
        });
        await letempure.save();
        await db.disconnect();
        res.status(200).json({ message: "Menu item created successfully" });
      }
      if (type === "secondi") {
        const secondi = new Secondi({
          name: name,
          name_english: name_english,
          price: price,
        });
        await secondi.save();
        await db.disconnect();
        res.status(200).json({ message: "Menu item created successfully" });
      }

      if (type === "desserts") {
        const desserts = new Desserts({
          name: name,
          price: price,
        });
        await desserts.save();
        await db.disconnect();
        res.status(200).json({ message: "Menu item created successfully" });
      }

      if (type === "gourmetPizza") {
        const gourmetPizza = new GourmetPizza({
          name: name,
          price: price,
          ingredients: ingredients,
        });
        await gourmetPizza.save();
        await db.disconnect();
        res.status(200).json({ message: "Menu item created successfully" });
      }

      if (type === "pizzaSpeciali") {
        const pizzaSpeciali = new PizzaSpeciali({
          name: name,
          price: price,
          ingredients: ingredients,
        });
        await pizzaSpeciali.save();
        await db.disconnect();
        res.status(200).json({ message: "Menu item created successfully" });
      }

      if (type === "pizzas") {
        const pizzas = new Pizzas({
          name: name,
          price: price,
          ingredients: ingredients,
        });
        await pizzas.save();
        await db.disconnect();
        res.status(200).json({ message: "Menu item created successfully" });
      }
      if (type === "cantina") {
        let cantina;
        if (subtitle) {
          cantina = await Cantina.findOne({ subtitle: subtitle });
          cantina.types.push(types);
        } else {
          cantina = new Cantina({
            subtitle: subtitle,
            types: types,
          });
        }
        await cantina.save();
        await db.disconnect();
        res.status(200).json({ message: "Menu item created successfully" });
      }
      if (type === "bianche") {
        const bianche = new Bianche({
          name: name,
          price: price,
          ingredients: ingredients,
        });
        await bianche.save();
        await db.disconnect();
        res.status(200).json({ message: "Menu item created successfully" });
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
