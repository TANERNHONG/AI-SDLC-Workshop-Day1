'use client';

import React, { useState } from 'react';
import { Documentation } from '@/lib/types';
import { X, Edit2, Trash2, Pin, Eye, FileText } from 'lucide-react';

interface DocumentationCardProps {
  doc: Documentation;
  onEdit: (doc: Documentation) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onView: (doc: Documentation) => void;
}

export function DocumentationCard({ doc, onEdit, onDelete, onTogglePin, onView }: DocumentationCardProps) {
  const categoryColors = {
    strategy: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    parameter: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    setup: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    troubleshooting: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    journal: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    general: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
  };

  return (
    <div className={`p-4 rounded-lg border-2 bg-white dark:bg-gray-800 ${
      doc.isPinned ? 'border-yellow-400' : 'border-gray-300 dark:border-gray-600'
    } hover:shadow-md transition-all`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {doc.isPinned && <Pin className="w-4 h-4 text-yellow-500" />}
            <FileText className="w-4 h-4 text-gray-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">{doc.title}</h3>
          </div>
          <span className={`inline-block text-xs px-2 py-0.5 rounded mt-1 ${categoryColors[doc.category]}`}>
            {doc.category}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onTogglePin(doc.id)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            title={doc.isPinned ? 'Unpin' : 'Pin'}
          >
            <Pin className={`w-3.5 h-3.5 ${doc.isPinned ? 'text-yellow-500' : 'text-gray-400'}`} />
          </button>
          <button
            onClick={() => onEdit(doc)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            title="Edit"
          >
            <Edit2 className="w-3.5 h-3.5 text-blue-500" />
          </button>
          <button
            onClick={() => onDelete(doc.id)}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-500" />
          </button>
        </div>
      </div>

      {/* Preview */}
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
        {doc.content.substring(0, 120)}...
      </p>

      {/* Tags */}
      {doc.tags && doc.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {doc.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400">
              #{tag}
            </span>
          ))}
          {doc.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{doc.tags.length - 3} more</span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Updated: {new Date(doc.updatedAt).toLocaleDateString()}</span>
        <button
          onClick={() => onView(doc)}
          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <Eye className="w-3 h-3" />
          View Full
        </button>
      </div>
    </div>
  );
}

interface DocumentationModalProps {
  doc: Documentation | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (doc: Omit<Documentation, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function DocumentationModal({ doc, isOpen, onClose, onSave }: DocumentationModalProps) {
  const [title, setTitle] = useState(doc?.title || '');
  const [category, setCategory] = useState<Documentation['category']>(doc?.category || 'general');
  const [content, setContent] = useState(doc?.content || '');
  const [tags, setTags] = useState(doc?.tags?.join(', ') || '');
  const [isPinned, setIsPinned] = useState(doc?.isPinned || false);

  React.useEffect(() => {
    if (doc) {
      setTitle(doc.title);
      setCategory(doc.category);
      setContent(doc.content);
      setTags(doc.tags.join(', '));
      setIsPinned(doc.isPinned);
    } else {
      setTitle('');
      setCategory('general');
      setContent('');
      setTags('');
      setIsPinned(false);
    }
  }, [doc, isOpen]);

  const handleSave = () => {
    if (title && content) {
      onSave({
        title,
        category,
        content,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        isPinned,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {doc ? 'Edit Documentation' : 'New Documentation'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" aria-label="Close modal" title="Close modal">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., MA-RSI Strategy Explanation"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Documentation['category'])}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              aria-label="Documentation category"
            >
              <option value="strategy">Strategy Explanation</option>
              <option value="parameter">Parameter Guide</option>
              <option value="setup">Setup Instructions</option>
              <option value="troubleshooting">Troubleshooting</option>
              <option value="journal">Trading Journal</option>
              <option value="general">General Notes</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., trend-following, RSI, moving-average"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content (Markdown supported)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your documentation here... Markdown formatting supported."
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Pin */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="pinned"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="pinned" className="text-sm text-gray-700 dark:text-gray-300">
              Pin this documentation
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title || !content}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
