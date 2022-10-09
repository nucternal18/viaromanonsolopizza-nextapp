/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "@lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    /**
     * @desc GET all pictures.
     * @route GET /api/gallery
     * @access Public
     */

    // No await here because we don't need to wait for the query to finish
    const pictures = await prisma.pictures.findMany({});

    await prisma.$disconnect();

    res.status(200).json(pictures);
  } else {
    res.setHeader("Allow", ["GET"]);
    res
      .status(405)
      .json({ success: false, message: `Method ${req.method} not allowed` });
  }
};

export default handler;
