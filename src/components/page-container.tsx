import { Badge, Box } from "@nature-ui/core";
import { useRouter } from "next/router";
import * as React from "react";

import { EditPageLink } from "components/edit-page-button";
import { SEO } from "components/seo";
import { FrontmatterHeading } from "src/types/frontmatter";
import Footer from "./footer";
import Header from "./header";
import PageTransition from "./page-transition";
import TableOfContent from "./table-of-content";

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

  const { title, description, editUrl, version, headings = [] } = frontmatter;

  return (
    <>
      <SEO title={title} description={description} />
      <Header />
      <Box className="bg-white max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
        {leftSidebar || null}
        <Box className="lg:pl-[19.5rem]">
          <Box
            id="content"
            className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16 min-h-[75vh]"
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
            {!hideToc && (
              <TableOfContent
                visibility={headings.length === 0 ? "hidden" : "initial"}
                headings={headings}
              />
            )}
            {rightSidebar}
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
}

export default PageContainer;
