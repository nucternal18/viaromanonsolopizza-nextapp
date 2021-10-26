import { useState, useEffect } from "react";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "../../context/authContext";

const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { items } = doc.data();
    console.log(doc.data());
    return {
      id: doc.id,
      items,
    };
  });
  return transformedCollection;
  // return transformedCollection.reduce((accumulator, collection) => {
  //   accumulator[collection.title.toLowerCase()] = collection;
  //   return accumulator;
  // }, {});
};

const useFirestore = (collections) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, collections));

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc);
        console.log(doc.id, " => ", doc.data());
      });
    })();

    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   const documents = convertCollectionsSnapshotToMap(querySnapshot);

    //   setDocs(documents);
    // });

    return () => unsubscribe();
  }, [collections]);

  return { docs };
};

export default useFirestore;
