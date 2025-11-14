import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";

// IMPORTANT: Replace with your own Firebase project configuration.
// You can get this from the Firebase console:
// Project settings > General > Your apps > Web app > SDK setup and configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // e.g., import.meta.env.VITE_FIREBASE_API_KEY
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
let app;
let storage;
let db;

try {
    app = initializeApp(firebaseConfig);
    storage = getStorage(app);
    db = getFirestore(app);
} catch (e) {
    console.error("Firebase initialization error. Please check your firebaseConfig.", e);
}


export type UploadedTrack = {
  id: string;
  title: string;
  artist: string;
  url: string;
  createdAt: Date;
};

export async function uploadTrackToFirebase(
  file: File,
  options?: { title?: string; artist?: string }
): Promise<UploadedTrack> {
  if (!storage || !db) {
      throw new Error("Firebase is not initialized. Please check your configuration in services/firebaseMusic.ts");
  }
  
  const title =
    options?.title || file.name.replace(/\.[^/.]+$/, "") || "Música";
  const artist = options?.artist || "Você";

  const path = `tracks/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);

  await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(storageRef);

  const docRef = await addDoc(collection(db, "tracks"), {
    title,
    artist,
    url: downloadUrl,
    createdAt: Timestamp.now(),
  });

  return {
    id: docRef.id,
    title,
    artist,
    url: downloadUrl,
    createdAt: new Date(),
  };
}