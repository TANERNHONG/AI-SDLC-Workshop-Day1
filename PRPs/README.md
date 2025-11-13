# Product Requirement Prompts (PRPs) - Index

This directory contains detailed Product Requirement Prompts split by feature for the MQL5 Expert Advisor Builder. Each PRP provides comprehensive guidance for implementing a specific feature using AI coding assistants.

## 📋 PRP Files

### Core Features

1. **[01-sidebar-navigation.md](01-sidebar-navigation.md)** - Sidebar Navigation System
   - Collapsible left sidebar (64px collapsed, 240px expanded)
   - Multi-page navigation architecture (Dashboard, Settings, Templates, Documentation, Export History)
   - Icon-only (collapsed) and full menu (expanded) modes
   - Keyboard shortcut support (Ctrl/Cmd + B)
   - State persistence in localStorage
   - Future-ready for feature expansion

2. **[02-dashboard-layout.md](02-dashboard-layout.md)** - Dashboard Layout & Structure
   - Three-section view: sidebar (left), workspace (center), library (right)
   - Bottom bar for preview and save functions
   - Responsive layout design
   - Visual feedback zones
   - Integration with sidebar navigation

3. **[03-event-handler-tab.md](03-event-handler-tab.md)** - Event Handler Tab
   - Tab in the Code Library (right side) for managing event handlers
   - Toggle MQL5 event handler functions on/off
   - Required handlers: OnInit, OnDeinit (always included)
   - Optional handlers: OnStart, OnTick, OnCalculate, OnTimer, OnTrade, OnTradeTransaction, OnBookEvent, OnChartEvent, OnTester, OnTesterInit, OnTesterDeinit, OnTesterPass
   - Visual indicators for enabled/disabled handlers
   - Best practices guidance for handler selection

3. **[03-drag-drop-system.md](03-drag-drop-system.md)** - Drag-and-Drop System
   - Drag snippets from library to workspace
   - Visual feedback during drag operations
   - Drop zone highlighting and validation
   - Block reordering in workspace

4. **[04-code-snippet-library.md](04-code-snippet-library.md)** - Code Snippet Library
   - Pre-built MQL5 code snippets
   - Solid border draggable blocks
   - Snippet categorization and display
   - Description and parameter documentation

### Library Management

5. **[05-library-tabs.md](05-library-tabs.md)** - Library Tabs Management
   - Default tabs: Utilities, Indicators, Pre-made Functions, **Event Handlers**, **Documentations**
   - Create new tabs with + button
   - Tab switching and navigation
   - Rename and delete custom tabs

6. **[06-custom-snippets.md](06-custom-snippets.md)** - Custom Code Snippets
   - Add custom snippets with dotted border interface
   - Snippet creation modal with validation
   - Edit and delete custom snippets
   - Move snippets between tabs

7. **[07-utilities-tab.md](07-utilities-tab.md)** - Utilities Tab Content
   - Position sizing functions
   - Risk management utilities
   - Time filters and session checks
   - Account and price utilities

8. **[08-indicators-tab.md](08-indicators-tab.md)** - Indicators Tab Content
   - Trend indicators (MA, MACD, ADX)
   - Momentum indicators (RSI, Stochastic)
   - Volatility indicators (Bollinger, ATR)
   - Signal detection logic

8b. **[08b-documentations-tab.md](08b-documentations-tab.md)** - Documentations Tab Content
   - Custom written documentation in text form
   - Strategy explanations and parameter guides
   - Setup instructions and troubleshooting notes
   - Trading journal entries
   - Markdown formatting support
   - Categories, tags, and search functionality
   - Export/import documentation files
   - Reference material (non-code)

### Workspace Features

9. **[09-workspace-management.md](09-workspace-management.md)** - Workspace Block Management
   - Block organization and ordering
   - Expand/collapse code blocks
   - Configure block parameters
   - Delete and reorder blocks
   - **Automatic global variable generation and management**
   - **Mini global variable blocks creation**
   - **Global variable section auto-grouping**
   - **Independent repositioning of global variables**

