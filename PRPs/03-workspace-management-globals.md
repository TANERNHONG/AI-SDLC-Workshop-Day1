# PRP-03: Workspace Management with Automatic Global Variable Generation

## Feature Overview

The Workspace Management system with Automatic Global Variable Generation enables users to organize code blocks in the workspace while automatically creating and managing associated global variable declarations. When certain code snippets (indicators, utilities, trading logic) are dragged to the workspace, the system automatically generates mini global variable blocks that can be independently positioned, edited, and managed.

**Key Capabilities:**
- Automatic generation of global variable mini blocks when snippets are added
- Independent repositioning of global variable blocks
- Auto-grouping of globals in dedicated section at top of workspace
- Inline editing of global variable values
- Visual distinction between global variable blocks and main code blocks
- Dependency tracking between globals and main blocks
- Smart deletion warnings for globals in use
- Section-based organization (globals, handlers, main code)

## User Stories

### Story 1: Indicator User
**As a** trader adding technical indicators  
**I want** global variables for indicator parameters to be automatically created  
**So that** I can easily customize periods and thresholds without manual variable declaration

**Acceptance Criteria:**
- Dragging "RSI" indicator creates mini blocks for `g_rsi_period`, `g_rsi_overbought`, `g_rsi_oversold`
- Global variable blocks appear at top of workspace
- Can edit values by clicking on global blocks
- Main RSI block references these global variables in code

### Story 2: Advanced EA Developer
**As an** experienced algo-trader  
**I want to** reposition global variable declarations independently  
**So that** I can organize my code structure according to my preferences

**Acceptance Criteria:**
- Global variable blocks can be dragged up/down within globals section
- Can optionally enable "free positioning" to place globals anywhere
- Visual separator distinguishes globals section from other code
- Changes persist in workspace configuration

### Story 3: Risk Management User
**As a** trader focused on risk control  
**I want** risk parameters as editable global variables  
**So that** I can quickly adjust risk % without finding it in code

**Acceptance Criteria:**
- Risk management snippets create globals like `g_risk_percent`, `g_max_daily_loss`
- Clicking global block opens inline editor
- Changing `g_risk_percent` from 1.0 to 2.0 updates immediately
- Preview shows updated value in generated code

## User Flow

### Basic Flow: Auto-Generate Globals

1. User opens MQL5 EA Builder dashboard
2. User enables "OnTick" handler in Event Handler Tab (Code Library)
3. User drags "Moving Average" indicator from library to workspace
4. **System automatically creates blocks**:
   - 🔹 Mini block: `int g_ma_period = 20;` (positioned at top)
   - 🔹 Mini block: `int g_ma_shift = 0;` (positioned at top)
   - 📈 Main block: MA indicator code (positioned where dropped)
5. User sees workspace organized into sections:
   ```
   ═══ GLOBAL VARIABLES ═══
   🔹 g_ma_period = 20
   🔹 g_ma_shift = 0
   
   ═══ EVENT HANDLERS ═══
   ✅ OnInit
   ✅ OnDeinit
   📊 OnTick
   
   ═══ MAIN CODE ═══
   📈 Moving Average Indicator
   ```
6. User clicks on `g_ma_period` mini block
7. Inline editor appears: `[int g_ma_period = |50|;]`
8. User changes value to 50, presses Enter
9. Value updates in block and preview

### Advanced Flow: Multiple Indicators with Globals

1. User drags "RSI" indicator to workspace
2. System creates 3 global blocks + 1 main block:
   - 🔹 `int g_rsi_period = 14;`
   - 🔹 `double g_rsi_overbought = 70.0;`
   - 🔹 `double g_rsi_oversold = 30.0;`
   - 📊 RSI Indicator Setup
3. Globals auto-sort alphabetically in globals section
4. User drags "Bollinger Bands" indicator
5. System creates 2 more globals:
   - 🔹 `int g_bb_period = 20;`
   - 🔹 `double g_bb_deviation = 2.0;`
