import { Button, ButtonProps, useClipboard } from "@nature-ui/core";
import { FC } from "react";

interface CopyButtonProps extends ButtonProps {
  code: string;
}

export const CopyButton: FC<CopyButtonProps> = ({ code, ...props }) => {
  const { copied, onCopy } = useClipboard(code);
  return (
    <Button
      {...props}
      size="xs"
      color="primary-600"
      className={`uppercase text-xs h-6 top-0 right-5 z-10 bg-primary-600 text-gray-100 ${props.className}`}
      css={{ position: "absolute" }}
      onClick={onCopy}
    >
      {copied ? "copied" : "copy"}
    </Button>
  );
};