10. **[10-code-assembly.md](10-code-assembly.md)** - Code Assembly Engine
    - Combine blocks into complete EA structure
    - Proper MQL5 file structure with toggleable event handlers
    - **Global variables section generation (auto-positioned at top)**
    - Variable and function ordering
    - Dependency resolution
    - Integration with Event Handler Tab
    - **Link global variable blocks to main code blocks**

11. **[11-code-preview.md](11-code-preview.md)** - Code Preview System
    - Preview modal with syntax highlighting
    - Statistics panel (lines, functions, blocks, enabled handlers)
    - Copy to clipboard functionality
    - Basic syntax validation

### Export Features

12. **[12-save-export.md](12-save-export.md)** - Save & Export System
    - Export as .txt file for MetaEditor
    - Automatic filename with timestamp
    - Workspace configuration save/load
    - Version management support

## 🎯 How to Use These PRPs

### For AI Coding Assistants (GitHub Copilot, etc.)

1. **Feature Implementation**: Copy the entire PRP into your chat to implement a feature from scratch
2. **Bug Fixes**: Reference specific sections when debugging issues
3. **Code Review**: Use acceptance criteria to validate implementations
4. **Testing**: Use test case sections to generate E2E and unit tests

### For Developers

1. **Architecture Understanding**: Read PRPs to understand design decisions
2. **Component Specifications**: Reference for drag-and-drop and UI components
3. **Edge Cases**: Comprehensive coverage of edge cases and error handling
4. **Best Practices**: Each PRP includes MQL5 builder-specific patterns

## 📚 PRP Structure

Each PRP follows this consistent structure:

- **Feature Overview** - High-level description
- **User Stories** - User personas and their needs
- **User Flow** - Step-by-step interaction patterns
- **Technical Requirements** - Component structure, data models, storage
- **UI Components** - React component examples with drag-and-drop
- **Edge Cases** - Unusual scenarios and handling
- **Acceptance Criteria** - Testable requirements
- **Testing Requirements** - E2E and unit test specifications
- **Out of Scope** - Explicitly excluded features
- **Success Metrics** - Measurable outcomes

## 🔗 Related Documentation

- **[.github/copilot-instructions.md](../.github/copilot-instructions.md)** - AI agent instructions for the entire codebase
- **[USER_GUIDE_NEW.md](../USER_GUIDE_NEW.md)** - Comprehensive user guide for MQL5 Expert Advisor Builder
- **[README.md](../README.md)** - Setup and installation guide

## 🚀 Development Workflow

### Implementing a New Feature

1. Read the corresponding PRP file thoroughly
2. Reference `.github/copilot-instructions.md` for project patterns
3. Check `USER_GUIDE_NEW.md` for user-facing behavior
4. Implement following the technical requirements
5. Validate against acceptance criteria
6. Write tests based on testing requirements section

### Using with GitHub Copilot Chat

```plaintext
"I want to implement [feature name]. 
Here's the PRP: [paste PRP content]
Please help me implement this following the project patterns."
```

### Feature Dependencies

Some features depend on others being implemented first:

```
Dashboard Layout (01) → All other features (foundation)
Event Handler Sidebar (02) → Code Assembly (10)
Drag-Drop System (03) → Workspace Management (09)
Code Snippet Library (04) → Library Tabs (05), Custom Snippets (06)
Library Tabs (05) → Utilities (07), Indicators (08), Custom Snippets (06)
Workspace Management (09) → Code Assembly (10), Code Preview (11)
Event Handler Sidebar (02) + Code Assembly (10) → Code Preview (11), Save/Export (12)
```

## 📊 Implementation Priority

Recommended implementation order:

1. **Phase 1 - Foundation**
   - 01: Dashboard Layout & Structure (3-column layout)
   - 02: Event Handler Sidebar
   - 04: Code Snippet Library

2. **Phase 2 - Core Interaction**
   - 03: Drag-and-Drop System
   - 09: Workspace Block Management

