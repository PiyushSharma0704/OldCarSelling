import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDKU_csnd_61BB-_ck-Q0tSz4v3791BM1k",
  authDomain: "ecommerce2-4d596.firebaseapp.com",
  projectId: "ecommerce2-4d596",
  storageBucket: "ecommerce2-4d596.appspot.com",
  messagingSenderId: "483064456623",
  appId: "1:483064456623:web:b5e52c9ad5ab710603fb5a"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);