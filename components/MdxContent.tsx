import { MDXRemote, type MDXComponents, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

type MdxContentProps = {
  source: string;
  components?: MDXComponents;
  commentary?: "ai_draft" | "edited";
};

function toPlainText(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(toPlainText).join("");
  }

  if (value && typeof value === "object" && "props" in value) {
    const element = value as { props?: { children?: unknown } };
    return toPlainText(element.props?.children);
  }

  return "";
}

function headingId(children: unknown) {
  return toPlainText(children)
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

const baseComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2 id={headingId(children)} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
  a: (props) => <a className="font-semibold text-[var(--accent)] underline" {...props} />,
};

const prettyCodeOptions: RehypePrettyCodeOptions = {
  theme: "github-dark",
  keepBackground: false,
  defaultLang: {
    block: "plaintext",
    inline: "plaintext",
  },
};

const options: MDXRemoteOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
};

export default function MdxContent({ source, components, commentary }: MdxContentProps) {
  const mergedComponents: MDXComponents = {
    ...baseComponents,
    ...components,
    h2: ({ children, ...props }) => {
      const title = toPlainText(children).trim();
      const isAiCommentary = commentary === "ai_draft" && title === "코멘트";

      return (
        <h2
          id={headingId(children)}
          className={isAiCommentary ? "mdx-section-heading" : undefined}
          {...props}
        >
          <span>{children}</span>
          {isAiCommentary ? <span className="ai-draft-badge">AI 초안</span> : null}
        </h2>
      );
    },
  };

  return (
    <div className="prose">
      <MDXRemote source={source} components={mergedComponents} options={options} />
    </div>
  );
}

export function extractHeadings(source: string) {
  return Array.from(source.matchAll(/^##\s+(.+)$/gm)).map((match) => {
    const title = match[1].trim();

    return {
      id: headingId(title),
      title,
    };
  });
}
