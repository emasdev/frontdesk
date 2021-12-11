import firebase from '../firebase/config';
import {
  getDocs,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

const db = firebase.db;

const createDocument = (collectionName, docData) => {
  return addDoc(collection(db, collectionName), docData);
};

const updateDocument = (collectionName, id, docData) => {
  return setDoc(doc(db, collectionName, id), docData);
};

const readDocuments = async collectionName => {
  try {
    let data = [];
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach(doc => {
      data.push({ ...doc.data(), id: doc.id });
    });
    console.log(data);

    return data;
  } catch (error) {
    throw error;
  }
};

const readDocument = async (collectionName, docName) => {
  const docRef = doc(db, collectionName, docName);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

const FirestoreService = {
  createDocument,
  readDocuments,
  readDocument,
  updateDocument,
};

export default FirestoreService;
