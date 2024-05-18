import { useSocket } from '@context/RoomContext';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/navigation';
import Peer from 'peerjs';
import { useState } from 'react';

const usePlayer = (myId: string, roomId: string, peer: Peer) => {
  const router = useRouter();
  const socket = useSocket();
  const [players, setPlayers] =
    useState<Record<string, { url: MediaStream; muted: boolean; playing: boolean }>>();
  let playersCopy;
  let playerHighlighted;
  let nonHighlightedPlayers;

  if (players) {
    console.log(myId);
    playersCopy = cloneDeep(players);
    playerHighlighted = playersCopy![myId]; // media stream của bạn
    console.log(playersCopy);
    delete playersCopy![myId];
    console.log(playersCopy);
    nonHighlightedPlayers = playersCopy; // các media của khác
  }
  const toggleAudio = () => {
    console.log('I toggled my audio');
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      if (copy) {
        copy[myId].muted = !copy[myId].muted;
      }
      return { ...copy };
    });
    socket.ws?.emit('user-toggle-audio', myId, roomId);
  };
  const toggleVideo = () => {
    console.log('I toggled my video');
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      if (copy) {
        copy[myId].playing = !copy[myId].playing;
      }
      return { ...copy };
    });
    socket.ws?.emit('user-toggle-video', myId, roomId);
  };
  const leaveRoom = () => {
    socket.ws?.emit('user-leave', myId, roomId);
    console.log(`User ${myId} left the room ${roomId}`);
    peer.disconnect();
    router.push('/');
  };

  return {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom
  };
};

export default usePlayer;
