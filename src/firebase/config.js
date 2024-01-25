import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkcTI8PTgfsMFXmLAqfW4gej-V8OBeISM",
  authDomain: "andriod-aresenal.firebaseapp.com",
  projectId: "andriod-aresenal",
  storageBucket: "andriod-aresenal.appspot.com",
  messagingSenderId: "397072445666",
  appId: "1:397072445666:web:28889d6b333037f8056ebb",
  measurementId: "G-RRMC00WM23",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export { app };
