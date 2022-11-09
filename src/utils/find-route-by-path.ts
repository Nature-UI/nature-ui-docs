import { RouteItem } from 'utils/get-route-context';

export const removeFromLast = (key: string, path?: string) => {
	if (!path) return;
	const index = path.lastIndexOf(key);
	return index === -1 ? path : path.substring(0, index);
};

export const findRouteByPath = (
	routes: RouteItem[],
	path?: string
): RouteItem | undefined => {
	for (const route of routes) {
		if (route.path && removeFromLast(route.path, '.') === path) {
			return route;
		}

		const childPath = route.routes && findRouteByPath(route.routes, path);

		if (childPath) {
			return childPath;
		}
	}
};
