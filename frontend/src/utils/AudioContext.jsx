import React, { createContext, useContext, useRef } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);

  const playSound = (soundUrl) => {
    if (audioRef.current) {
      audioRef.current.src = soundUrl;
      audioRef.current.play();
    }
  };

  return (
    <AudioContext.Provider value={{ playSound }}>
      <audio ref={audioRef} style={{ display: 'none' }} />
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
