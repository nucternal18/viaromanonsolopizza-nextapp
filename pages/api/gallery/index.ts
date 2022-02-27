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
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    const userData = await getUser(req);
    /**
     * @desc check to see if logged in user is admin
     */
    if (!userData.isAdmin) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    await db.connectDB();

    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).send({ message: "Missing fields" });
    }
    const picture = new Picture({
      image: imageUrl,
    });
    const createdPicture = await picture.save();
    res.status(201).json(createdPicture);
  } else if (req.method === "GET") {
    /**
     * @desc GET all pictures.
     * @route GET /api/gallery
     * @access Public
     */
    await db.connectDB();

    const pictures = await Picture.find({});

    res.status(200).json(pictures);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
