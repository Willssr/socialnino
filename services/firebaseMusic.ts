import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // usa o storage já configurado em firebase.ts

// Função usada pelo app para subir a música
export async function uploadTrackToFirebase(file: File): Promise<string> {
  const fileRef = ref(storage, `music/${Date.now()}-${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
}

