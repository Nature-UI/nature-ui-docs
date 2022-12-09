import {
  Box,
  BoxProps,
  Button,
  CloseButton,
  clsx,
  IconButton,
  IconButtonProps,
  Stack,
  useUpdateEffect,
} from "@nature-ui/core";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { RemoveScroll } from "react-remove-scroll";

import siteConfig from "configs/site-config";
import { useRouteChanged } from "hooks/use-route-change";
import { getRoutes } from "utils/get-routes";

import { AiOutlineMenu } from "react-icons/ai";
import { GithubIcon, Logo } from "./icons";
import { SidebarContent } from "./sidebar";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const { pathname } = useRouter();

  const [, group] = href.split("/");
  const isActive = pathname.includes(group);

  return (
    <Link href={href}>
      <Button
        className={clsx("transition-all duration-200", {
          "font-semibold flex-1": isActive,
        })}
        css={{
          flex: "1 1 0%",
        }}
        color={isActive ? "primary-700" : "gray-500"}
        variant={isActive ? "solid" : "outline"}
      >
        {children}
      </Button>
    </Link>
  );
};

const ScrollView = (props: BoxProps & { onScroll?: any }) => {
  const { onScroll, ...rest } = props;
  const [y, setY] = React.useState(0);
  const elRef = React.useRef<any>();
  const { scrollY } = useScroll({ container: elRef });
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  useUpdateEffect(() => {
    onScroll?.(y > 5);
  }, [y]);

  return (
    <Box
      ref={elRef}
      className="overflow-auto px-6 mb-6 flex-1"
      id="routes"
      {...rest}
    />
  );
};

interface MobileNavContentProps {
  isOpen?: boolean;
  onClose: () => void;
}

export const MobileNaveContent: React.FC<MobileNavContentProps> = (props) => {
  const { isOpen, onClose } = props;
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const { pathname } = useRouter();

  useRouteChanged(onClose);

  useUpdateEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
    }
  }, [isOpen]);

  const [shadow, setShadow] = React.useState<string>();

  return (
    <AnimatePresence>
      {isOpen && (
        <RemoveScroll forwardProps>
          <motion.nav
            className="h-screen absolute top-0 left-0 w-full mt-3 bg-white z-10 flex flex-col overflow-auto pb-8"
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0, x: -500 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -500 }}
          >
            <Box className="h-screen absolute top-0 left-0 w-full bg-white z-10 flex flex-col overflow-auto pb-8">
              <Box>
                <Box className="px-4">
                  <Stack row className="items-center">
                    <Logo />
                    <CloseButton
                      ref={closeBtnRef}
                      className="ml-auto"
                      onClick={onClose}
                    />
                  </Stack>
                </Box>
                <Box className={`px-6 mt-6 pb-4 shadow-${shadow}`}>
                  <Stack row spacing="8px">
                    <NavLink href="/docs/getting-started">Docs</NavLink>
                  </Stack>
                </Box>
              </Box>

              <ScrollView
                onScroll={(scrolled) => {
                  setShadow(scrolled ? "md" : undefined);
                }}
              >
                <SidebarContent
                  pathname={pathname}
                  routes={getRoutes(pathname)}
                />
              </ScrollView>
            </Box>
          </motion.nav>
        </RemoveScroll>
      )}
    </AnimatePresence>
  );
};

export const MobileNavButton = React.forwardRef(
  (props: IconButtonProps, ref: React.Ref<any>) => {
    return (
      <div className="md:hidden justify-end flex items-center">
        <Link
          aria-label="Go to Nature UI GitHub page"
          href={siteConfig.repo.url}
          target="_blank"
        >
          <IconButton
            className="md:hidden text-gray-500 hover:text-gray-75 transition-colors duration-150"
            size="lg"
            icon={<GithubIcon />}
          />
        </Link>
        <IconButton
          className="md:hidden text-xl  ml-3"
          ref={ref}
          css={{
            paddingLeft: "5px !important",
            paddingRight: "5px !important",
          }}
          aria-label="Open menu"
          color="gray-800"
          variant="ghost"
          icon={<AiOutlineMenu />}
          {...props}
        />
      </div>
    );
  }
);

MobileNavButton.displayName = "MobileNavButton";
