import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { displayName, password, email, isAdmin, image } = req.body;

    if (
      !displayName ||
      !password ||
      password.trim().length < 7 ||
      !email ||
      !email.includes("@")
    ) {
      res.status(401).send({
        success: false,
        message: "Invalid inputs - password should be at least 7 characters",
      });
      return;
    }

    const userExist = await prisma.user.findUnique({ where: { email } });

    if (userExist) {
      res.status(422).json({ success: false, message: "User already exists" });
      await prisma.$disconnect();
      return;
    }

    await prisma.user.create({
      data: {
        name: displayName,
        email: email,
        password: bcrypt.hashSync(password, 10),
        isAdmin: isAdmin,
        image: image,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "Created user successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ success: false, message: `Method ${req.method} not allowed` });
  }
}

export default handler;
