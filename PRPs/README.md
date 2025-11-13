# Product Requirement Prompts (PRPs) - Index

This directory contains detailed Product Requirement Prompts split by feature for the MQL5 Expert Advisor Builder. Each PRP provides comprehensive guidance for implementing a specific feature using AI coding assistants.

## 📋 PRP Files

### Core Features

1. **[01-dashboard-layout.md](01-dashboard-layout.md)** - Dashboard Layout & Structure
   - Split view: workspace (left) and library (right)
   - Bottom bar for preview and save functions
   - Responsive layout design
   - Visual feedback zones

2. **[02-drag-drop-system.md](02-drag-drop-system.md)** - Drag-and-Drop System
   - Drag snippets from library to workspace
   - Visual feedback during drag operations
   - Drop zone highlighting and validation
   - Block reordering in workspace

3. **[03-code-snippet-library.md](03-code-snippet-library.md)** - Code Snippet Library
   - Pre-built MQL5 code snippets
   - Solid border draggable blocks
   - Snippet categorization and display
   - Description and parameter documentation

### Library Management

4. **[04-library-tabs.md](04-library-tabs.md)** - Library Tabs Management
   - Default tabs: Utilities, Indicators, Pre-made Functions
   - Create new tabs with + button
   - Tab switching and navigation
   - Rename and delete custom tabs

5. **[05-custom-snippets.md](05-custom-snippets.md)** - Custom Code Snippets
   - Add custom snippets with dotted border interface
   - Snippet creation modal with validation
   - Edit and delete custom snippets
   - Move snippets between tabs

6. **[06-utilities-tab.md](06-utilities-tab.md)** - Utilities Tab Content
   - Position sizing functions
   - Risk management utilities
   - Time filters and session checks
   - Account and price utilities

7. **[07-indicators-tab.md](07-indicators-tab.md)** - Indicators Tab Content
   - Trend indicators (MA, MACD, ADX)
   - Momentum indicators (RSI, Stochastic)
   - Volatility indicators (Bollinger, ATR)
   - Signal detection logic

### Workspace Features

8. **[08-workspace-management.md](08-workspace-management.md)** - Workspace Block Management
   - Block organization and ordering
   - Expand/collapse code blocks
   - Configure block parameters
   - Delete and reorder blocks

9. **[09-code-assembly.md](09-code-assembly.md)** - Code Assembly Engine
   - Combine blocks into complete EA structure
   - Proper MQL5 file structure (headers, OnInit, OnTick)
   - Variable and function ordering
   - Dependency resolution

10. **[10-code-preview.md](10-code-preview.md)** - Code Preview System
    - Preview modal with syntax highlighting
    - Statistics panel (lines, functions, blocks)
    - Copy to clipboard functionality
    - Basic syntax validation

### Export Features

11. **[11-save-export.md](11-save-export.md)** - Save & Export System
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
Drag-Drop System (02) → Workspace Management (08)
Code Snippet Library (03) → Library Tabs (04), Custom Snippets (05)
Library Tabs (04) → Utilities (06), Indicators (07), Custom Snippets (05)
Workspace Management (08) → Code Assembly (09), Code Preview (10)
Code Assembly (09) → Code Preview (10), Save/Export (11)
```

## 📊 Implementation Priority

Recommended implementation order:

1. **Phase 1 - Foundation**
   - 01: Dashboard Layout & Structure
   - 03: Code Snippet Library

2. **Phase 2 - Core Interaction**
   - 02: Drag-and-Drop System
   - 08: Workspace Block Management

3. **Phase 3 - Library Management**
   - 04: Library Tabs Management
   - 05: Custom Code Snippets

4. **Phase 4 - Content Population**
   - 06: Utilities Tab Content
   - 07: Indicators Tab Content

5. **Phase 5 - Code Generation**
   - 09: Code Assembly Engine
   - 10: Code Preview System
   - 11: Save & Export System

## 🛠️ Technical Stack Reference

All PRPs assume:
- **Framework**: React-based (Next.js, Vite, or similar)
- **Drag-and-Drop**: React DnD, dnd-kit, or native HTML5 drag API
- **Storage**: Browser localStorage for custom snippets and workspace state
- **Code Highlighting**: Prism.js, highlight.js, or Monaco Editor
- **Testing**: Playwright for E2E tests, Jest for unit tests
- **Styling**: Tailwind CSS or CSS modules
- **Target Language**: MetaQuotes Language 5 (MQL5)

## 💡 Tips for AI Assistants

1. **Always reference `.github/copilot-instructions.md`** first for project-wide patterns
2. **Drag-and-drop libraries**: Choose appropriate library (React DnD for complex, HTML5 for simple)
3. **LocalStorage for persistence**: Custom snippets, tabs, and workspace configurations
4. **MQL5 syntax validation**: Implement basic checks for common MQL5 syntax errors
5. **Code assembly order**: Follow proper EA structure (headers → inputs → globals → OnInit → OnTick → functions)
6. **Visual feedback**: Provide clear drag states, drop zones, and insertion indicators

## 📝 Contributing

When adding new PRPs:
1. Follow the established structure
2. Include all required sections
3. Provide specific code examples
4. Document edge cases thoroughly
5. Update this index file

---

**Last Updated**: November 13, 2025
**Total PRPs**: 11
**Total Features Documented**: 11 core MQL5 Expert Advisor Builder features
**Application Type**: Drag-and-Drop Code Assembly Dashboard for MetaTrader 5
