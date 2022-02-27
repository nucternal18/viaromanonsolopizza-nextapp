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
    res.status(401).json({ message: "Not Authorized" });
    return;
  }

  const userData = await getUser(req);
  if (!userData.isAdmin) {
    res.status(401).json({ message: "Not Authorized " });
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
      if (type === "pizzas") {
        const pizzas = await Pizzas.findById(id);
        await db.disconnect();
        res.status(200).json(pizzas);
      }
      if (type === "Cantina") {
        console.log("searching...");
        const cantina = await Cantina.aggregate([
          {
            $match: {
              _id: id,
            },
          },
          { $unwind: "$types" },
          { $match: { "types._id": typesId } },
        ]).exec((err, result) => {
          if (err) {
            throw err;
          }
          console.log(result);
          res.status(200).json(result);
        });
        console.log("Success...");
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
      const { menuDetails } = req.body;
      await db.connectDB();
      if (type === "Antipasti") {
        const antipasti = await Antipasti.findById(id);
        if (antipasti) {
          antipasti.name = menuDetails.name;
          antipasti.name_english = menuDetails.name_english;
          antipasti.price = menuDetails.price;
          await antipasti.save();
          await db.disconnect();
          res.status(201).json({ message: "Menu item updated successfully" });
        }
      }
      if (type === "Contorni") {
        const contorni = await Contorni.findById(id);
        if (contorni) {
          contorni.name = menuDetails.name;
          contorni.name_english = menuDetails.name_english;
          contorni.price = menuDetails.price;
          await contorni.save();
          await db.disconnect();
          res.status(201).json({ message: "Menu item updated successfully" });
        }
      }
      if (type === "Letempure") {
        const letempure = await Letempure.findById(id);
        if (letempure) {
          letempure.name = menuDetails.name;
          letempure.name_english = menuDetails.name_english;
          letempure.price = menuDetails.price;
          await letempure.save();
          await db.disconnect();
          res.status(201).json({ message: "Menu item updated successfully" });
        }
      }
      if (type === "Secondi") {
        const secondi = await Secondi.findById(id);
        if (secondi) {
          secondi.name = menuDetails.name;
          secondi.name_english = menuDetails.name_english;
          secondi.price = menuDetails.price;
          await secondi.save();
          await db.disconnect();
          res.status(201).json({ message: "Menu item updated successfully" });
        }
      }

      if (type === "Desserts") {
        const desserts = await Desserts.findById(id);
        if (desserts) {
          desserts.name = menuDetails.name;
          desserts.price = menuDetails.price;
          await desserts.save();
          await db.disconnect();
          res.status(201).json({ message: "Menu item updated successfully" });
        }
      }

      if (type === "GourmetPizza") {
        const gourmetPizza = await GourmetPizza.findById(id);
        if (gourmetPizza) {
          gourmetPizza.name = menuDetails.name;
          gourmetPizza.name_english = menuDetails.name_english;
          gourmetPizza.price = menuDetails.price;
          await gourmetPizza.save();
          await db.disconnect();
          res.status(201).json({ message: "Menu item updated successfully" });
        }
      }

      if (type === "Pizzas") {
        const pizzas = await Pizzas.findById(id);
        if (pizzas) {
          pizzas.name = menuDetails.name;
          pizzas.name_english = menuDetails.name_english;
          pizzas.price = menuDetails.price;
          await pizzas.save();
          await db.disconnect();
          res.status(201).json({ message: "Menu item updated successfully" });
        }
        await db.disconnect();
      }
      if (type === "Cantina") {
        await Cantina.findOneAndUpdate(
          { _id: id },
          {
            $set: { [`types.$[outer]`]: menuDetails },
          },
          {
            arrayFilters: [{ "outer._id": typesId }],
          },
          (err, doc) => {
            if (err) {
              res.status(401).json({
                error: err.message,
                message: "Unable to update menu item",
              });
              return;
            }
            res.status(201).json({ message: "Menu item updated successfully" });
          }
        );
        await db.disconnect();
      }
      if (type === "Bianche") {
        const bianche = await Bianche.findById(id);
        if (bianche) {
          bianche.name = menuDetails.name;
          bianche.name_english = menuDetails.name_english;
          bianche.price = menuDetails.price;
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
      if (type === "Antipasti") {
        const antipasti = await Antipasti.findById(id);
        if (antipasti) {
          await antipasti.remove();
          await db.disconnect();
          res.status(201).json({ message: "Menu item deleted successfully" });
        }
      }
      if (type === "Contorni") {
        const contorni = await Contorni.findById(id);
        if (contorni) {
          await contorni.remove();
          await db.disconnect();
          res.status(201).json({ message: "Menu item deleted successfully" });
        }
      }
      if (type === "Letempure") {
        const letempure = await Letempure.findById(id);
        if (letempure) {
          await letempure.remove();
          await db.disconnect();
          res.status(201).json({ message: "Menu item deleted successfully" });
        }
      }
      if (type === "Secondi") {
        const secondi = await Secondi.findById(id);
        if (secondi) {
          await secondi.remove();
          await db.disconnect();
          res.status(201).json({ message: "Menu item deleted successfully" });
        }
      }

      if (type === "Desserts") {
        const desserts = await Desserts.findById(id);
        if (desserts) {
          await desserts.remove();
          await db.disconnect();
          res.status(201).json({ message: "Menu item deleted successfully" });
        }
      }

      if (type === "GourmetPizza") {
        const gourmetPizza = await GourmetPizza.findById(id);
        if (gourmetPizza) {
          await gourmetPizza.remove();
          await db.disconnect();
          res.status(201).json({ message: "Menu item deleted successfully" });
        }
      }

      if (type === "Pizzas") {
        const pizzas = await Pizzas.findById(id);
        if (pizzas) {
          await pizzas.remove();
          await db.disconnect();
          res.status(201).json({ message: "Menu item deleted successfully" });
        }
      }
      if (type === "Cantina") {
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
      if (type === "Bianche") {
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
