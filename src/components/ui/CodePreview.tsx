'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Code } from 'lucide-react';

interface CodePreviewProps {
  code: string;
  language?: 'html' | 'css';
  title?: string;
}

export function CodePreview({ code, language = 'html', title }: CodePreviewProps) {
  const [showPreview, setShowPreview] = useState(false);

  const renderPreview = () => {
    if (language === 'html') {
      return (
        <iframe
          srcDoc={`
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { 
                  font-family: system-ui, -apple-system, sans-serif; 
                  padding: 16px; 
                  margin: 0;
                  color: #333;
                  line-height: 1.5;
                }
                * { box-sizing: border-box; }
              </style>
            </head>
            <body>
              ${code}
            </body>
            </html>
          `}
          className="w-full h-64 border-0 rounded-md bg-white"
          title="Preview"
          sandbox="allow-scripts"
        />
      );
    }

    if (language === 'css') {
      return (
        <iframe
          srcDoc={`
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { 
                  font-family: system-ui, -apple-system, sans-serif; 
                  padding: 16px; 
                  margin: 0;
                  color: #333;
                  line-height: 1.5;
                }
                * { box-sizing: border-box; }
                
                /* Estilos base para demonstracao */
                h1, h2, h3 { margin-top: 0; }
                p { margin: 8px 0; }
                button { cursor: pointer; }
                
                /* Estilos do usuario */
                ${code}
              </style>
            </head>
            <body>
              <h1>Titulo H1</h1>
              <h2>Titulo H2</h2>
              <h3>Titulo H3</h3>
              <p>Este e um paragrafo de exemplo para demonstrar os estilos aplicados.</p>
              <a href="#">Link de exemplo</a>
              <br><br>
              <div class="card">
                <h2>Card Titulo</h2>
                <p>Conteudo do card com mais texto.</p>
              </div>
              <br>
              <button class="btn">Botao</button>
              <input type="text" placeholder="Campo de texto" style="margin-left: 8px;">
              <ul>
                <li>Item da lista 1</li>
                <li>Item da lista 2</li>
                <li>Item da lista 3</li>
              </ul>
            </body>
            </html>
          `}
          className="w-full h-64 border-0 rounded-md bg-white"
          title="Preview"
          sandbox="allow-scripts"
        />
      );
    }

    return null;
  };

  return (
    <div className="my-4 border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#1e1e1e] px-3 py-2 border-b border-border">
        <span className="text-xs text-muted-foreground">
          {title || (language === 'html' ? 'HTML Preview' : 'CSS Preview')}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={`h-6 px-2 text-xs ${showPreview ? 'bg-accent' : ''}`}
            onClick={() => setShowPreview(true)}
          >
            <Eye className="h-3 w-3 mr-1" />
            Preview
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-6 px-2 text-xs ${!showPreview ? 'bg-accent' : ''}`}
            onClick={() => setShowPreview(false)}
          >
            <Code className="h-3 w-3 mr-1" />
            Codigo
          </Button>
        </div>
      </div>

      {/* Content */}
      {showPreview ? (
        <div className="p-4 bg-white">
          {renderPreview()}
        </div>
      ) : (
        <div className="p-4 bg-[#1e1e1e]">
          <pre className="text-xs text-[#d4d4d4] overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
