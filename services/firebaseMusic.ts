import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push, set } from "firebase/database";
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
  const sRef = storageRef(storage, path);
  await uploadBytes(sRef, file);
  const downloadUrl = await getDownloadURL(sRef);

  // 2. Save metadata to Realtime Database
  const title =
    options?.title || file.name.replace(/\.[^/.]+$/, "") || "Música";
  const artist = options?.artist || "Você";

  const tracksRef = dbRef(db, "tracks");
  const newTrackRef = push(tracksRef);
  const trackId = newTrackRef.key as string;

  const trackData = {
    id: trackId,
    title,
    artist,
    url: downloadUrl,
    createdAt: new Date().toISOString(),
  };

  await set(newTrackRef, trackData);

  // 4. Return the complete track object
  return {
    id: trackId,
    title,
    artist,
    url: downloadUrl,
    createdAt: new Date(),
  };
}