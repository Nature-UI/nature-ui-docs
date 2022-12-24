import { Alert, Box, Divider, nature } from "@nature-ui/core";
import { Anchor } from "./anchor";
import { CodeBlock } from "./codeblock";
import { LinkedHeading } from "./linked-heading";
import { TData, THead, Table } from "./table";

export const MDXComponents = {
  h1: (props) => (
    <nature.h1 className="font-black text-4xl leading-5" {...props} />
  ),
  h2: (props) => (
    <LinkedHeading
      className="font-bold text-3xl mt-16 mb-2 leading-5"
      {...props}
    />
  ),
  h3: (props) => (
    <LinkedHeading className="text-2xl font-semibold mt-6" as="h3" {...props} />
  ),
  h4: (props) => <LinkedHeading as="h4" {...props} />,
  hr: (props) => <Divider {...props} />,
  strong: (props) => <Box as="strong" className="font-medium " {...props} />,
  code: (props) => <nature.code className="text-orange-600 " {...props} />,
  pre: CodeBlock,
  br: (props) => <Box height="24px" {...props} />,
  table: Table,
  th: THead,
  td: TData,
  a: Anchor,
  p: (props) => <nature.p className="leading-7" {...props} />,
  ul: (props) => <nature.ul className="mt-2 ml-6" {...props} />,
  ol: (props) => <nature.ol className="mt-2 ml-6" {...props} />,
  li: (props) => <nature.li className="pb-1 list-disc" {...props} />,
  blockquote: (props) => (
    <Alert
      className="rounded my-6 p-4"
      role="none"
      status="warning"
      variant="left-accent"
      as="blockquote"
      {...props}
    />
  ),
};
