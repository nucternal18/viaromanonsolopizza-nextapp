import { PizzaSpeciali } from "./../../../models/menuModel";
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
    res.status(401).json({ message: "Non autorizzato " });
    return;
  }
  const { id, type, typesId } = req.query;
  console.log(type);
  if (req.method === "GET") {
    /**
     * @desc Get a menu item
     * @route GET /api/menu/:id
     * @access Private/admin
     */
    try {
      await db.connectDB();
      if (type === "antipasti") {
        const antipasti = await Antipasti.findById(id);
        await db.disconnect();
        res.status(200).json(antipasti);
      }
      if (type === "contorni") {
        const contorni = await Contorni.findById(id);
        await db.disconnect();
        res.status(200).json(contorni);
      }

      if (type === "letempure") {
        const letempure = await Letempure.findById(id);
        await db.disconnect();
        res.status(200).json(letempure);
      }
      if (type === "secondi") {
        const secondi = await Secondi.findById(id);
        await db.disconnect();
        res.status(200).json(secondi);
      }
      if (type === "desserts") {
        const desserts = await Desserts.findById(id);
        await db.disconnect();
        res.status(200).json(desserts);
      }
      if (type === "gourmetPizza") {
        const gourmetPizza = await GourmetPizza.findById(id);
        await db.disconnect();
        res.status(200).json(gourmetPizza);
      }
      if (type === "pizzaSpeciali") {
        const pizzaSpeciali = await PizzaSpeciali.findById(id);
        await db.disconnect();
        res.status(200).json(pizzaSpeciali);
      }
      if (type === "pizzas") {
        const pizzas = await Pizzas.findById(id);
        await db.disconnect();
        res.status(200).json(pizzas);
      }
      if (type === "Cantina") {
        console.log("searching...");
        const cantina = await Cantina.findById(id);
        const doc = cantina.types.id(typesId);
        res.status(200).json(doc);
        await db.disconnect();
      }
      if (type === "bianche") {
        const bianche = await Bianche.findById(id);
        await db.disconnect();
        res.status(200).json(bianche);
      }
    } catch (error) {
      res.status(401).json({
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
    try {
      await db.connectDB();
      const { name, name_english, ingredients, price, Bottiglia, Calice } =
        req.body;
      await db.connectDB();
      if (type === "antipasti") {
        const antipasti = await Antipasti.findById(id);
        if (antipasti) {
          antipasti.name = name;
          antipasti.name_english = name_english;
          antipasti.price = price;
          await antipasti.save();
          await db.disconnect();
          res.status(201).json({ message: "Menu item updated successfully" });
        }
      }
      if (type === "contorni") {
        const contorni = await Contorni.findById(id);
        if (contorni) {
          contorni.name = name;
          contorni.name_english = name_english;
          contorni.price = price;
          await contorni.save();
          await db.disconnect();
          res.status(201).json({ message: "Menu item updated successfully" });
        }
      }
      if (type === "letempure") {
        const letempure = await Letempure.findById(id);
        if (letempure) {
          letempure.name = name;
          letempure.name_english = name_english;
          letempure.price = price;
          await letempure.save();
          await db.disconnect();
          res.status(201).json({ message: "Menu item updated successfully" });
        }
      }
      if (type === "secondi") {
        const secondi = await Secondi.findById(id);
        if (secondi) {
          secondi.name = name;
          secondi.name_english = name_english;
          secondi.price = price;
          await secondi.save();
          await db.disconnect();
          res.status(201).json({ message: "Menu item updated successfully" });
        }
      }

      if (type === "desserts") {
        const desserts = await Desserts.findById(id);
        if (desserts) {
          desserts.name = name;
          desserts.price = price;
          await desserts.save();
          await db.disconnect();
          res.status(201).json({ message: "Menu item updated successfully" });
        }
      }

      if (type === "gourmetPizza") {
        const gourmetPizza = await GourmetPizza.findById(id);
        if (gourmetPizza) {
          gourmetPizza.name = name;
          gourmetPizza.name_english = name_english;
          gourmetPizza.price = price;
          gourmetPizza.ingredients = ingredients;
          await gourmetPizza.save();
          await db.disconnect();
          res.status(201).json({ message: "Menu item updated successfully" });
        }
      }
      if (type === "pizzaSpeciali") {
        const pizzaSpeciali = await PizzaSpeciali.findById(id);
        if (pizzaSpeciali) {
          pizzaSpeciali.name = name;
          pizzaSpeciali.name_english = name_english;
          pizzaSpeciali.price = price;
          pizzaSpeciali.ingredients = ingredients;
          await pizzaSpeciali.save();
          await db.disconnect();
          res.status(201).json({ message: "Menu item updated successfully" });
        }
      }

      if (type === "pizzas") {
        const pizzas = await Pizzas.findById(id);
        if (pizzas) {
          pizzas.name = name;
          pizzas.name_english = name_english;
          pizzas.price = price;
          pizzas.ingredients = ingredients;
          await pizzas.save();
          await db.disconnect();
          res.status(201).json({ message: "Menu item updated successfully" });
        }
        await db.disconnect();
      }
      if (type === "cantina") {
        const cantina = await Cantina.findById(id);
        if (cantina) {
          cantina.types.id(typesId).name = name;
          cantina.types.id(typesId).Bottiglia = Bottiglia;
          cantina.types.id(typesId).Calice = Calice;
          await cantina.save();
          await db.disconnect();
          res.status(201).json({ message: "Menu item updated successfully" });
        }
      }
      if (type === "bianche") {
        const bianche = await Bianche.findById(id);
        if (bianche) {
          bianche.name = name;
          bianche.name_english = name_english;
          bianche.price = price;
          await bianche.save();
          await db.disconnect();
          res.status(201).json({ message: "Menu item updated successfully" });
        }
      }
    } catch (error) {
      res.status(401).json({
        error: error.message,
        message: "Unable to update menu item",
      });
      return;
    }
  } else if (req.method === "DELETE") {
    /**
     * @desc delete a menu item
     * @route DELETE /api/menu/:id
     * @access Private/admin
     */
    try {
      await db.connectDB();
      if (type === "antipasti") {
        const antipasti = await Antipasti.findById(id);
        if (antipasti) {
          await antipasti.remove();
          await db.disconnect();
          res.status(201).json({ message: "Menu item deleted successfully" });
        }
      }
      if (type === "contorni") {
        const contorni = await Contorni.findById(id);
        if (contorni) {
          await contorni.remove();
          await db.disconnect();
          res.status(201).json({ message: "Menu item deleted successfully" });
        }
      }
      if (type === "letempure") {
        const letempure = await Letempure.findById(id);
        if (letempure) {
          await letempure.remove();
          await db.disconnect();
          res.status(201).json({ message: "Menu item deleted successfully" });
        }
      }
      if (type === "secondi") {
        const secondi = await Secondi.findById(id);
        if (secondi) {
          await secondi.remove();
          await db.disconnect();
          res.status(201).json({ message: "Menu item deleted successfully" });
        }
      }

      if (type === "desserts") {
        const desserts = await Desserts.findById(id);
        if (desserts) {
          await desserts.remove();
          await db.disconnect();
          res.status(201).json({ message: "Menu item deleted successfully" });
        }
      }

      if (type === "gourmetPizza") {
        const gourmetPizza = await GourmetPizza.findById(id);
        if (gourmetPizza) {
          await gourmetPizza.remove();
          await db.disconnect();
          res.status(201).json({ message: "Menu item deleted successfully" });
        }
      }

      if (type === "pizzas") {
        const pizzas = await Pizzas.findById(id);
        if (pizzas) {
          await pizzas.remove();
          await db.disconnect();
          res.status(201).json({ message: "Menu item deleted successfully" });
        }
      }
      if (type === "cantina") {
        await Cantina.findOneAndUpdate(
          { _id: id },
          {
            $pull: { types: { _id: typesId } },
          },
          { new: true }
        );
        res.status(201).json({ message: "Menu item deleted successfully" });
        await db.disconnect();
      }
      if (type === "bianche") {
        const bianche = await Bianche.findById(id);
        if (bianche) {
          await bianche.remove();
          await db.disconnect();
          res.status(201).json({ message: "Menu item deleted successfully" });
        }
      }
    } catch (error) {
      res.status(401).json({
        error: error.message,
        message: "unable to delete menu item",
      });
      return;
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
