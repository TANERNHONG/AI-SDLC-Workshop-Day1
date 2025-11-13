'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GlobalVariable } from '@/lib/types';
import { Trash2, RotateCcw, Link, ChevronUp, ChevronDown } from 'lucide-react';

interface GlobalVariableBlockProps {
  variable: GlobalVariable;
  onUpdate: (id: string, newValue: string | number | boolean) => void;
  onDelete: (id: string) => void;
  onReset: (id: string) => void;
}

export default function GlobalVariableBlock({
  variable,
  onUpdate,
  onDelete,
  onReset,
}: GlobalVariableBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(variable.currentValue));
  const [isValid, setIsValid] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditValue(String(variable.currentValue));
  };

  const validateValue = (value: string): boolean => {
    if (variable.type === 'int' || variable.type === 'double') {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) return false;
      if (variable.min !== undefined && numValue < variable.min) return false;
      if (variable.max !== undefined && numValue > variable.max) return false;
      return true;
    }
    if (variable.type === 'bool') {
      return value === 'true' || value === 'false';
    }
    return true;
  };

  const handleSave = () => {
    if (validateValue(editValue)) {
      let finalValue: string | number | boolean = editValue;
      if (variable.type === 'int') finalValue = parseInt(editValue);
      else if (variable.type === 'double') finalValue = parseFloat(editValue);
      else if (variable.type === 'bool') finalValue = editValue === 'true';

      onUpdate(variable.id, finalValue);
      setIsEditing(false);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(String(variable.currentValue));
    setIsValid(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleIncrement = () => {
    const currentNum = parseFloat(editValue);
    if (!isNaN(currentNum)) {
      const step = variable.step || 1;
      const newValue = currentNum + step;
      if (variable.max === undefined || newValue <= variable.max) {
        setEditValue(String(newValue));
      }
    }
  };

  const handleDecrement = () => {
    const currentNum = parseFloat(editValue);
    if (!isNaN(currentNum)) {
      const step = variable.step || 1;
      const newValue = currentNum - step;
      if (variable.min === undefined || newValue >= variable.min) {
        setEditValue(String(newValue));
      }
    }
  };

  return (
    <div
      className={`relative p-3 rounded-lg border-2 transition-all ${
        isEditing
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : !isValid
          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
          : variable.isModified
          ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
          : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
      }`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{variable.type}</span>
            <code className={`text-sm font-semibold ${
              variable.isModified
                ? 'text-green-700 dark:text-green-400'
                : 'text-gray-900 dark:text-white'
            }`}>
              {variable.name}
            </code>
            {variable.usedBy.length > 0 && (
              <Link className="w-3 h-3 text-blue-500" />
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
            {variable.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {variable.isModified && (
            <button
              onClick={() => onReset(variable.id)}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              title="Reset to default"
            >
              <RotateCcw className="w-3 h-3 text-gray-500" />
            </button>
          )}
          <button
            onClick={() => onDelete(variable.id)}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
            title="Delete variable"
          >
            <Trash2 className="w-3 h-3 text-red-500" />
          </button>
        </div>
      </div>

      {/* Value Editor */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">=</span>
        
        {variable.type === 'bool' ? (
          // Toggle for boolean
          <button
            onClick={() => onUpdate(variable.id, !variable.currentValue)}
            className={`flex-1 px-3 py-1.5 rounded text-sm font-medium ${
              variable.currentValue
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            {String(variable.currentValue)}
          </button>
        ) : (
          // Input for numbers/strings
          <div className="flex-1 flex items-center gap-1">
            {isEditing ? (
              <>
                <input
                  ref={inputRef}
                  type={variable.type === 'string' ? 'text' : 'number'}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={handleKeyDown}
                  className={`flex-1 px-2 py-1 border-2 rounded text-sm font-mono ${
                    isValid
                      ? 'border-blue-500 bg-white dark:bg-gray-700'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  } text-gray-900 dark:text-white focus:outline-none`}
                  step={variable.step}
                  min={variable.min}
                  max={variable.max}
                  aria-label={`Edit ${variable.name}`}
                  title={`Edit ${variable.name}`}
                />
                {(variable.type === 'int' || variable.type === 'double') && (
                  <div className="flex flex-col">
                    <button
                      onClick={handleIncrement}
                      className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                      aria-label="Increment value"
                      title="Increment value"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={handleDecrement}
                      className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                      aria-label="Decrement value"
                      title="Decrement value"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={handleStartEdit}
                className={`flex-1 px-2 py-1 border-2 rounded text-sm font-mono text-left ${
                  variable.isModified
                    ? 'border-green-500 bg-white dark:bg-gray-700 text-green-700 dark:text-green-400 font-bold'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                } hover:border-blue-500 transition-colors`}
              >
                {String(variable.currentValue)}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Range indicator */}
      {(variable.min !== undefined || variable.max !== undefined) && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Range: {variable.min ?? '-∞'} to {variable.max ?? '∞'}
          {variable.step && ` (step: ${variable.step})`}
        </div>
      )}

      {/* Validation error */}
      {!isValid && (
        <div className="mt-1 text-xs text-red-600 dark:text-red-400">
          Invalid value. Must be {variable.min !== undefined && `≥ ${variable.min}`}
          {variable.min !== undefined && variable.max !== undefined && ' and '}
          {variable.max !== undefined && `≤ ${variable.max}`}
        </div>
      )}

      {/* Tooltip with usage info */}
      {showTooltip && variable.usedBy.length > 0 && (
        <div className="absolute left-0 bottom-full mb-2 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-50 whitespace-nowrap">
          <strong>🔗 Used by:</strong> {variable.usedBy.length} block(s)
        </div>
      )}
    </div>
  );
}
