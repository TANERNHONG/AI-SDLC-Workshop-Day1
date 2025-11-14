# MQL5 Expert Advisor Builder - Comprehensive User Guide

## Table of Contents
1. [Getting Started](#1-getting-started)
2. [Dashboard Layout](#2-dashboard-layout)
   - [Sidebar Navigation](#sidebar-navigation)
   - [Dashboard Sections](#dashboard-sections)
3. [Trading Journal & Calendar](#3-trading-journal--calendar)
   - [Adding Trades](#adding-trades)
   - [CSV Import](#csv-import)
   - [Calendar Views](#calendar-views)
   - [Daily Statistics](#daily-statistics)
4. [Code Snippet Library](#4-code-snippet-library)
5. [Event Handler Tab](#5-event-handler-tab)
6. [Drag-and-Drop Functionality](#6-drag-and-drop-functionality)
7. [Library Tabs Management](#7-library-tabs-management)
8. [Adding Custom Code Snippets](#8-adding-custom-code-snippets)
9. [Code Block Organization](#9-code-block-organization)
10. [Utilities Tab](#10-utilities-tab)
11. [Indicators Tab](#11-indicators-tab)
12. [Pre-made Functions Tab](#12-pre-made-functions-tab)
13. [Documentations Tab](#13-documentations-tab)
14. [Code Preview](#14-code-preview)
15. [Saving Expert Advisors](#15-saving-expert-advisors)
16. [Best Practices](#16-best-practices)
17. [Troubleshooting](#troubleshooting)

---

## 1. Getting Started

### What It Does
The MQL5 Expert Advisor Builder is a visual drag-and-drop dashboard that allows you to assemble fully functioning Expert Advisors (EAs) for MetaTrader 5 without writing code from scratch. Build sophisticated trading bots by combining pre-built code snippets.

### How to Use
1. Access the dashboard through your web browser (localhost:3000)
2. The sidebar on the far left provides navigation (currently showing Dashboard)
3. Browse the code snippet library on the right side
4. Drag code blocks to the workspace in the center
5. Arrange blocks in the correct execution order
6. Preview the assembled code
7. Save your Expert Advisor as a .txt file

### Key Features
- ✅ Expandable sidebar navigation for multi-page architecture
- ✅ Visual drag-and-drop interface
- ✅ Pre-built MQL5 code snippets
- ✅ Toggleable MQL5 event handlers
- ✅ Custom snippet creation
- ✅ Multiple organized library tabs
- ✅ Real-time code assembly
- ✅ Code preview before saving
- ✅ Export as .txt for MetaEditor
- ✅ Future-ready for additional pages and features

---

## 2. Dashboard Layout

### What It Does
The dashboard features an expandable left sidebar for navigation, plus two main work sections: a workspace in the center and a code library on the right.

### Sidebar Navigation

The **left-side navigation sidebar** enables multi-page navigation and future feature expansion:

**Collapsed State (Default):**
- 64px wide vertical bar on the far left
- Shows icon-only navigation buttons
- Minimizes screen space for maximum workspace
- Click the hamburger menu icon (☰) to expand

**Expanded State:**
- 240px wide sidebar panel
- Shows full navigation menu with icons and labels
- Displays current page indicator
- Click hamburger icon again to collapse

**Navigation Pages:**
1. **🏠 Dashboard** - Main EA builder interface (active)
2. **📊 Trading Journal** - Trading calendar and performance tracking (planned)
3. **⚙️ Settings** - Application preferences (future)
4. **📋 Templates** - Saved EA templates (future)
5. **📚 Documentation** - Help and guides (future)
6. **📦 Export History** - Previously exported EAs (future)

**Keyboard Shortcut:**
- `Ctrl/Cmd + B` - Toggle sidebar collapse/expand

**Benefits:**
- **Future-Ready**: Designed for adding new pages and features
- **Space Efficient**: Collapsed mode maximizes workspace area
- **Quick Navigation**: Easy switching between app sections
- **State Persistence**: Sidebar state saved in localStorage

### Dashboard Sections

| Section | Location | Purpose |
|---------|----------|---------|  
| **Sidebar** | Far left (collapsible) | Navigate between pages, access settings and future features |
| **Workspace** | Center-left | Drop zone for assembling code blocks |
| **Code Library** | Right side | Browse and select code snippets (includes Event Handler tab) |
| **Bottom Bar** | Bottom | Preview and save functions |### Code Library (Right Side)

#### Purpose
- Repository of all available code snippets
- Organized by category in tabs (including Event Handlers)
- Source for drag-and-drop blocks
- Control which MQL5 event handler functions are included
- Custom snippet management

#### Features
- **Required Handlers** (Always included):
  - ✅ OnInit - Initialization function (always active)
  - ✅ OnDeinit - Deinitialization function (always active)

- **Optional Handlers** (Toggle on/off):
  - ☐ OnStart - Program start handler
  - ☐ OnTick - New tick event handler (most common for EAs)
  - ☐ OnCalculate - Calculate event handler (for custom indicators)
  - ☐ OnTimer - Timer event handler
  - ☐ OnTrade - Trade event handler
  - ☐ OnTradeTransaction - Trade transaction handler
  - ☐ OnBookEvent - Depth of market event handler
  - ☐ OnChartEvent - Chart event handler
  - ☐ OnTester - Tester event handler
  - ☐ OnTesterInit - Tester initialization handler
  - ☐ OnTesterDeinit - Tester deinitialization handler
  - ☐ OnTesterPass - Tester pass handler

## 5. Event Handler Tab

### What It Does
The Event Handler tab is located in the Code Library on the right side of the dashboard, alongside Utilities, Indicators, Pre-made Functions, and Documentations tabs. It allows you to control which MQL5 event handler functions are included in your Expert Advisor.

### How to Use
1. **Click the Event Handler tab** in the library (right side of dashboard)
2. **Review required handlers** (grayed out, always included)
3. **Click toggle switch** next to optional handlers to enable/disable
4. **Enabled handlers** show checkmark and green indicator
5. **Code assembly** automatically includes enabled handlers in proper order

#### Event Handler Details

**OnStart**
- Called at program start (before OnInit)
- Rare usage, mainly for scripts
- Use case: One-time setup before initialization

**OnTick** (Most Common)
- Called on every new price tick
- Primary handler for Expert Advisors
- Use case: Check signals, manage trades on each tick

**OnCalculate**
- Called when custom indicator needs recalculation
- Used in indicators, not typical EAs
- Use case: Calculate custom indicator values

**OnTimer**
- Called at specified time intervals
- Requires EventSetTimer() in OnInit
- Use case: Periodic checks, time-based actions

**OnTrade**
- Called when trade event occurs on account
- Use case: Track order execution, position changes

**OnTradeTransaction**
- Called on trade transaction events
- More detailed than OnTrade
- Use case: Advanced trade tracking, transaction logging

**OnBookEvent**
- Called on Depth of Market changes
- Requires MarketBookAdd() in OnInit
- Use case: Level 2 data analysis, DOM trading

**OnChartEvent**
- Called on chart events (clicks, key presses, custom events)
- Use case: Interactive EAs, GUI controls, user input

**OnTester**
- Called during strategy tester optimization
- Use case: Custom optimization criteria

**OnTesterInit/OnTesterDeinit**
- Called at start/end of testing
- Use case: Initialize/cleanup test resources

**OnTesterPass**
- Called after optimization pass
- Use case: Process optimization results

### Best Practices

✅ **For Standard Trading EAs**: Enable OnTick only
✅ **For Time-Based EAs**: Enable OnTick + OnTimer
✅ **For Event-Driven EAs**: Enable OnTick + OnTrade or OnTradeTransaction
✅ **For Interactive EAs**: Enable OnTick + OnChartEvent
✅ **For Strategy Tester**: Enable OnTester when optimizing

⚠️ **Avoid**: Enabling handlers you don't use (adds unnecessary code)
⚠️ **Remember**: OnInit and OnDeinit are always included

---

## 3. Trading Journal & Calendar

### What It Does
The Trading Journal is a comprehensive tool for tracking and analyzing your trading performance over time. Access it by clicking **📊 Trading Journal** in the sidebar navigation (Page 2).

### Overview
- Visual trading calendar with color-coded performance days
- Manual trade entry and CSV import capabilities
- Multiple calendar view modes (Day, Week, Month, Yearly)
- Daily statistics and performance metrics
- Trade filtering, search, and export functionality
- Integration with EA backtesting results

---

### Adding Trades

#### Manual Trade Entry

1. **Click the + Button** in the top-right corner of the Trading Journal page
2. **Fill in the Trade Entry Form** with the following information:

| Field | Description | Example |
|-------|-------------|---------|
| **Type** | Buy or Sell | Buy |
| **Volume** | Trade size in lots | 0.10 |
| **Symbol** | Trading pair/instrument | EURUSD |
| **Date / Time** | Trade execution timestamp | 2025-11-13 14:30:00 |
| **Profit / Loss** | Net P/L in account currency | +45.50 |
| **Broker** | Broker name | IC Markets |
| **Platform** | Trading platform used | MetaTrader 5 |
| **Security Type** | Asset class | Forex |
| **Comments** | Trade notes and strategy | MA crossover entry, exited at TP |

3. **Click Save** to add the trade to your journal
4. **Trade appears** on the calendar on the corresponding date

#### Quick Tips
- ✅ Use consistent formatting for symbols (e.g., always EURUSD, not EUR/USD)
- ✅ Add detailed comments for later analysis
- ✅ Include strategy name in comments for filtering
- ⚠️ Negative P/L values should include minus sign (-25.00)

---

### CSV Import

#### Import Multiple Trades at Once

1. **Prepare Your CSV File** with the following column headers:
   ```
   Type,Volume,Symbol,DateTime,ProfitLoss,Broker,Platform,SecurityType,Comments
   ```

2. **Example CSV Format:**
   ```csv
   Type,Volume,Symbol,DateTime,ProfitLoss,Broker,Platform,SecurityType,Comments
   Buy,0.10,EURUSD,2025-11-13 09:30:00,45.50,IC Markets,MetaTrader 5,Forex,MA crossover entry
   Sell,0.05,GBPUSD,2025-11-13 11:15:00,-12.30,IC Markets,MetaTrader 5,Forex,Failed breakout
   Buy,0.20,USDJPY,2025-11-13 14:45:00,78.20,IC Markets,MetaTrader 5,Forex,Trend continuation
   ```

3. **Click Import CSV** button in the Trading Journal toolbar
4. **Select your CSV file** from your computer
5. **Review the import preview** showing how many trades will be imported
6. **Click Confirm Import**
7. **Trades populate** the calendar automatically by date

#### CSV Import Tips
- ✅ Export trades directly from MetaTrader 5 or broker platform
- ✅ Ensure DateTime format matches: YYYY-MM-DD HH:MM:SS
- ✅ Use commas as delimiters, no extra spaces
- ✅ Test with a small sample file first (5-10 trades)
- ⚠️ Duplicate trades (same DateTime, Symbol, Volume) will be flagged

---

### Calendar Views

The trading calendar supports **4 view modes** to analyze performance at different time scales:

#### 1. Day View
- **Hourly breakdown** of all trades on a single day
- Timeline showing exact trade execution times
- Cumulative P/L graph throughout the day
- Trade-by-trade list with details
- **Use Case**: Analyze intraday trading patterns, identify best trading hours

#### 2. Week View
- **7-day calendar grid** (Monday-Sunday)
- Each day shows:
  - Color coding (green = profitable, red = loss, gray = no trades)
  - Net P/L for the day
  - Number of trades
- Week totals in footer
- **Use Case**: Review weekly performance, identify best trading days

#### 3. Month View (Default)
- **Full calendar month** with 28-31 days displayed
- Each day cell shows:
  - **Background color**: Green (profit), Red (loss), Gray (no trades)
  - **Volume**: Total lots traded
  - **# of Trades**: Count of positions
  - **Win Rate**: % of winning trades
  - **P/L**: Net profit/loss
  - **Comments icon** (📝) if day has general notes
- Month totals and averages in sidebar
- **Use Case**: Monthly performance review, consistency analysis

#### 4. Yearly View
- **12-month overview** with mini calendars
- Each month shows:
  - Color intensity based on monthly P/L (darker green = higher profit)
  - Monthly net P/L
  - Total trades count
  - Best/worst trading day
- Annual statistics in header
- **Use Case**: Long-term trend analysis, seasonal patterns

---

### Daily Statistics

Each day on the calendar displays the following key metrics:

#### Volume
- **Total lots traded** on that day
- Example: `2.5 lots` (sum of all trade volumes)
- Helps identify high-activity vs low-activity days

#### Number of Trades
- **Count of positions** opened on that day
- Example: `12 trades`
- Useful for overtrading analysis

#### Win Rate
- **Percentage of winning trades** on that day
- Formula: `(Winning Trades / Total Trades) × 100`
- Example: `75%` (9 winners out of 12 trades)
- Color coded: Green >60%, Yellow 40-60%, Red <40%

#### Profit / Loss
- **Net P/L in account currency** for that day
- Example: `+$245.50` or `-$87.30`
- Determines day background color (green/red)
- Includes all commissions and swaps if imported from MT5

#### General Comments
- **Day-level notes** (not tied to specific trade)
- Example: "Market volatile due to NFP news"
- Click 📝 icon to add/edit comments
- Useful for noting market conditions, emotional state, lessons learned

---

### Additional Features

#### Trade Filtering & Search
- Filter by: Date range, Symbol, Broker, P/L (profitable/loss), Trade type (Buy/Sell)
- Search comments for strategy names or keywords
- Quick filters: "Last 7 days", "This month", "Profitable only"

#### Export & Reporting
- Export journal as CSV (for Excel analysis)
- Generate PDF report with monthly summaries
- Share calendar view as image for social media/coaching

#### Performance Analytics
- Win rate trends over time
- Profit factor (gross profit / gross loss)
- Average win vs average loss
- Best/worst trading days
- Symbol performance breakdown
- Time-of-day heatmap

#### Integration with EA Builder
- Import backtest results from exported EAs
- Compare live trading vs backtested performance
- Tag trades as "EA" or "Manual" for strategy comparison

---

### Best Practices

✅ **Daily Journaling**: Add comments immediately after trading session
✅ **Consistency**: Use same symbol notation across all entries
✅ **Detail Comments**: Include strategy, market conditions, emotions, mistakes
✅ **Weekly Reviews**: Analyze win rate and identify patterns every weekend
✅ **CSV Backups**: Export journal monthly as backup

⚠️ **Avoid**: Skipping trade entry (incomplete journal reduces insight value)
⚠️ **Avoid**: Vague comments like "good trade" (be specific: "Followed plan, waited for confirmation")

---

## 4. Code Snippet Library

### Workspace (Left Side)

#### Purpose
- Main area for building your Expert Advisor
- Drag code blocks here from the library on the right
- Arrange blocks in execution order
- Vertical stacking of code snippets
- Visual representation of your EA structure

#### Features
- Large drop zone for code blocks
- Visual feedback when dragging
- Automatic scrolling for long code sequences
- Block reordering capability
- Delete functionality for each block

### Code Library (Right Side)

#### Purpose
- Repository of all available code snippets
- Organized by category in tabs
- Source for drag-and-drop blocks
- Custom snippet management

#### Features
- Tabbed interface for organization
- Toggle between different categories
- Search functionality (if implemented)
- Expandable/collapsible sections
- Add custom snippets interface

### Bottom Bar

#### Purpose
- Control panel for final operations
- Preview assembled code
- Save Expert Advisor file
- Export functionality

#### Features
- **Preview Button**: View complete assembled code
- **Save Button**: Export as .txt file
- **Status Indicators**: Show file readiness
- **Error Notifications**: Alert to issues

---

## 6. Drag-and-Drop Functionality

### What It Does
Provides a comprehensive collection of pre-built MQL5 code snippets organized into logical categories for easy access and reusability.

### Library Structure

The library is organized into tabs, each containing related code snippets:

#### Default Tabs
1. **Utilities**: Helper functions, calculations, conversions
2. **Indicators**: Technical indicators, signals, analysis
3. **Pre-made Functions**: Complete trading logic blocks

### Visual Design

#### Snippet Blocks
- **Solid Border**: Indicates draggable code snippet
- **Title Bar**: Shows snippet name
- **Description**: Brief explanation of functionality
- **Drag Handle**: Icon indicating draggability
- **Syntax Highlighting**: Color-coded for readability

#### Example Block Layout
```
┌─────────────────────────────────┐
│ 📋 Calculate Lot Size           │ ← Title
├─────────────────────────────────┤
│ Calculates position size based  │ ← Description
│ on account balance and risk %   │
└─────────────────────────────────┘
```

### Snippet Information

Each code block displays:
- **Name**: Clear identifier (e.g., "Moving Average Crossover")
- **Category**: Tab it belongs to (Utilities/Indicators/Functions)
- **Parameters**: Input variables required
- **Return Type**: What the function returns
- **Dependencies**: Other snippets it requires

---

## 6b. Drag-and-Drop Functionality (Duplicate Section - To Be Merged)

### What It Does
Intuitive drag-and-drop system for assembling your Expert Advisor by moving code snippets from the library to the workspace.

### How to Use

#### Dragging a Snippet
1. **Locate** the desired code snippet in the library (right side)
2. **Click and Hold** on the snippet block
3. **Drag** the block toward the workspace (left side)
4. **Position** the block where you want it in the sequence
5. **Release** to drop the block into place

#### Visual Feedback

**While Dragging**:
- 🖱️ Cursor changes to indicate drag mode
- 📦 Snippet block follows mouse pointer
- 🎯 Drop zones highlight when hovering
- 📍 Insertion indicator shows placement

**On Hover Over Workspace**:
- Highlighted drop zone (light blue/green background)
- Dotted line showing insertion point
- Adjacent blocks shift to show space
- Invalid drop zones grayed out (if any)

**On Successful Drop**:
- ✅ Block appears in workspace
- ✅ Blocks re-arrange automatically
- ✅ Smooth animation
- ✅ Original snippet remains in library (copy operation)

### Workspace Management

#### Arranging Blocks
- **Reorder**: Drag existing blocks up or down
- **Insert Between**: Drop between existing blocks
- **Top/Bottom**: Drop at start or end of sequence
- **Auto-spacing**: Blocks automatically space evenly

#### Removing Blocks
1. Locate the block you want to remove
2. Click the **✕** button (top-right of block)
3. Block removed immediately
4. Surrounding blocks shift to fill gap
5. No confirmation needed (can re-add from library)

### Drag Behavior

#### Valid Drop Zones
- ✅ Empty workspace (first block)
- ✅ Between existing blocks
- ✅ Before first block
- ✅ After last block

#### Invalid Operations
- ❌ Cannot drop outside workspace
- ❌ Cannot drop on bottom bar
- ❌ Cannot drop snippet on itself

### Multi-Block Operations

#### Copying vs. Moving
- **From Library to Workspace**: COPY (snippet stays in library)
- **Within Workspace**: MOVE (block relocates)
- **From Workspace to Library**: Not supported (use custom snippets)

#### Unlimited Usage
- Use same snippet multiple times
- Each instance is independent
- Modify parameters per instance
- No limit on workspace blocks

---

## 7. Library Tabs Management

### What It Does
Organize your code snippets into custom categories using a tabbed interface with the ability to create, rename, and manage tabs.

### Default Tabs

The application comes with three pre-configured tabs:

| Tab Name | Purpose | Example Contents |
|----------|---------|------------------|
| **Utilities** | Helper functions, calculations | Lot size calculator, time filters, trailing stop |
| **Indicators** | Technical analysis tools | MA, RSI, MACD, Bollinger Bands |
| **Pre-made Functions** | Complete logic blocks | Entry logic, exit logic, risk management |

### Creating New Tabs

#### How to Create
1. Locate the **+ button** in the tab bar (right side of tabs)
2. Click the **+** button
3. Modal/prompt appears requesting tab details:
   - **Tab Name**: Enter descriptive name (required)
   - **Description**: Purpose of the tab (optional)
   - **Icon**: Select icon or emoji (optional)
4. Click **"Create"** to finalize
5. New tab appears in tab bar

#### Tab Naming Best Practices
- Use clear, descriptive names (e.g., "Order Management")
- Keep names short (15 characters or less)
- Use categories meaningful to your workflow
- Examples:
  - "Risk Management"
  - "Entry Signals"
  - "Exit Strategies"
  - "Position Sizing"
  - "Time Filters"

### Tab Navigation

#### Switching Between Tabs
1. Click on any tab name in the tab bar
2. Active tab highlights (colored background)
3. Library content changes to show tab's snippets
4. Previous tab content hidden
5. Smooth transition animation

#### Tab Indicators
- **Active Tab**: Bold text, colored background
- **Inactive Tab**: Normal text, neutral background
- **Tab Count**: Badge showing number of snippets (if implemented)
- **+ Tab**: Always visible at the end

### Managing Existing Tabs

#### Renaming Tabs
1. **Right-click** on tab name (or click edit icon)
2. **Edit** modal appears with current name
3. **Change** name as needed
4. Click **"Update"** to save
5. Tab name updates in tab bar

#### Deleting Tabs
1. **Right-click** on tab name (or click ✕ icon)
2. **Confirmation** dialog appears
3. Warning: "Delete tab and all its snippets?"
4. Click **"Delete"** to confirm
5. Tab and its custom snippets removed

**Important Notes**:
- ⚠️ Default tabs (Utilities, Indicators, Pre-made Functions) cannot be deleted
- ⚠️ Deleting a tab removes all custom snippets within it
- ⚠️ Does NOT affect blocks already in workspace
- ⚠️ Action cannot be undone

#### Reordering Tabs
1. **Drag** tab name left or right in tab bar
2. **Drop** in desired position
3. Tab order updates
4. Custom preference saved (if implemented)

### Custom Tab Organization

#### Use Cases for Custom Tabs

**By Strategy Type**:
- "Scalping Functions"
- "Swing Trading"
- "Grid Systems"
- "Martingale Logic"

**By Trading Concept**:
- "Breakout Detection"
- "Trend Following"
- "Mean Reversion"
- "News Trading"

**By Functionality**:
- "Trade Management"
- "Money Management"
- "Notification System"
- "Debugging Tools"

**By Asset Class**:
- "Forex Specific"
- "Crypto Tools"
- "Index Trading"
- "Commodity Functions"

**By Documentation Purpose**:
- "Strategy Explanations"
- "Parameter Guides"
- "Setup Instructions"
- "Troubleshooting Notes"
- "Changelog & Updates"
- "Trading Journal"

### Tab Persistence

#### Storage
- Tab configuration saved to browser localStorage
- Persists across sessions
- Survives page refresh
- User-specific (per browser)

#### Backup
- Export tab configuration (if implemented)
- Includes tab names and structure
- Does not include snippet code
- Restore on new device/browser

---

## 8. Adding Custom Code Snippets

### What It Does
Create and save your own reusable MQL5 code snippets that integrate seamlessly with the pre-built library.

### Adding a Custom Snippet

#### Location
- Navigate to any library tab
- Scroll to the bottom of the snippet list
- Find the **dotted border box** with **"+ Add Custom Snippet"** text

#### Visual Indicator
```
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│                               │
│  + Add Custom Snippet         │ ← Dotted border
│                               │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

#### How to Add

**Step 1: Click Add Box**
1. Click on the dotted border box
2. Modal opens: "Create Custom Snippet"
3. Form fields appear

**Step 2: Fill in Details**
- **Snippet Name** (required): Descriptive identifier
  - Example: "Custom Fibonacci Retracement"
- **Description** (optional): What the snippet does
  - Example: "Calculates Fib levels from recent swing high/low"
- **Code** (required): MQL5 code block
  - Paste or type your code
  - Syntax highlighting (if supported)
  - Multi-line text area
- **Category** (auto-selected): Current tab
  - Can change via dropdown
- **Parameters** (optional): List input variables
  - Helps with documentation

**Step 3: Validate Code**
- Optional syntax check (if implemented)
- Validates basic MQL5 syntax
- Checks for common errors
- Provides feedback

**Step 4: Save**
1. Click **"Save Snippet"** button
2. Validation runs
3. Snippet added to current tab
4. Appears with solid border like pre-built snippets
5. Immediately usable via drag-and-drop

### Custom Snippet Form

#### Required Fields
```
┌─────────────────────────────────────┐
│ Create Custom Snippet               │
├─────────────────────────────────────┤
│ Name: [________________]            │
│                                     │
│ Description (optional):             │
│ [________________________________]  │
│                                     │
│ Code:                               │
│ ┌─────────────────────────────────┐ │
│ │ // Your MQL5 code here          │ │
│ │ double CalculateCustom() {      │ │
│ │    // ...                       │ │
│ │ }                               │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Category: [Utilities ▼]             │
│                                     │
│ [Cancel]  [Save Snippet]            │
└─────────────────────────────────────┘
```

### Managing Custom Snippets

#### Editing Custom Snippets
1. **Right-click** on snippet block
2. Select **"Edit"** from context menu
3. Modal reopens with current values
4. Modify as needed
5. Click **"Update"** to save changes

#### Deleting Custom Snippets
1. **Right-click** on snippet block
2. Select **"Delete"** from context menu
3. Confirmation: "Delete this snippet?"
4. Click **"Delete"** to confirm
5. Snippet removed from library

**Important**:
- ⚠️ Cannot delete pre-built snippets (only custom ones)
- ⚠️ Does NOT remove blocks already in workspace
- ⚠️ Action cannot be undone

#### Moving Between Tabs
1. Edit the custom snippet
2. Change **Category** dropdown to different tab
3. Save changes
4. Snippet moves to selected tab

### Custom Snippet Features

#### What's Saved
- ✅ Snippet name
- ✅ Description
- ✅ MQL5 code
- ✅ Category/tab assignment
- ✅ Creation date
- ✅ Last modified date
- ✅ Parameter documentation

#### Storage
- Saved in browser localStorage
- Persists across sessions
- User-specific
- Export/import capability (if implemented)

### Code Examples for Custom Snippets

#### Example 1: Simple Utility Function
```mql5
// Calculate pip value
double CalculatePipValue(string symbol) {
   double tickSize = SymbolInfoDouble(symbol, SYMBOL_TRADE_TICK_SIZE);
   double tickValue = SymbolInfoDouble(symbol, SYMBOL_TRADE_TICK_VALUE);
   double point = SymbolInfoDouble(symbol, SYMBOL_POINT);
   return (tickValue / tickSize) * point;
}
```

#### Example 2: Indicator Calculation
```mql5
// Custom RSI with alerts
bool IsRSIOverbought(string symbol, int period, double level) {
   double rsi[];
   int handle = iRSI(symbol, PERIOD_CURRENT, period, PRICE_CLOSE);
   CopyBuffer(handle, 0, 0, 1, rsi);
   return (rsi[0] > level);
}
```

#### Example 3: Position Management
```mql5
// Close all positions for symbol
void CloseAllPositions(string symbol) {
   for(int i = PositionsTotal() - 1; i >= 0; i--) {
      ulong ticket = PositionGetTicket(i);
      if(PositionSelectByTicket(ticket)) {
         if(PositionGetString(POSITION_SYMBOL) == symbol) {
            trade.PositionClose(ticket);
         }
      }
   }
}
```

### Best Practices for Custom Snippets

#### Code Quality
- ✅ Write clear, commented code
- ✅ Use descriptive variable names
- ✅ Follow MQL5 naming conventions
- ✅ Test code in MetaEditor first
- ✅ Handle errors gracefully
- ✅ Document parameters and return values

#### Organization
- 📁 Create dedicated tabs for custom snippets
- 📁 Group related snippets together
- 📁 Use consistent naming schemes
- 📁 Add detailed descriptions
- 📁 Update descriptions when modifying code

#### Reusability
- ♻️ Write modular, self-contained functions
- ♻️ Minimize dependencies
- ♻️ Use parameters for flexibility
- ♻️ Avoid hard-coded values
- ♻️ Make snippets composable

---

## 9. Code Block Organization

### What It Does
Efficiently manage and organize code blocks in your workspace to create a logical, well-structured Expert Advisor. When code snippets are added, the system automatically creates associated global variable blocks that can be independently positioned.

### Automatic Global Variable Generation

#### What It Does
When you drag certain code snippets to the workspace, the system automatically creates mini code snippet blocks for associated global variables. These appear as separate, repositionable blocks that manage variable declarations.

#### How It Works

**Example: Adding an ATR Indicator**

1. **Drag "Average True Range" snippet** from Indicators tab to workspace
2. **System automatically creates two blocks**:
   - 📊 **Global Variable Block** (mini snippet): `int g_indicator_atr_period = 14;`
   - 📋 **Main Code Block**: ATR indicator initialization and usage
3. **Both blocks appear in workspace** as independent, draggable items
4. **Global variable block** automatically positioned near top (variable declaration section)
5. **Main code block** positioned where you dropped it

#### Visual Representation

```
Workspace After Dragging ATR Indicator:

┌─────────────────────────────────────┐
│ 🔹 Global: ATR Period          [✕] │ ← Mini global variable block
├─────────────────────────────────────┤
│ int g_indicator_atr_period = 14;   │
└─────────────────────────────────────┘
        ↓ (can be repositioned)

┌─────────────────────────────────────┐
│ 📊 Average True Range          [✕] │ ← Main code block
├─────────────────────────────────────┤
│ Initialize and calculate ATR        │
│ Uses: g_indicator_atr_period       │
└─────────────────────────────────────┘
```

#### Snippets That Generate Global Variables

**Indicators (Automatically create globals)**:
- 📊 **Moving Average** → `int g_ma_period = 20;` + `int g_ma_shift = 0;`
- 📊 **RSI** → `int g_rsi_period = 14;` + `double g_rsi_overbought = 70.0;` + `double g_rsi_oversold = 30.0;`
- 📊 **MACD** → `int g_macd_fast = 12;` + `int g_macd_slow = 26;` + `int g_macd_signal = 9;`
- 📊 **Bollinger Bands** → `int g_bb_period = 20;` + `double g_bb_deviation = 2.0;`
- 📊 **ATR** → `int g_indicator_atr_period = 14;`
- 📊 **Stochastic** → `int g_stoch_k = 5;` + `int g_stoch_d = 3;` + `int g_stoch_slowing = 3;`

**Utilities (May create globals)**:
- 🔧 **Trailing Stop** → `double g_trailing_stop_pips = 20.0;` + `bool g_trailing_enabled = true;`
- 🔧 **Risk Management** → `double g_risk_percent = 1.0;` + `double g_max_daily_loss = 5.0;`
- 🔧 **Time Filter** → `int g_trade_start_hour = 8;` + `int g_trade_end_hour = 18;`

**Trading Logic (May create globals)**:
- 💼 **Position Sizing** → `double g_lot_size = 0.01;` + `bool g_use_dynamic_lots = true;`
- 💼 **Trade Management** → `int g_max_positions = 3;` + `double g_max_spread = 3.0;`

#### Global Variable Block Features

**Mini Block Appearance**:
- 🔹 Smaller height than main blocks (compact design)
- 🔹 Special icon indicating global variable
- 🔹 Lighter background color (visual distinction)
- 🔹 Shows variable name with **editable input field** for default value
- 💡 **Input field always visible** - click to edit, type new value
- 📝 Real-time validation as you type (shows min/max constraints)
- 🔹 Includes delete button [✕]
- ✨ Hover shows edit cursor to indicate editability

**Independence**:
- ✅ Can be repositioned separately from main block
- ✅ Can be deleted independently (with confirmation)
- ✅ Main block references the global variable
- ✅ Deleting global block shows warning if used by other blocks

**Automatic Positioning**:
- 📍 Global variable blocks auto-sort to top of workspace
- 📍 Appear before OnInit and OnDeinit sections
- 📍 Group together with other global variables
- 📍 Can be manually reordered within global section

### Block Structure in Workspace

Each dropped code block displays:

#### Block Header
```
┌─────────────────────────────────────┐
│ 📋 Calculate Lot Size          [✕]  │ ← Title + Delete button
├─────────────────────────────────────┤
```

#### Block Content
```
│ Description:                        │
│ Calculates position size based on   │
│ risk percentage                     │
│                                     │
│ Parameters:                         │
│ • riskPercent: 1.0 - 5.0           │
│ • stopLossPips: integer            │
│                                     │
│ Returns: double (lot size)          │
└─────────────────────────────────────┘
```

### Block Actions

#### Reordering Blocks
1. **Click and hold** on a block in the workspace
2. **Drag** up or down
3. **Drop** in new position
4. Visual indicator shows insertion point
5. Blocks rearrange automatically

#### Expanding/Collapsing
- Click **▼** to expand and view full code
- Click **▲** to collapse and hide code
- Collapsed view shows only title
- Expanded view shows full MQL5 code

#### Configuring Parameters
1. Click **⚙️ Configure** button on block
2. Modal opens with parameter inputs
3. Modify values as needed
4. Values inserted into code template
5. Click **"Apply"** to save

#### Managing Global Variable Blocks

**Editing Global Variables (Primary Feature)**

Global variable blocks are designed for **easy manual editing** of default values:

1. **Visual Design**: Each block shows an **input field** for the value
2. **Click to Edit**: Click directly on the value field to edit
3. **Type New Value**: Input field accepts keyboard input immediately
4. **Live Validation**: 
   - Green border = valid value
   - Red border = invalid (out of range)
   - Tooltip shows allowed range (e.g., "1-100")
5. **Auto-Save**: Press Enter, Tab, or click outside to save
6. **Undo**: Press Escape to cancel and revert to previous value
7. **Visual Feedback**: Changed values show in **bold** or with ✓ indicator

**Example: Editing ATR Period**
```
Default View:
┌─────────────────────────────────────┐
│ 🔹 int g_indicator_atr_period = [14▼] │ ← Input field visible
└─────────────────────────────────────┘

While Editing:
┌─────────────────────────────────────┐
│ 🔹 int g_indicator_atr_period = [20]│ ← Active input with cursor
│    Range: 1-100 | Step: 1          │ ← Validation hint
└─────────────────────────────────────┘

After Saving:
┌─────────────────────────────────────┐
│ 🔹 int g_indicator_atr_period = 20 ✓│ ← Bold + checkmark
└─────────────────────────────────────┘
```

**Input Field Features**:
- ⌨️ **Number Spinner**: Up/down arrows for numeric values
- 🎚️ **Slider Option**: Toggle to show slider for range-based values
- 🔢 **Step Increment**: Arrow keys increment by defined step (e.g., 5 for RSI levels)
- 📋 **Copy Value**: Right-click to copy current value
- ↩️ **Reset to Default**: Button to restore original default value

**Deleting Global Variable Blocks**
1. **Click [✕]** button on global variable block
2. **Warning appears** if variable is used by other blocks:
   ```
   ⚠️ Warning: This global variable is used by:
   - Average True Range (Indicators)
   - Volatility Stop Loss (Utilities)
   
   Deleting it may cause compilation errors.
   Continue? [Cancel] [Delete Anyway]
   ```
3. **If unused**: Block deleted immediately
4. **If used**: Choose to delete anyway or cancel

**Repositioning Global Variables**
- **Drag** global variable blocks up/down within workspace
- **Snap to global section**: Blocks auto-group with other globals
- **Visual guide**: Dotted line separates globals from functions
- **Auto-sort option**: Toggle to keep globals alphabetically sorted

**Linking Indicators**
- Global variable blocks show **🔗 Used by** indicator
- Clicking **🔗** icon highlights related main blocks
- Hover shows dependency tree
- Color-coded connections in workspace

### Input Field Styling and User Experience

#### Visual Design of Editable Fields

Global variable blocks prioritize **ease of editing** with clear visual cues:

**Default State (Unfocused)**:
```css
┌─────────────────────────────────────┐
│ 🔹 int g_ma_period = [  20  ] [✕] │
│                       ↑              │
│                  Input field         │
│                  (light gray bg)     │
└─────────────────────────────────────┘
```
- Light gray background in input area
- Subtle border indicating clickable
- Hover shows darker border + cursor change

**Focused State (Active Editing)**:
```css
┌─────────────────────────────────────┐
│ 🔹 int g_ma_period = [  50  ] [✕] │
│                       ↑              │
│                  Blue border         │
│                  Text selected       │
│   [Reset] Range: 1-500              │
└─────────────────────────────────────┘
```
- Blue border indicating active focus
- Text auto-selected for quick replacement
- Helper text appears below (range, step)
- Reset button visible

**Invalid State (Validation Error)**:
```css
┌─────────────────────────────────────┐
│ 🔹 int g_ma_period = [ -10  ] [✕] │
│                       ↑              │
│                  Red border          │
│   ⚠️ Must be between 1 and 500      │
└─────────────────────────────────────┘
```
- Red border for invalid input
- Error message with specific constraint
- Value not saved until valid

**Modified State (Changed from Default)**:
```css
┌─────────────────────────────────────┐
│ 🔹 int g_ma_period = [  50  ] ✓[✕]│
│                       ↑              │
│                  Bold text           │
│                  Green checkmark     │
└─────────────────────────────────────┘
```
- Bold text for modified values
- Green checkmark indicates saved change
- Different background (light green tint)

#### Input Types by Variable Type

**Integer Values** (e.g., periods, counts):
- Standard number input
- Up/down spinner buttons
- Step increment (typically 1)
- Min/max constraints shown
- Example: `g_ma_period` → `[  20  ]` with ⬆️⬇️

**Decimal Values** (e.g., percentages, ratios):
- Number input with decimal support
- Step increment (e.g., 0.1, 0.5)
- Optional slider toggle
- Example: `g_risk_percent` → `[  1.5  ]` with precision controls

**Boolean Values** (e.g., enabled/disabled):
- Toggle switch instead of input field
- ON/OFF states clearly labeled
- Example: `g_trailing_enabled` → `[ON] / [OFF]` toggle

**String Values** (e.g., comments, symbols):
- Text input field
- Character limit shown
- Example: `g_comment` → `[My EA v1.0]` with "12/50 chars"

#### Keyboard Shortcuts for Editing

| Key | Action |
|-----|--------|
| **Click** | Focus input field, select all text |
| **Tab** | Save and move to next global variable |
| **Shift+Tab** | Save and move to previous global variable |
| **Enter** | Save and unfocus (stay on same block) |
| **Escape** | Cancel edit, revert to previous value |
| **↑ / ↓** | Increment/decrement by step value |
| **Ctrl+Z** | Undo last change |
| **Ctrl+R** | Reset to original default value |
| **Ctrl+C** | Copy current value to clipboard |

#### Bulk Editing Features

**Select Multiple Globals**:
1. Ctrl+Click on multiple global variable blocks
2. Selected blocks highlight in blue
3. Edit panel appears: "Editing 3 variables"
4. Bulk actions available:
   - Reset all to defaults
   - Apply percentage change (+10%, -20%)
   - Set all to same value
   - Copy/paste values between blocks

**Quick Presets**:
- "Conservative" preset (lower risk values)
- "Aggressive" preset (higher risk values)
- "Fast" preset (shorter indicator periods)
- "Slow" preset (longer indicator periods)
- Custom presets saveable by user

### Global Variable Section Management

#### Auto-Grouping
The workspace automatically maintains a **Global Variables section** at the top:

```
Workspace Structure:

┌─────────────────────────────────────┐
│     GLOBAL VARIABLES SECTION        │ ← Auto-grouped area
├─────────────────────────────────────┤
│ 🔹 g_indicator_atr_period = 14;    │
│ 🔹 g_ma_period = 20;               │
│ 🔹 g_rsi_period = 14;              │
│ 🔹 g_risk_percent = 1.0;           │
└─────────────────────────────────────┘
        ═══════════════════════════ ← Separator
┌─────────────────────────────────────┐
│     EVENT HANDLERS & FUNCTIONS      │
├─────────────────────────────────────┤
│ ✅ OnInit                          │
│ ✅ OnDeinit                        │
│ 📊 OnTick                          │
└─────────────────────────────────────┘
        ───────────────────────────
┌─────────────────────────────────────┐
│     MAIN CODE BLOCKS               │
├─────────────────────────────────────┤
│ 📊 Average True Range              │
│ 📈 Moving Average Crossover        │
│ 💼 Calculate Lot Size              │
└─────────────────────────────────────┘
```

#### Section Controls
- **Collapse/Expand Global Section**: Click section header to toggle
- **Sort Globals**: Button to alphabetically sort all global variables
- **Add Manual Global**: + button to add custom global variable
- **Bulk Edit**: Select multiple globals to edit simultaneously

#### Visual Cues
- 🔹 **Light blue background** for global variable section
- 📍 **Position indicator** showing "Globals" label
- ══ **Thick separator line** between sections
- 🔢 **Count badge** showing number of global variables

### Block Ordering Best Practices

#### Typical EA Structure Order

**1. Global Variable Declarations** (Auto-grouped at top)
```
- 🔹 Indicator parameters (g_ma_period, g_rsi_period, g_atr_period)
- 🔹 Trading parameters (g_lot_size, g_risk_percent, g_max_positions)
- 🔹 Risk management (g_trailing_stop_pips, g_max_daily_loss)
- 🔹 Time filters (g_trade_start_hour, g_trade_end_hour)
- 🔹 Indicator handles (g_ma_handle, g_rsi_handle, g_atr_handle)
```

**2. Input Parameters** (Optional - can be added manually)
```
- User-configurable inputs
- Exposed in EA properties panel
- Override global defaults
```

**3. Event Handler Functions** (Managed by Event Handler Sidebar)
```
- ✅ OnInit() - Required
- ✅ OnDeinit() - Required
- 📊 OnTick() - If enabled
- ⏱️ OnTimer() - If enabled
- 💼 OnTrade() - If enabled
```

**4. Initialization Logic** (Inside OnInit)
```
- Indicator initialization
- Setup code from dragged blocks
- EventSetTimer() if using OnTimer
```

**5. Main Trading Logic** (Inside OnTick or other handlers)
```
- Entry signal detection
- Position management
- Trade execution
```

**6. Utility Functions** (Bottom of file)
```
- Helper functions
- Calculations
- Validation functions
```

**5. Order Management**
```
- Trade execution
- Position modification
- Trade closing logic
```

#### Example Order (With Auto-Generated Global Variables)
```
Workspace Blocks (top to bottom):

═══════ GLOBAL VARIABLES SECTION ═══════
1. 🔹 Global: MA Period (g_ma_period = 20)
2. 🔹 Global: MA Shift (g_ma_shift = 0)
3. 🔹 Global: RSI Period (g_rsi_period = 14)
4. 🔹 Global: RSI Overbought (g_rsi_overbought = 70.0)
5. 🔹 Global: RSI Oversold (g_rsi_oversold = 30.0)
6. 🔹 Global: Risk Percent (g_risk_percent = 1.0)
7. 🔹 Global: Trailing Stop (g_trailing_stop_pips = 20.0)
8. 🔹 Global: MA Handle (g_ma_handle = INVALID_HANDLE)
9. 🔹 Global: RSI Handle (g_rsi_handle = INVALID_HANDLE)
══════════════════════════════════════════

═══════ EVENT HANDLERS ═══════
10. ✅ OnInit() - Required
11. ✅ OnDeinit() - Required
12. 📊 OnTick() - Enabled
══════════════════════════════════════════

═══════ MAIN CODE BLOCKS ═══════
13. 📈 Moving Average Indicator Setup
14. 📊 RSI Indicator Setup
15. 🔍 MA Crossover Signal Detection
16. 🔍 RSI Overbought/Oversold Detection
17. 💰 Calculate Lot Size
18. 📥 Open Buy Trade
19. 📤 Open Sell Trade
20. 🛡️ Trailing Stop Function
21. ❌ Close All Positions Function
══════════════════════════════════════════
```

#### Workflow Example: Building an EA with Global Variables

**Step 1: Add Moving Average Indicator**
- Drag "Moving Average" from Indicators tab
- System creates:
  - 🔹 Mini block: `g_ma_period = 20`
  - 🔹 Mini block: `g_ma_shift = 0`
  - 📈 Main block: MA indicator setup code
- Global variables auto-positioned at top

**Step 2: Add RSI Indicator**
- Drag "RSI" from Indicators tab
- System creates:
  - 🔹 Mini block: `g_rsi_period = 14`
  - 🔹 Mini block: `g_rsi_overbought = 70.0`
  - 🔹 Mini block: `g_rsi_oversold = 30.0`
  - 📊 Main block: RSI indicator setup code
- New globals added to global section (sorted alphabetically)

**Step 3: Add Risk Management**
- Drag "Calculate Lot Size" from Utilities
- System creates:
  - 🔹 Mini block: `g_risk_percent = 1.0`
  - 💰 Main block: Lot size calculation function
- Global variable added to globals section

**Step 4: Customize Global Values (Manual Input)**
- **Click input field** in `g_ma_period` mini block (shows [20])
- **Type new value**: 50 (validation shows ✓ for valid)
- **Press Enter** to save (value turns bold: **50** ✓)
- **Click input field** in `g_rsi_period` mini block (shows [14])
- **Type new value**: 21
- **Press Tab** to save and move to next field
- **Click input field** in `g_rsi_overbought` (shows [70.0])
- **Type new value**: 75.0
- **Use up/down arrows** or spinner to fine-tune to 75.5
- All changes auto-save and immediately reflect in code preview

**Alternative Input Methods**:
- 🖱️ **Mouse**: Click value, type, click outside
- ⌨️ **Keyboard**: Tab between fields, type values, Enter to save
- 🎚️ **Slider**: Toggle slider view for visual adjustment
- ⬆️⬇️ **Spinners**: Click arrows to increment/decrement

**Step 5: Organize Blocks**
- Drag main blocks to desired order
- Global variables remain at top (locked section)
- Or enable "Free positioning" to move globals manually

**Step 6: Preview & Export**
- Click "Preview" to see assembled code
- Global variables appear at top of file
- Event handlers follow
- Main functions at bottom
- Export as .txt for MetaEditor

### Visual Organization

#### Color Coding (Optional)
- 🔵 **Blue**: Initialization code
- 🟢 **Green**: Entry signals
- 🔴 **Red**: Exit signals
- 🟡 **Yellow**: Utility functions
- ⚫ **Gray**: Variable declarations

#### Grouping
- Use visual separators between sections
- Collapse related blocks into groups
- Add comment blocks for section headers
- Maintain logical flow top-to-bottom

---

## 10. Utilities Tab

### What It Does
Provides essential helper functions and utilities for building robust Expert Advisors.

### Categories of Utilities

#### Position Sizing
- **Calculate Lot Size**: Risk-based position sizing
- **Fixed Lot Size**: Static lot calculator
- **Martingale Lot**: Progressive lot sizing
- **Anti-Martingale**: Reverse progressive sizing

#### Risk Management
- **Stop Loss Calculator**: Pip-based SL
- **Take Profit Calculator**: Risk/reward ratio
- **Trailing Stop**: Dynamic SL adjustment
- **Break Even Move**: Move SL to entry
- **Maximum Daily Loss Check**: Risk limits

#### Time Filters
- **Trading Hours Filter**: Specific time windows
- **Day of Week Filter**: Trade specific days
- **News Filter**: Avoid high-impact events
- **Session Filter**: Asian/European/US sessions

#### Account Functions
- **Get Account Balance**: Current balance
- **Get Account Equity**: Current equity
- **Check Free Margin**: Available margin
- **Calculate Risk Percentage**: Portfolio risk

#### Price Utilities
- **Get Current Price**: Bid/Ask prices
- **Calculate Pip Value**: Symbol-specific
- **Normalize Price**: Proper decimal places
- **Calculate Spread**: Current spread

#### Order Management
- **Count Open Positions**: By symbol/magic
- **Get Position Profit**: P&L calculation
- **Modify Position**: Change SL/TP
- **Close All Positions**: Emergency close

### Example: Calculate Lot Size Snippet

**Name**: Risk-Based Lot Size Calculator

**Description**: Calculates position size based on account balance, risk percentage, and stop loss distance

**Code**:
```mql5
double CalculateLotSize(double riskPercent, double stopLossPips) {
   double accountBalance = AccountInfoDouble(ACCOUNT_BALANCE);
   double riskAmount = accountBalance * (riskPercent / 100.0);
   double pipValue = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_VALUE);
   double lotSize = riskAmount / (stopLossPips * pipValue);
   
   // Normalize to lot step
   double lotStep = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_STEP);
   lotSize = MathFloor(lotSize / lotStep) * lotStep;
   
   // Apply limits
   double minLot = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MIN);
   double maxLot = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MAX);
   lotSize = MathMax(minLot, MathMin(maxLot, lotSize));
   
   return lotSize;
}
```

**Parameters**:
- `riskPercent`: Percentage of account to risk (e.g., 1.0 for 1%)
- `stopLossPips`: Distance to stop loss in pips

**Returns**: Normalized lot size (double)

---

## 11. Indicators Tab

### What It Does
Contains pre-built technical indicator functions and signal detection logic for your Expert Advisor.

### Categories of Indicators

#### Trend Indicators
- **Moving Average**: SMA, EMA, SMMA, LWMA
- **Moving Average Crossover**: Dual MA signals
- **MACD**: Signal and histogram
- **ADX**: Trend strength
- **Parabolic SAR**: Trend direction

#### Momentum Indicators
- **RSI**: Relative Strength Index
- **Stochastic**: %K and %D
- **CCI**: Commodity Channel Index
- **Momentum**: Rate of change
- **Williams %R**: Overbought/oversold

#### Volatility Indicators
- **Bollinger Bands**: Price channels
- **ATR**: Average True Range
- **Standard Deviation**: Price volatility
- **Keltner Channels**: Volatility bands

#### Volume Indicators
- **Volume**: Tick volume
- **On Balance Volume**: Cumulative volume
- **Volume Weighted Average Price**: VWAP

#### Custom Indicators
- Add your own indicator calculations
- Import third-party indicator logic
- Combine multiple indicators

### Example: Moving Average Crossover

**Name**: MA Crossover Signal Detection

**Description**: Detects bullish and bearish crossovers between fast and slow moving averages

**Code**:
```mql5
int DetectMACrossover(int fastPeriod, int slowPeriod) {
   double fastMA[], slowMA[];
   
   int fastHandle = iMA(_Symbol, PERIOD_CURRENT, fastPeriod, 0, MODE_EMA, PRICE_CLOSE);
   int slowHandle = iMA(_Symbol, PERIOD_CURRENT, slowPeriod, 0, MODE_EMA, PRICE_CLOSE);
   
   CopyBuffer(fastHandle, 0, 0, 3, fastMA);
   CopyBuffer(slowHandle, 0, 0, 3, slowMA);
   
   // Bullish crossover
   if(fastMA[1] > slowMA[1] && fastMA[2] <= slowMA[2])
      return 1;  // Buy signal
   
   // Bearish crossover
   if(fastMA[1] < slowMA[1] && fastMA[2] >= slowMA[2])
      return -1; // Sell signal
   
   return 0;     // No signal
}
```

**Parameters**:
- `fastPeriod`: Fast MA period (e.g., 10)
- `slowPeriod`: Slow MA period (e.g., 30)

**Returns**: 
- `1`: Bullish crossover (buy signal)
- `-1`: Bearish crossover (sell signal)
- `0`: No crossover

### Signal Integration

#### Combining Indicators
- Use multiple indicator snippets together
- Create confirmation logic
- Build complex signal filters
- Example: RSI + MA + Volume confirmation

---

## 12. Pre-made Functions Tab

### What It Does
Provides complete, ready-to-use trading logic blocks that combine multiple components into cohesive functions.

### Categories of Pre-made Functions

#### Complete Entry Logic
- **Trend Following Entry**: Complete buy/sell logic
- **Breakout Entry**: Channel breakout detection
- **Pullback Entry**: Retracement entry logic
- **Grid Entry**: Grid trading setup
- **Martingale Entry**: Progressive entry system

#### Complete Exit Logic
- **Fixed TP/SL Exit**: Static targets
- **Trailing Exit**: Dynamic profit protection
- **Time-Based Exit**: Close after duration
- **Indicator-Based Exit**: Signal-triggered exit
- **Break Even Exit**: Risk-free position management

#### Trade Management
- **Position Scaling**: Add to winners
- **Partial Close**: Take profits incrementally
- **Hedge Function**: Opposite position opening
- **Lock Profit**: Secure gains
- **Emergency Close All**: Panic button

#### Risk Management Systems
- **Daily Loss Limit**: Stop trading at threshold
- **Maximum Drawdown**: Account protection
- **Correlation Check**: Avoid over-exposure
- **News Event Handler**: Auto-close before news

#### Complete EA Templates
- **Simple MA EA**: Basic trend follower
- **RSI Mean Reversion**: Oversold/overbought
- **Breakout EA**: Support/resistance breaks
- **Grid Trading EA**: Range-bound system
- **Scalping EA**: Quick in-and-out trades

### Example: Complete Buy Entry Function

**Name**: Confirmation-Based Buy Entry

**Description**: Opens a buy position with multiple confirmation filters

**Code**:
```mql5
bool ExecuteBuyEntry(double riskPercent, double stopLossPips) {
   // Check if already in position
   if(PositionSelect(_Symbol)) return false;
   
   // Check multiple confirmations
   if(DetectMACrossover(10, 30) != 1) return false;  // MA bullish
   if(!IsRSIOverbought(_Symbol, 14, 70)) return true; // RSI not overbought
   if(iVolume(_Symbol, PERIOD_CURRENT, 0) < 100) return false; // Volume check
   
   // Calculate entry parameters
   double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   double stopLoss = ask - (stopLossPips * _Point * 10);
   double takeProfit = ask + (stopLossPips * 2 * _Point * 10); // 2:1 RR
   double lotSize = CalculateLotSize(riskPercent, stopLossPips);
   
   // Execute trade
   MqlTradeRequest request = {};
   MqlTradeResult result = {};
   
   request.action = TRADE_ACTION_DEAL;
   request.symbol = _Symbol;
   request.volume = lotSize;
   request.type = ORDER_TYPE_BUY;
   request.price = ask;
   request.sl = stopLoss;
   request.tp = takeProfit;
   request.deviation = 5;
   request.magic = 123456;
   
   return OrderSend(request, result);
}
```

**Parameters**:
- `riskPercent`: Risk per trade (1-5%)
- `stopLossPips`: Stop loss distance

**Returns**: `true` if trade opened successfully

---

## 13. Documentations Tab

### What It Does
The Documentations tab provides a space for creating, organizing, and managing custom written documentation in text form. Unlike code snippet tabs, this tab is designed for pure text content such as strategy explanations, parameter guides, setup instructions, trading notes, and any other written documentation you need alongside your EA development.

### Purpose
- 📝 Document your trading strategies and logic
- 📋 Create setup and configuration guides
- 💡 Store parameter explanations and reasoning
- 📊 Maintain trading journal entries
- ⚠️ Record troubleshooting tips and solutions
- 📚 Build knowledge base for your EA

### Documentation Block Features

#### Visual Appearance
Documentation blocks are distinct from code blocks:
- 📄 White/cream background (not colored like code blocks)
- 📝 Text icon instead of code icon
- 📏 Larger text area for comfortable reading/writing
- 🔤 Rich text formatting support (headings, lists, bold, italic)
- 🏷️ Title and category labels
- 🔖 Optional tags for organization

#### Block Structure
```
┌─────────────────────────────────────┐
│ 📄 Strategy Overview           [✕]  │ ← Title + Delete button
├─────────────────────────────────────┤
│ Category: Setup Guide               │
│ Tags: beginner, configuration       │
├─────────────────────────────────────┤
│                                     │
│ This EA uses a moving average       │
│ crossover strategy with RSI         │
│ confirmation...                     │
│                                     │
│ [Edit] [View Full]                  │
└─────────────────────────────────────┘
```

### Creating Documentation

#### How to Add Documentation

1. **Navigate to Documentations Tab**
   - Click "Documentations" tab in library (right side)
   - Default tab appears alongside Utilities, Indicators, Pre-made Functions

2. **Click "+ Add Documentation"**
   - Large button at top of Documentations tab
   - Opens documentation editor modal

3. **Fill in Documentation Details**:
   ```
   ┌─────────────────────────────────────┐
   │ Create Documentation                │
   ├─────────────────────────────────────┤
   │ Title: [_____________________]      │
   │                                     │
   │ Category: [Strategy ▼]              │
   │ - Strategy Explanation              │
   │ - Parameter Guide                   │
   │ - Setup Instructions                │
   │ - Troubleshooting                   │
   │ - Trading Journal                   │
   │ - General Notes                     │
   │                                     │
   │ Tags: [beginners, ma-strategy]      │
   │                                     │
   │ Content:                            │
   │ ┌─────────────────────────────────┐ │
   │ │                                 │ │
   │ │ # Moving Average Strategy       │ │
   │ │                                 │ │
   │ │ ## Overview                     │ │
   │ │ This strategy uses...           │ │
   │ │                                 │ │
   │ │ ## Parameters                   │ │
   │ │ - MA Period: 20 (faster MA)     │ │
   │ │ - MA Period: 50 (slower MA)     │ │
   │ │                                 │ │
   │ └─────────────────────────────────┘ │
   │                                     │
   │ [Cancel]  [Save Documentation]      │
   └─────────────────────────────────────┘
   ```

4. **Save and View**
   - Documentation block appears in Documentations tab
   - Can be expanded to view full content
   - Can be edited or deleted

### Documentation Categories

#### 1. Strategy Explanations
**Purpose**: Describe the trading logic and approach

**Example Content**:
```
# Trend Following Strategy

## Core Concept
This EA identifies and follows established trends using
a combination of moving averages and momentum indicators.

## Entry Rules
- 20 MA crosses above 50 MA (bullish)
- RSI > 50 (confirming strength)
- Volume > average (confirming momentum)

## Exit Rules
- Trailing stop at 20 pips
- Fixed take profit at 2:1 risk/reward
- Close on opposite signal

## Best Timeframes
- H1 for swing trades
- M15 for day trading
```

#### 2. Parameter Guides
**Purpose**: Explain what each parameter does and how to optimize

**Example Content**:
```
# Parameter Configuration Guide

## MA_Period (Default: 20)
- **What it does**: Controls the moving average calculation period
- **Lower values (10-15)**: More sensitive, faster signals
- **Higher values (30-50)**: More stable, fewer false signals
- **Recommended**: 20 for EURUSD H1, 14 for GBPUSD M15

## Risk_Percent (Default: 1.0)
- **What it does**: Percentage of account to risk per trade
- **Conservative**: 0.5% - 1.0%
- **Moderate**: 1.5% - 2.0%
- **Aggressive**: 2.5% - 5.0%
- **Warning**: Never exceed 5% per trade

## StopLoss_Pips (Default: 30)
- **What it does**: Distance to stop loss in pips
- **Tight stops (10-20)**: For scalping, higher loss rate
- **Medium stops (30-50)**: Balanced approach
- **Wide stops (60+)**: For swing trading, lower frequency
```

#### 3. Setup Instructions
**Purpose**: Step-by-step guide for installing and configuring the EA

**Example Content**:
```
# EA Setup Instructions

## Installation
1. Save EA file to: MT5/MQL5/Experts/
2. Restart MetaTrader 5
3. EA appears in Navigator under "Expert Advisors"

## Configuration
1. Drag EA onto desired chart (EURUSD H1 recommended)
2. Settings window opens automatically
3. Configure these key parameters:
   - Risk_Percent: 1.0 (start conservative)
   - MA_Fast: 20
   - MA_Slow: 50
   - StopLoss_Pips: 30
4. Click OK to enable

## Verification
✓ Check "AutoTrading" button is enabled (top toolbar)
✓ Smiley face in top-right corner (EA running)
✓ Check "Experts" tab for initialization message
✓ Monitor "Trade" tab for first signal

## First Trade Checklist
□ Demo account only for first month
□ Risk_Percent set to 0.5% or lower
□ Monitor for 1 week before leaving unattended
□ Verify stop loss and take profit are set correctly
```

#### 4. Troubleshooting Notes
**Purpose**: Common issues and solutions

**Example Content**:
```
# Troubleshooting Guide

## EA Not Opening Trades

### Check 1: AutoTrading Enabled?
- Click "AutoTrading" button on toolbar (should be green)
- Go to Tools > Options > Expert Advisors
- Check "Allow automated trading"

### Check 2: Position Limits
- Check "Max_Positions" parameter (default: 3)
- Close existing positions if limit reached
- Verify margin is sufficient

### Check 3: Time Filter
- Check if "Trade_Start_Hour" and "Trade_End_Hour" active
- Current time must be within trading window
- Consider timezone differences

## EA Losing Money

### Common Causes:
1. **Too tight stop loss**: Increase StopLoss_Pips
2. **Over-trading**: Reduce MA sensitivity (increase period)
3. **Wrong timeframe**: Strategy designed for H1
4. **High spread pairs**: Use major pairs (EURUSD, GBPUSD)

### Immediate Actions:
- Reduce Risk_Percent to 0.5%
- Switch to demo account
- Review last 20 trades for patterns
- Consider different symbol or timeframe
```

#### 5. Trading Journal
**Purpose**: Record observations, results, and optimizations

**Example Content**:
```
# Trading Journal - November 2025

## Week 1 (Nov 1-7)
- **Pairs tested**: EURUSD, GBPUSD
- **Timeframe**: H1
- **Results**: 12 trades, 7 wins, 5 losses (58% win rate)
- **Profit**: +3.2%
- **Observations**: 
  - GBPUSD too volatile with 30 pip SL
  - EURUSD working well during London session
  - Friday trades underperforming

## Optimization Changes (Nov 8)
- Increased StopLoss_Pips to 40 for GBPUSD
- Added time filter: no trading after 16:00 GMT Friday
- Reduced MA_Fast from 20 to 15 for faster entries

## Week 2 (Nov 8-14)
- **Results**: 15 trades, 10 wins, 5 losses (66% win rate)
- **Profit**: +4.8%
- **Notes**: Improvements confirmed, keeping changes
```

#### 6. General Notes
**Purpose**: Any other written information needed

**Example Content**:
- Todo lists for EA enhancements
- Ideas for new features
- Market condition observations
- Broker-specific notes
- Backtesting results summary

### Managing Documentation

#### Viewing Documentation
- **Collapsed View**: Shows title, category, and first 2 lines
- **Expanded View**: Click to view full content
- **Full Screen**: Click "View Full" for modal with entire text
- **Print**: Option to print documentation
- **Export**: Save as .txt or .md file

#### Editing Documentation
1. Click **✏️ Edit** button on documentation block
2. Editor modal opens with current content
3. Modify title, category, tags, or content
4. Click **"Update"** to save changes
5. History maintained (optional versioning)

#### Organizing Documentation
- **Search**: Search box at top of Documentations tab
- **Filter by Category**: Dropdown to show only specific category
- **Filter by Tags**: Click tag to show all docs with that tag
- **Sort**: By date created, title, or category
- **Pin Important**: Pin docs to top of list

#### Deleting Documentation
1. Click **✕** button on documentation block
2. Confirmation: "Delete this documentation?"
3. Click **"Delete"** to confirm
4. Documentation removed (not recoverable unless exported)

### Documentation in Workspace

#### Documentation vs Code Blocks
Documentation blocks **cannot** be dragged to workspace:
- ❌ Not part of the EA code
- ❌ Not included in export
- ✅ Reference material only
- ✅ Stays in library for consultation

#### Using Documentation While Building
**Split Screen Workflow**:
1. Pin important documentation to top
2. Expand documentation to read while working
3. Reference parameters while configuring global variables
4. Follow setup guide step-by-step
5. Check troubleshooting if issues arise

**Example Workflow**:
```
Left Side (Workspace):          Right Side (Library):
┌─────────────────────┐        ┌─────────────────────┐
│ 🔹 g_ma_period = 20 │        │ 📄 Parameter Guide  │
│ 🔹 g_risk_pct = 1.0 │        │ (Expanded)          │
│                     │        │                     │
│ ✅ OnInit           │        │ MA_Period: 20       │
│ ✅ OnDeinit         │        │ Default works well  │
│ 📊 OnTick           │        │ for H1...           │
│                     │        │                     │
│ 📈 MA Indicator     │        │ Risk_Percent: 1.0   │
│ 💰 Calculate Lots   │        │ Start conservative  │
└─────────────────────┘        └─────────────────────┘
```

### Documentation Templates

#### Quick Templates
Pre-made templates for common documentation types:

**Strategy Template**:
```
# [Strategy Name]

## Overview
[Brief description of strategy]

## Entry Conditions
- Condition 1
- Condition 2
- Condition 3

## Exit Conditions
- Exit rule 1
- Exit rule 2

## Risk Management
- Stop loss: [X] pips
- Take profit: [Y] pips
- Risk per trade: [Z]%

## Best Markets
- Currency pairs: 
- Timeframes:
- Sessions:
```

**Parameter Template**:
```
# [Parameter Name]

## Default Value
[X]

## What It Does
[Explanation]

## Range
- Minimum: [min]
- Maximum: [max]
- Recommended: [value]

## Impact
- Lower values: [effect]
- Higher values: [effect]

## Optimization Tips
[Advice]
```

**Setup Template**:
```
# Setup Guide

## Prerequisites
- [ ] Item 1
- [ ] Item 2

## Installation Steps
1. Step 1
2. Step 2
3. Step 3

## Configuration
Parameter | Value | Notes
----------|-------|------
Param1    | X     | Why
Param2    | Y     | Why

## Verification
- [ ] Check 1
- [ ] Check 2
```

### Markdown Support

#### Formatting Options
Documentation supports Markdown syntax:

- **Headings**: `#`, `##`, `###`
- **Bold**: `**text**`
- **Italic**: `*text*`
- **Lists**: `- item` or `1. item`
- **Checkboxes**: `- [ ] task` or `- [x] done`
- **Code**: `` `inline` `` or ` ```block``` `
- **Links**: `[text](url)`
- **Tables**: Pipe syntax
- **Blockquotes**: `> quote`
- **Horizontal Rule**: `---`

#### Preview Mode
- Toggle between **Edit** and **Preview** mode
- Preview shows formatted Markdown
- Edit shows raw Markdown syntax
- Split view option for side-by-side

### Export and Backup

#### Export Documentation
1. Select documentation block
2. Click **⬇️ Export** button
3. Choose format:
   - `.txt` - Plain text
   - `.md` - Markdown format
   - `.pdf` - Formatted PDF (requires plugin)
4. Save to local file system

#### Bulk Export
- Export all documentation at once
- Creates `.zip` file with all docs
- Preserves folder structure by category
- Includes metadata (date, tags, category)

#### Import Documentation
- Click **"Import Docs"** button
- Select `.txt` or `.md` files
- Auto-detects category from filename
- Batch import multiple files

### Best Practices

#### Documentation Organization
✅ **Do**:
- Create docs as you build the EA
- Use descriptive titles (not "Doc 1", "Doc 2")
- Add relevant tags for searchability
- Keep parameter guides updated when changing values
- Document "why" not just "what"
- Use templates for consistency

❌ **Don't**:
- Create one massive document (split into topics)
- Forget to update docs when code changes
- Use overly technical jargon without explanation
- Skip documentation for "obvious" things
- Leave todos incomplete indefinitely

#### Documentation Categories Guide
- **Strategy**: High-level approach and logic
- **Parameters**: Detailed variable explanations
- **Setup**: Step-by-step installation
- **Troubleshooting**: Problem-solution pairs
- **Journal**: Time-based observations
- **Notes**: Everything else

#### Naming Conventions
Good titles:
- ✅ "MA Crossover Strategy Overview"
- ✅ "Risk Management Parameters Guide"
- ✅ "Initial Setup for MT5"

Bad titles:
- ❌ "Strategy"
- ❌ "Notes"
- ❌ "Document 1"

---

## 14. Code Preview

### What It Does
View the complete assembled MQL5 code before saving, allowing you to verify structure, check for errors, and understand the final output.

### Accessing Preview

#### Location
- **Bottom bar** of the dashboard
- **"👁️ Preview Code"** button (blue)
- Located next to "Save" button
- Always visible regardless of workspace state

#### How to Open Preview
1. Arrange code blocks in workspace as desired
2. Click **"👁️ Preview Code"** button
3. Modal popup appears
4. Full assembled code displayed
5. Syntax highlighting active

### Preview Modal

#### Modal Structure
```
┌─────────────────────────────────────────────┐
│  Expert Advisor Code Preview           [✕]  │
├─────────────────────────────────────────────┤
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │ //+--------------------------------------------------+ │
│  │ //| Expert Advisor Name             │ │
│  │ //+--------------------------------------------------+ │
│  │                                       │ │
│  │ // Input parameters                  │ │
│  │ input double RiskPercent = 1.0;      │ │
│  │ input int StopLossPips = 50;         │ │
│  │                                       │ │
│  │ // Global variables                  │ │
│  │ int maHandle;                         │ │
│  │                                       │ │
│  │ // OnInit function                   │ │
│  │ int OnInit() {                        │ │
│  │    // Initialization code             │ │
│  │    return INIT_SUCCEEDED;             │ │
│  │ }                                     │ │
│  │                                       │ │
│  │ // OnTick function                   │ │
│  │ void OnTick() {                       │ │
│  │    // Main logic                      │ │
│  │ }                                     │ │
│  │                                       │ │
│  │ // Custom functions                  │ │
│  │ double CalculateLotSize(...) { }     │ │
│  │                                       │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  📊 Statistics:                             │
│  • Total Lines: 245                         │
│  • Functions: 12                            │
│  • Code Blocks: 8                           │
│                                             │
│  [📋 Copy to Clipboard]  [💾 Save]  [Close] │
└─────────────────────────────────────────────┘
```

### Preview Features

#### Syntax Highlighting
- **Keywords**: Blue (int, double, void, if, for)
- **Functions**: Purple (OnInit, OnTick, custom functions)
- **Strings**: Green ("EURUSD", "Symbol")
- **Numbers**: Orange (1.0, 50, 100)
- **Comments**: Gray (// and /* */)
- **Operators**: Black (+, -, *, /, =)

#### Code Structure Display
- Proper indentation preserved
- Line numbers (optional)
- Collapsible sections (optional)
- Function list navigation (optional)

#### Statistics Panel
Shows at bottom of preview:
- **Total Lines**: Count of code lines
- **Code Blocks Used**: Number from workspace
- **Functions**: Count of function definitions
- **Indicators**: Number of indicator handles
- **Total Size**: Character/byte count

### Preview Actions

#### Copy to Clipboard
1. Click **"📋 Copy to Clipboard"** button
2. Entire code copied to system clipboard
3. Toast notification: "Code copied!"
4. Paste into MetaEditor or text editor

#### Save Directly from Preview
1. Click **"💾 Save"** button in preview modal
2. Same as main Save button
3. Downloads .txt file
4. Filename format: `EA_YYYY-MM-DD_HHMMSS.txt`

#### Close Preview
- Click **"Close"** button
- Click **[✕]** in top-right
- Click outside modal (overlay)
- Press **Escape** key

### Code Assembly Logic

#### How Blocks are Combined

**Step 1: Headers**
```mql5
//+------------------------------------------------------------------+
//| Expert Advisor Generated by MQL5 Builder                         |
//| Creation Date: 2025-11-13 14:30:00                              |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property version   "1.00"
#property strict
```

**Step 2: Input Parameters**
- Extracted from blocks with configurable parameters
- Grouped at top of file
- Proper input declarations

**Step 3: Global Variables**
- Extracted from initialization blocks
- Declared at file scope
- Indicator handles, state variables

**Step 4: OnInit() Function**
- Combines all initialization code blocks
- Proper error handling
- Returns INIT_SUCCEEDED or INIT_FAILED

**Step 5: OnTick() Function**
- Main execution loop
- Combines entry/exit logic blocks
- Utility function calls

**Step 6: Custom Functions**
- All utility, indicator, and pre-made functions
- Appended after OnTick()
- Maintains proper function order

**Step 7: Footer**
```mql5
//+------------------------------------------------------------------+
```

### Validation

#### Syntax Check (if implemented)
- Basic MQL5 syntax validation
- Checks for common errors
- Highlights problematic lines
- Warnings for potential issues

#### Common Validations
- ✅ Matching braces `{}`
- ✅ Semicolon endings
- ✅ Function declarations
- ✅ Variable scope
- ⚠️ Unused variables
- ⚠️ Duplicate function names
- ⚠️ Missing return statements

#### Error Display
```
⚠️ Warnings:
  Line 45: Variable 'lotSize' declared but not used
  Line 78: Function 'ClosePositions' defined but not called

❌ Errors:
  Line 102: Expected ';' at end of statement
  Line 156: Undefined function 'GetCustomValue'
```

### Best Practices

#### Before Saving
- ✅ **Always preview** before saving
- ✅ Check code structure makes sense
- ✅ Verify function order is logical
- ✅ Look for duplicate code
- ✅ Check for syntax errors
- ✅ Review variable declarations

#### After Preview
- Test in MetaEditor's Strategy Tester
- Compile to check for errors
- Run on demo account first
- Document any manual modifications
- Save workspace configuration

---

## 15. Saving Expert Advisors

### What It Does
Export your assembled Expert Advisor code as a .txt file that can be opened in MetaEditor and compiled into a functioning EA.

### Saving Process

#### How to Save
1. **Assemble** all desired code blocks in workspace
2. **(Optional)** Preview code to verify
3. Click **"💾 Save Expert Advisor"** button (green, bottom bar)
4. Save dialog appears
5. Choose location on your computer
6. Click **"Save"**
7. File downloads immediately

### File Format

#### Filename Convention
**Automatic Naming**:
- Format: `EA_YYYY-MM-DD_HHMMSS.txt`
- Example: `EA_2025-11-13_143045.txt`
- Timestamp: Singapore timezone
- Extension: `.txt` (for compatibility)

**Custom Naming** (if implemented):
1. Modal appears before save
2. Enter custom name
3. Suggested format: `MyStrategyName_v1.txt`
4. Keep .txt extension

#### File Contents
```mql5
//+------------------------------------------------------------------+
//| Expert Advisor Generated by MQL5 Builder                         |
//| Creation Date: 2025-11-13 14:30:45                              |
//| Workspace Blocks: 8                                              |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property version   "1.00"
#property strict

// [Complete assembled code here]

//+------------------------------------------------------------------+
```

### File Structure

#### Complete EA Structure
```
1. Header comments
2. #property directives
3. Input parameters
4. Global variables
5. OnInit() function
6. OnDeinit() function (if applicable)
7. OnTick() function
8. Custom functions
9. Footer comments
```

### Using Saved File in MetaEditor

#### Step 1: Open in MetaEditor
1. Open **MetaEditor** (MetaTrader 5)
2. File → Open
3. Navigate to saved .txt file
4. Open file

#### Step 2: Rename File
1. File → Save As
2. Change extension from `.txt` to `.mq5`
3. Example: `MyEA_v1.mq5`
4. Save in `MQL5/Experts/` folder

#### Step 3: Compile
1. Click **"Compile"** button (or F7)
2. Check compilation log
3. Fix any errors (if any)
4. Successful: `.ex5` file created

#### Step 4: Test
1. Open Strategy Tester (Ctrl+R)
2. Select your EA from dropdown
3. Choose symbol and timeframe
4. Run backtest
5. Analyze results

### Save Options

#### Quick Save
- One-click save with automatic filename
- No confirmation dialog
- Instant download
- Uses default timestamp naming

#### Custom Save (if implemented)
1. Enter EA name
2. Add description/notes
3. Choose save location
4. Add to project folder structure

### Workspace Persistence

#### Saving Workspace Configuration
1. **"💾 Save Workspace"** option (if implemented)
2. Saves:
   - Block arrangement
   - Block configurations
   - Custom snippets
   - Tab organization
3. Format: JSON file
4. Can reload later

#### Loading Saved Workspace
1. **"📂 Load Workspace"** button
2. Select workspace JSON file
3. Workspace reconstructed
4. All blocks restored
5. Continue editing

### Export Options

#### Text File (.txt)
- ✅ Default format
- ✅ Universal compatibility
- ✅ Opens in any text editor
- ✅ Import to MetaEditor

#### MQ5 File (.mq5) [Future]
- Direct save as MQ5 format
- Skip rename step
- Immediate compilation possible

#### Project Package [Future]
- Includes workspace configuration
- Includes custom snippets
- Includes EA code
- Zip archive for sharing

### Version Control

#### Managing Multiple Versions
1. Save with version numbers
   - `MyEA_v1.txt`
   - `MyEA_v2.txt`
   - `MyEA_v3.txt`
2. Add date stamps to filename
3. Keep changelog in comments
4. Use Git for version control (advanced)

#### Changelog in Code
```mql5
//+------------------------------------------------------------------+
//| Version History                                                  |
//+------------------------------------------------------------------+
// v1.0 - 2025-11-13 - Initial version with MA crossover
// v1.1 - 2025-11-14 - Added RSI filter
// v1.2 - 2025-11-15 - Added trailing stop function
```

### Best Practices

#### Before Saving
- ✅ Preview code for errors
- ✅ Test block arrangement order
- ✅ Verify all parameters configured
- ✅ Check for duplicate functions
- ✅ Ensure proper initialization

#### File Management
- 📁 Create project folders
- 📁 Organize by strategy type
- 📁 Keep backups
- 📁 Document modifications
- 📁 Track version changes

#### After Saving
- 🧪 Test in MetaEditor immediately
- 🧪 Compile to check syntax
- 🧪 Run Strategy Tester backtest
- 🧪 Optimize parameters
- 🧪 Test on demo account

---

## 16. Best Practices

### Getting Started

#### First-Time Setup
1. ✅ Explore all default tabs (Utilities, Indicators, Pre-made Functions)
2. ✅ Read snippet descriptions before using
3. ✅ Start with simple EA (2-3 blocks)
4. ✅ Test preview functionality
5. ✅ Save and compile in MetaEditor to verify
6. ✅ Create custom tabs for your strategies

#### Learning the Interface
- Drag a few blocks to understand mechanics
- Practice reordering blocks
- Try adding custom snippets
- Experiment with preview function
- Test save functionality with simple EA

### EA Development Tips

#### Building Strategy
- 🎯 **Start with logic flow**: Plan before dragging
- 🎯 **Use modular approach**: One block per function
- 🎯 **Test incrementally**: Build and test in stages
- 🎯 **Document as you go**: Add comments
- 🎯 **Keep it simple**: Start basic, add complexity

#### Block Organization
- 📋 Follow standard EA structure order
- 📋 Group related functions together
- 📋 Initialization blocks at top
- 📋 Main logic in middle
- 📋 Utilities at bottom

#### Code Quality
- ✅ Use descriptive snippet names
- ✅ Add detailed descriptions
- ✅ Configure parameters correctly
- ✅ Test individual snippets first
- ✅ Combine proven components

### Custom Snippet Strategies

#### When to Create Custom Snippets
- ✅ You use the same code 3+ times
- ✅ Strategy-specific logic not in library
- ✅ Custom indicator calculations
- ✅ Proprietary trading logic
- ✅ Modifications of existing snippets

#### Custom Snippet Best Practices
- 📝 Write clear, self-contained functions
- 📝 Minimize external dependencies
- 📝 Use parameters for flexibility
- 📝 Add comprehensive descriptions
- 📝 Test in MetaEditor before saving
- 📝 Organize into appropriate tabs

### Workflow Examples

#### Simple EA Development
```
Step 1: Plan Strategy
- Define entry rules
- Define exit rules
- Risk management approach

Step 2: Assemble Blocks
1. Input parameters declaration
2. OnInit() initialization
3. MA indicator setup
4. OnTick() main loop
5. Entry signal detection
6. Calculate lot size
7. Execute trade
8. Exit management

Step 3: Preview & Save
- Preview assembled code
- Check for errors
- Save as .txt file

Step 4: Test in MetaEditor
- Rename to .mq5
- Compile
- Run Strategy Tester
- Optimize parameters
```

#### Complex EA Development
```
Step 1: Break Down Strategy
- Multiple entry conditions
- Complex filters
- Position management layers

Step 2: Create Custom Snippets
- Custom indicator combo
- Multi-confirmation logic
- Advanced money management

Step 3: Organize in Custom Tabs
- "MyStrategy - Entry"
- "MyStrategy - Exit"
- "MyStrategy - Management"

Step 4: Assemble & Test Iteratively
- Add blocks one section at a time
- Test each addition
- Refine and optimize
```

### Tab Organization Strategies

#### By Trading Style
```
Tabs:
- Scalping Tools
- Day Trading
- Swing Trading
- Position Trading
```

#### By Functionality
```
Tabs:
- Entry Signals
- Exit Signals
- Position Management
- Risk Management
- Utilities
```

#### By Strategy
```
Tabs:
- Trend Following Strategy
- Mean Reversion Strategy
- Breakout Strategy
- Grid Strategy
```

### Testing & Validation

#### Before Live Trading
1. **Compile Test**: Fix all compilation errors
2. **Strategy Tester**: Run historical backtest
3. **Optimization**: Find best parameters
4. **Forward Test**: Test on unseen data
5. **Demo Account**: Live market conditions
6. **Small Live**: Minimal risk testing
7. **Full Deployment**: After proven results

#### Common Issues to Check
- ✅ Stop Loss / Take Profit levels valid
- ✅ Lot size calculations correct
- ✅ Magic number unique
- ✅ Symbol-specific settings
- ✅ Timeframe compatibility
- ✅ Error handling present

### Version Management

#### Tracking Changes
```
Naming Convention:
- MyEA_v1.0_BasicMA.txt          (Initial)
- MyEA_v1.1_AddedRSIFilter.txt   (Added feature)
- MyEA_v2.0_NewEntryLogic.txt    (Major change)
- MyEA_v2.1_BugFix.txt           (Bug fix)
```

#### Documentation
- Keep changelog in code comments
- Document parameter changes
- Note performance improvements
- Track bug fixes

### Performance Optimization

#### Code Efficiency
- Avoid unnecessary calculations in OnTick()
- Use indicator buffers efficiently
- Minimize global variables
- Cache frequently used values
- Use proper data types

#### Resource Management
- Release indicator handles in OnDeinit()
- Close positions properly
- Handle errors gracefully
- Avoid infinite loops
- Limit position count

---

## 17. Troubleshooting

### Drag-and-Drop Not Working

#### Symptoms
- Cannot drag snippets from library
- Snippets don't appear in workspace
- Drag cursor doesn't show
- Blocks not dropping

#### Solutions

**1. Browser Compatibility**
- ✅ Use modern browser (Chrome, Firefox, Edge, Safari)
- ✅ Update browser to latest version
- ✅ Enable JavaScript
- ✅ Disable browser extensions temporarily

**2. Check Drag Operation**
```
Steps:
1. Click and HOLD on snippet
2. Move mouse while holding
3. Ensure cursor changes to drag icon
4. Drop in valid zone (workspace area)
```

**3. Workspace State**
- Ensure workspace is visible
- Check if workspace is scrollable
- Verify no modal blocking workspace
- Clear browser cache

**4. Browser Console**
- Open DevTools (F12)
- Check Console tab for errors
- Look for JavaScript errors
- Refresh page if needed

### Blocks Not Saving to Workspace

#### Symptoms
- Blocks disappear after dropping
- Workspace shows empty
- Changes not persisting
- Blocks reset on refresh

#### Solutions

**1. Check Browser Storage**
```
Chrome:
- Settings → Privacy → Cookies and site data
- Ensure cookies enabled
- Check storage not full

Firefox:
- Settings → Privacy & Security
- Enable cookies and site data
```

**2. LocalStorage Test**
- Open DevTools (F12)
- Console tab
- Type: `localStorage.setItem('test', 'value')`
- Type: `localStorage.getItem('test')`
- Should return 'value'

**3. Clear and Retry**
- Clear browser cache
- Clear localStorage: `localStorage.clear()`
- Refresh page
- Re-add blocks

### Preview Not Showing Code

#### Symptoms
- Preview modal opens but empty
- Code not formatted
- Syntax highlighting missing
- Loading indicator stuck

#### Solutions

**1. Check Workspace Has Blocks**
- Ensure at least one block in workspace
- Verify blocks are valid
- Try adding a simple utility block

**2. Browser Console Errors**
- Open DevTools (F12)
- Check for JavaScript errors
- Look for syntax errors in custom snippets
- Fix any reported errors

**3. Code Assembly Issues**
- Check if custom snippets have valid code
- Verify no infinite loops in assembly
- Test with only pre-built snippets
- Remove custom snippets one by one

**4. Refresh & Retry**
- Close preview modal
- Refresh page
- Re-assemble blocks
- Try preview again

### Save Function Not Working

#### Symptoms
- Save button doesn't respond
- No file download
- Error message appears
- File downloads but is empty

#### Solutions

**1. Check Browser Permissions**
```
Chrome:
- Settings → Privacy → Site settings → Downloads
- Ensure "Ask where to save files" enabled
- Or set default download location

Firefox:
- Settings → General → Downloads
- Choose download behavior
```

**2. Test with Simple EA**
1. Clear workspace
2. Add single utility block
3. Try saving
4. If works: complex assembly issue
5. If fails: browser/permission issue

**3. Verify Code Assembly**
- Preview code first
- Check if code appears
- Copy from preview manually if needed
- Check file size (shouldn't be 0 bytes)

**4. Alternative Save Method**
1. Preview code
2. Copy to clipboard
3. Open text editor
4. Paste code
5. Save manually as .txt

### Custom Snippets Not Appearing

#### Symptoms
- Created snippet doesn't show in tab
- Snippet disappears after refresh
- Can't find saved snippet
- Snippet shows in wrong tab

#### Solutions

**1. Verify Snippet Creation**
- Check all required fields filled
- Ensure name is unique
- Verify code field not empty
- Select correct category/tab

**2. Check LocalStorage**
- Snippets saved to browser localStorage
- Check if storage is full
- Check if localStorage enabled
- Try creating in different browser

**3. Refresh Tab**
- Switch to different tab
- Switch back to original tab
- Snippet should appear
- If not, try page refresh

**4. Re-create Snippet**
- If lost, re-create from scratch
- Copy code from backup if available
- Ensure saving properly (look for confirmation)

### Blocks in Wrong Order

#### Symptoms
- Blocks appear jumbled
- New blocks go to wrong position
- Can't reorder blocks
- Order changes on refresh

#### Solutions

**1. Manual Reordering**
1. Click and drag block
2. Move to desired position
3. Look for insertion indicator line
4. Drop in correct spot
5. Verify order

**2. Delete and Re-add**
- Remove blocks causing issues
- Re-add in correct order
- Save workspace (if feature available)

**3. Standard Order Template**
Follow this order:
1. Input parameters
2. Global variables
3. OnInit()
4. OnTick()
5. Custom functions

### Compilation Errors in MetaEditor

#### Symptoms
- Saved file won't compile
- Syntax errors in MetaEditor
- Missing semicolons
- Undefined functions
- Variable scope errors

#### Solutions

**1. Common MQL5 Errors**

**Missing Semicolons**:
```mql5
// Wrong
double price = Ask

// Correct
double price = Ask;
```

**Undefined Functions**:
- Ensure all custom functions defined
- Check function names match calls
- Verify function order (called after definition)

**Variable Scope**:
```mql5
// Wrong - variable in wrong scope
void OnTick() {
   double price = Ask;
}
void CheckPrice() {
   if(price > 1.0) {...}  // Error: 'price' not declared
}

// Correct - use global or pass parameter
double price;
void OnTick() {
   price = Ask;
}
void CheckPrice() {
   if(price > 1.0) {...}  // OK
}
```

**2. Preview Before Saving**
- Always preview code first
- Look for syntax errors
- Check for proper structure
- Verify function completeness

**3. Test Snippets Individually**
- Test custom snippets in MetaEditor first
- Ensure they compile standalone
- Then add to builder

**4. Use Pre-built Snippets**
- Pre-built snippets are tested
- Use as templates for custom snippets
- Modify carefully

### Performance Issues

#### Symptoms
- Dashboard slow or laggy
- Drag-and-drop delayed
- Preview takes long time
- Browser freezes

#### Solutions

**1. Reduce Workspace Size**
- Limit blocks in workspace (< 50)
- Delete unused blocks
- Clear completed projects

**2. Browser Performance**
- Close unused tabs
- Restart browser
- Clear browser cache
- Update to latest browser version

**3. Computer Resources**
- Check RAM usage
- Close other applications
- Check CPU usage
- Restart computer

**4. Simplify Custom Snippets**
- Avoid very large code blocks
- Break into smaller functions
- Remove unnecessary comments
- Optimize code

### Tab Management Issues

#### Symptoms
- Can't create new tab
- Tab doesn't switch
- Tab deleted accidentally
- Custom tabs disappear

#### Solutions

**1. Tab Creation**
- Ensure clicking + button
- Verify modal appears
- Fill in required name field
- Check for error messages

**2. Tab Persistence**
- Custom tabs saved to localStorage
- Check browser storage enabled
- Export tab configuration (if available)
- Backup important custom tabs

**3. Recover Deleted Tab**
- Can't undo deletion
- Re-create tab manually
- Re-add custom snippets
- Check if snippets still in other tabs

**4. Default Tabs Protected**
- Utilities, Indicators, Pre-made Functions can't be deleted
- Only custom tabs can be removed
- Verify which tab you're trying to delete

### General Troubleshooting Steps

#### When Something Doesn't Work

**Step 1: Basic Checks**
1. Refresh page (F5)
2. Check internet connection (if applicable)
3. Verify JavaScript enabled
4. Check browser console (F12)

**Step 2: Clear State**
1. Clear workspace
2. Close all modals
3. Switch tabs
4. Return to main view

**Step 3: Browser Reset**
1. Clear browser cache
2. Clear localStorage (may lose custom snippets - backup first)
3. Restart browser
4. Try different browser

**Step 4: Data Verification**
1. Test with pre-built snippets only
2. Create simple EA
3. Test save functionality
4. Verify preview works

**Step 5: Escalation**
1. Try different computer
2. Try different browser
3. Check for application updates
4. Report issue with details

#### Collecting Debug Information

When reporting issues, include:
```
1. Browser name and version
2. Operating system
3. Steps to reproduce
4. Expected vs actual behavior
5. Console errors (F12 → Console)
6. Screenshots if helpful
7. Custom snippets involved (if any)
8. Workspace complexity (number of blocks)
```

---

## Keyboard Shortcuts Reference

### Workspace Actions
- **Ctrl + S**: Quick save (if implemented)
- **Ctrl + P**: Preview code (if implemented)
- **Delete**: Remove selected block
- **Escape**: Close modal

### Block Management
- **Drag**: Click and drag to move blocks
- **Ctrl + Click**: Multi-select blocks (if implemented)
- **Shift + Click**: Select range of blocks (if implemented)

### Tab Navigation
- **Ctrl + Tab**: Next tab (if implemented)
- **Ctrl + Shift + Tab**: Previous tab (if implemented)
- **Ctrl + T**: New tab (if implemented)

### Code Preview
- **Ctrl + C** (in preview): Copy code to clipboard
- **Escape**: Close preview modal

---

## Feature Summary Checklist

### ✅ Implemented Features

- [x] **Dashboard Layout**: Split view with workspace and library
- [x] **Drag-and-Drop**: Intuitive block movement
- [x] **Code Snippet Library**: Pre-built MQL5 snippets
- [x] **Tabbed Organization**: Utilities, Indicators, Pre-made Functions
- [x] **Custom Tabs**: Create unlimited custom categories
- [x] **Add Custom Snippets**: Dotted border interface
- [x] **Block Management**: Reorder, delete, configure blocks
- [x] **Code Preview**: Full assembled code view
- [x] **Save Function**: Export as .txt file
- [x] **Syntax Highlighting**: Color-coded display
- [x] **LocalStorage Persistence**: Save workspace and custom snippets
- [x] **Block Configuration**: Parameter adjustment per block
- [x] **Code Assembly**: Automatic proper EA structure
- [x] **Validation**: Basic syntax checking
- [x] **Statistics**: Code metrics display

---

## Version Information

**Application Version**: 1.0
**Last Updated**: November 2025
**Compatible Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
**MQL5 Compatibility**: MetaTrader 5 Build 3000+

---

## Support & Feedback

For issues, questions, or feature requests:
1. Check this user guide first
2. Review troubleshooting section
3. Check browser console for errors
4. Test in different browser
5. Report issues with debug information

---

## MetaEditor Integration Guide

### After Saving from Builder

**Step 1: Open File**
1. Locate saved .txt file in downloads
2. Open MetaEditor (Alt+F4 in MT5)
3. File → Open
4. Select your .txt file

**Step 2: Convert to MQ5**
1. File → Save As
2. Change extension: `.txt` → `.mq5`
3. Save in: `MQL5\Experts\`
4. Example: `C:\Users\...\MQL5\Experts\MyEA.mq5`

**Step 3: Compile**
1. Press **F7** or click Compile button
2. Check **Errors** tab in bottom panel
3. Fix any errors (see troubleshooting)
4. Successful: 0 errors, 0 warnings
5. `.ex5` file created automatically

**Step 4: Test in Strategy Tester**
1. Press **Ctrl+R** (Strategy Tester)
2. Select your EA from dropdown
3. Choose symbol (e.g., EURUSD)
4. Choose timeframe (e.g., H1)
5. Choose date range
6. Click **Start**
7. Review results

**Step 5: Optimization**
1. In Strategy Tester, enable **Optimization**
2. Select parameters to optimize
3. Set parameter ranges
4. Choose optimization method
5. Run optimization
6. Select best parameter set

**Step 6: Forward Testing**
1. Run backtest on different date range
2. Use optimized parameters
3. Verify consistent results
4. Check for overfitting

**Step 7: Demo Account**
1. Drag EA onto chart in demo account
2. Set parameters from optimization
3. Enable Expert Advisors (Auto Trading button)
4. Monitor for 1-2 weeks
5. Verify expected behavior

**Step 8: Live Trading**
1. After successful demo testing
2. Start with minimum position size
3. Monitor closely first week
4. Scale up gradually
5. Keep trading journal

---

**End of User Guide**

This comprehensive guide covers all features of the MQL5 Expert Advisor Builder. Use this as a reference while building your trading strategies. Happy coding and successful trading!
