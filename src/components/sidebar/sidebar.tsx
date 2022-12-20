/** ** */
import { Box, BoxProps, clsx, nature, Stack } from "@nature-ui/core";
import { Search } from "components/algolia-search";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { FaTools } from "react-icons/fa";
import { RouteItem, Routes } from "utils/get-route-context";

import SidebarCategory from "./sidebar-category";
import { DocsIcon, DocumentationIcon } from "./sidebar-icons";
import SidebarLink from "./sidebar-link";

const sortRoutes = (routes: RouteItem[]) => {
  return routes.sort(({ title: titleA }, { title: titleB }) => {
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
  });
};

export type SidebarContentProps = Routes & {
  pathname?: string;
  contentRef?: any;
};

export function SidebarContent(props: SidebarContentProps) {
  const { routes, pathname, contentRef } = props;
  return (
    <>
      {routes.map((lvl1, idx) => {
        return (
          <React.Fragment key={String(idx)}>
            {lvl1.heading && (
              <nature.h4 className="text-sm font-bold my-5 uppercase text-gray-600">
                {lvl1.title}
              </nature.h4>
            )}

            {lvl1.routes.map((lvl2, index) => {
              if (!lvl2.routes) {
                return (
                  <SidebarLink
                    className="mt-3"
                    key={lvl2.path}
                    href={lvl2.path}
                  >
                    {lvl2.title}
                  </SidebarLink>
                );
              }

              const selected = pathname.startsWith(lvl2.path);
              const opened = selected || lvl2.open;

              const sortedRoutes = lvl2.sort
                ? sortRoutes(lvl2.routes)
                : lvl2.routes;

              return (
                <SidebarCategory
                  contentRef={contentRef}
                  key={String(lvl2.path + index)}
                  title={lvl2.title}
                  selected={selected}
                  opened={opened}
                >
                  <nature.ul className="space-y-6 lg:space-y-2 border-l border-slate-200">
                    {sortedRoutes.map((lvl3) => (
                      <SidebarLink
                        as="li"
                        className="mt-2"
                        key={lvl3.path}
                        href={lvl3.path}
                      >
                        {lvl3.title}
                      </SidebarLink>
                    ))}
                  </nature.ul>
                </SidebarCategory>
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
}

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
        <nature.div className="flex items-center justify-center w-6 h-6 border-primary-300 border rounded-md mr-3 text-primary-400 overflow-hidden">
          <NavIcon
            className={clsx({
              "bg-primary-500": active,
            })}
          />
        </nature.div>
        {children}
      </nature.a>
    </NextLink>
  );
};

const mainNavLinks = [
  {
    icon: DocsIcon,
    href: "/getting-started",
    label: "Getting started",
  },
  {
    icon: DocumentationIcon,
    href: "/docs/components/box",
    label: "Components",
  },
  {
    icon: FaTools,
    href: "/docs/hooks/use-boolean",
    label: "Hooks",
    match: (asPath: string, href: string) =>
      href.startsWith("/docs/hooks") && asPath.startsWith("/docs/hooks"),
  },
];

const MainNavLinkGroup = (props: BoxProps) => {
  const router = useRouter();
  return (
    <>
      <div className="sticky top-0 -ml-0.5 pointer-events-none">
        <div className="h-10 bg-white"></div>
        <div className="bg-white relative pointer-events-auto">
          <Search />
        </div>
        <div className="h-8 bg-gradient-to-b from-white"></div>
      </div>
      <Stack col className="items-stretch" spacing="1rem" {...props}>
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
    </>
  );
};

const Sidebar = ({ routes }) => {
  const { pathname } = useRouter();
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <Box
        ref={ref}
        as="nav"
        aria-label="Main Navigation"
        className="fixed top-[4.2rem] left-[max(0px,calc(50%-45rem))] w-[19.5rem] px-8 pb-12 right-auto hidden md:block overflow-y-auto h-full"
      >
        <MainNavLinkGroup className="mb-10" />
        <SidebarContent routes={routes} pathname={pathname} contentRef={ref} />
      </Box>
    </>
  );
};

export default Sidebar;
