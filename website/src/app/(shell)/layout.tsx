'use client';

import {
  Container,
  Group,
  Image,
  Menu,
  rem,
  ScrollArea,
  Text,
  UnstyledButton,
} from '@mantine/core';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useLocalStorage } from '@mantine/hooks';
import { IconLogout } from '@tabler/icons-react';

import { AuthUtils } from '@utils';
import { IUser } from '@global/global';
import { AppRoute } from '@constants/routes';
import { useRouter } from '@libs/patch-router';
import classes from './NavbarNested.module.css';
import { NavbarLinksGroup, UserButton } from '@app/(shell)/_component';
import { EStorageKey, StorageService } from '@services/StorageService';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const routes = useRouter();
  const path = usePathname();
  const [userData] = useLocalStorage<IUser>({ key: EStorageKey.UserData });

  const links = AppRoute.map((item) => <NavbarLinksGroup {...item} key={item.label} />);

  const onLogout = () => {
    AuthUtils.removeTokenData();
    StorageService.delete(EStorageKey.UserData);
    routes.replace('/login');
  };

  return (
    <Container fluid className={classes.layoutContainer}>
      <nav className={classes.navbar}>
        <div className={classes.header}>
          <UnstyledButton component={Group} onClick={() => routes.push('/dashboard')}>
            <Image src={'/web-icon.png'} w={50} radius={5} />
            <Text className={classes.navTitle}>Kurosaw Anime</Text>
          </UnstyledButton>
        </div>

        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>
        <div className={classes.footer}>
          <Menu
            withArrow
            offset={5}
            width={150}
            withinPortal
            trigger={'hover'}
            position={'right'}
            transitionProps={{ transition: 'pop' }}
          >
            <Menu.Target>
              <UserButton
                email={userData?.email}
                avatar={userData?.avatar}
                username={userData?.username}
              />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
                onClick={onLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </nav>

      <section className={classes.sectionContainer}>{children}</section>
    </Container>
  );
}