3. **Phase 3 - Library Management**
   - 05: Library Tabs Management
   - 06: Custom Code Snippets

4. **Phase 4 - Content Population**
   - 07: Utilities Tab Content
   - 08: Indicators Tab Content

5. **Phase 5 - Code Generation**
   - 10: Code Assembly Engine (with event handler integration)
   - 11: Code Preview System (showing enabled handlers)
   - 12: Save & Export System

## 🛠️ Technical Stack Reference

All PRPs assume:
- **Framework**: React-based (Next.js, Vite, or similar)
- **Drag-and-Drop**: React DnD, dnd-kit, or native HTML5 drag API
- **Storage**: Browser localStorage for custom snippets and workspace state
- **Code Highlighting**: Prism.js, highlight.js, or Monaco Editor
- **Testing**: Playwright for E2E tests, Jest for unit tests
- **Styling**: Tailwind CSS or CSS modules
- **Target Language**: MetaQuotes Language 5 (MQL5)

## 🔧 Global Variable Management System

### Overview
The MQL5 Expert Advisor Builder automatically generates global variable blocks when code snippets are added to the workspace. This system provides fine-grained control over variable declarations and positioning.

### Key Features
- **Automatic Generation**: Dragging certain snippets (indicators, utilities) creates mini global variable blocks
- **Independent Positioning**: Global variable blocks can be repositioned separately from main code blocks
- **Visual Distinction**: Mini blocks with special styling (light blue background, smaller size, 🔹 icon)
- **Manual Value Input (Primary Feature)**: Each global shows an **editable input field** for filling in default values
- **Real-Time Validation**: Live feedback as user types (green=valid, red=invalid with constraints)
- **Multiple Input Types**: Number inputs, sliders, toggles, spinners based on variable type
- **Auto-Grouping**: Global variables automatically group in a dedicated section at top of workspace
- **Keyboard Navigation**: Tab between fields, arrow keys for increments, Enter to save
- **Bulk Editing**: Select multiple globals and edit values together
- **Value Presets**: Quick presets (Conservative, Aggressive, Fast, Slow) for common scenarios
- **Dependency Tracking**: System shows which main blocks use each global variable
- **Smart Deletion**: Warns if deleting a global variable that's in use

### Example: Indicator Snippet with Globals

```typescript
// When user drags "Average True Range" indicator:
// System creates 2 blocks:

// Block 1: Mini Global Variable Block
{
  id: 'global_atr_period_123',
  type: 'global_variable',
  linkedTo: 'atr_indicator_123',
  code: 'int g_indicator_atr_period = 14;',
  variable: 'g_indicator_atr_period',
  defaultValue: 14,
  editable: true
}

// Block 2: Main Code Block
{
  id: 'atr_indicator_123',
  type: 'indicator',
  title: 'Average True Range',
  dependencies: ['global_atr_period_123'],
  code: `int g_atr_handle = iATR(_Symbol, PERIOD_CURRENT, g_indicator_atr_period);`
}
```

### Snippets That Generate Globals

| Snippet Category | Examples | Generated Globals |
|------------------|----------|-------------------|
| **Indicators** | MA, RSI, MACD, BB, ATR, Stochastic | Period, deviation, thresholds, handles |
| **Risk Management** | Trailing Stop, Position Sizing | Risk %, max loss, trailing pips |
| **Time Filters** | Trading Hours, Session Filter | Start/end hours, day of week |
| **Trade Management** | Max Positions, Spread Filter | Max positions, max spread |

### Implementation Guidelines for AI Assistants

1. **Define Global Mapping**: Each snippet should declare which globals it requires
2. **Generate Mini Blocks**: When snippet dropped, create separate global variable blocks with input fields
3. **Design Input Fields**: Always show editable input field for value (not just static text)
4. **Input Field Styling**: 
   - Default state: Light gray background, subtle border
   - Focus state: Blue border, text selected, helper text visible
   - Invalid state: Red border, error message below
   - Modified state: Bold text, green checkmark, light green background tint
