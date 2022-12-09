import { HTMLNatureProps, nature } from "@nature-ui/core";
import { cx } from "@nature-ui/utils";
import { useState } from "react";

export const LinkedHeading = (props: HTMLNatureProps<"h2">) => {
  const { children, id } = props;
  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover(!hover);
  };

  return (
    <nature.h2
      data-group=""
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      css={{ scrollMarginBlock: "6.875rem" }}
      {...props}
    >
      <span>{children}</span>
      {id && (
        <nature.a
          aria-label="anchor"
          href={`#${id}`}
          className={cx(
            "text-primary-500 focus:opacity-100 focus:shadow-outline opacity-0 ml-2 outline-none hover:opacity-100 rounded-md",
            {
              "opacity-100": hover,
            }
          )}
        >
          #
        </nature.a>
      )}
    </nature.h2>
  );
};
