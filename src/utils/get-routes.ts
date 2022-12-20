import docsSidebar from "configs/docs-sidebar.json";
import gettingStartedSidebar from "configs/getting-started.sidebar.json";
import hooksSidebar from "configs/hooks.sidebar.json";
import { RouteItem } from "utils/get-route-context";

export const getRoutes = (slug?: string) => {
  const configMap = {
    "/getting-started": gettingStartedSidebar,
    "/docs/components": docsSidebar,
    "/docs/hooks": hooksSidebar,
  };

  const [, sidebar] =
    Object.entries(configMap).find(([path]) => slug.startsWith(path)) ?? [];

  const routes = sidebar?.routes ?? [];
  return routes as RouteItem[];
};
