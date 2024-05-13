import { useState } from 'react';

const usePlayer = () => {
  const [players, setPlayers] =
    useState<Record<string, { url: MediaStream; muted: boolean; playing: boolean }>>();
  return {
    players,
    setPlayers,
  };
};

export default usePlayer;
