import { NEXT_URL } from "../config";

export async function uploadImage(base64EncodedImage, cookies) {
  try {
    const response = await fetch(`${NEXT_URL}/api/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookies,
      },
      body: JSON.stringify({ data: base64EncodedImage }),
    });
    const data = await response.json();
    const imageUrl = data.url;
    return imageUrl;
  } catch (error) {
    console.error(error);
    return error;
  }
}
