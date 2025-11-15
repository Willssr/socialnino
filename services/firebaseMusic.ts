import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Fix: Use 'firebase/firestore/lite' to resolve import errors.
import { collection, addDoc, Timestamp } from "firebase/firestore/lite";
import { storage, db } from "./firebase";

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
  // Check if firebase is configured
  // This is a basic check. In a real app, you might want more robust validation.
  if (!db || !storage) {
    throw new Error("Firebase não está configurado. Verifique suas credenciais em services/firebase.ts");
  }

  // 1. Upload file to Storage
  const path = `tracks/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(storageRef);

  // 2. Save metadata to Firestore
  const title =
    options?.title || file.name.replace(/\.[^/.]+$/, "") || "Música";
  const artist = options?.artist || "Você";

  const docRef = await addDoc(collection(db, "tracks"), {
    title,
    artist,
    url: downloadUrl,
    createdAt: Timestamp.now(),
  });

  // 4. Return the complete track object
  return {
    id: docRef.id,
    title,
    artist,
    url: downloadUrl,
    createdAt: new Date(),
  };
}