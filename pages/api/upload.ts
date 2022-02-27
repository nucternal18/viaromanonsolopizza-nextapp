/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "../../lib/cloudinary";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    /**
     * @desc Upload image to cloudinary
     * @route POST /api/upload
     * @access Private/admin
     */

    try {
      const fileStr = req.body.data;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "gallery_items",
      });
      res.status(201).json(uploadedResponse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Something went wrong uploading image" });
    }
  } else {
    return res.status(500).json({
      success: false,
      error: "Server Error. Invalid Request",
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
