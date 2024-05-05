'use client';
import { Burger, Center, Container, Group, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';

import classes from '../styles/HeaderMenu.module.css';
import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import toggle = Simulate.toggle;

const links = [
  { link: '/about', label: 'Features' },
  {
    link: '#1',
    label: 'Learn',
    links: [
      { link: '/docs', label: 'Documentation' },
      { link: '/resources', label: 'Resources' },
      { link: '/community', label: 'Community' },
      { link: '/blog', label: 'Blog' },
    ],
  },
  { link: '/about', label: 'About' },
  { link: '/pricing', label: 'Pricing' },
  {
    link: '#2',
    label: 'Support',
    links: [
      { link: '/faq', label: 'FAQ' },
      { link: '/demo', label: 'Book a demo' },
      { link: '/forums', label: 'Forums' },
    ],
  },
];

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_612_117)">
              <rect width="600" height="600" fill="white" />
              <path
                d="M0 300V600H300H600V300V-3.12924e-05H300H0V300ZM250.667 199.933V225.2L282.267 264.933C318.6 310.6 406.4 421.2 408.333 423.667C409.4 425 402.133 425.333 372.933 425.333H336.2L282.467 354.333C252.933 315.267 219.933 271.6 209.067 257.267L189.333 231.267V202.933V174.667H220H250.667V199.933ZM405.6 179.667C403.4 182.4 390.133 198.733 376.067 216C362 233.2 345.6 253.467 339.6 260.933C333.6 268.4 328.067 274.467 327.333 274.467C326.6 274.467 318.4 265 309.067 253.333L292.2 232.2L300.4 221.667C304.933 215.867 315 202.933 322.667 192.933L336.667 174.733L373.133 174.667H409.533L405.6 179.667ZM221.333 318.667L250.6 356.667L250.667 391V425.333H220H189.333V352.533C189.333 304 189.8 279.933 190.667 280.2C191.4 280.467 205.2 297.8 221.333 318.667Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_612_117">
                <rect width="600" height="600" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}
