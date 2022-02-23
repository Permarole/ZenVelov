import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuuZE1JYL4lvFCaTWRC8xBRCq8jxVSsXY",
  authDomain: "zenvelov.firebaseapp.com",
  projectId: "zenvelov",
  storageBucket: "zenvelov.appspot.com",
  messagingSenderId: "709196111118",
  appId: "1:709196111118:web:168b3c94716cba4231cb5f",
  measurementId: "G-K82CP35DV8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;
