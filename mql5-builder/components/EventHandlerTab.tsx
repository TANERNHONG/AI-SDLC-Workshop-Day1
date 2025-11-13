'use client';

import React, { useState } from 'react';
import { EventHandler } from '@/lib/types';
import { CheckCircle2, Circle, Info, ChevronDown, ChevronRight } from 'lucide-react';

interface EventHandlerTabProps {
  handlers: EventHandler[];
  onToggleHandler: (handlerId: string) => void;
}

export default function EventHandlerTab({ handlers, onToggleHandler }: EventHandlerTabProps) {
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
    <div className="w-full h-full bg-white dark:bg-gray-800 p-4 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
          <span>⚙️</span>
          Configure Event Handlers
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Toggle MQL5 event handlers to include in your EA. OnInit and OnDeinit are always required.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          {enabledCount} of {handlers.length} handlers enabled
        </p>
      </div>

      {/* Quick Presets */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Presets:</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              // Enable OnInit, OnDeinit, OnTick
              handlers.forEach(h => {
                if (h.name === 'OnTick' && !h.enabled) {
                  onToggleHandler(h.id);
                }
              });
            }}
            className="text-left text-sm px-3 py-2 rounded bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
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
            className="text-left text-sm px-3 py-2 rounded bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
          >
            ⏰ Time-Based EA
          </button>
        </div>
      </div>

      {/* Handler Categories */}
      <div className="space-y-3">
        {categories.map(category => (
          category.handlers.length > 0 && (
            <div key={category.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => category.id !== 'required' && toggleCategory(category.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/50"
              >
                <span className="flex items-center gap-2">
                  {category.icon} {category.name}
                  <span className="text-xs text-gray-500 font-normal">({category.handlers.length})</span>
                </span>
                {category.id !== 'required' && (
                  expandedCategory === category.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {/* Handlers List */}
              {(category.id === 'required' || expandedCategory === category.id) && (
                <div className="p-2 space-y-1 bg-white dark:bg-gray-800">
                  {category.handlers.map(handler => (
                    <div
                      key={handler.id}
                      className="relative"
                      onMouseEnter={() => setHoveredHandler(handler.id)}
                      onMouseLeave={() => setHoveredHandler(null)}
                      data-handler={handler.name}
                    >
                      <button
                        onClick={() => !handler.required && onToggleHandler(handler.id)}
                        disabled={handler.required}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded text-sm transition-all ${
                          handler.required
                            ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-60'
                            : handler.enabled
                            ? 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-300'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 border-2 border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        {handler.enabled ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                        <div className="flex-1 text-left">
                          <div className="font-medium">{handler.displayName}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {handler.description.substring(0, 60)}...
                          </div>
                        </div>
                        {handler.dependencies && handler.dependencies.length > 0 && (
                          <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        )}
                      </button>

                      {/* Tooltip */}
                      {hoveredHandler === handler.id && (
                        <div className="absolute left-0 right-0 top-full mt-1 z-50 p-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg shadow-xl text-xs">
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
