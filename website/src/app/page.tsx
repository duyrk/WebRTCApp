'use client';
import { Box, Button, Container, Input, Paper, Stack, Text } from '@mantine/core';
import { v4 as uuidV4 } from 'uuid';
import React from 'react';
import { useRouter } from 'next/navigation';
import classes from './_styles/index.module.css'
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
      alert('Please enter valid room id');
    }
  };
  return (
    <Container size={420} pt={120}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Stack>
          <Text ta={'center'} className="text-3xl font-extrabold text-white">Thunder meeting ⚡</Text>
          <Input
            width={'100%'}
            color='yellow'
            placeholder="Enter room id to join"
            value={roomId}
            onChange={(event) => {
              setRoomId(event.target.value);
            }}
            classNames={classes}
          />
          <Button fullWidth type="submit" variant="outline" color="yellow" onClick={joinRoom}>Join a room</Button>
        </Stack>
        <Stack align="center" mt={20}>
          <Text>--------------- OR ---------------</Text>
          <Button fullWidth type="submit" variant="outline" color="yellow"  onClick={createAndJoin}>
            Create a new room
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
