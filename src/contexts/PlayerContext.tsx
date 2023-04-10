"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { BeatData } from "@/types/BeatData";

interface PlayerContextType {
  selectedBeat: BeatData | null;
  setSelectedBeat: (beatData: BeatData | null) => void;
}

const PlayerContext = createContext<PlayerContextType>({
  selectedBeat: null,
  setSelectedBeat: () => {},
});

export const usePlayerContext = () => useContext(PlayerContext);

export const PlayerContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedBeat, setSelectedBeat] = useState<BeatData | null>(null);

  return (
    <PlayerContext.Provider value={{ selectedBeat, setSelectedBeat }}>
      {children}
    </PlayerContext.Provider>
  );
};
