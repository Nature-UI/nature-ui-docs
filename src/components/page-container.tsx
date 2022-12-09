import { Badge, Box } from "@nature-ui/core";
import { useRouter } from "next/router";
import * as React from "react";

import { EditPageLink } from "components/edit-page-button";
import { SEO } from "components/seo";
import { FrontmatterHeading } from "src/types/frontmatter";
import Footer from "./footer";
import Header from "./header";
import PageTransition from "./page-transition";

function useHeadingFocusOnRouteChange() {
  const router = useRouter();

  React.useEffect(() => {
    const onRouteChange = () => {
      const [heading] = Array.from(document.getElementsByTagName("h1"));
      heading?.focus();
    };
    router.events.on("routeChangeComplete", onRouteChange);
    return () => {
      router.events.off("routeChangeComplete", onRouteChange);
    };
  }, [router.events]);
}

interface PageContainerProps {
  frontmatter: {
    slug?: string;
    title: string;
    description?: string;
    editUrl?: string;
    version?: string;
    headings?: FrontmatterHeading[];
  };
  hideToc?: boolean;
  children: React.ReactNode;
  leftSidebar?: React.ReactElement;
  rightSidebar?: React.ReactElement;
  pagination?: any;
}

function PageContainer(props: PageContainerProps) {
  const {
    frontmatter,
    children,
    leftSidebar,
    rightSidebar,
    pagination,
    hideToc,
  } = props;
  useHeadingFocusOnRouteChange();

  const { title, description, editUrl, version } = frontmatter;

  return (
    <>
      <SEO title={title} description={description} />
      <Header />
      <Box className="bg-white h-full">
        <Box centered className="flex max-w-screen-lg mx-auto">
          {leftSidebar || null}
          <Box className="flex-1 w-screen">
            <Box
              id="content"
              className="pt-3 px-5 mt:10 md:mt-16 mx-auto max-w-3xl bg-white"
              css={{
                minHeight: "76vh",
              }}
            >
              <PageTransition>
                <h1 className="outline-none text-4xl font-black mt-8 mb-1">
                  {title}
                </h1>
                {version && <Badge color="teal-500">v{version}</Badge>}
                {children}
              </PageTransition>
              <Box className="mt-14">
                {editUrl && <EditPageLink href={editUrl} />}
              </Box>
              {pagination || null}
            </Box>
            <Footer />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PageContainer;
