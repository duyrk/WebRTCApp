'use client';

import { useSocket } from '@context/RoomContext';
import useMediaStream from '@hooks/useMediaStream';
import usePeer from '@hooks/usePeer';
import usePlayer from '@hooks/usePlayer';
import { MediaConnection } from 'peerjs';
import React from 'react';
import styles from './_styles/room.module.css';
import VideoPlayer from '@components/VideoPlayer';
import Bottom from '@components/Bottom';
import { cloneDeep } from 'lodash';
export interface RoomPageProps {
  params: { roomId: string };
}
const RoomPage: React.FC<RoomPageProps> = (props) => {
  const params = props.params;
  const socket = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const [users, setUsers] = React.useState<Record<string, MediaConnection>>();

  const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  } = usePlayer(myId, params.roomId, peer);

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

      setUsers((prev) => ({
        ...prev,
        [userId]: call,
      }));
    });
  };

  const handleToggleAudio = (userId: string) => {
    console.log(`user with id ${userId} toggled audio`);
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      if (copy) {
        copy[userId].muted = !copy[userId].muted;
      }
      return { ...copy };
    });
  };

  const handleToggleVideo = (userId: string) => {
    console.log(`user with id ${userId} toggled video`);
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      if (copy) {
        copy[userId].playing = !copy[userId].playing;
      }
      return { ...copy };
    });
  };

  const handleUserLeave = (userId: string) => {
    //close the call connection
    users![userId].close();
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      if (copy) delete copy[userId];

      return { ...copy };
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

        setUsers((prev) => ({
          ...prev,
          [callerId]: call,
        }));
      });
    });
  }, [peer, stream]);

  React.useEffect(() => {
    if (!stream || !myId) return;
    console.log(`setting my stream ${myId}`);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: false,
        playing: true,
      },
    }));
  }, [stream, myId, setPlayers]);

  //catch audio event from socket
  React.useEffect(() => {
    if (!socket.ws) return;
    socket.ws?.on('user-toggle-audio', handleToggleAudio);
    return () => {
      socket.ws?.off('user-toggle-audio', handleToggleAudio);
    };
  }, []);

  //catch video event from socket
  React.useEffect(() => {
    if (!socket.ws) return;
    socket.ws?.on('user-toggle-video', handleToggleVideo);
    return () => {
      socket.ws?.off('user-toggle-video', handleToggleVideo);
    };
  }, []);

  React.useEffect(() => {
    if (!socket) return;
    socket.ws?.on('user-leave', handleUserLeave);
    return () => {
      socket.ws?.off('user-leave', handleUserLeave);
    };
  }, []);

  return (
    <>
      <div className={styles.activePlayerContainer}>
        {playerHighlighted && <VideoPlayer {...playerHighlighted} isActive={true} />}
      </div>
      <div className={styles.inActivePlayerContainer}>
        {nonHighlightedPlayers ? (
          Object.keys(nonHighlightedPlayers).map((playerId: string) => {
            return (
              <VideoPlayer key={playerId} {...nonHighlightedPlayers[playerId]} isActive={false} />
            );
          })
        ) : (
          <></>
        )}
      </div>
      <Bottom
        muted={playerHighlighted?.muted ?? false}
        playing={playerHighlighted?.playing ?? true}
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
        leaveRoom={leaveRoom}
      />
    </>
  );
};
export default RoomPage;
