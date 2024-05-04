'use client';

import {
  rem,
  Box,
  Text,
  Group,
  Collapse,
  ThemeIcon,
  useMantineTheme,
  UnstyledButton,
} from '@mantine/core';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { IconChevronRight } from '@tabler/icons-react';

import classes from './NavbarLinksGroup.module.css';
import { Link, useRouter } from '@libs/patch-router';

const handleInitOpenedState = (pathName: string, initOpened?: boolean, links?: Array<ILink>) => {
  if (initOpened) {
    return true;
  }

  if (links) {
    for (const link of links) {
      if (link.link === pathName) {
        return true;
      }
    }
  }

  return false;
};

export default function NavbarLinksGroup({
  link,
  label,
  links,
  icon: Icon,
  initiallyOpened,
}: IAppRoute) {
  const router = useRouter();
  const { colors } = useMantineTheme();
  const currentPath = usePathname();
  const [opened, setOpened] = useState(handleInitOpenedState(currentPath, initiallyOpened, links));

  const hasLinks = Array.isArray(links);

  const handleRoutePress = (link?: string) => {
    link && router.push(link);
    hasLinks && setOpened((prev) => !prev);
  };

  const items = (hasLinks ? links : []).map((link) => (
    <Text
      component={Link}
      href={link.link}
      key={link.label}
      className={classes.link}
      style={{
        backgroundColor: hasLinks && currentPath === link.link ? colors.dark[7] : 'transparent',
      }}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => handleRoutePress(link)}
        className={classes.control}
        style={{
          backgroundColor:
            !hasLinks && link && currentPath === link ? colors.dark[7] : 'transparent',
        }}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
