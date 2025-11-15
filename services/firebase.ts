import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtupasTm-lAGVGp2FRhkcvzef4N-UMJcA",
  authDomain: "socialninovisk.firebaseapp.com",
  projectId: "socialninovisk",
  storageBucket: "socialninovisk.firebasestorage.app",
  messagingSenderId: "165583816034",
  appId: "1:165583816034:web:130770b6efe954699c583b",
  measurementId: "G-M7R6TH3PRC",
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
