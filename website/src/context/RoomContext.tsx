'use client';
import { useRouter } from '@libs/patch-router';
import { Socket, io } from 'socket.io-client';
import React, { createContext, useContext } from 'react';

interface RoomContext {
  ws: Socket | undefined;
}

export const useSocket = () => {
  const socket = useContext(RoomContext);
  return socket;
};

export const RoomContext = createContext<RoomContext>({
  ws: undefined,
});

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [socket, setSocket] = React.useState<Socket>();
  const value = {
    ws: socket,
  };
  React.useEffect(() => {
    const connection = io('http://localhost:3000');
    setSocket(connection);
  }, []);

  socket?.on('connect_error', async (err) => {
    console.log('Error establishing socket', err);
    await fetch('/api/socket');
  });
  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};
