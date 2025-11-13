'use client';

import React from 'react';
import { FileCode2 } from 'lucide-react';
import { CodeSnippet } from '@/lib/types';

interface SnippetCardProps {
  snippet: CodeSnippet;
  onDragStart: (snippet: CodeSnippet) => void;
}

export default function SnippetCard({ snippet, onDragStart }: SnippetCardProps) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(snippet)}
      className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3 mb-2 cursor-move hover:border-blue-500 hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-2">
        <FileCode2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
            {snippet.name}
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {snippet.description}
          </p>
          {snippet.returnType && (
            <div className="mt-2 text-xs">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded">
                → {snippet.returnType}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
