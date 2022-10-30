import {
	ComputedFields,
	defineDocumentType,
	makeSource,
} from 'contentlayer/source-files';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import { getTableOfContents } from 'utils/get-table-of-contents';
import { rehypeMdxCodeMeta } from 'utils/rehype-code-meta';
// import siteConfig from './config'

const computedFields: ComputedFields = {
	slug: {
		type: 'string',
		resolve: (doc) => `/${doc._raw.flattenedPath}`,
	},
};

const Doc = defineDocumentType(() => ({
	name: 'Doc',
	filePathPattern: 'docs/**/*.mdx',
	contentType: 'mdx',
	fields: {
		title: { type: 'string' },
		package: { type: 'string' },
		description: { type: 'string' },
		id: { type: 'string' },
		scope: {
			type: 'enum',
			options: ['usage', 'props'],
			default: 'usage',
		},
		version: {
			type: 'string',
		},
		author: {
			type: 'string',
		},
		video: {
			type: 'string',
		},
		category: {
			type: 'string',
		},
		aria: {
			type: 'string',
		},
	},
	computedFields: {
		...computedFields,
		frontMatter: {
			type: 'json',
			resolve: (doc) => ({
				type: doc.title,
				package: doc.package,
				description: doc.description,
				version: doc.version,
				slug: `${doc.raw.flattenedPath}`,
				headings: getTableOfContents(doc.body.raw),
			}),
		},
	},
}));

export default makeSource({
	contentDirPath: 'content',
	documentTypes: [Doc],
	mdx: {
		rehypePlugins: [rehypeMdxCodeMeta],
		remarkPlugins: [remarkEmoji, remarkGfm, remarkSlug],
	},
});
