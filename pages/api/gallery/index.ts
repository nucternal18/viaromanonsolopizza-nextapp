/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import db from "../../../lib/db";
import getUser from "../../../lib/getUser";
import Picture from "../../../models/galleryModel";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  /**
   * @desc Upload a picture to the database.
   * @route POST /api/gallery
   * @access Private/admin
   */
  if (req.method === "POST") {
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
    /**
     * @desc check to see if logged in user is admin
     */
    if (!userData.isAdmin) {
      res.status(401).json({ message: "Non autorizzato" });
      return;
    }

    await db.connectDB();
    console.log("Reached");
    console.log(req.body);
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).send({ message: "Missing image url" });
    }
    const picture = new Picture({
      image: imageUrl,
    });
    await picture.save();
    res.status(201).json({ message: "Immagine aggiunta con successo" });
  } else if (req.method === "GET") {
    /**
     * @desc GET all pictures.
     * @route GET /api/gallery
     * @access Public
     */

    const { sort } = req.query;

    await db.connectDB();

    // No await here because we don't need to wait for the query to finish
    let result = Picture.find({});
    let page: number;
    // Chain sort conditions
    if (sort === "latest") {
      result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
      result = result.sort("createdAt");
    }

    //Pagination

    if (Number(req.query.page) > 1) {
      page = Number(req.query.page);
    } else {
      page = 1;
    }
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    const pictures = await result;

    const totalPictures = await Picture.countDocuments();
    const numberOfPages = Math.ceil(totalPictures / limit);

    await db.disconnect();

    res.status(200).json({ pictures, totalPictures, numberOfPages });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
