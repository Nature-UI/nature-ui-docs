import { Box } from "@nature-ui/core";
import { useState } from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { CodeContainer } from "./code-container";
import { CopyButton } from "./copy-button";
import { EditableNotice } from "./editable-notice";
import { reactLiveScope } from "./react-live-scope";
import { liveEditorStyle, liveErrorStyle } from "./styles";

const LiveCodePreview = ({ className, ...props }: any) => (
  <LivePreview
    className={`mt-5 p-3 border border-solid border-gray-200 rounded-lg overflow-x-auto editor__component ${className}`}
    {...props}
  />
);

interface ReactLiveBlockProps {
  editable: boolean;
  noInline: boolean;
  rawCode: string;
}

const ReactLiveBlock: React.FC<ReactLiveBlockProps> = (props) => {
  const { rawCode, editable, ...rest } = props;
  const [editorCode, setEditorCode] = useState(rawCode.trim());
  const onChange = (newCode) => setEditorCode(newCode.trim());

  const liveProviderProps = {
    code: editorCode,
    scope: reactLiveScope,
    ...rest,
  };

  return (
    <LiveProvider {...liveProviderProps}>
      <LiveCodePreview className="z-10" />
      <Box className="relative z-0">
        <CodeContainer>
          <LiveEditor onChange={onChange} style={liveEditorStyle} />
        </CodeContainer>
        <CopyButton code={editorCode} />
        {editable && <EditableNotice />}
      </Box>
      {editable && <LiveError style={liveErrorStyle} />}
    </LiveProvider>
  );
};

export default ReactLiveBlock;
