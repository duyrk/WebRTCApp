"use client"
import { RoomContext } from '@context/RoomContext';
import React from 'react';
export interface RoomPageProps {
  params: { roomId: string };
}
const RoomPage: React.FC<RoomPageProps> = (props) => {
  const params = props.params;
  const { ws } = React.useContext(RoomContext);
  React.useEffect(() => {
    ws.emit('join-room', { roomId: params.roomId });
  }, []);
  return <>Room id: {params.roomId}</>;
};
export default RoomPage;
