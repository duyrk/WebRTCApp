'use client';
import VideoPlayer from '@components/VideoPlayer';
import { RoomContext } from '@context/RoomContext';
import { PeerState } from '@context/peerReducer';
import React from 'react';
export interface RoomPageProps {
  params: { roomId: string };
}
const RoomPage: React.FC<RoomPageProps> = (props) => {
  const params = props.params;
  const { ws, me, stream, peers } = React.useContext(RoomContext);
  console.log('peers', { peers });
  console.log("peer array", Object.values(peers as PeerState))
  console.log("stream", stream)
  React.useEffect(() => {
    if (me) ws.emit('join-room', { roomId: params.roomId, peerId: me._id });
  }, [params.roomId, me, ws]);
  return (
    <>
      Room id: {params.roomId}
      <div>
      <VideoPlayer  stream={stream} />
        {Object.values(peers as PeerState).map((peer) => (
          <VideoPlayer stream={peer.stream} />
        ))}
      </div>
    </>
  );
};
export default RoomPage;
