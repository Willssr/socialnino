import { PointsEvent } from '../types';

const STORAGE_KEY = "socialnino:ninoPoints";

const POINTS_MAP: Record<PointsEvent, number> = {
  LIKE: 1,
  COMMENT: 2,
  POST: 5,
  FOLLOW: 3,
  CHALLENGE: 10,
  QUIZ: 8,
};

export function getCurrentPoints(): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw ? Number(raw) || 0 : 0;
}

export function addPoints(event: PointsEvent): number {
  if (typeof window === "undefined") return 0;
  const current = getCurrentPoints();
  const toAdd = POINTS_MAP[event] ?? 0;
  const updated = current + toAdd;
  window.localStorage.setItem(STORAGE_KEY, String(updated));
  return updated;
}

export function resetPoints() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, "0");
}
