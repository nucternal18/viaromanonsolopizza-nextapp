import { doc, writeBatch } from 'firebase/firestore';
import { db } from '../../context/authContext';

const useFirestoreDB = async (objectsToAdd) => {
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(db, 'Menu');
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export default useFirestoreDB;
