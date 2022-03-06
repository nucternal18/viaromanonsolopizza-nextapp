/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "../../lib/cloudinary";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    /**
     * @desc Upload image to cloudinary
     * @route POST /api/upload
     * @access Private/admin
     */

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

    try {
      const fileStr = req.body.data;
      if (!fileStr) {
        return res.status(400).send({ message: "Missing image url" });
      }
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "gallery_items",
      });
      res.status(201).json(uploadedResponse);
    } catch (error) {
      res.status(400).json({
        message:
          "Qualcosa è andato storto durante il caricamento dell'immagine",
        error,
      });
    }
  } else {
    return res.status(405).json({
      message: "Server Error. Invalid Request. Method not allowed",
    });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};
