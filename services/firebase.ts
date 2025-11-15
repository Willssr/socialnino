// services/firebase.ts
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtupasTm-lAGVGp2FRhkcvzef4N-UMJcA",
  authDomain: "socialninovisk.firebaseapp.com",
  projectId: "socialninovisk",
  storageBucket: "socialninovisk.firebasestorage.app",
  messagingSenderId: "165583816034",
  appId: "1:165583816034:web:130770b6efe954699c583b",
  measurementId: "G-M7R6TH3PRC",

  // 🔥 MUITO IMPORTANTE para Realtime Database:
  // copie a URL exata do console do Firebase → Realtime Database
  databaseURL: "https://socialninovisk-default-rtdb.firebaseio.com",
};

let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Auth (login, registro, etc.)
export const auth = getAuth(app);

// Realtime Database (global posts, stories, etc.)
export const db = getDatabase(app);

// Storage (imagens, vídeos, músicas)
export const storage = getStorage(app);
