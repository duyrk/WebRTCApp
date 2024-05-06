import NextLink from 'next/link';
import React, { forwardRef } from 'react';

import { onStart } from '../navigation-progress/events';
import { shouldTriggerStartEvent } from './should-trigger-start-event';

export const Link = forwardRef<HTMLAnchorElement, React.ComponentProps<'a'>>(function Link(
  { href, onClick, ...rest },
  ref
) {
  const useLink = href && href.startsWith('/');
  if (!useLink) return <a href={href} onClick={onClick} {...rest} />;

  return (
    <NextLink
      href={href}
      onClick={(event) => {
        if (shouldTriggerStartEvent(href, event)) onStart();
        if (onClick) onClick(event);
      }}
      {...rest}
      ref={ref}
    />
  );
});