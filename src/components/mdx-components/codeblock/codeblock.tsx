import { Box, useBoolean } from "@nature-ui/core";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { CodeContainer } from "./code-container";
import { CopyButton } from "./copy-button";
import { Highlight } from "./highlight";
import { Pre } from "./pre";

const ReactLiveBlock = dynamic(() => import("./react-live-block"));

const Code = (props) => {
  const [isMounted, { on }] = useBoolean();

  useEffect(on, [on]);
  const {
    className,
    live = true,
    manual,
    render,
    children,
    viewlines,
    ln,
    mountStylesheet = false,
  } = props.children.props;

  const isLive = live === "true" || !!live;
  const language = className?.replace(/language-/, "");
  const rawCode = children.trim();

  const reactLiveBlockProps = {
    rawCode,
    language,
    noInline: manual,
  };

  if (isMounted && language === "jsx" && !!live) {
    return <ReactLiveBlock editable {...reactLiveBlockProps} />;
  }

  if (isMounted && render) {
    return (
      <div style={{ marginTop: 32 }}>
        <ReactLiveBlock editable={false} {...reactLiveBlockProps} />
      </div>
    );
  }

  return (
    <Box className="relative z-0 editor__component">
      <CodeContainer className="p-4 overflow-hidden">
        <Highlight
          codeString={rawCode}
          language={language}
          metaString={ln}
          showLines={viewlines}
        />
      </CodeContainer>
      <CopyButton className="top-4" code={rawCode} />
    </Box>
  );
};

export const CodeBlock = (props) => {
  if (typeof props.children === "string") return <Pre {...props} />;
  return <Code {...props} />;
};
