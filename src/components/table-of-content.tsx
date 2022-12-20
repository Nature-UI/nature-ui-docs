import { BoxProps, nature } from "@nature-ui/core";
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
      rootMargin: "0% 0% -24% 0%",
    }
  );

  return (
    <TocNav title="On this page" {...rest}>
      <nature.ol spacing={1} ml="0" mt="4" styleType="none">
        {headings.map(({ id, text, level }) => (
          <nature.li
            key={id}
            title={text}
            ml={level === "h3" ? "4" : undefined}
          >
            <nature.a
              py="1"
              display="block"
              fontWeight={id === activeId ? "bold" : "medium"}
              href={`#${id}`}
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
