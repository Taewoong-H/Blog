import { MDXRemote, type MDXComponents } from "next-mdx-remote-client/rsc";

type MdxContentProps = {
  source: string;
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

const components: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2 id={headingId(children)} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
  a: (props) => <a className="font-semibold text-[var(--accent)] underline" {...props} />,
};

export default function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose">
      <MDXRemote source={source} components={components} />
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
