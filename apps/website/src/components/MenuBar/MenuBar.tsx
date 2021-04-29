import { CloseIcon, MenuIcon } from '@components/Icons';
import { Logo } from '@components/Logo';
import { SideMenu } from '@components/SideMenu';
import { useApp } from '@hooks/useApp';
import { useLocalization } from '@hooks/useLocalization';
import { gridContainer } from '@styles/base';
import Link from 'next/link';
import { FC } from 'react';
import tw, { css, styled } from 'twin.macro';
import { LanguageSwitch } from './components/LanguageSwitch';
import { ThemeSwitch } from './components/ThemeSwitch';

const styles = {
  wrapper: tw`
    inset-x-0
    relative
    h-16
    z-40
    shadow
    bg-white dark:bg-blue-800
    transition-theme duration-200 ease
    mb-8 md:mb-12
  `,
  inner: css`
    ${tw`items-center h-full`};
    ${gridContainer};
  `,
  logo: tw`col-span-2`,
  iconsWrapper: tw`flex justify-end space-x-3 col-span-2 md:col-end-9 lg:col-end-13`,
  menuButtonBase: tw`p-2 flex place-content-center`,
  icon: tw`w-6`,
};

export const MenuBar: FC = () => {
  const { sideMenu } = useApp();
  const { locale } = useLocalization();

  const Icon = sideMenu.isClosed ? MenuIcon : CloseIcon;

  return (
    <>
      <div css={styles.wrapper}>
        <nav css={styles.inner}>
          <section data-testid="menu-bar__logo" css={styles.logo}>
            <Link href="/" locale={locale}>
              <a>
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
