import { BoxProps, clsx, nature, Stack } from "@nature-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FaTools } from "react-icons/fa";

import { FC } from "react";
import { DocsIcon, DocumentationIcon } from "./sidebar-icons";

const MainNavLink = ({ href, icon: NavIcon, children, isActive }) => {
  const router = useRouter();
  const active = router.asPath.startsWith(href) || !!isActive;

  return (
    <NextLink href={href} passHref>
      <nature.a
        className={clsx(
          "flex items-center transition-colors duration-200 text-gray-500 hover:text-gray-75",
          {
            "text-primary-700 font-semibold": active,
          }
        )}
      >
        <nature.div
          className={clsx(
            `flex items-center justify-center w-6 h-6 border-gray-300 border-[1.5px] rounded-md mr-3 text-primary-400 overflow-hidden`,
            {
              "border-primary-500 ": active,
            }
          )}
        >
          <NavIcon />
        </nature.div>
        {children}
      </nature.a>
    </NextLink>
  );
};

export const mainNavLinks = [
  {
    icon: DocsIcon,
    href: "/getting-started",
    label: "Getting started",
  },
  {
    icon: DocumentationIcon,
    href: "/docs/components/box",
    label: "Components",
    match: (asPath: string, href: string) =>
      href.startsWith("/docs/components") &&
      asPath.startsWith("/docs/components"),
  },
  {
    icon: FaTools,
    href: "/docs/hooks/use-boolean",
    label: "Hooks",
    match: (asPath: string, href: string) =>
      href.startsWith("/docs/hooks") && asPath.startsWith("/docs/hooks"),
  },
];

export const NavLinks: FC<BoxProps> = (props) => {
  const router = useRouter();
  return (
    <Stack {...props} col className="items-stretch" spacing="1rem" as="ul">
      {mainNavLinks.map((item) => (
        <nature.li className="list-none" key={item.label}>
          <MainNavLink
            icon={item.icon}
            href={item.href}
            isActive={item.match?.(router.asPath, item.href)}
          >
            {item.label}
          </MainNavLink>
        </nature.li>
      ))}
    </Stack>
  );
};
