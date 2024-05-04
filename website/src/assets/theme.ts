'use client';

import { groteskFont } from './font';
import { Button, createTheme, MantineColorsTuple } from '@mantine/core';
import { buttonStyles } from '@assets/styles';

interface IColors {
  [key: string]: MantineColorsTuple;
}

export const theme = createTheme({
  /* Put your mantine theme override here */
  ...groteskFont,
  components: {
    Button: Button.extend({
      classNames: buttonStyles,
    }),
  },
});
