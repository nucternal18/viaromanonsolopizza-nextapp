import cloudinary from "./cloudinary";
import Picture from "../models/galleryModel";
import db from "./db";

export const seedDocuments = async () => {
  try {
    const params = {
      expression: 'folder="gallery_items"',
    };
    const paramString = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");
    const results = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/resources/search?${paramString}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.CLOUDINARY_API_KEY +
              ":" +
              process.env.CLOUDINARY_API_SECRET
          ).toString("base64")}`,
        },
      }
    ).then((r) => r.json());

    const { resources } = results;
    await db.connectDB();
    resources.map(async (resource) => {
      const picture = new Picture({
        image: resource.secure_url,
      });
      await picture.save();
    });
    await db.disconnect();
  } catch (error) {
    console.log(error);
  }
};
