import { nature } from "@nature-ui/core";
import BaseHighlight, { defaultProps, Language } from "prism-react-renderer";
import nightOwlTheme from "prism-react-renderer/themes/nightOwl";
import { FC } from "react";
import { liveEditorStyle } from "./styles";

const RE = /{([\d,-]+)}/;

const calculateLinesToHighlight = (meta: string | undefined) => {
  if (!meta || !RE.test(meta)) {
    return () => false;
  }

  const lineNumbers = RE.exec(meta)?.[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)));

  if (!lineNumbers) {
    return () => false;
  }

  return (index: number) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    );
    return inRange;
  };
};

interface HighlightProps {
  codeString: string;
  language: Language;
  metaString?: string;
  showLines?: boolean;
}

export const Highlight: FC<HighlightProps> = ({
  codeString,
  language,
  metaString,
  showLines,
  ...props
}) => {
  const shouldHighlightLine = calculateLinesToHighlight(metaString);
  return (
    <BaseHighlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={nightOwlTheme}
      {...props}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div style={liveEditorStyle} data-language={language}>
          <pre className={className} style={style}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              return (
                <nature.div
                  key={i}
                  {...lineProps}
                  className={`px-5 ${
                    shouldHighlightLine(i) && "bg-primary-200 bg-opacity-40"
                  }`}
                >
                  {showLines && (
                    <nature.span className="opacity-30 mr-6 text-xs">
                      {i + 1}
                    </nature.span>
                  )}
                  {line.map((token, key) => (
                    <nature.span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </nature.div>
              );
            })}
          </pre>
        </div>
      )}
    </BaseHighlight>
  );
};
