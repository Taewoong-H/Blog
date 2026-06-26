import { MDXRemote, type MDXComponents } from "next-mdx-remote-client/rsc";

type MdxContentProps = {
  source: string;
};

const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-12 text-2xl font-semibold tracking-tight text-stone-950 first:mt-0"
      {...props}
    />
  ),
  h3: (props) => <h3 className="mt-9 text-xl font-semibold text-stone-950" {...props} />,
  p: (props) => <p className="mt-5 leading-8 text-stone-700" {...props} />,
  a: (props) => <a className="font-medium text-stone-950 underline" {...props} />,
  ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-6 text-stone-700" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-stone-700" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-7 border-l-4 border-stone-300 pl-5 text-stone-600"
      {...props}
    />
  ),
  code: (props) => (
    <code className="rounded bg-stone-200/70 px-1.5 py-0.5 text-sm text-stone-900" {...props} />
  ),
};

export default function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="mt-10">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
