import { Socket } from "socket.io";
import { v4 as uuid } from "uuid";

const rooms: Record<string, string[]> = {};

interface IRoomParams {
  roomId: string;
  peerId: string;
}

export const roomHandler = (socket: Socket) => {
  const leaveRoom = ({ roomId, peerId }: IRoomParams) => {
    rooms[roomId] = rooms[roomId].filter((_peerId) => _peerId !== peerId);
    socket.to(roomId).emit("user-disconnected", peerId);
  };
  const joinRoom = ({ roomId, peerId }: IRoomParams) => {
    //   if (rooms[roomId]) {
    //     console.log("user joined the room", roomId + " " + peerId);
    //     rooms[roomId].push(peerId);
    //     socket.join(roomId);
    //     socket.emit("joined", peerId);
    //     socket.emit("get-users", {
    //       roomId,
    //       participants: rooms[roomId],
    //     });
    //   }
    //   socket.on("disconnect", () => {
    //     console.log("user left the room", peerId);
    //     leaveRoom({ roomId, peerId });
    //   });
    // };
    // const createRoom = () => {
    //   const roomId = uuid();
    //   rooms[roomId] = [];
    //   socket.join(roomId);
    //   socket.emit("room-created", {
    //     roomId,
    //   });
    //   console.log("user created a room");
  };
  // socket.on("join-room", joinRoom);
  // socket.on("create-room", createRoom);
  socket.on("join-room", (roomId, userId) => {
    console.log(`a new user ${userId} joined room ${roomId}`);
    socket.join(roomId)
    socket.broadcast.to(roomId).emit("user-connected", userId)
    //emit message to every users in that room id except me
  });
};
