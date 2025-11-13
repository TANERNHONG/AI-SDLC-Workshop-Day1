'use client';

import React from 'react';
import { X, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { WorkspaceBlock as WorkspaceBlockType } from '@/lib/types';

interface WorkspaceBlockProps {
  block: WorkspaceBlockType;
  onDelete: (id: string) => void;
  onToggleExpand: (id: string) => void;
}

export default function WorkspaceBlock({ block, onDelete, onToggleExpand }: WorkspaceBlockProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 rounded-lg p-4 mb-3 shadow-md">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1">
          <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {block.snippet.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {block.snippet.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleExpand(block.id)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            title={block.isExpanded ? 'Collapse' : 'Expand'}
          >
            {block.isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
          <button
            onClick={() => onDelete(block.id)}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
            title="Delete block"
          >
            <X className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      {block.snippet.parameters && block.snippet.parameters.length > 0 && (
        <div className="mt-2 text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">Parameters: </span>
          <span className="text-gray-600 dark:text-gray-400">
            {block.snippet.parameters.join(', ')}
          </span>
        </div>
      )}

      {block.snippet.returnType && (
        <div className="mt-1 text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">Returns: </span>
          <span className="text-gray-600 dark:text-gray-400">{block.snippet.returnType}</span>
        </div>
      )}

      {block.isExpanded && (
        <div className="mt-3 bg-gray-50 dark:bg-gray-900 rounded p-3">
          <pre className="text-xs overflow-x-auto">
            <code className="text-gray-800 dark:text-gray-200">{block.snippet.code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