6. All 5 indicator globals now in globals section
7. User hovers over `g_rsi_period` block
8. Tooltip shows: "🔗 Used by: RSI Indicator Setup"
9. User clicks 🔗 icon
10. RSI main block highlights in workspace (visual link)
11. User attempts to delete `g_rsi_period`
12. Warning modal appears:
    ```
    ⚠️ Warning: Global Variable In Use
    
    g_rsi_period is used by:
    • RSI Indicator Setup (Indicators)
    
    Deleting it will cause compilation errors.
    
    [Cancel] [Delete Anyway]
    ```
13. User clicks Cancel, variable retained

## Technical Requirements

### Data Models

```typescript
// Global Variable Block Interface
interface GlobalVariableBlock {
  id: string;                    // Unique identifier (e.g., 'global_rsi_period_123')
  type: 'global_variable';       // Block type
  variableName: string;          // e.g., 'g_rsi_period'
  variableType: 'int' | 'double' | 'bool' | 'string' | 'datetime';
  defaultValue: number | string | boolean;
  currentValue: number | string | boolean;
  code: string;                  // Full declaration: "int g_rsi_period = 14;"
  linkedTo: string[];            // IDs of main blocks that use this variable
  editable: boolean;             // Whether user can edit value
  category: 'indicator' | 'risk' | 'time' | 'trade' | 'custom';
  position: number;              // Position within globals section
  createdBy: string;             // ID of snippet that created it
  description?: string;          // Optional description
  metadata?: {
    min?: number;
    max?: number;
    step?: number;
  };
}

// Main Code Block Interface (extended)
interface CodeBlock {
  id: string;
  type: 'indicator' | 'utility' | 'function' | 'handler';
  title: string;
  description: string;
  code: string;
  dependencies: string[];        // IDs of global variable blocks needed
  globalVariables?: GlobalVariableBlock[]; // Globals created by this snippet
  position: number;
  expanded: boolean;
  category: string;
}

// Workspace State
interface WorkspaceState {
  globalVariables: GlobalVariableBlock[];
  eventHandlers: string[];       // Enabled handler IDs
  codeBlocks: CodeBlock[];
  sections: {
    globals: {
      collapsed: boolean;
      autoSort: boolean;
      locked: boolean;  // If true, globals stay at top
    };
    handlers: {
      collapsed: boolean;
    };
    mainCode: {
      collapsed: boolean;
    };
  };
}
```

### Snippet Definition with Globals

```typescript
// Define snippets with associated global variables
interface SnippetDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  code: string;
  globalVariables?: GlobalVariableDefinition[];
}

interface GlobalVariableDefinition {
  name: string;              // e.g., 'g_rsi_period'
  type: 'int' | 'double' | 'bool' | 'string';
  defaultValue: number | string | boolean;
  description: string;
  editable: boolean;
  metadata?: {
    min?: number;
    max?: number;
    step?: number;
    unit?: string;           // e.g., 'pips', 'percent', 'minutes'
  };
}

// Example: RSI Indicator Snippet Definition
const RSI_SNIPPET: SnippetDefinition = {
  id: 'rsi_indicator',
  name: 'RSI Indicator',
  category: 'indicators',
  description: 'Relative Strength Index with overbought/oversold levels',
  code: `
int g_rsi_handle = INVALID_HANDLE;

// Initialize RSI in OnInit
g_rsi_handle = iRSI(_Symbol, PERIOD_CURRENT, g_rsi_period, PRICE_CLOSE);
if(g_rsi_handle == INVALID_HANDLE) {
   Print("Failed to create RSI indicator");
   return(INIT_FAILED);
}

// Get RSI values in OnTick
double rsi[];
ArraySetAsSeries(rsi, true);
CopyBuffer(g_rsi_handle, 0, 0, 3, rsi);

