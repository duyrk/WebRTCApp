"use client"
import { useRouter } from '@libs/patch-router';
import React, { createContext } from 'react';
import socketIO from 'socket.io-client';
const WS = 'http://localhost:3000';

export const RoomContext = createContext<null | any>(null);
const ws = socketIO(WS);

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter()
  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log(roomId);
    router.push(`/room/${roomId}`)
  };
  React.useEffect(() => {
    ws.on('room-created', enterRoom);
  }, []);
  return <RoomContext.Provider value={{ ws }}>{children}</RoomContext.Provider>;
};
