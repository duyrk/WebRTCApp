interface ILink {
  label: string;
  link: string;
}

interface IRoute {
  label: string;
  link?: string;
  links?: Array<ILink>;
  initiallyOpened?: boolean;
  icon: import('react').FC<import('@tabler/icons-react').TablerIconsProps>;
}

interface IAppRoute extends IRoute {}
