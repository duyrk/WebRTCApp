'use client';

import React from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { Avatar, Group, rem, Text, UnstyledButton, useMantineTheme } from '@mantine/core';

import classes from './UserButton.module.css';

const UserButton = React.forwardRef<HTMLButtonElement, IUserButtonProps>(
  ({ email, username, avatar, icon, ...others }, ref) => {
    const { colors } = useMantineTheme();

    return (
      <UnstyledButton ref={ref} {...others} className={classes.user}>
        <Group>
          <Avatar radius="xl" src={avatar ?? '/web-icon.png'} bg={colors.dark[8]} />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              {username}
            </Text>

            <Text c="dimmed" size="xs">
              {email}
            </Text>
          </div>

          {icon || <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />}
        </Group>
      </UnstyledButton>
    );
  }
);

export default UserButton;
