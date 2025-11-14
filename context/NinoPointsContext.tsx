import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addPoints as serviceAddPoints,
  getCurrentPoints,
} from "../services/ninoPointsService";
import { PointsEvent } from "../types";

type NinoPointsContextType = {
  points: number;
  addPoints: (event: PointsEvent) => void;
};

const NinoPointsContext = createContext<NinoPointsContextType | undefined>(
  undefined
);

export const NinoPointsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    setPoints(getCurrentPoints());
  }, []);

  const addPoints = (event: PointsEvent) => {
    const updated = serviceAddPoints(event);
    setPoints(updated);
  };

  return (
    <NinoPointsContext.Provider value={{ points, addPoints }}>
      {children}
    </NinoPointsContext.Provider>
  );
};

export const useNinoPoints = () => {
  const ctx = useContext(NinoPointsContext);
  if (!ctx) {
    throw new Error("useNinoPoints deve ser usado dentro de NinoPointsProvider");
  }
  return ctx;
};
