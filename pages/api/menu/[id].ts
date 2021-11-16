import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase-admin/auth";
import db from "../../../lib/db";
import {
  Antipasti,
  Contorni,
  Letempure,
  Secondi,
  Desserts,
  GourmetPizza,
  Pizzas,
  Cantina,
  Bianche,
} from "../../../models/menuModel";
import { defaultFirestore } from "../../../config/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    console.error(
      "No Firebase ID token was passed as a Bearer token in the Authorization header.",
      "Make sure you authorize your request by providing the following HTTP header:",
      "Authorization: Bearer <Firebase ID Token>"
    );
    res.status(403).json({ error: "Unauthorized" });
    return;
  }
  const idToken = req.headers.authorization.split(" ")[1];
  if (req.method === "PUT") {
    /**
     * @desc update a menu item
     * @route PUT /api/menu/:id
     * @access Private
     */

    try {
      let userData;
      const token = await getAuth().verifyIdToken(idToken);
      // get user details from firestore
      const userRef = defaultFirestore.collection("users").doc(token.uid);
      const snapshot = await userRef.get();
      snapshot.exists ? (userData = snapshot.data()) : (userData = null);

      if (!userData.isAdmin) {
        res.status(401).json({ message: "Not Authorized " });
        return;
      }
    } catch (error) {
      res.status(401).json({
        error: error.message,
        message: "Invalid token. Not Authorized ",
      });
      return;
    }
  } else if (req.method === "DELETE") {
    /**
     * @desc delete a menu item
     * @route DELETE /api/menu/:id
     * @access Private
     */
    try {
      const token = await getAuth().verifyIdToken(idToken);

      if (!token) {
        res.status(401).json({ message: "Invalid token. Not Authorized " });
        return;
      }
    } catch (error) {
      res.status(401).json({
        error: error.message,
        message: "Invalid token. Not Authorized ",
      });
      return;
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
