import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCSnOapHBBpeBNNn04r8JsvR2zgphbM5o",
  authDomain: "snapchat-clone-3358c.firebaseapp.com",
  projectId: "snapchat-clone-3358c",
  storageBucket: "snapchat-clone-3358c.appspot.com",
  messagingSenderId: "6974094673",
  appId: "1:6974094673:web:562a12c9be54cd30d5a770",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { auth, storage, provider };
