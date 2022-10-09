/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  /**
   * @desc Get user profile
   * @route GET /api/users/profile
   * @access Private
   */
  if (req.method === "GET") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ success: false, message: "Non autorizzato" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (user) {
      res.status(200).json({
        id: user.id,
        image: user.image,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res
      .status(405)
      .json({ success: false, message: `Method ${req.method} not allowed` });
  }
};

export default handler;
