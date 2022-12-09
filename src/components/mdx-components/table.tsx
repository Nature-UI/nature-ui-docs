import { HTMLNatureProps, nature } from "@nature-ui/core";

export const Table = (props: HTMLNatureProps<"table">) => (
  <nature.div className="overflow-x-hidden">
    <nature.table
      className="text-left mt-8 w-full overflow-x-auto"
      {...props}
    />
  </nature.div>
);

export const THead = (props: HTMLNatureProps<"th">) => (
  <nature.th
    className="bg-gray-25 bg-opacity-10 p-2 font-semibold text-sm "
    {...props}
  />
);

export const TData = (props: HTMLNatureProps<"td">) => (
  <nature.td
    className="p-2 border-t text-sm whitespace-normal"
    css={{ borderColor: "inherit" }}
    {...props}
  />
);
