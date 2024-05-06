"use client"
import { Box, Button, Stack, Text } from '@mantine/core';
import { RoomContext } from '@context/RoomContext';
import React from 'react';
import { useRouter } from '@libs/patch-router';

export default function RootPage() {
  const { ws } = React.useContext(RoomContext);
const router = useRouter()
  const createRoom = () => {
    ws.emit('create-room');
    // router.push("/room/heyyyyy")
  };
  return (
    <Box>
      <Stack align="center">
        <Text>Easy calling app</Text>
        <Button onClick={createRoom}>Start a new meeting</Button>
      </Stack>
    </Box>
  );
}
