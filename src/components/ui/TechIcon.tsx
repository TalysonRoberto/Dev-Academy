import React from 'react';

interface TechIconProps {
  tech: 'html' | 'css' | 'javascript' | 'react';
  size?: number;
  className?: string;
}

export function TechIcon({ tech, size = 24, className = '' }: TechIconProps) {
  const iconPaths: Record<string, string> = {
    html: '/icons/icon-html-5.png',
    css: '/icons/icon-css-3.png',
    javascript: '/icons/icon-js.png',
    react: '/icons/icon-react.svg',
  };

  return (
    <img
      src={iconPaths[tech]}
      alt={`${tech} icon`}
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}

interface TopicIconProps {
  contentId: string;
  size?: number;
  className?: string;
}

export function TopicIcon({ contentId, size = 20, className = '' }: TopicIconProps) {
  const topicIconPaths: Record<string, string> = {
    html: '/icons/past-html.png',
    css: '/icons/past-css.png',
    javascript: '/icons/past-js.png',
    react: '/icons/past-react.png',
  };

  const iconPath = topicIconPaths[contentId];

  if (!iconPath) {
    return <span className={className}>📄</span>;
  }

  return (
    <img
      src={iconPath}
      alt={`${contentId} topic icon`}
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain', opacity: 0.7 }}
    />
  );
}
