import { Box, nature } from "@nature-ui/core";
import { Search } from "components/algolia-search";
import { useRouter } from "next/router";
import { RouteItem, Routes } from "utils/get-route-context";

import { Fragment, useRef } from "react";
import { NavLinks } from "./nav-links";
import SidebarCategory from "./sidebar-category";
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
    <div>
      {routes.map((lvl1, idx) => {
        return (
          <Fragment key={String(idx)}>
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
          </Fragment>
        );
      })}
    </div>
  );
}

const MainNavLinkGroup = () => {
  return (
    <>
      <div className="sticky top-0 -ml-0.5 pointer-events-none">
        <div className="h-10 bg-white"></div>
        <div className="bg-white relative pointer-events-auto">
          <Search />
        </div>
        <div className="h-8 bg-gradient-to-b from-white"></div>
      </div>
      <NavLinks className="mb-10" />
    </>
  );
};

const Sidebar = ({ routes }) => {
  const { pathname } = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Box
        ref={ref}
        as="nav"
        aria-label="Main Navigation"
        className="hidden lg:block fixed z-5 inset-0 top-[4.5rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto"
      >
        <MainNavLinkGroup />
        <SidebarContent routes={routes} pathname={pathname} contentRef={ref} />
      </Box>
    </>
  );
};

export default Sidebar;
