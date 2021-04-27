import { CloseIcon, MenuIcon } from '@components/Icons';
import { Logo } from '@components/Logo';
import { SideMenu } from '@components/SideMenu';
import { useApp } from '@hooks/useApp';
import { useLocalization } from '@hooks/useLocalization';
import { gridContainer } from '@styles/base';
import Link from 'next/link';
import { FC } from 'react';
import tw from 'twin.macro';
import { LanguageSwitch } from './components/LanguageSwitch';
import { ThemeSwitch } from './components/ThemeSwitch';

export const MenuBar: FC = () => {
  const { sideMenu } = useApp();
  const { locale } = useLocalization();

  const Icon = sideMenu.isClosed ? MenuIcon : CloseIcon;

  return (
    <>
      <div
        css={[
          tw`inset-x-0`,
          tw`h-16`,
          tw`z-40`,
          tw`shadow`,
          tw`bg-white dark:bg-blue-800`,
          tw`transition-theme duration-200 ease`,
          tw`mb-8 md:mb-12`,
          sideMenu.isClosed && tw`sticky`,
        ]}
      >
        <nav css={[tw`items-center h-full`, gridContainer]}>
          <section data-testid="menu-bar__logo" tw="col-span-2">
            <Link href="/" locale={locale}>
              <a>
                <Logo />
              </a>
            </Link>
          </section>
          <section tw="flex justify-end space-x-3 col-span-2 md:col-end-9 lg:col-end-13">
            <ThemeSwitch />
            <LanguageSwitch />
            <MenuButton
              onClick={sideMenu.toggle}
              data-testid="side-menu-button"
            >
              <Icon tw="w-6" />
            </MenuButton>
          </section>
        </nav>
      </div>
      <SideMenu />
    </>
  );
};

export const MenuButton = tw.button`p-2 flex place-content-center`;
