/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import cloudinary from "../../lib/cloudinary";

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
    const session: Session = await getSession({ req });

    /**
     * @desc check to see if their is a user session
     */
    if (!session) {
      res.status(401).json({ success: false, message: "Non autorizzato" });
      return;
    }

    try {
      const fileStr = req.body.data;
      if (!fileStr) {
        return res
          .status(400)
          .send({ success: false, message: "URL immagine mancante" });
      }
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "gallery_items",
      });
      res.status(201).json({ image: uploadedResponse.secure_url });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          "Qualcosa è andato storto durante il caricamento dell'immagine",
        error,
      });
    }
  } else {
    return res.status(405).json({
      success: false,
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
