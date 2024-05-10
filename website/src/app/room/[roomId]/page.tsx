'use client';
import VideoPlayer from '@components/VideoPlayer';
import { useSocket } from '@context/RoomContext';
import useMediaStream from '@hooks/useMediaStream';
import usePeer from '@hooks/usePeer';
import React from 'react';
export interface RoomPageProps {
  params: { roomId: string };
}
const RoomPage: React.FC<RoomPageProps> = (props) => {
  const params = props.params;
  const socket = useSocket()
  const {peer, myId} = usePeer()
  const {stream} = useMediaStream()
  return (
    <>
      Room id: {params.roomId}
      <div>
          <VideoPlayer muted playing playerId={myId} url={stream as MediaStream} />
      </div>
    </>
  );
};
export default RoomPage;
