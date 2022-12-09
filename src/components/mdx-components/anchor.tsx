import { HTMLNatureProps, nature } from "@nature-ui/core";
import { forwardRef, Ref } from "react";

export const Anchor = forwardRef(
  (props: HTMLNatureProps<"a">, ref: Ref<HTMLAnchorElement>) => (
    <nature.a
      {...props}
      ref={ref}
      className="text-primary-500 hover:underline"
    />
  )
);

Anchor.displayName = "Anchor";
