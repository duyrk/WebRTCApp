import { Socket } from "socket.io";
import { v4 as uuid } from "uuid";
export const roomHandler = (socket: Socket) => {
  const joinRoom = ({ roomId }: { roomId: string }) => {
    console.log("user joined the room", roomId);
    socket.join(roomId)
  };
  const createRoom = () => {
    const roomId = uuid();
    socket.join(roomId);
    socket.emit("room-created", {
      roomId,
    });
    console.log("user created a room");
  };
  socket.on("join-room", joinRoom);
  socket.on("create-room", createRoom);
};
