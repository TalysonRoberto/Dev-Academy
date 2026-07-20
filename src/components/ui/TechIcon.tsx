import React from 'react';

interface TechIconProps {
  tech: 'html' | 'css' | 'javascript' | 'react';
  size?: number;
  className?: string;
}

export function TechIcon({ tech, size = 24, className = '' }: TechIconProps) {
  const iconPaths: Record<string, string> = {
    html: '/icons/html.svg',
    css: '/icons/css.svg',
    javascript: '/icons/javascript.svg',
    react: '/icons/react.svg',
  };

  return (
    <img
      src={iconPaths[tech]}
      alt={`${tech} icon`}
      width={size}
      height={size}
      className={className}
    />
  );
}

export function TopicIcon({ topic, size = 20, className = '' }: { topic: string; size?: number; className?: string }) {
  const topicIcons: Record<string, string> = {
    // HTML topics
    'introducao': '📖',
    'tags-basicas': '🏷️',
    'formularios': '📝',
    'semanticas': '🏗️',
    'tabelas': '📊',
    'imagens': '🖼️',
    'layouts': '📐',
    // CSS topics
    'fundamentos': '📚',
    'seletores': '🎯',
    'box-model': '📦',
    'flexbox': '🔲',
    // JS topics
    'funcoes': '🔧',
    'arrays': '📦',
    // React topics
    'hooks': '🪝',
  };

  return (
    <span className={`inline-flex items-center justify-center ${className}`} style={{ fontSize: size }}>
      {topicIcons[topic] || '📄'}
    </span>
  );
}
