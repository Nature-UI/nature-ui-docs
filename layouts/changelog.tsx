import PageContainer from "components/page-container";
import { Pagination } from "components/pagination";
import Sidebar from "components/sidebar/sidebar";
import { Frontmatter } from "types/frontmatter";
import { findRouteByPath, removeFromLast } from "utils/find-route-by-path";
import { getRouteContext } from "utils/get-route-context";
import { getRoutes } from "utils/get-routes";

interface MDXLayoutProps {
  frontmatter: Frontmatter;
  children: React.ReactNode;
  hideToc?: boolean;
}

const ChangelogLayout: React.FC<MDXLayoutProps> = (props) => {
  const { frontmatter, children, hideToc } = props;
  const routes = getRoutes(frontmatter.slug);

  const route = findRouteByPath(routes, removeFromLast("#", frontmatter.slug));
  const routeContext = getRouteContext(routes, route);

  return (
    <PageContainer
      hideToc={true}
      leftSidebar={<Sidebar routes={routes} />}
      frontmatter={frontmatter}
      pagination={
        <Pagination
          next={routeContext.nextRoute}
          previous={routeContext.prevRoute}
        />
      }
    >
      {children}
    </PageContainer>
  );
};

export default ChangelogLayout;
