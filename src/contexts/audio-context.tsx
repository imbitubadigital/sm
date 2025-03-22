"use client";

import { createContext, useContext, useState } from 'react';

type AudioContextType = {
  currentPlayingId: string | null;
  setCurrentPlayingId: (id: string | null) => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);

  return (
    <AudioContext.Provider value={{ currentPlayingId, setCurrentPlayingId }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioContext() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
}