import { Box, Stack } from "@nature-ui/core";
import { isEmptyObject } from "@nature-ui/utils";
import { MDXComponents } from "components/mdx-components";
import { Doc } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { MDXData } from "utils/contentlayer-utils";
import MDXLayout from "./mdx";

function MDXContent({ doc }: { doc: Doc | undefined }) {
  const Component = useMDXComponent(doc?.body?.code ?? "");
  return <Component components={MDXComponents} />;
}

export default function ComponentDocsLayout({
  children,
  frontmatter,
  mdxData: tabsData,
}: {
  children: React.ReactNode;
  frontmatter: any;
  mdxData?: MDXData;
}) {
  const id = frontmatter.package?.split("/").pop();

  return (
    <MDXLayout frontmatter={frontmatter}>
      {id && (
        <Stack spacing="5">
          <MDXComponents.p>{frontmatter.description}</MDXComponents.p>
        </Stack>
      )}

      {
        <Box id={tabsData.id} hidden={!tabsData.match}>
          {isEmptyObject(tabsData) ? (
            children
          ) : (
            <MDXContent doc={tabsData.doc} />
          )}
        </Box>
      }
    </MDXLayout>
  );
}
