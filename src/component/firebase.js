import {getFirestore} from 'firebase/firestore'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBXZvz_vRHJM53ERa7UvCV-qmmygdexU0Y",
  authDomain: "g-docs-5fd28.firebaseapp.com",
  projectId: "g-docs-5fd28",
  storageBucket: "g-docs-5fd28.appspot.com",
  messagingSenderId: "810674822999",
  appId: "1:810674822999:web:cd30df19ce7142c3706812"
};


export const app = initializeApp(firebaseConfig);
export const dataStore = getFirestore(app)