bool isOverbought = (rsi[0] > g_rsi_overbought);
bool isOversold = (rsi[0] < g_rsi_oversold);
  `,
  globalVariables: [
    {
      name: 'g_rsi_period',
      type: 'int',
      defaultValue: 14,
      description: 'RSI calculation period',
      editable: true,
      metadata: { min: 2, max: 100, step: 1 }
    },
    {
      name: 'g_rsi_overbought',
      type: 'double',
      defaultValue: 70.0,
      description: 'Overbought threshold level',
      editable: true,
      metadata: { min: 50.0, max: 100.0, step: 5.0 }
    },
    {
      name: 'g_rsi_oversold',
      type: 'double',
      defaultValue: 30.0,
      description: 'Oversold threshold level',
      editable: true,
      metadata: { min: 0.0, max: 50.0, step: 5.0 }
    }
  ]
};
```

### React Component: Global Variable Mini Block (with Styled Input Fields)

```tsx
import React, { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface GlobalVariableMiniBlockProps {
  globalVar: GlobalVariableBlock;
  onEdit: (id: string, newValue: number | string | boolean) => void;
  onDelete: (id: string) => void;
  onShowDependencies: (id: string) => void;
}

export const GlobalVariableMiniBlock: React.FC<GlobalVariableMiniBlockProps> = ({
  globalVar,
  onEdit,
  onDelete,
  onShowDependencies
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [editValue, setEditValue] = useState(globalVar.currentValue);
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const hasChanged = globalVar.currentValue !== globalVar.defaultValue;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: globalVar.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  // Validation logic
  const validateValue = (value: number | string | boolean): boolean => {
    if (globalVar.variableType === 'int' || globalVar.variableType === 'double') {
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      if (isNaN(numValue)) {
        setValidationMessage('Must be a valid number');
        return false;
      }
      if (globalVar.metadata?.min !== undefined && numValue < globalVar.metadata.min) {
        setValidationMessage(`Must be at least ${globalVar.metadata.min}`);
        return false;
      }
      if (globalVar.metadata?.max !== undefined && numValue > globalVar.metadata.max) {
        setValidationMessage(`Must be at most ${globalVar.metadata.max}`);
        return false;
      }
    }
    setValidationMessage('');
    return true;
  };

  const handleValueChange = (value: number | string | boolean) => {
    setEditValue(value);
    const valid = validateValue(value);
    setIsValid(valid);
  };

  const handleEditComplete = () => {
    if (isValid) {
      onEdit(globalVar.id, editValue);
      setIsFocused(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Select all text on focus for easy replacement
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditComplete();
    } else if (e.key === 'Escape') {
      setEditValue(globalVar.currentValue);
      setIsFocused(false);
      setIsValid(true);
    } else if (e.key === 'ArrowUp' && globalVar.metadata?.step) {
      e.preventDefault();
      const newValue = (typeof editValue === 'number' ? editValue : 0) + globalVar.metadata.step;
      handleValueChange(newValue);
    } else if (e.key === 'ArrowDown' && globalVar.metadata?.step) {
      e.preventDefault();
      const newValue = (typeof editValue === 'number' ? editValue : 0) - globalVar.metadata.step;
      handleValueChange(newValue);
    }
  };

  const handleReset = () => {
    setEditValue(globalVar.defaultValue);
    onEdit(globalVar.id, globalVar.defaultValue);
    setIsValid(true);
  };

  const handleDelete = () => {
    if (globalVar.linkedTo.length > 0) {
      const confirmed = window.confirm(
        `Warning: ${globalVar.variableName} is used by ${globalVar.linkedTo.length} block(s).\n\n` +
        `Deleting it may cause compilation errors. Continue?`
      );
      if (!confirmed) return;
    }
    onDelete(globalVar.id);
  };

  // Determine border color based on state
  const getBorderColor = () => {
    if (!isValid) return 'border-red-500';
    if (isFocused) return 'border-blue-500';
    if (hasChanged) return 'border-green-400';
    return 'border-blue-200';
  };

  // Determine background color
  const getBackgroundColor = () => {
    if (!isValid) return 'bg-red-50';
    if (hasChanged) return 'bg-green-50';
    return 'bg-blue-50';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-2 p-2 rounded-md transition-all ${getBackgroundColor()} border-2 ${getBorderColor()} hover:shadow-md`}
      {...attributes}
    >
      <div className="flex items-center gap-2">
        {/* Drag Handle */}
        <div {...listeners} className="cursor-move">
          <span className="text-blue-600">🔹</span>
        </div>

        {/* Variable Type and Name */}
        <div className="text-sm font-mono">
          <span className="text-blue-700 font-semibold">{globalVar.variableType}</span>{' '}
          <span className="text-gray-800">{globalVar.variableName}</span>{' '}
          <span className="text-gray-500">=</span>
        </div>

        {/* ALWAYS-VISIBLE INPUT FIELD - PRIMARY FEATURE */}
        {globalVar.variableType === 'bool' ? (
          // Toggle for boolean
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={editValue as boolean}
              onChange={(e) => {
                handleValueChange(e.target.checked);
                onEdit(globalVar.id, e.target.checked);
              }}
              className="w-10 h-6 bg-gray-200 rounded-full appearance-none cursor-pointer checked:bg-blue-500 transition"
            />
            <span className="ml-2 text-xs text-gray-600">
              {editValue ? 'ON' : 'OFF'}
            </span>
          </label>
        ) : (
          // Number/Text input - ALWAYS VISIBLE, not conditionally rendered
          <div className="flex-1 flex items-center gap-1">
            <input
              ref={inputRef}
              type={globalVar.variableType === 'int' || globalVar.variableType === 'double' ? 'number' : 'text'}
              value={editValue.toString()}
              onChange={(e) => {
                const val = globalVar.variableType === 'int' ? parseInt(e.target.value) :
                           globalVar.variableType === 'double' ? parseFloat(e.target.value) :
                           e.target.value;
                handleValueChange(val);
              }}
              onFocus={handleFocus}
              onBlur={handleEditComplete}
              onKeyDown={handleKeyDown}
              min={globalVar.metadata?.min}
              max={globalVar.metadata?.max}
              step={globalVar.metadata?.step}
              className={`
                w-24 px-2 py-1 text-sm font-mono text-center rounded
                border-2 transition-all
                ${isFocused ? 'border-blue-400 bg-white shadow-sm' : 'border-gray-300 bg-gray-50'}
                ${!isValid ? 'border-red-400 bg-red-50' : ''}
                ${hasChanged && !isFocused ? 'font-bold' : ''}
                hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200
              `}
              title={globalVar.description}
            />
            
            {/* Spinner buttons for numeric types */}
            {(globalVar.variableType === 'int' || globalVar.variableType === 'double') && (
              <div className="flex flex-col">
                <button
                  onClick={() => {
                    const step = globalVar.metadata?.step || 1;
                    const newVal = (typeof editValue === 'number' ? editValue : 0) + step;
                    handleValueChange(newVal);
                    if (isValid) onEdit(globalVar.id, newVal);
                  }}
                  className="w-5 h-4 text-xs bg-gray-200 hover:bg-gray-300 rounded-t border border-gray-400"
                >
                  ▲
                </button>
                <button
                  onClick={() => {
                    const step = globalVar.metadata?.step || 1;
                    const newVal = (typeof editValue === 'number' ? editValue : 0) - step;
                    handleValueChange(newVal);
                    if (isValid) onEdit(globalVar.id, newVal);
                  }}
                  className="w-5 h-4 text-xs bg-gray-200 hover:bg-gray-300 rounded-b border border-gray-400 border-t-0"
                >
                  ▼
                </button>
              </div>
            )}
          </div>
        )}

        {/* Status Indicator */}
        {hasChanged && !isFocused && (
          <span className="text-green-600 text-sm" title="Modified from default">
            ✓
          </span>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Reset to Default */}
          {hasChanged && (
            <button
              onClick={handleReset}
              className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
              title="Reset to default value"
            >
              Reset
            </button>
          )}

          {/* Show Dependencies */}
          {globalVar.linkedTo.length > 0 && (
            <button
              onClick={() => onShowDependencies(globalVar.id)}
              className="text-blue-600 hover:text-blue-800 text-sm"
              title={`Used by ${globalVar.linkedTo.length} block(s)`}
            >
              🔗
            </button>
          )}

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 text-sm font-bold"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Helper Text - Shows when focused OR invalid */}
      {(isFocused || !isValid) && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          {!isValid ? (
            <div className="text-xs text-red-600 flex items-center gap-1">
              <span>⚠️</span>
              <span>{validationMessage}</span>
            </div>
          ) : (
            <div className="text-xs text-gray-600 flex items-center justify-between">
              <span>
                {globalVar.metadata?.min !== undefined && globalVar.metadata?.max !== undefined
                  ? `Range: ${globalVar.metadata.min} - ${globalVar.metadata.max}`
                  : globalVar.description}
              </span>
              {globalVar.metadata?.step && (
                <span className="text-gray-500">
                  Step: {globalVar.metadata.step}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Unit Display */}
      {globalVar.metadata?.unit && (
        <div className="text-xs text-gray-500 mt-1">
          Unit: {globalVar.metadata.unit}
        </div>
      )}
    </div>
  );
};
```

### React Component: Workspace with Sections

```tsx
import React from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface WorkspaceProps {
  workspaceState: WorkspaceState;
  onUpdateWorkspace: (newState: WorkspaceState) => void;
}

export const Workspace: React.FC<WorkspaceProps> = ({
  workspaceState,
  onUpdateWorkspace
}) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Reorder logic here
    // Update workspaceState.globalVariables or workspaceState.codeBlocks
  };

  const handleEditGlobal = (id: string, newValue: number | string | boolean) => {
    const updated = workspaceState.globalVariables.map(gv =>
      gv.id === id ? { ...gv, currentValue: newValue, code: regenerateCode(gv, newValue) } : gv
    );
    onUpdateWorkspace({ ...workspaceState, globalVariables: updated });
  };

  const handleDeleteGlobal = (id: string) => {
    const filtered = workspaceState.globalVariables.filter(gv => gv.id !== id);
    onUpdateWorkspace({ ...workspaceState, globalVariables: filtered });
  };

  const handleShowDependencies = (id: string) => {
    const globalVar = workspaceState.globalVariables.find(gv => gv.id === id);
    if (!globalVar) return;

    // Highlight linked blocks
    const linkedBlocks = workspaceState.codeBlocks.filter(
      block => globalVar.linkedTo.includes(block.id)
    );
    
    // Show modal or highlight in UI
    console.log('Linked blocks:', linkedBlocks);
  };

  const regenerateCode = (gv: GlobalVariableBlock, newValue: number | string | boolean): string => {
    return `${gv.variableType} ${gv.variableName} = ${newValue};`;
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        
        {/* Global Variables Section */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-blue-500">
            <h3 className="text-lg font-bold text-blue-700">
              🔹 Global Variables ({workspaceState.globalVariables.length})
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const sorted = [...workspaceState.globalVariables].sort((a, b) =>
                    a.variableName.localeCompare(b.variableName)
                  );
                  onUpdateWorkspace({ ...workspaceState, globalVariables: sorted });
                }}
                className="text-sm px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Sort A-Z
              </button>
              <button
                onClick={() => {
                  const newState = { ...workspaceState };
                  newState.sections.globals.collapsed = !newState.sections.globals.collapsed;
                  onUpdateWorkspace(newState);
                }}
                className="text-sm px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                {workspaceState.sections.globals.collapsed ? '▼' : '▲'}
              </button>
            </div>
          </div>

          {!workspaceState.sections.globals.collapsed && (
            <SortableContext
              items={workspaceState.globalVariables.map(gv => gv.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                {workspaceState.globalVariables.length === 0 ? (
                  <p className="text-gray-500 text-sm italic">
                    No global variables yet. Add indicators or utilities to create them automatically.
                  </p>
                ) : (
                  workspaceState.globalVariables.map(gv => (
                    <GlobalVariableMiniBlock
                      key={gv.id}
                      globalVar={gv}
                      onEdit={handleEditGlobal}
                      onDelete={handleDeleteGlobal}
                      onShowDependencies={handleShowDependencies}
                    />
                  ))
                )}
              </div>
            </SortableContext>
          )}
        </section>

        {/* Event Handlers Section */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-green-500">
            <h3 className="text-lg font-bold text-green-700">
              ✅ Event Handlers ({workspaceState.eventHandlers.length})
            </h3>
          </div>
          {/* Event handler blocks here */}
        </section>

        {/* Main Code Blocks Section */}
        <section>
          <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-purple-500">
            <h3 className="text-lg font-bold text-purple-700">
              📋 Main Code ({workspaceState.codeBlocks.length})
            </h3>
          </div>
          <SortableContext
            items={workspaceState.codeBlocks.map(cb => cb.id)}
            strategy={verticalListSortingStrategy}
          >
            {/* Code blocks here */}
          </SortableContext>
        </section>
      </div>
    </DndContext>
  );
};
```

### Auto-Generation Logic

```typescript
// When snippet is dropped, generate global variables
const handleSnippetDrop = (snippet: SnippetDefinition, position: number) => {
  const newCodeBlock: CodeBlock = {
    id: generateId(),
    type: snippet.category as any,
    title: snippet.name,
    description: snippet.description,
    code: snippet.code,
    dependencies: [],
    position: position,
    expanded: false,
    category: snippet.category
  };

  const newGlobals: GlobalVariableBlock[] = [];

  if (snippet.globalVariables) {
    snippet.globalVariables.forEach((gvDef, index) => {
      const globalBlock: GlobalVariableBlock = {
        id: generateId(),
        type: 'global_variable',
        variableName: gvDef.name,
        variableType: gvDef.type,
        defaultValue: gvDef.defaultValue,
        currentValue: gvDef.defaultValue,
        code: `${gvDef.type} ${gvDef.name} = ${gvDef.defaultValue};`,
        linkedTo: [newCodeBlock.id],
        editable: gvDef.editable,
        category: snippet.category as any,
        position: workspaceState.globalVariables.length + index,
        createdBy: snippet.id,
        description: gvDef.description,
        metadata: gvDef.metadata
      };
      newGlobals.push(globalBlock);
      newCodeBlock.dependencies.push(globalBlock.id);
    });
  }

  newCodeBlock.globalVariables = newGlobals;

  onUpdateWorkspace({
    ...workspaceState,
    globalVariables: [...workspaceState.globalVariables, ...newGlobals],
    codeBlocks: [...workspaceState.codeBlocks, newCodeBlock]
  });
};
```

## Integration with Code Assembly

### Code Generation Order

```typescript
const assembleCode = (workspaceState: WorkspaceState): string => {
  let code = '';

  // 1. File header and properties
  code += generateFileHeader();

  // 2. Global variables (from mini blocks)
  code += '\n//+------------------------------------------------------------------+\n';
  code += '//| Global Variables                                                  |\n';
  code += '//+------------------------------------------------------------------+\n';
  
  workspaceState.globalVariables
    .sort((a, b) => a.position - b.position)
    .forEach(gv => {
      code += gv.code + '\n';
    });

  // 3. Event handlers (OnInit, OnDeinit, OnTick, etc.)
  code += '\n//+------------------------------------------------------------------+\n';
  code += '//| Event Handlers                                                    |\n';
  code += '//+------------------------------------------------------------------+\n';
  code += generateEventHandlers(workspaceState.eventHandlers);

  // 4. Main functions (from code blocks)
  code += '\n//+------------------------------------------------------------------+\n';
  code += '//| Custom Functions                                                  |\n';
  code += '//+------------------------------------------------------------------+\n';
  
  workspaceState.codeBlocks
    .sort((a, b) => a.position - b.position)
    .forEach(block => {
      code += block.code + '\n\n';
    });

  return code;
};
```

## Edge Cases

### Edge Case 1: Duplicate Global Variable Names
**Scenario**: User adds two snippets that create globals with the same name (e.g., both want `g_period`)  
**Handling**:
- System detects duplicate variable name
- Auto-renames second variable: `g_period_2`
- Shows notification: "Variable renamed to avoid conflict: g_period → g_period_2"
- Updates references in main code block

### Edge Case 2: Deleting Main Block with Globals
**Scenario**: User deletes main code block that created global variables  
**Handling**:
- Prompt: "Delete associated global variables too? [Yes] [No] [Cancel]"
- If Yes: Delete both main block and its globals
- If No: Keep globals (may be used by other blocks)
- If Cancel: Keep both

### Edge Case 3: Editing Global to Invalid Value
**Scenario**: User edits `g_ma_period` to negative number or non-integer  
**Handling**:
- Validate input based on metadata (min/max/step)
- Show error: "Invalid value. Must be between 1 and 500."
- Revert to previous value
- Red border on input field

### Edge Case 4: Circular Dependencies
**Scenario**: Global A references Global B, Global B references Global A  
**Handling**:
- Detect circular dependency during code generation
- Show error: "Circular dependency detected between g_var_a and g_var_b"
- Suggest reordering or breaking dependency

### Edge Case 5: Global Used by Deleted Block
**Scenario**: Main block is deleted but its global is used by another block  
**Handling**:
- Update `linkedTo` array to remove deleted block ID
- If `linkedTo` becomes empty, mark global as "orphaned"
- Show badge on orphaned globals: "⚠️ Unused"
- Suggest deletion in next cleanup

## Acceptance Criteria

### Auto-Generation
- [ ] Dragging snippet with `globalVariables` creates mini blocks
- [ ] Global blocks appear in globals section at top
- [ ] Main block positioned where user dropped it
- [ ] Dependencies tracked between global and main blocks

### Visual Design
- [ ] Global blocks have light blue background
- [ ] 🔹 icon distinguishes globals from main blocks
- [ ] Smaller height than main blocks (compact)
- [ ] Section separator visible between globals and handlers

### Editing
- [ ] Clicking global block enables inline editing
- [ ] Input field respects metadata (min/max/step)
- [ ] Enter key or blur saves changes
- [ ] Escape key cancels editing
- [ ] Changes update code preview immediately

### Deletion
- [ ] Delete button [✕] visible on hover
- [ ] Warning shown if global is used by other blocks
- [ ] List of dependent blocks shown in warning
- [ ] Can delete anyway or cancel

### Dependencies
- [ ] 🔗 icon visible if global is used
- [ ] Clicking 🔗 highlights linked main blocks
- [ ] Hover shows count of dependent blocks
- [ ] Dependency tracking persists across sessions

### Positioning
- [ ] Globals can be reordered within globals section
- [ ] Drag handle works for repositioning
- [ ] Optional "free positioning" mode unlocks section
- [ ] Sort button alphabetically orders globals

### Code Generation
- [ ] Global variables appear at top of generated code
- [ ] Correct MQL5 syntax with type, name, value
- [ ] Referenced by main code blocks below
- [ ] Order matches workspace position

## Testing Requirements

### E2E Test Cases

```typescript
// Test 1: Auto-Generate Globals
test('Dragging RSI indicator creates 3 global variable blocks', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Drag RSI from library
  await page.dragAndDrop('[data-snippet="rsi_indicator"]', '[data-workspace]');
  
  // Check 3 globals created
  await expect(page.locator('[data-global="g_rsi_period"]')).toBeVisible();
  await expect(page.locator('[data-global="g_rsi_overbought"]')).toBeVisible();
  await expect(page.locator('[data-global="g_rsi_oversold"]')).toBeVisible();
  
  // Check main block created
  await expect(page.locator('[data-block-title="RSI Indicator"]')).toBeVisible();
});

// Test 2: Edit Global Value
test('User can edit global variable value inline', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.dragAndDrop('[data-snippet="rsi_indicator"]', '[data-workspace]');
  
  // Click on g_rsi_period block
  await page.click('[data-global="g_rsi_period"]');
  
  // Input field appears
  const input = page.locator('[data-global="g_rsi_period"] input');
  await expect(input).toBeVisible();
  await expect(input).toHaveValue('14');
  
  // Change value
  await input.fill('21');
  await input.press('Enter');
  
  // Verify update
  await expect(page.locator('[data-global="g_rsi_period"]')).toContainText('21');
});

// Test 3: Delete Global with Warning
test('Deleting used global shows warning', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.dragAndDrop('[data-snippet="rsi_indicator"]', '[data-workspace]');
  
  // Try to delete g_rsi_period
  await page.click('[data-global="g_rsi_period"] button[data-action="delete"]');
  
  // Warning dialog appears
  const dialog = page.locator('[role="dialog"]');
  await expect(dialog).toContainText('is used by');
  await expect(dialog).toContainText('RSI Indicator');
  
  // Cancel deletion
  await page.click('button:has-text("Cancel")');
  
  // Global still exists
  await expect(page.locator('[data-global="g_rsi_period"]')).toBeVisible();
});

