import { clsx, nature, PropsOf } from "@nature-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

const StyledLink = React.forwardRef(function StyledLink(
  props: PropsOf<typeof nature.a> & { isActive?: boolean },
  ref: React.Ref<any>
) {
  const { isActive, ...rest } = props;

  return (
    <nature.a
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        "block border-l pl-4 py-2 -ml-px border-transparent hover:border-slate-400 text-slate-700 hover:text-slate-900",
        {
          "font-semibold border-current text-primary-700": isActive,
        }
      )}
      rounded="md"
      ref={ref}
      {...rest}
    />
  );
});

function checkHref(href: string, slug: string | string[]) {
  const _slug = Array.isArray(slug) ? slug : [slug];
  const path = href.split("/");
  const pathSlug = path[path.length - 1];
  return _slug.includes(pathSlug);
}

type SidebarLinkProps = PropsOf<typeof nature.div> & {
  href?: string;
  icon?: React.ReactElement;
};

const SidebarLink = (props: SidebarLinkProps) => {
  const { href, icon, children, className, ...rest } = props;

  const router = useRouter();
  const isActive = checkHref(href, router.query.slug) || href === router.asPath;

  return (
    <nature.div
      className={`select-none flex items-center leading-6 ${className}`}
      {...rest}
    >
      <NextLink href={href} passHref>
        <StyledLink isActive={isActive}>{children}</StyledLink>
      </NextLink>
    </nature.div>
  );
};

export default SidebarLink;
