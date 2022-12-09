import { Alert, Box, Divider, nature } from "@nature-ui/core";
import { Anchor } from "./anchor";
import { CodeBlock } from "./codeblock";
import { LinkedHeading } from "./linked-heading";
import { Table, TData, THead } from "./table";

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
  code: (props) => <nature.code className="text-accent-600 " {...props} />,
  pre: CodeBlock,
  br: (props) => <Box height="24px" {...props} />,
  table: Table,
  th: THead,
  td: TData,
  a: Anchor,
  p: (props) => <nature.p className="mt-5 leading-7" {...props} />,
  ul: (props) => <nature.ul className="mt-7 ml-7" {...props} />,
  ol: (props) => <nature.ol {...props} />,
  li: (props) => <nature.li className="pb-1 list-disc" {...props} />,
  blockquote: (props) => (
    <Alert
      className="mt-4 rounded-md my-6"
      role="none"
      status="warning"
      variant="left-accent"
      as="blockquote"
      {...props}
    />
  ),
};
