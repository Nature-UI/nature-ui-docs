import { IconButton, useDisclosure, useUpdateEffect } from "@nature-ui/core";
import Link from "next/link";
import { useRef } from "react";

import siteConfig from "configs/site-config";

import { DiscordIcon, GithubIcon, Logo } from "./icons";
import { MobileNavButton, MobileNaveContent } from "./mobile-nav";
import VersionSwitcher from "./version-switcher";

const HeaderContent = () => {
  const mobileNavBtnRef = useRef<HTMLButtonElement>();

  const mobileNav = useDisclosure();

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus();
  }, [mobileNav.isOpen]);
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 border-b border-slate-900/10">
      <div className="w-full bg-primary-500 h-1 absolute top-0 left-0" />

      <nav className="max-w-8xl mx-auto">
        <div className="py-4 lg:px-8 mx-4 lg:mx-0 flex items-center justify-between px-4">
          <Logo />
          <div className="hidden md:w-4/6 md:flex items-center justify-end">
            <VersionSwitcher />
            <Link
              aria-label="Go to Nature UI GitHub page"
              href={siteConfig.repo.url}
              target="_blank" // TODO: fix this
            >
              <IconButton
                className="mr-5 text-gray-500 hover:text-gray-75 transition-colors duration-150"
                size="xs"
                icon={<GithubIcon />}
              />
            </Link>
            <Link
              aria-label="Go to Nature UI Discord page"
              href={siteConfig.discord.url}
              target="_blank"
            >
              <IconButton
                className="text-gray-500 hover:text-gray-75 transition-colors duration-150"
                size="xs"
                icon={<DiscordIcon />}
              />
            </Link>
          </div>
          <MobileNavButton
            ref={mobileNavBtnRef}
            aria-label="Open Menu"
            onClick={mobileNav.onOpen}
          />
        </div>
      </nav>

      <MobileNaveContent
        isOpen={mobileNav.isOpen}
        onClose={mobileNav.onClose}
      />
    </header>
  );
};

const Header = () => {
  return <HeaderContent />;
};

export default Header;
