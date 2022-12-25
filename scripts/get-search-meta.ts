import {
  fileToPath,
  parseFrontMatter,
  posixPath,
  removePrefix,
} from "@docusaurus/utils";
import fs from "fs";
import toc from "markdown-toc";
import { nanoid } from "nanoid";
import path from "path";
import prettier from "prettier";
import shell from "shelljs";

declare module "markdown-toc";

interface ResultType {
  content: string;
  id: string;
  url: string;
  type: "lvl1" | "lvl2" | "lvl3";
  hierarchy: {
    lvl1: string | null;
    lvl2?: string | null;
    lvl3?: string | null;
  };
}

interface TOCResultItem {
  content: string;
  slug: string;
  lvl: 1 | 2 | 3;
  i: number;
  seen: number;
}

const websiteRoot = "content";
const processCWD = posixPath(process.cwd());

function getMDXMeta(file: string) {
  const filePath = posixPath(file);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { content, frontMatter: frontmatter } = parseFrontMatter(
    fileContent
  ) as {
    content: string;
    frontMatter: Record<string, any>;
  };
  const tableOfContent = toc(content);
  const json = tableOfContent.json as TOCResultItem[];
  const slug = fileToPath(filePath)
    .replace(`/${websiteRoot}`, "")
    .replace(processCWD, "");

  const result: ResultType[] = [];

  result.push({
    content: frontmatter.title as string,
    id: nanoid(),
    type: "lvl1",
    url: removePrefix(slug, "/"),
    hierarchy: {
      lvl1: frontmatter.title as string,
    },
  });

  json.forEach((item, index) => {
    result.push({
      content: item.content,
      id: nanoid(),
      type: `lvl${item.lvl}` as any,
      url: removePrefix(slug, "/") + `#${item.slug}`,
      hierarchy: {
        lvl1: frontmatter.title,
        lvl2: item.lvl === 2 ? item.content : json[index - 1]?.content ?? null,
        lvl3: item.lvl === 3 ? item.content : null,
      },
    });
  });

  return result;
}

function getSearchMeta() {
  let json: any = [];

  const files = shell
    .ls("-R", websiteRoot)
    .map((file: string) => path.join(process.cwd(), websiteRoot, file))
    .filter((file: string) => file.endsWith(".mdx"));

  /**
   * File paths to not be included in the search meta.
   *
   * In the future we are going to include a `tutorial` section
   */
  const excludedSlugs = ["/tutorial"];

  for (const file of files) {
    let result: any[] = [];

    // Windows OS: ensure file paths have forward slashes.
    const fileToPosixPath = posixPath(file);

    const isExcluded = !!excludedSlugs.find((excludedSlug) =>
      fileToPosixPath.includes(excludedSlug)
    );

    try {
      result = isExcluded ? [] : getMDXMeta(file);
      json.push(...result);
    } catch (error) {
      console.error(error);
    }
  }

  json = prettier.format(JSON.stringify(json), { parser: "json" });
  const outPath = path.join(processCWD, "configs", "search-meta.json");
  fs.writeFileSync(outPath, json);
  console.log("Search meta is ready ✅");
}
