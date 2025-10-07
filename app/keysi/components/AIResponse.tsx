'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AIResponseProps {
  content: string;
  className?: string;
}

export const AIResponse: React.FC<AIResponseProps> = ({ content, className = '' }) => {
  // Si es texto pequeño (sugerencias), usar renderizado simplificado
  const isSmallText = className.includes('text-xs') || content.length < 100;
  
  if (isSmallText) {
    return (
      <span 
        className={className}
        dangerouslySetInnerHTML={{ 
          __html: content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-1 rounded text-xs">$1</code>')
        }} 
      />
    );
  }

  return (
    <div className={`prose prose-sm max-w-none prose-gray dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Personalizar el renderizado de enlaces
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          // Personalizar el renderizado de código en línea
          code: ({ node, inline, className, ...props }: any) => {
            if (inline) {
              return (
                <code
                  {...props}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm font-mono"
                />
              );
            }
            return (
              <code
                {...props}
                className="block bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-lg text-sm font-mono overflow-x-auto"
              />
            );
          },
          // Personalizar el renderizado de bloques de código
          pre: ({ node, ...props }) => (
            <pre
              {...props}
              className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto"
            />
          ),
          // Personalizar el renderizado de listas
          ul: ({ node, ...props }) => (
            <ul {...props} className="list-disc list-inside space-y-1" />
          ),
          ol: ({ node, ...props }) => (
            <ol {...props} className="list-decimal list-inside space-y-1" />
          ),
          // Personalizar el renderizado de tablas
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto">
              <table {...props} className="min-w-full border-collapse border border-gray-300 dark:border-gray-600" />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              {...props}
              className="border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-700 font-semibold text-left"
            />
          ),
          td: ({ node, ...props }) => (
            <td
              {...props}
              className="border border-gray-300 dark:border-gray-600 px-3 py-2"
            />
          ),
          // Personalizar el renderizado de encabezados
          h1: ({ node, ...props }) => (
            <h1 {...props} className="text-2xl font-bold mb-4 mt-6" />
          ),
          h2: ({ node, ...props }) => (
            <h2 {...props} className="text-xl font-bold mb-3 mt-5" />
          ),
          h3: ({ node, ...props }) => (
            <h3 {...props} className="text-lg font-bold mb-2 mt-4" />
          ),
          h4: ({ node, ...props }) => (
            <h4 {...props} className="text-base font-bold mb-2 mt-3" />
          ),
          // Personalizar el renderizado de párrafos
          p: ({ node, ...props }) => (
            <p {...props} className="mb-3 leading-relaxed" />
          ),
          // Personalizar el renderizado de blockquotes
          blockquote: ({ node, ...props }) => (
            <blockquote
              {...props}
              className="border-l-4 border-blue-500 pl-4 italic bg-blue-50 dark:bg-blue-900/20 py-2 rounded-r"
            />
          ),
          // Personalizar el renderizado de listas de tareas
          li: ({ node, ...props }) => {
            const isTaskList = props.className?.includes('task-list-item');
            if (isTaskList) {
              return (
                <li
                  {...props}
                  className="flex items-center space-x-2 list-none"
                />
              );
            }
            return <li {...props} className="mb-1" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}; 