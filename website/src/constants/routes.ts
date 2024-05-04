import {IconBook, IconBrandYoutubeKids, IconGauge} from '@tabler/icons-react';

export const AppRoute: Array<IRoute> = [
  {
    label: 'Dashboard',
    icon: IconGauge,
    link: '/dashboard',
  },
  {
    label: 'Anime',
    icon: IconBook,
    links: [{ label: 'Add Anime', link: '/anime/add' }],
  },
  {
    label: 'My Anime List',
    icon: IconBrandYoutubeKids,
    link: '/myanimelist'
  },
];