// Test 4: Show Dependencies
test('Clicking link icon highlights dependent blocks', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.dragAndDrop('[data-snippet="rsi_indicator"]', '[data-workspace]');
  
  // Click link icon
  await page.click('[data-global="g_rsi_period"] button[data-action="show-dependencies"]');
  
  // RSI main block highlighted
  const rsiBlock = page.locator('[data-block-title="RSI Indicator"]');
  await expect(rsiBlock).toHaveClass(/highlighted/);
});

// Test 5: Code Generation Includes Globals
test('Preview shows global variables at top of code', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.dragAndDrop('[data-snippet="rsi_indicator"]', '[data-workspace]');
  
  // Open preview
  await page.click('button:has-text("Preview")');
  
  // Check code contains globals at top
  const codePreview = page.locator('[data-testid="code-preview"]');
  const code = await codePreview.textContent();
  
  expect(code).toContain('int g_rsi_period = 14;');
  expect(code).toContain('double g_rsi_overbought = 70.0;');
  expect(code).toContain('double g_rsi_oversold = 30.0;');
  
  // Globals appear before OnInit
  const globalIndex = code!.indexOf('g_rsi_period');
  const onInitIndex = code!.indexOf('int OnInit()');
  expect(globalIndex).toBeLessThan(onInitIndex);
});
```

## Out of Scope

- ❌ **Manual Global Variable Creation**: Initial version only auto-generates; manual creation in Phase 2
- ❌ **Global Variable Type Conversion**: Cannot change type (int → double) after creation
- ❌ **Global Variable Refactoring**: Cannot rename globals and update all references automatically
- ❌ **Advanced Dependency Graph**: No visual graph showing all dependencies (just list)
- ❌ **Global Variable Templates**: No predefined sets of related globals

## Success Metrics

- **Auto-Generation Success Rate**: % of snippets that correctly generate globals (target: 100%)
- **Editing Usage**: % of users who edit at least one global value (target: >60%)
- **Dependency Warning Effectiveness**: % of users who cancel deletion after warning (target: >70%)
- **Code Quality**: % of generated EAs with properly positioned globals (target: 95%+)
- **User Satisfaction**: Survey rating for "Global variable management is intuitive" (target: >4.3/5)

---

**Feature Status**: ✅ Specification Complete  
**Priority**: P0 (Critical - Core Workspace Feature)  
**Estimated Effort**: 4-5 days  
**Dependencies**: Dashboard Layout (PRP-04 - Planned), Drag-Drop System (PRP-05 - Planned), Code Assembly (PRP-12 - Planned)
