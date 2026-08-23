import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

export default function StyledMarkdown({ children } : { children: string }) {
  return <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeSlug]}
    components={{
      h1: ({ ...props }) => <h1 className="text-4xl font-roboto-serif font-bold mb-6 scroll-m-20" {...props} />,
      h2: ({ ...props }) => <h2 className="text-3xl font-roboto-serif font-bold mb-2 scroll-m-20" {...props} />,
      p: ({ ...props }) => <p className="my-6" {...props} />,
      ul: ({ ...props }) => <ul className="my-6 list-disc list-outside space-y-2 pl-8" {...props} />,
      li: ({ ...props }) => <li className="my-1" {...props} />,
      a: ({ ...props }) => <a className="link text-gray-950 dark:text-gray-50" {...props} />,
    }}
  >
    {children}
  </ReactMarkdown>
}