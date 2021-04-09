import classNames from 'classnames';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { useClickAway } from '../hooks';
import { SideMenuItem, SideMenuItemProps } from '../SideMenuItem';

export const SideMenu = ({
  className,
  handleCloseMenu,
  items,
  Link,
  overlayClassName,
  state,
}: SideMenuProps) => {
  const navRef = useRef(null);
  const isClosed = state === 'closed';
  useClickAway(navRef, handleCloseMenu, ['mouseevent', 'scroll']);

  /**
   * The following animation exists because I need to coordinate the animations.
   * If I let translate and display run in the same time, when it got close,
   * because the display will be `none`, it'll suddenly disappear.
   */
  const animation = useAnimation();

  async function sequence() {
    if (isClosed) {
      await animation.start({ transform: `translate3d(100%, 0, 0)` });
      await animation.start({ display: 'none' });
    } else {
      await animation.start({ display: 'block' });
      await animation.start({ transform: `translate3d(0%, 0, 0)` });
    }
  }

  useEffect(() => {
    sequence();
  }, [isClosed]);

  return (
    <>
      <motion.nav
        aria-expanded={!isClosed}
        ref={navRef}
        className={classNames([
          className,
          'fixed',
          'bottom-0 right-0',
          'h-full',
          'bg-white dark:bg-blue-800',
          'z-20',
          'transform translate-x-full',
          'min-w-full sm:min-w-min sm:w-full sm:max-w-xs',
          'transition-theme duration-200 ease',
        ])}
        animate={animation}
        data-testid="sideMenu"
      >
        <ul className={classNames(['py-6', 'flex flex-col'])}>
          {items.map((props) => (
            <SideMenuItem
              key={props.href}
              {...props}
              onClick={handleCloseMenu}
              Link={Link}
            />
          ))}
        </ul>
      </motion.nav>
      <motion.div
        aria-hidden={isClosed}
        className={classNames([
          'absolute',
          'inset-0',
          'z-10',
          'bg-[rgba(0,0,0,0.7)]',
          'opacity-0',
          overlayClassName,
        ])}
        style={{
          pointerEvents: isClosed ? 'none' : 'all',
        }}
        onClick={handleCloseMenu}
        animate={state}
        transition={{ ease: 'easeOut', duration: 0.2 }}
        variants={{
          open: {
            opacity: 1,
            display: 'block',
          },
          closed: {
            opacity: 0,
            display: 'none',
          },
        }}
      />
    </>
  );
};

export type SideMenuProps = {
  className?: string;
  overlayClassName?: string;
  handleCloseMenu: () => void;
  items: SideMenuItemProps[];
  Link?: React.ElementType;
  state: 'open' | 'closed';
};
