'use client';
import { Box, Button, Input, Stack, Text } from '@mantine/core';
import { v4 as uuidV4 } from 'uuid';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();
  const [roomId, setRoomId] = React.useState('');
  const createAndJoin = () => {
    const roomId = uuidV4();
    router.push(`/room/${roomId}`);
  };
  const joinRoom = () => {
    if (roomId) {
      router.push(`/room/${roomId}`);
    } else {
      alert("Please enter valid room id")
    }
  };
  return (
    <Box className="border-2">
      <Stack align="center">
        <Text className="text-3xl font-extrabold">Easy calling app</Text>
        <Input
          placeholder="Enter room id to join"
          value={roomId}
          onChange={(event) => {
            setRoomId(event.target.value);
          }}
        />
        <Button onClick={joinRoom}>Join a room</Button>
      </Stack>
      <Stack align="center" mt={20}>
        <Text>--------------- OR ---------------</Text>
        <Button onClick={createAndJoin}>Create a new room</Button>
      </Stack>
    </Box>
  );
}
