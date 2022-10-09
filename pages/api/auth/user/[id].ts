import bcrypt from "bcryptjs";
/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

import prisma from "@lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    /**
     * @desc Get user session
     */
    const session: Session = await getSession({ req });
    /**
     * @desc check to see if their is a user session
     */
    if (!session) {
      res.status(401).json({ message: "Non autorizzato" });
      return;
    }

    const { id } = req.query;
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
    });

    if (!existingUser) {
      res.status(404).json({ success: true, message: "Non autorizzato" });
    }

    const user = await prisma.user.update({
      where: {
        id: id as string,
      },
      data: {
        name: req.body.user.displayName
          ? req.body.user.displayName
          : existingUser.name,
        image: req.body.user.image ? req.body.user.image : existingUser.image,
        email: req.body.user.email ? req.body.user.email : existingUser.email,
        password: req.body.user && bcrypt.hashSync(req.body.user.password, 10),
      },
    });
    await prisma.$disconnect();
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
