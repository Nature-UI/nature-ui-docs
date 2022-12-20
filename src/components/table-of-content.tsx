import { BoxProps, clsx, nature } from "@nature-ui/core";
import { useScrollSpy } from "hooks/use-scrollspy";
import type { FrontmatterHeading } from "src/types/frontmatter";
import TocNav from "./toc-nav";

interface TableOfContentProps extends BoxProps {
  headings: FrontmatterHeading[];
}

function TableOfContent(props: TableOfContentProps) {
  const { headings, ...rest } = props;
  const activeId = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    {
      rootMargin: "0% 0% -50% 0%",
    }
  );

  return (
    <TocNav title="On this page" {...rest}>
      <nature.ol className="space-y-1 space-x-1 ml-0 mt-4">
        {headings.map(({ id, text, level }) => (
          <nature.li
            key={id}
            className={clsx({
              ["!ml-4"]: level === "h3",
              ["!ml-0"]: level !== "h3",
            })}
          >
            <nature.a
              href={`#${id}`}
              className={clsx("py-1 block text-sm", {
                ["font-bold text-primary-600"]: id === activeId,
                ["font-medium"]: id !== activeId,
              })}
              aria-current={id === activeId ? "location" : undefined}
            >
              {text}
            </nature.a>
          </nature.li>
        ))}
      </nature.ol>
    </TocNav>
  );
}

export default TableOfContent;
