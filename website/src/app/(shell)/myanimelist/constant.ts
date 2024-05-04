import { IconAdjustmentsSearch, IconCircleCheck, IconFilterHeart } from '@tabler/icons-react';

import { IStepMyAnimeList } from '@app/(shell)/myanimelist/type';

export const STEPS_MY_ANIME_LIST: Array<IStepMyAnimeList> = [
  {
    stepDescription: 'Please select the Anime that you want to add.',
    stepLabel: 'Choose Anime',
    Icon: IconFilterHeart,
  },
  {
    stepDescription:
      'Please review and make any necessary adjustments to the information on your selected anime.',
    stepLabel: 'Adjust Information',
    Icon: IconAdjustmentsSearch,
  },
  {
    stepDescription: 'Verify all information',
    stepLabel: 'Verify',
    Icon: IconCircleCheck,
  },
];
