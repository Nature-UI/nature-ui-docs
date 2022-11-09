import docsSidebar from 'configs/docs-sidebar.json';

export const getRoutes = (slug?: string) => {
	const configMap = {
		'/docs': docsSidebar,
	};

	const [, sidebar] =
		Object.entries(configMap).find(([path]) => slug?.startsWith(path)) ?? [];

	return sidebar?.routes ?? [];
};
