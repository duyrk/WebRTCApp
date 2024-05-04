import React from 'react';
import { TablerIconsProps } from '@tabler/icons-react';

interface IStepMyAnimeList {
  stepLabel: string;
  stepDescription: string;
  isComplete?: boolean;
  Icon?: React.FC<TablerIconsProps>;
}
