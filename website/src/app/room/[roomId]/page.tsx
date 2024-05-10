'use client';
import { useSocket } from '@context/RoomContext';
import usePeer from '@hooks/usePeer';
import React from 'react';
export interface RoomPageProps {
  params: { roomId: string };
}
const RoomPage: React.FC<RoomPageProps> = (props) => {
  const params = props.params;
  const socket = useSocket()
  const {peer, myId} = usePeer()
  return (
    <>
      Room id: {params.roomId}
      <div>

      </div>
    </>
  );
};
export default RoomPage;
