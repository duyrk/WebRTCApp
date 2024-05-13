'use client';
import VideoPlayer from '@components/VideoPlayer';
import { useSocket } from '@context/RoomContext';
import useMediaStream from '@hooks/useMediaStream';
import usePeer from '@hooks/usePeer';
import usePlayer from '@hooks/userPlayer';
import { MediaConnection } from 'peerjs';
import React from 'react';
import { Stream } from 'stream';
export interface RoomPageProps {
  params: { roomId: string };
}
const RoomPage: React.FC<RoomPageProps> = (props) => {
  const params = props.params;
  const socket = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const { players, setPlayers } = usePlayer();

  const handleUSerConnected = (userId: string) => {
    console.log(`user connected in room with user id ${userId}`);
    const call = peer.call(userId, stream!);
    call.on('stream', (incomingStream) => {
      console.log(`incoming stream from ${userId}`, incomingStream);
      setPlayers((prev) => ({
        ...prev,
        [userId]: {
          url: incomingStream,
          muted: false,
          playing: true,
        },
      }));
    });
  };
  React.useEffect(() => {
    if (!socket.ws || !stream || !peer) return;
    socket.ws?.on('user-connected', handleUSerConnected);
    return () => {
      socket.ws?.off('user-connected', handleUSerConnected);
    };
  }, [socket, stream, peer]);

  React.useEffect(() => {
    if (!peer || !stream) return;
    peer.on('call', (call: MediaConnection) => {
      const { peer: callerId } = call;
      call.answer(stream);
      call.on('stream', (incomingStream) => {
        console.log(`incoming stream from ${callerId}`, incomingStream);
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: false,
            playing: true,
          },
        }));
      });
    });
  }, [peer, stream]);

  React.useEffect(() => {
    if (!stream) return;

    console.log(`setting my stream ${myId}`);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: false,
        playing: true,
      },
    }));
  }, [stream]);
  return (
    <>
      Room id: {params.roomId}
      <div>
        {players ? (
          Object.keys(players).map((playerId: string) => {
            return <VideoPlayer key={playerId} {...players[playerId]} />;
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default RoomPage;
