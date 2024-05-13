const { useEffect, useState } = require('react');
import { useSocket } from '@context/RoomContext';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Peer from 'peerjs';
const usePeer = () => {
  const socket = useSocket();
  const params = useParams<{ roomId: string }>();
  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState('');

  useEffect(() => {
    if (!params.roomId || !socket.ws) return;
    const myPeer = new Peer();
    setPeer(myPeer);
    myPeer.on('open', (id) => {
      console.log('your peer id is ', id);
      setMyId(id);
      socket.ws?.emit('join-room', params.roomId, id);
    });
  }, [params.roomId, socket]);

  return {
    peer,
    myId,
  } as {peer: Peer, myId: string};
};
export default usePeer;
