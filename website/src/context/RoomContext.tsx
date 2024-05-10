'use client';
import { useRouter } from '@libs/patch-router';
import Peer from 'peerjs';
import React, { createContext } from 'react';
import socketIO from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import dynamic from 'next/dynamic';
import { peersReducer } from './peerReducer';
import { addPeerAction } from './peerActions';
const WS = 'http://localhost:3000';

export const RoomContext = createContext<null | any>(null);
const ws = socketIO(WS);

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [me, setMe] = React.useState<Peer>();
  const [stream, setStream] = React.useState<MediaStream>();
  const [peers, dispatch] = React.useReducer(peersReducer, {});
  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log(roomId);
    router.push(`/room/${roomId}`);
  };
  const getUSers = ({ participants }: { participants: Array<string> }) => {
    console.log(participants);
  };
  const getUserMedia = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        setStream(stream);
      });
    } catch (e) {
      console.error(e);
    }
  };
  React.useEffect(() => {
    const meId = uuid();
    const peer = new Peer(meId);
    setMe(peer);
    getUserMedia();
    ws.on('room-created', enterRoom);
    ws.on('get-users', getUSers);
    ws.on('joined', ()=>{
      console.log("hey")
    })
  }, []);
  React.useEffect(() => {
    if (!me) return;
    if (!stream) return;

    ws.on('joined', (peerId) => {
      console.log('user joined');
      const call = me.call(peerId, stream);
      call.on('stream', (stream) => {
        dispatch(addPeerAction(peerId, stream));
      });
    });
    me.on('call', (call) => {
      console.log("called")
      call.answer(stream);
      call.on('stream', (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });
  }, [me, stream]);
  console.log({ peers });
  return <RoomContext.Provider value={{ ws, me, stream, peers }}>{children}</RoomContext.Provider>;
};
