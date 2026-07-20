'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodePreview } from './CodePreview';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre: ({ children, ...props }) => {
            // Extract code content from children
            let codeContent = '';
            let language = '';
            
            // ReactMarkdown passes <code> as children of <pre>
            if (children && typeof children === 'object') {
              const child = Array.isArray(children) ? children[0] : children;
              if (child && typeof child === 'object' && 'props' in child) {
                codeContent = String(child.props?.children || '');
                language = child.props?.className?.replace('language-', '') || '';
              }
            } else if (typeof children === 'string') {
              codeContent = children;
            }
            
            // Detect HTML or CSS by content patterns
            const isHtml = language === 'html' || (!language && /<[a-z][\s\S]*>/i.test(codeContent));
            const isCss = language === 'css' || (!language && /color:|background|font-size|margin|padding|border|display/.test(codeContent));
            
            if (isHtml || isCss) {
              return (
                <CodePreview
                  code={codeContent}
                  language={isHtml ? 'html' : 'css'}
                  title={isHtml ? 'HTML Preview' : 'CSS Preview'}
                />
              );
            }
            
            // Default code block
            return (
              <pre className="bg-[#1e1e1e] p-3 rounded-lg overflow-x-auto mb-3 border border-border text-xs" {...props}>
                {children}
              </pre>
            );
          },
          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-foreground mt-6 mb-3 pb-1 border-b border-border">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-foreground mb-3 leading-relaxed text-sm">
              {children}
            </p>
          ),
          code: ({ children, className, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono text-primary">
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-3 space-y-1 text-foreground text-sm">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-3 space-y-1 text-foreground text-sm">
              {children}
            </ol>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-foreground">
              {children}
            </strong>
          ),
          a: ({ children, href }) => (
            <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-3">
              <table className="w-full text-sm border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody>{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-border">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left font-semibold text-foreground">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-foreground">{children}</td>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-3">
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className="my-6 border-border" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
