import { Box, Stack } from '@nature-ui/core';
import { MDXComponents } from 'components/mdx-components';
import { Doc } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { TabsData } from 'utils/contentlayer-utils';
import MDXLayout from './mdx';

function MDXContent({ doc }: { doc: Doc | undefined }) {
	const Component = useMDXComponent(doc?.body?.code ?? '');
	return <Component components={MDXComponents} />;
}

export default function ComponentDocsLayout({
	children,
	frontmatter,
	tabsData,
}: {
	children: React.ReactNode;
	frontmatter: any;
	tabsData?: TabsData;
}) {
	const id = frontmatter.package?.split('/').pop();

	return (
		<MDXLayout frontmatter={frontmatter}>
			{id && (
				<Stack spacing='5'>
					<MDXComponents.p>{frontmatter.description}</MDXComponents.p>
					{/* <MDXComponents.ComponentLinks
            theme={hasTheme && { componentName: id }}
            github={{ package: id }}
            npm={{ package: frontmatter.package }}
          /> */}
					{/* TODO: Add links to npm and github package */}
				</Stack>
			)}

			{tabsData.map((item, index) => (
				<Box
					key={index}
					id={item.id}
					hidden={!tabsData[index].match}
					pt={index === 2 ? 12 : 0}
				>
					{index === 0 ? children : <MDXContent doc={item.doc} />}
				</Box>
			))}
		</MDXLayout>
	);
}
