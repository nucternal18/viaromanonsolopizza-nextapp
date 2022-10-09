/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

import prisma from "@lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  /**
   * @desc Delete an image from the gallery
   * @route DELETE /api/gallery/:id
   * @access Private/admin
   */
  if (req.method === "DELETE") {
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
    if (!session.user?.isAdmin) {
      res.status(401).json({ success: false, message: "Non autorizzato" });
      return;
    }

    try {
      await prisma.pictures.delete({
        where: { id: id as string },
      });
      await prisma.$disconnect();
      res
        .status(200)
        .json({ success: true, message: "Picture removed successfully" });
    } catch (error) {
      res
        .status(404)
        .json({ success: false, message: "Unable to delete picture" });
    }
  } else {
    res
      .status(405)
      .json({ success: false, message: `Method ${req.method} not allowed` });
  }
};

export default handler;
