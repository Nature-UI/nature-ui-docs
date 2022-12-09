import { Box, BoxProps } from "@nature-ui/core";
import React from "react";

export const EditableNotice: React.FC<BoxProps> = (props) => {
  return (
    <Box
      className="absolute w-full rounded-t-lg py-2 z-0 text-gray-400 text-xs font-semibold text-center uppercase pointer-events-none editor__component"
      css={{
        top: "-1.25em",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        backgroundColor: "#011627",
      }}
      {...props}
    >
      Editable Example
    </Box>
  );
};
