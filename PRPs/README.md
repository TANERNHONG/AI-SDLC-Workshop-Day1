# Product Requirement Prompts (PRPs) - Index

This directory contains detailed Product Requirement Prompts split by feature for the MQL5 Expert Advisor Builder. Each PRP provides comprehensive guidance for implementing a specific feature using AI coding assistants.

## 📋 PRP Files

### Core Features

1. **[01-sidebar-navigation.md](01-sidebar-navigation.md)** - Sidebar Navigation System
   - Collapsible left sidebar (64px collapsed, 240px expanded)
   - Multi-page navigation architecture (Dashboard, Trading Journal, Settings, Templates, Documentation, Export History)
   - Icon-only (collapsed) and full menu (expanded) modes
   - Keyboard shortcut support (Ctrl/Cmd + B)
   - State persistence in localStorage
   - Future-ready for feature expansion

1b. **Trading Journal with Trading Calendar** (Planned - Sidebar Page 2)
   - Comprehensive trading journal tool accessible from sidebar
   - Trading calendar with 4 view modes (Day, Week, Month, Yearly)
   - CSV import for bulk trade data
   - Manual trade entry with + button (9 fields: Type, Volume, Symbol, Date/Time, P/L, Broker, Platform, Security Type, Comments)
   - Color-coded calendar days (green = profitable, red = loss)
   - Daily statistics display (Volume, # of trades, Win rate, P/L, Comments)
   - Trade history tracking and analysis

2. **[02-event-handler-tab.md](02-event-handler-tab.md)** - Event Handler Tab
   - Tab in the Code Library (right side) for managing event handlers
   - Toggle MQL5 event handler functions on/off
   - Required handlers: OnInit, OnDeinit (always included)
   - Optional handlers: OnStart, OnTick, OnCalculate, OnTimer, OnTrade, OnTradeTransaction, OnBookEvent, OnChartEvent, OnTester, OnTesterInit, OnTesterDeinit, OnTesterPass
   - Visual indicators for enabled/disabled handlers
   - Best practices guidance for handler selection

### Workspace Features

3. **[03-workspace-management-globals.md](03-workspace-management-globals.md)** - Workspace Block Management with Global Variables
   - Block organization and ordering
   - Expand/collapse code blocks
   - Configure block parameters
   - Delete and reorder blocks
   - **Automatic global variable generation and management**
   - **Mini global variable blocks creation**
   - **Global variable section auto-grouping**
   - **Independent repositioning of global variables**
   - **Manual value input fields with real-time validation**
   - **Keyboard navigation and bulk editing support**

### Features Planned (Not Yet Implemented)

4. **Dashboard Layout & Structure** (Planned)
   - Three-section view: sidebar (left), workspace (center), library (right)
   - Bottom bar for preview and save functions
   - Responsive layout design
   - Visual feedback zones
   - Integration with sidebar navigation

5. **Drag-and-Drop System** (Planned)
   - Drag snippets from library to workspace
   - Visual feedback during drag operations
   - Drop zone highlighting and validation
   - Block reordering in workspace

6. **Code Snippet Library** (Planned)
   - Pre-built MQL5 code snippets
   - Solid border draggable blocks
   - Snippet categorization and display
   - Description and parameter documentation

7. **Library Tabs Management** (Planned)
   - Default tabs: Utilities, Indicators, Pre-made Functions, Event Handlers, Documentations
   - Create new tabs with + button
   - Tab switching and navigation
   - Rename and delete custom tabs

8. **Custom Code Snippets** (Planned)
   - Add custom snippets with dotted border interface
   - Snippet creation modal with validation
   - Edit and delete custom snippets
   - Move snippets between tabs

9. **Utilities Tab Content** (Planned)
   - Position sizing functions
   - Risk management utilities
   - Time filters and session checks
   - Account and price utilities

10. **Indicators Tab Content** (Planned)
    - Trend indicators (MA, MACD, ADX)
    - Momentum indicators (RSI, Stochastic)
    - Volatility indicators (Bollinger, ATR)
    - Signal detection logic

11. **Documentations Tab Content** (Planned)
    - Custom written documentation in text form
    - Strategy explanations and parameter guides
    - Setup instructions and troubleshooting notes
    - Trading journal entries
    - Markdown formatting support
    - Categories, tags, and search functionality
    - Export/import documentation files
    - Reference material (non-code)

12. **Code Assembly Engine** (Planned)
    - Combine blocks into complete EA structure
    - Proper MQL5 file structure with toggleable event handlers
    - Global variables section generation (auto-positioned at top)
    - Variable and function ordering
    - Dependency resolution
    - Integration with Event Handler Tab
    - Link global variable blocks to main code blocks

13. **Code Preview System** (Planned)
    - Preview modal with syntax highlighting
    - Statistics panel (lines, functions, blocks, enabled handlers)
    - Copy to clipboard functionality
    - Basic syntax validation

14. **Save & Export System** (Planned)
    - Export as .txt file for MetaEditor
    - Automatic filename with timestamp
    - Workspace configuration save/load
    - Version management support

15. **Trading Journal & Calendar** (Planned - High Priority)
    - Sidebar page 2: Comprehensive trading journal tool
    - Trading calendar with 4 view modes (Day/Week/Month/Yearly)
    - CSV import for bulk trade history
    - Manual trade entry form (9 fields: Type, Volume, Symbol, Date/Time, P/L, Broker, Platform, Security Type, Comments)
    - Color-coded calendar visualization (green = profitable day, red = loss day)
    - Daily statistics overlay (Volume, # trades, Win rate %, P/L, Comments)
    - Trade filtering, search, and analytics
    - Export journal data as CSV/PDF
    - Integration with EA testing results

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
Sidebar Navigation (01) → Trading Journal (15), Settings, Templates, Documentation, Export History
Dashboard Layout (04) → All other features (foundation)
Event Handler Tab (02) → Code Assembly (12)
Drag-Drop System (05) → Workspace Management (03)
Code Snippet Library (06) → Library Tabs (07), Custom Snippets (08)
Library Tabs (07) → Utilities (09), Indicators (10), Custom Snippets (08)
Workspace Management (03) → Code Assembly (12), Code Preview (13)
Event Handler Tab (02) + Code Assembly (12) → Code Preview (13), Save/Export (14)
Trading Journal (15) → Independent feature (can implement standalone after Sidebar Navigation)
```

## 📊 Implementation Priority

Recommended implementation order:

1. **Phase 1 - Foundation** (Completed)
   - ✅ 01: Sidebar Navigation System
   - ✅ 02: Event Handler Tab
   - ✅ 03: Workspace Block Management with Global Variables

2. **Phase 2 - Layout & Trading Tools** (Planned)
   - 04: Dashboard Layout & Structure (3-column layout)
   - 05: Drag-and-Drop System
   - 15: Trading Journal & Calendar (High Priority - Sidebar Page 2)

3. **Phase 3 - Library System** (Planned)
   - 06: Code Snippet Library
   - 07: Library Tabs Management
   - 08: Custom Code Snippets

4. **Phase 4 - Content Population** (Planned)
   - 09: Utilities Tab Content
   - 10: Indicators Tab Content
   - 11: Documentations Tab Content

5. **Phase 5 - Code Generation** (Planned)
   - 12: Code Assembly Engine (with event handler integration)
   - 13: Code Preview System (showing enabled handlers)
   - 14: Save & Export System

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
**Total PRPs**: 3 (Implemented) + 12 (Planned) = 15 Features
**PRPs Completed**: 3/15 (20% complete)
**Application Type**: Drag-and-Drop Code Assembly Dashboard for MetaTrader 5 with Trading Journal & Documentation Management

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

**Documentations Tab (PRP #11 - Planned)**
- New default tab: "Documentations" for custom written text documentation
- Create strategy explanations, parameter guides, setup instructions
- Markdown formatting support with preview mode
- Organize by categories (Strategy, Parameters, Setup, Troubleshooting, Journal, Notes)
- Tag system for easy search and filtering
- Export/import documentation as .txt, .md, or .pdf files
- Reference material that stays in library (not dragged to workspace)
- Split-screen workflow to reference docs while building EA

**Updated Features**
- Library Tabs (PRP #07) now includes Documentations as 5th default tab (planned)
- Workspace Management (PRP #03) now includes global variable block management with styled input fields
- Code Assembly Engine (PRP #12) includes global variable section generation (planned)
- Updated feature dependencies and implementation priority
