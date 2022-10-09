/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

import prisma from "@lib/prisma";

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
    const session: Session = await getSession({ req });
    /**
     * @desc check to see if their is a user session
     */
    if (!session) {
      res.status(401).json({ success: false, message: "Non autorizzato" });
      return;
    }

    /**
     * @desc check to see if logged in user is admin
     */
    if (!session.user.isAdmin) {
      res.status(401).json({ success: false, message: "Non autorizzato" });
      return;
    }

    const { imageUrl } = req.body;
    if (!imageUrl) {
      res.status(400).send({ success: false, message: "Missing image url" });
      return;
    }
    await prisma.pictures.create({
      data: {
        image: imageUrl,
      },
    });
    res
      .status(201)
      .json({ success: true, message: "Immagine aggiunta con successo" });
  } else if (req.method === "GET") {
    /**
     * @desc GET all pictures.
     * @route GET /api/gallery
     * @access Public
     */

    const { sort } = req.query;

    let page: number;
    // Chain sort conditions

    //Pagination

    if (Number(req.query.page) > 1) {
      page = Number(req.query.page);
    } else {
      page = 1;
    }
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    // No await here because we don't need to wait for the query to finish
    const pictures = await prisma.pictures.findMany({
      orderBy: {
        createdAt: sort === "oldest" ? "asc" : "desc",
      },
      skip: skip,
      take: limit,
    });
    await prisma.$disconnect();
    const totalPictures = pictures.length;
    const numberOfPages = Math.ceil(totalPictures / limit);

    res.status(200).json({ pictures, totalPictures, numberOfPages });
  } else {
    res.setHeader("Allow", ["GET"]);
    res
      .status(405)
      .json({ success: false, message: `Method ${req.method} not allowed` });
  }
};

export default handler;
