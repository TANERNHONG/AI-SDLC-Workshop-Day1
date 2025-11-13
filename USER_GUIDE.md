# MQL5 Expert Advisor Builder - Comprehensive User Guide

## Table of Contents
1. [Getting Started](#1-getting-started)
2. [Dashboard Layout](#2-dashboard-layout)
3. [Code Snippet Library](#3-code-snippet-library)
4. [Drag-and-Drop Functionality](#4-drag-and-drop-functionality)
5. [Library Tabs Management](#5-library-tabs-management)
6. [Adding Custom Code Snippets](#6-adding-custom-code-snippets)
7. [Code Block Organization](#7-code-block-organization)
8. [Utilities Tab](#8-utilities-tab)
9. [Indicators Tab](#9-indicators-tab)
10. [Pre-made Functions Tab](#10-pre-made-functions-tab)
11. [Code Preview](#11-code-preview)
12. [Saving Expert Advisors](#12-saving-expert-advisors)
13. [Best Practices](#13-best-practices)
14. [Troubleshooting](#troubleshooting)

---

## 1. Getting Started

### What It Does
The MQL5 Expert Advisor Builder is a visual drag-and-drop dashboard that allows you to assemble fully functioning Expert Advisors (EAs) for MetaTrader 5 without writing code from scratch. Build sophisticated trading bots by combining pre-built code snippets.

### How to Use
1. Access the dashboard through your web browser
2. Browse the code snippet library on the right side
3. Drag code blocks to the workspace on the left
4. Arrange blocks in the correct execution order
5. Preview the assembled code
6. Save your Expert Advisor as a .txt file

### Key Features
- ✅ Visual drag-and-drop interface
- ✅ Pre-built MQL5 code snippets
- ✅ Custom snippet creation
- ✅ Multiple organized library tabs
- ✅ Real-time code assembly
- ✅ Code preview before saving
- ✅ Export as .txt for MetaEditor

---

## 2. Dashboard Layout

### What It Does
The dashboard is divided into two main sections for efficient workflow: a workspace on the left and a code library on the right.

### Dashboard Sections

| Section | Location | Purpose |
|---------|----------|---------|
| **Workspace** | Left side | Drop zone for assembling code blocks |
| **Code Library** | Right side | Browse and select code snippets |
| **Bottom Bar** | Bottom | Preview and save functions |

### Workspace (Left Side)

#### Purpose
- Main area for building your Expert Advisor
- Drag code blocks here from the library
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

## 3. Code Snippet Library

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

## 4. Drag-and-Drop Functionality

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

## 5. Library Tabs Management

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

## 6. Adding Custom Code Snippets

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

## 7. Code Block Organization

### What It Does
Efficiently manage and organize code blocks in your workspace to create a logical, well-structured Expert Advisor.

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

### Block Ordering Best Practices

#### Typical EA Structure Order

**1. Variable Declarations**
```
- Input parameters
- Global variables
- Object handles
```

**2. Initialization Functions**
```
- OnInit() setup
- Indicator initialization
- Initial calculations
```

**3. Main Logic**
```
- OnTick() function
- Entry signal detection
- Position management
```

**4. Utility Functions**
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

#### Example Order
```
Workspace Blocks (top to bottom):
1. Input Parameters Declaration
2. Global Variables
3. OnInit() Function
4. Moving Average Indicator Setup
5. OnTick() Main Loop
6. Buy Signal Detection
7. Sell Signal Detection
8. Calculate Lot Size
9. Open Buy Trade
10. Open Sell Trade
11. Trailing Stop Function
12. Close Positions Function
```

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

## 8. Utilities Tab

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

## 9. Indicators Tab

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

## 10. Pre-made Functions Tab

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

## 11. Code Preview

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

## 12. Saving Expert Advisors

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

## 13. Best Practices

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

## Troubleshooting

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
