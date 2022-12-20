import { Box, BoxProps, nature } from "@nature-ui/core";

export default function TocNav({ children, title, ...rest }: BoxProps) {
  return (
    <Box
      as="nav"
      aria-labelledby="toc-title"
      // className="w-[16rem] shrink-0 hidden xl:block sticky py-10 pr-4 top-[6rem] right-0 text-sm self-start max-h-[calc(100vh - 8rem)]"
      className="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 overflow-y-auto hidden xl:block"
      {...rest}
    >
      {title && (
        <nature.h2
          id="toc-title"
          className="uppercase font-bold text-xs text-gray-700"
        >
          {title}
        </nature.h2>
      )}
      {children}
    </Box>
  );
}
