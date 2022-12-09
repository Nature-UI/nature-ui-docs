import { MDXComponents } from "components/mdx-components";
import ComponentDocsLayout from "layouts/component";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import {
  getComponentMDXData,
  getDocByType,
  getDocDoc,
} from "utils/contentlayer-utils";
import { uniq } from "utils/js-utils";

export default function Page({
  doc,
  tabsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(doc?.body?.code);
  return (
    <ComponentDocsLayout frontmatter={doc?.frontmatter} mdxData={tabsData}>
      <Component components={MDXComponents} />
    </ComponentDocsLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = uniq(
    getDocByType("components").flatMap((doc) => [
      doc.slug,
      `/${doc._raw.sourceFileDir}`,
    ])
  );
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const tabsData = getComponentMDXData(["components", ctx.params.slug]);
  return {
    props: {
      doc: getDocDoc(["components", ctx.params.slug]),
      tabsData,
    },
  };
};
