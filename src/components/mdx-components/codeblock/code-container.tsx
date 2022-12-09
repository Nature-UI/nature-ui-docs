import { Box, HTMLNatureProps } from "@nature-ui/core";
import React from "react";

export const CodeContainer: React.FC<HTMLNatureProps<"div">> = ({
  className,
  ...props
}) => (
  <Box
    className={`p-3 rounded-lg my-8 editor__component ${className}`}
    css={{ backgroundColor: "#011627" }}
    {...props}
  />
);
