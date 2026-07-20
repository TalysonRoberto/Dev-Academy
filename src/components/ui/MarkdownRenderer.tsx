'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodePreview } from './CodePreview';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Split content by code blocks, keeping the delimiters
  const parts = content.split(/(```[\s\S]*?```)/);
  
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      {parts.map((part, index) => {
        // Check if this part is a code block
        const codeBlockMatch = part.match(/^```(\w+)?\n([\s\S]*?)```$/);
        
        if (codeBlockMatch) {
          const language = codeBlockMatch[1] || '';
          const codeContent = codeBlockMatch[2].trim();
          
          // Detect HTML or CSS
          const isHtml = language === 'html' || (!language && /<[a-z][\s\S]*>/i.test(codeContent));
          const isCss = language === 'css' || (!language && /color:|background|font-size|margin|padding|border|display/.test(codeContent));
          
          if (isHtml || isCss) {
            return (
              <CodePreview
                key={index}
                code={codeContent}
                language={isHtml ? 'html' : 'css'}
                title={isHtml ? 'HTML Preview' : 'CSS Preview'}
              />
            );
          }
          
          // Other code blocks - render normally
          return (
            <pre key={index} className="bg-[#1e1e1e] p-3 rounded-lg overflow-x-auto mb-3 border border-border text-xs">
              <code className={language ? `language-${language}` : ''}>{codeContent}</code>
            </pre>
          );
        }
        
        // Not a code block - render as markdown
        return (
          <ReactMarkdown key={index} remarkPlugins={[remarkGfm]}>
            {part}
          </ReactMarkdown>
        );
      })}
    </div>
  );
}