5. **Validation Logic**: Implement min/max/step constraints with real-time feedback
6. **Input Types**: Use appropriate input based on variable type (number, decimal, boolean toggle, text)
7. **Keyboard Support**: Tab navigation, Enter to save, Escape to cancel, arrows for increment
8. **Position in Globals Section**: Auto-place globals at top, above event handlers
9. **Track Dependencies**: Maintain reference from global to main blocks
10. **Warn on Delete**: Show warning modal if global is used elsewhere
11. **Visual Linking**: Highlight connected blocks when hovering over global
12. **Bulk Edit UI**: Support selecting multiple globals and editing together
13. **Preset System**: Implement quick preset buttons for common value sets

## 💡 Tips for AI Assistants

1. **Always reference `.github/copilot-instructions.md`** first for project-wide patterns
2. **Drag-and-drop libraries**: Choose appropriate library (React DnD for complex, HTML5 for simple)
3. **LocalStorage for persistence**: Custom snippets, tabs, workspace configurations, and global variable values
4. **MQL5 syntax validation**: Implement basic checks for common MQL5 syntax errors
5. **Code assembly order**: Follow proper EA structure (globals → headers → inputs → OnInit → OnTick → functions)
6. **Visual feedback**: Provide clear drag states, drop zones, and insertion indicators
7. **Global variable system**: Auto-generate mini blocks for globals, allow independent repositioning
8. **Dependency tracking**: Maintain links between global variables and code blocks that use them

## 📝 Contributing

When adding new PRPs:
1. Follow the established structure
2. Include all required sections
3. Provide specific code examples
4. Document edge cases thoroughly
5. Update this index file

---

**Last Updated**: November 13, 2025
**Total PRPs**: 13
**Total Features Documented**: 13 core MQL5 Expert Advisor Builder features
**Application Type**: Drag-and-Drop Code Assembly Dashboard for MetaTrader 5 with Documentation Management

## 🆕 Recent Updates

### November 13, 2025 - Event Handler Sidebar, Global Variable Management & Documentations Tab

**Event Handler Sidebar (PRP #02)**
- Added comprehensive Event Handler Sidebar
- All EAs now include OnInit and OnDeinit by default
- 13 optional event handlers can be toggled: OnStart, OnTick, OnCalculate, OnTimer, OnTrade, OnTradeTransaction, OnBookEvent, OnChartEvent, OnTester, OnTesterInit, OnTesterDeinit, OnTesterPass
- Updated dashboard layout to 3-column structure (sidebar, workspace, library)
- Code Assembly Engine now integrates with event handler selections

**Automatic Global Variable Generation**
- Code snippets now automatically generate associated global variable mini blocks
- Global variables (e.g., `g_indicator_atr_period = 14`) appear as separate, repositionable blocks
- Always-visible input fields for manual value editing (primary feature)
- Auto-grouping of global variables in dedicated section at top of workspace
- Real-time validation with visual feedback (green/red borders)
- Multiple input types (number inputs, sliders, toggles, spinners)
- Keyboard navigation and bulk editing support
- Dependency tracking between globals and main code blocks
- Smart deletion warnings when globals are in use
- Visual indicators (🔹 icon, light blue styling, state-based colors)

**Documentations Tab (PRP #8b)**
- New default tab: "Documentations" for custom written text documentation
- Create strategy explanations, parameter guides, setup instructions
- Markdown formatting support with preview mode
- Organize by categories (Strategy, Parameters, Setup, Troubleshooting, Journal, Notes)
- Tag system for easy search and filtering
- Export/import documentation as .txt, .md, or .pdf files
- Reference material that stays in library (not dragged to workspace)
- Split-screen workflow to reference docs while building EA

**Updated Features**
- Library Tabs (PRP #05) now includes Documentations as 4th default tab
- Workspace Management (PRP #09) now includes global variable block management with styled input fields
- Code Assembly Engine (PRP #10) includes global variable section generation
- Updated feature dependencies and implementation priority
