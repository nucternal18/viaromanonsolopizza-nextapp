import { useState, useEffect } from "react";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { db } from "../../context/authContext";

const useFirestore = (collections) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, collections), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    return () => unsubscribe();
  }, [collections]);

  return { docs };
};

export default useFirestore;
