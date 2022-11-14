import { allDocs, Doc } from 'contentlayer/generated';
import { MixedArray, toArray, uniq } from './js-utils';

export function getDocByType(id: string) {
	return allDocs.filter((doc) => doc.slug.startsWith(`/docs/${id}`));
}

function toCapitalized(str: string) {
	const result = str.charAt(0).toUpperCase() + str.slice(1);
	return result.replace(/-/g, ' ');
}

export function getGroupedComponents() {
	return getDocByType('components').reduce((acc, doc) => {
		const category = doc.category;
		if (!category) return acc;
		acc[toCapitalized(category)] ??= [];
		acc[toCapitalized(category)].push(doc);
		return acc;
	}, {} as { [key: string]: any[] });
}

const getUsageDoc = (id: string) => {
	return allDocs.find((_doc) => _doc.id === id && _doc.scope === 'usage');
};

export const getDocDoc = (slug: MixedArray): Doc | undefined => {
	const params = toArray(slug);
	const _slug = params.join('/');
	const doc = allDocs.find(
		(doc) => doc.slug.endsWith(_slug) || doc.slug.endsWith(`${_slug}/usage`)
	) as Doc | undefined;

	if (!doc) return;

	// the presence of scope, means its a component documentation
	if (doc.scope && doc.scope !== 'usage') {
		doc.frontmatter = {
			...doc.frontmatter,
			...(getUsageDoc(doc.id)?.frontmatter ?? {}),
		};
	}

	return doc;
};

export type TabsData = ReturnType<typeof getComponentTabsData>;

export function getComponentTabsData(slug: MixedArray) {
	const params = toArray(slug);
	const _slug = params.join('/');

	const getSlug = (id: string) => {
		const res = uniq([...params, id]);
		if (res.length > 3) res.splice(2, 1);
		return res;
	};

	const usageSlug = getSlug('usage');

	const data = [
		{
			id: 'usage',
			match: _slug.endsWith('/usage') || params.length === 2,
			href: { query: { slug: usageSlug.slice(1) } },
			label: 'Usage',
			doc: getDocDoc(usageSlug),
		},
	];
	return data.filter((item) => item.doc);
}
