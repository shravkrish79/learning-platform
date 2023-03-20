// Node modules
import { collection, getDocs, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";

// Project files
import { database } from "./firebaseSetup";

// Methods
export async function readDocuments(collectionName) {
  const querySnapshot = await getDocs(collection(database, collectionName));
  const result = [];
  querySnapshot.forEach((doc) => {
    const document = { id: doc.id, ...doc.data() };
    result.push(document);
  });
  // console.log(result);
  return result;
}


export async function createDocument(collectionName, data) {

  const documentPath = collection(database, collectionName);
  const document = await addDoc(documentPath, data);
  return document;
}

export async function updateDocument(collectionName, data, id) {
  const documentPath = doc(database, collectionName, id);
  await setDoc(documentPath, data);
}

export async function deleteDocument(collectionName, id) {
  const documentPath = doc(database, collectionName, id);
  await deleteDoc(documentPath);
}