import { CloseIcon, MenuIcon } from '@raulmelo/ui';
import Link from 'next/link';
import { FC } from 'react';
import tw, { css, styled } from 'twin.macro';

import { Logo } from '~/components/Logo';
import { SideMenu } from '~/components/SideMenu';
import { useApp } from '~/hooks/useApp';
import { useLocalization } from '~/hooks/useLocalization';

import { LanguageSwitch } from './components/LanguageSwitch';
import { ThemeSwitch } from './components/ThemeSwitch';

const styles = {
  wrapper: tw`relative inset-x-0 z-40 h-16 mb-8 duration-200 bg-white shadow  dark:bg-blue-800 transition-theme ease md:mb-12`,
  inner: css`
    ${tw`items-center h-full`};
  `,
  logoSection: tw`col-span-2`,
  logo: tw` text-primary`,
  iconsWrapper: tw`flex justify-end col-span-2 space-x-3 md:col-end-9 lg:col-end-13`,
  menuButtonBase: tw`flex p-2 place-content-center`,
  icon: tw`w-6`,
};

export const MenuBar: FC = () => {
  const { sideMenu } = useApp();
  const { locale } = useLocalization();

  const Icon = sideMenu.isClosed ? MenuIcon : CloseIcon;

  return (
    <>
      <div css={styles.wrapper}>
        <nav css={styles.inner} className="grid-container">
          <section data-testid="menu-bar__logo" css={styles.logoSection}>
            <Link href="/" locale={locale} passHref>
              <a css={styles.logo}>
                <Logo />
              </a>
            </Link>
          </section>
          <section css={styles.iconsWrapper}>
            <ThemeSwitch />
            <LanguageSwitch />
            <MenuButton
              onClick={sideMenu.toggle}
              data-testid="side-menu-button"
            >
              <Icon css={styles.icon} />
            </MenuButton>
          </section>
        </nav>
      </div>
      <SideMenu />
    </>
  );
};

export const MenuButton = styled.button`
  ${styles.menuButtonBase};
`;
