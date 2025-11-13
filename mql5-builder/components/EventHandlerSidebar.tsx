'use client';

import React, { useState } from 'react';
import { EventHandler } from '@/lib/types';
import { CheckCircle2, Circle, Info, ChevronDown, ChevronRight } from 'lucide-react';

interface EventHandlerSidebarProps {
  handlers: EventHandler[];
  onToggleHandler: (handlerId: string) => void;
}

export default function EventHandlerSidebar({ handlers, onToggleHandler }: EventHandlerSidebarProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('trading');
  const [hoveredHandler, setHoveredHandler] = useState<string | null>(null);

  const requiredHandlers = handlers.filter(h => h.required);
  const tradingHandlers = handlers.filter(h => h.category === 'trading' && !h.required);
  const lifecycleHandlers = handlers.filter(h => h.category === 'lifecycle' && !h.required);
  const dataHandlers = handlers.filter(h => h.category === 'data');
  const interactionHandlers = handlers.filter(h => h.category === 'interaction');
  const testingHandlers = handlers.filter(h => h.category === 'testing');

  const categories = [
    { id: 'required', name: 'Required', handlers: requiredHandlers, icon: '🔒' },
    { id: 'trading', name: 'Trading', handlers: tradingHandlers, icon: '📈' },
    { id: 'lifecycle', name: 'Lifecycle', handlers: lifecycleHandlers, icon: '🔄' },
    { id: 'data', name: 'Data', handlers: dataHandlers, icon: '📊' },
    { id: 'interaction', name: 'Interaction', handlers: interactionHandlers, icon: '🖱️' },
    { id: 'testing', name: 'Testing', handlers: testingHandlers, icon: '🧪' },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const enabledCount = handlers.filter(h => h.enabled).length;

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span>⚙️</span>
          Event Handlers
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {enabledCount} of {handlers.length} enabled
        </p>
      </div>

      {/* Quick Presets */}
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Presets:</p>
        <div className="space-y-1">
          <button
            onClick={() => {
              // Enable OnInit, OnDeinit, OnTick
              handlers.forEach(h => {
                if (h.name === 'OnTick' && !h.enabled) {
                  onToggleHandler(h.id);
                }
              });
            }}
            className="w-full text-left text-xs px-2 py-1 rounded bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
          >
            📊 Standard EA
          </button>
          <button
            onClick={() => {
              // Enable OnTick and OnTimer
              handlers.forEach(h => {
                if ((h.name === 'OnTick' || h.name === 'OnTimer') && !h.enabled) {
                  onToggleHandler(h.id);
                }
              });
            }}
            className="w-full text-left text-xs px-2 py-1 rounded bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
          >
            ⏰ Time-Based EA
          </button>
        </div>
      </div>

      {/* Handler Categories */}
      <div className="p-2">
        {categories.map(category => (
          category.handlers.length > 0 && (
            <div key={category.id} className="mb-2">
              {/* Category Header */}
              <button
                onClick={() => category.id !== 'required' && toggleCategory(category.id)}
                className="w-full flex items-center justify-between px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <span className="flex items-center gap-2">
                  {category.icon} {category.name}
                  <span className="text-xs text-gray-500">({category.handlers.length})</span>
                </span>
                {category.id !== 'required' && (
                  expandedCategory === category.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {/* Handlers List */}
              {(category.id === 'required' || expandedCategory === category.id) && (
                <div className="ml-2 mt-1 space-y-1">
                  {category.handlers.map(handler => (
                    <div
                      key={handler.id}
                      className="relative"
                      onMouseEnter={() => setHoveredHandler(handler.id)}
                      onMouseLeave={() => setHoveredHandler(null)}
                    >
                      <button
                        onClick={() => !handler.required && onToggleHandler(handler.id)}
                        disabled={handler.required}
                        className={`w-full flex items-center gap-2 px-2 py-2 rounded text-sm transition-all ${
                          handler.required
                            ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-75'
                            : handler.enabled
                            ? 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {handler.enabled ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                        <span className="flex-1 text-left truncate">{handler.displayName}</span>
                        {handler.dependencies && (
                          <Info className="w-3 h-3 text-blue-500 flex-shrink-0" />
                        )}
                      </button>

                      {/* Tooltip */}
                      {hoveredHandler === handler.id && (
                        <div className="absolute left-full ml-2 top-0 z-50 w-64 p-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg shadow-xl text-xs">
                          <p className="font-semibold mb-1">{handler.displayName}</p>
                          <p className="text-gray-300 dark:text-gray-400 mb-2">{handler.description}</p>
                          <p className="text-gray-400 dark:text-gray-500 mb-2">
                            <strong>Use case:</strong> {handler.useCase}
                          </p>
                          {handler.dependencies && handler.dependencies.length > 0 && (
                            <p className="text-yellow-300 dark:text-yellow-400">
                              <strong>⚠️ Requires:</strong> {handler.dependencies.join(', ')}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
}
