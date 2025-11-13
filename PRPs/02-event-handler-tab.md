# PRP-02: Event Handler Tab

## Feature Overview

The Event Handler Tab is a tab within the Code Library (right side of dashboard) that allows users to toggle which MQL5 event handler functions are included in their Expert Advisor. This provides fine-grained control over the EA's event processing capabilities while maintaining a clean, organized structure.

**Key Capabilities:**
- Toggle 13 optional MQL5 event handlers on/off
- OnInit and OnDeinit are always included (required)
- Visual indicators for enabled/disabled state
- Descriptive tooltips explaining each handler's purpose
- Automatic code generation based on selections
- Best practices guidance for handler selection

## User Stories

### Story 1: Standard EA Developer
**As a** retail trader building a standard trading EA  
**I want to** enable only the OnTick handler  
**So that** my EA responds to price changes without unnecessary code bloat

**Acceptance Criteria:**
- User can access Event Handler tab in Code Library (right side)
- OnInit and OnDeinit are visible and grayed out (always included)
- OnTick toggle is visible and can be enabled
- Other handlers are disabled by default
- Enabled OnTick shows green indicator
- Generated code includes OnInit, OnDeinit, and OnTick functions only

### Story 2: Advanced EA Developer
**As an** experienced algo-trader  
**I want to** enable multiple event handlers (OnTick, OnTimer, OnTrade)  
**So that** I can build sophisticated EAs with time-based actions and trade event tracking

**Acceptance Criteria:**
- Multiple handlers can be enabled simultaneously
- Each enabled handler shows visual confirmation
- Code assembly includes all enabled handlers in proper order
- Preview shows all selected handler functions

### Story 3: Strategy Tester User
**As a** trader optimizing strategies  
**I want to** enable OnTester, OnTesterInit, and OnTesterDeinit  
**So that** I can implement custom optimization criteria

**Acceptance Criteria:**
- Tester-related handlers are clearly grouped or labeled
- Enabling OnTester suggests related handlers (OnTesterInit/OnTesterDeinit)
- Generated code includes proper tester function signatures

## User Flow

### Basic Flow: Toggle Event Handler

1. User opens MQL5 EA Builder dashboard
2. User clicks "Event Handlers" tab in Code Library (right side)
3. Event Handler tab displays with two sections:
   - **Required Handlers** (grayed out): OnInit ✅, OnDeinit ✅
   - **Optional Handlers** (toggleable): 13 handlers with switches
4. User clicks toggle switch next to "OnTick"
5. OnTick indicator changes from ☐ to ✅ with green highlight
6. User switches back to code snippet tabs or continues building EA with drag-and-drop
7. User clicks "Preview" to view assembled code
8. Preview shows OnInit, OnDeinit, and OnTick functions included
9. User exports EA with selected handlers

### Advanced Flow: Multiple Handler Selection

1. User starts with default state (only OnInit/OnDeinit)
2. User enables OnTick (main trading logic)
3. User enables OnTimer (for periodic checks)
4. User hovers over OnTimer toggle
5. Tooltip appears: "Called at specified intervals. Requires EventSetTimer() in OnInit"
6. User notes reminder about EventSetTimer requirement
7. User enables OnChartEvent (for interactive features)
8. User drags code blocks that utilize these handlers
9. Code assembly engine generates proper function stubs
10. Preview shows all 5 handlers (OnInit, OnDeinit, OnTick, OnTimer, OnChartEvent)

## Technical Requirements

### Component Structure

**Note**: This component renders as tab content within the Code Library, not as a standalone sidebar.

```typescript
// Event Handler State Management
interface EventHandler {
  id: string;
  name: string;
  displayName: string;
  description: string;
  useCase: string;
  required: boolean;
  enabled: boolean;
  category: 'lifecycle' | 'trading' | 'testing' | 'interaction' | 'data';
  dependencies?: string[]; // e.g., OnTimer requires EventSetTimer
}

interface EventHandlerState {
  handlers: EventHandler[];
  enabledHandlers: string[];
}

// Default handlers configuration
const DEFAULT_HANDLERS: EventHandler[] = [
  // Required
  { id: 'OnInit', name: 'OnInit', displayName: 'OnInit', 
    description: 'Initialization function called when EA starts',
    useCase: 'Initialize variables, set up indicators, configure settings',
    required: true, enabled: true, category: 'lifecycle' },
  { id: 'OnDeinit', name: 'OnDeinit', displayName: 'OnDeinit',
    description: 'Deinitialization function called when EA stops',
    useCase: 'Cleanup resources, save state, close handles',
    required: true, enabled: true, category: 'lifecycle' },
  
  // Optional - Trading
  { id: 'OnStart', name: 'OnStart', displayName: 'OnStart',
    description: 'Called at program start (before OnInit)',
    useCase: 'Rare usage, mainly for scripts and one-time setup',
    required: false, enabled: false, category: 'lifecycle' },
  { id: 'OnTick', name: 'OnTick', displayName: 'OnTick',
    description: 'Called on every new price tick',
    useCase: 'Main trading logic, signal detection, position management',
    required: false, enabled: false, category: 'trading' },
  { id: 'OnTimer', name: 'OnTimer', displayName: 'OnTimer',
    description: 'Called at specified time intervals',
    useCase: 'Periodic checks, time-based actions',
    required: false, enabled: false, category: 'trading',
    dependencies: ['EventSetTimer in OnInit', 'EventKillTimer in OnDeinit'] },
  { id: 'OnTrade', name: 'OnTrade', displayName: 'OnTrade',
    description: 'Called when trade event occurs',
    useCase: 'Track order execution, position changes',
    required: false, enabled: false, category: 'trading' },
  { id: 'OnTradeTransaction', name: 'OnTradeTransaction', displayName: 'OnTradeTransaction',
    description: 'Called on trade transaction events (more detailed than OnTrade)',
    useCase: 'Advanced trade tracking, transaction logging',
    required: false, enabled: false, category: 'trading' },
  
  // Optional - Data
  { id: 'OnCalculate', name: 'OnCalculate', displayName: 'OnCalculate',
    description: 'Called when custom indicator needs recalculation',
    useCase: 'Calculate custom indicator values (for indicators, not typical EAs)',
    required: false, enabled: false, category: 'data' },
  { id: 'OnBookEvent', name: 'OnBookEvent', displayName: 'OnBookEvent',
    description: 'Called on Depth of Market changes',
    useCase: 'Level 2 data analysis, DOM trading',
    required: false, enabled: false, category: 'data',
    dependencies: ['MarketBookAdd in OnInit', 'MarketBookRelease in OnDeinit'] },
  
  // Optional - Interaction
  { id: 'OnChartEvent', name: 'OnChartEvent', displayName: 'OnChartEvent',
    description: 'Called on chart events (clicks, key presses, custom events)',
    useCase: 'Interactive EAs, GUI controls, user input',
    required: false, enabled: false, category: 'interaction' },
  
  // Optional - Testing
  { id: 'OnTester', name: 'OnTester', displayName: 'OnTester',
    description: 'Called during strategy tester optimization',
    useCase: 'Custom optimization criteria',
    required: false, enabled: false, category: 'testing' },
  { id: 'OnTesterInit', name: 'OnTesterInit', displayName: 'OnTesterInit',
    description: 'Called at start of testing',
    useCase: 'Initialize test resources',
    required: false, enabled: false, category: 'testing' },
  { id: 'OnTesterDeinit', name: 'OnTesterDeinit', displayName: 'OnTesterDeinit',
    description: 'Called at end of testing',
    useCase: 'Cleanup test resources',
    required: false, enabled: false, category: 'testing' },
  { id: 'OnTesterPass', name: 'OnTesterPass', displayName: 'OnTesterPass',
    description: 'Called after optimization pass',
    useCase: 'Process optimization results',
    required: false, enabled: false, category: 'testing' },
];
```

### React Component Example

```tsx
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Tooltip } from '@/components/ui/tooltip';

interface EventHandlerTabProps {
  onHandlersChange: (enabledHandlers: string[]) => void;
}

export const EventHandlerTab: React.FC<EventHandlerTabProps> = ({ 
  onHandlersChange 
}) => {
  const [handlers, setHandlers] = useState<EventHandler[]>(DEFAULT_HANDLERS);

  const toggleHandler = (handlerId: string) => {
    const updated = handlers.map(h => 
      h.id === handlerId && !h.required
        ? { ...h, enabled: !h.enabled }
        : h
    );
    setHandlers(updated);
    
    const enabled = updated.filter(h => h.enabled).map(h => h.id);
    onHandlersChange(enabled);
  };

  const groupedHandlers = {
    required: handlers.filter(h => h.required),
    lifecycle: handlers.filter(h => !h.required && h.category === 'lifecycle'),
    trading: handlers.filter(h => !h.required && h.category === 'trading'),
    data: handlers.filter(h => !h.required && h.category === 'data'),
    interaction: handlers.filter(h => !h.required && h.category === 'interaction'),
    testing: handlers.filter(h => !h.required && h.category === 'testing'),
  };

  return (
    <div className="w-full h-full bg-white p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Event Handlers</h2>
      
      {/* Required Handlers */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">
          Required (Always Included)
        </h3>
        {groupedHandlers.required.map(handler => (
          <div key={handler.id} className="mb-2 p-2 bg-gray-100 rounded opacity-60">
            <div className="flex items-center justify-between">
              <Tooltip content={handler.description}>
                <span className="text-sm font-medium">{handler.displayName}</span>
              </Tooltip>
              <span className="text-green-600">✅</span>
            </div>
          </div>
        ))}
      </div>

      {/* Optional Handlers by Category */}
      {Object.entries(groupedHandlers).map(([category, categoryHandlers]) => {
        if (category === 'required' || categoryHandlers.length === 0) return null;
        
        return (
          <div key={category} className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2 capitalize">
              {category}
            </h3>
            {categoryHandlers.map(handler => (
              <div 
                key={handler.id} 
                className={`mb-2 p-2 border rounded transition-all ${
                  handler.enabled 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Tooltip content={`${handler.description}\n\nUse case: ${handler.useCase}`}>
                    <span className="text-sm font-medium cursor-help">
                      {handler.displayName}
                    </span>
                  </Tooltip>
                  <Switch
                    checked={handler.enabled}
                    onCheckedChange={() => toggleHandler(handler.id)}
                  />
                </div>
                {handler.dependencies && handler.enabled && (
                  <div className="text-xs text-amber-600 mt-1">
                    ⚠️ Requires: {handler.dependencies.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })}

      {/* Quick Presets */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Quick Presets</h3>
        <button 
          onClick={() => applyPreset('standard')}
          className="w-full mb-2 px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Standard EA (OnTick)
        </button>
        <button 
          onClick={() => applyPreset('timed')}
          className="w-full mb-2 px-3 py-2 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Time-Based (OnTick + OnTimer)
        </button>
        <button 
          onClick={() => applyPreset('testing')}
          className="w-full px-3 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
        >
          Strategy Tester
        </button>
      </div>
    </div>
  );
};
```

### LocalStorage Persistence

```typescript
// Save event handler configuration
const saveHandlerConfig = (handlers: EventHandler[]) => {
  const config = {
    enabledHandlers: handlers.filter(h => h.enabled).map(h => h.id),
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem('mql5_event_handlers', JSON.stringify(config));
};

// Load event handler configuration
const loadHandlerConfig = (): string[] => {
  const saved = localStorage.getItem('mql5_event_handlers');
  if (!saved) return ['OnInit', 'OnDeinit']; // defaults
  
  try {
    const config = JSON.parse(saved);
    return config.enabledHandlers || ['OnInit', 'OnDeinit'];
  } catch {
    return ['OnInit', 'OnDeinit'];
  }
};
```

## Integration with Code Assembly

### Handler Function Generation

```typescript
// Generate MQL5 event handler stubs based on enabled handlers
const generateEventHandlers = (enabledHandlers: string[]): string => {
  const handlerTemplates: Record<string, string> = {
    OnInit: `
int OnInit()
{
   // Initialize EA
   // Set up indicators, variables, timers, etc.
   
   return(INIT_SUCCEEDED);
}`,
    OnDeinit: `
void OnDeinit(const int reason)
{
   // Cleanup resources
   // Remove indicators, kill timers, etc.
   
   Print("EA deinitialized. Reason: ", reason);
}`,
    OnStart: `
void OnStart()
{
   // Called before OnInit
   // Rare usage - one-time setup
}`,
    OnTick: `
void OnTick()
{
   // Called on every price tick
   // Main trading logic goes here
   
   // Example: Check for new signals
   // Example: Manage open positions
}`,
    OnTimer: `
void OnTimer()
{
   // Called at specified intervals
   // Set interval with EventSetTimer() in OnInit
   
   // Example: Periodic account checks
   // Example: Time-based signal updates
}`,
    OnCalculate: `
int OnCalculate(const int rates_total,
                const int prev_calculated,
                const datetime &time[],
                const double &open[],
                const double &high[],
                const double &low[],
                const double &close[],
                const long &tick_volume[],
                const long &volume[],
                const int &spread[])
{
   // Calculate custom indicator values
   
   return(rates_total);
}`,
    OnTrade: `
void OnTrade()
{
   // Called when trade event occurs
   // Example: Track order execution
}`,
    OnTradeTransaction: `
void OnTradeTransaction(const MqlTradeTransaction& trans,
                        const MqlTradeRequest& request,
                        const MqlTradeResult& result)
{
   // Called on trade transaction
   // Example: Advanced trade logging
}`,
    OnBookEvent: `
void OnBookEvent(const string& symbol)
{
   // Called on DOM changes
   // Example: Analyze market depth
}`,
    OnChartEvent: `
void OnChartEvent(const int id,
                  const long &lparam,
                  const double &dparam,
                  const string &sparam)
{
   // Called on chart events
   // Example: Handle button clicks, key presses
}`,
    OnTester: `
double OnTester()
{
   // Called during optimization
   // Return custom optimization criterion
   
   return(0.0);
}`,
    OnTesterInit: `
void OnTesterInit()
{
   // Initialize test resources
}`,
    OnTesterDeinit: `
void OnTesterDeinit()
{
   // Cleanup test resources
}`,
    OnTesterPass: `
void OnTesterPass()
{
   // Process optimization pass results
}`,
  };

  return enabledHandlers
    .map(handler => handlerTemplates[handler] || '')
    .join('\n\n');
};
```

### Code Assembly Order

The code assembly engine must insert event handlers in this specific order:

1. File header comments
2. Property directives (#property)
3. Include directives (#include)
4. Input parameters (input variables)
5. Global variables
6. **OnStart** (if enabled)
7. **OnInit** (always)
8. **OnDeinit** (always)
9. **OnTick** (if enabled)
10. **OnCalculate** (if enabled)
11. **OnTimer** (if enabled)
12. **OnTrade** (if enabled)
13. **OnTradeTransaction** (if enabled)
14. **OnBookEvent** (if enabled)
15. **OnChartEvent** (if enabled)
16. **OnTester** (if enabled)
17. **OnTesterInit** (if enabled)
18. **OnTesterDeinit** (if enabled)
19. **OnTesterPass** (if enabled)
20. Custom functions (from dragged snippets)

## Edge Cases

### Edge Case 1: Conflicting Handlers
**Scenario**: User enables both OnTrade and OnTradeTransaction
**Handling**: 
- Allow both (they serve different purposes)
- Show info tooltip: "OnTradeTransaction provides more detailed info than OnTrade"
- Both handlers generated in code

### Edge Case 2: Dependencies Not Met
**Scenario**: User enables OnTimer but doesn't add EventSetTimer in workspace
**Handling**:
- Show warning icon next to OnTimer
- Tooltip: "⚠️ OnTimer requires EventSetTimer() in OnInit"
- Code assembly adds comment reminder in OnInit

### Edge Case 3: Indicator-Only Handler in EA
**Scenario**: User enables OnCalculate (typically for indicators) in an EA
**Handling**:
- Allow (advanced users may have use case)
- Show warning: "OnCalculate is typically for custom indicators. Are you sure?"
- Generate code with comment explaining usage

### Edge Case 4: All Handlers Disabled
**Scenario**: User attempts to disable all optional handlers
**Handling**:
- OnInit and OnDeinit remain enabled (required)
- Show warning: "EA has no event processing. Enable at least OnTick for trading logic."
- Allow export (user may add logic later)

### Edge Case 5: First-Time User
**Scenario**: New user doesn't know which handlers to enable
**Handling**:
- Show guided tour on first visit
- Highlight "Quick Presets" section
- Default recommendation: Enable OnTick for standard EA

## Acceptance Criteria

### Visual Design
- [ ] Tab content fills library panel width and height
- [ ] Tab accessible via "Event Handlers" tab button in Code Library
- [ ] Required handlers shown with grayed background and checkmark
- [ ] Optional handlers have toggle switches
- [ ] Enabled handlers have green border and background tint
- [ ] Disabled handlers have gray border and white background
- [ ] Tooltips appear on hover with description and use case
- [ ] Category headers separate handler groups
- [ ] Quick preset buttons displayed prominently

### Functionality
- [ ] Clicking toggle enables/disables optional handlers
- [ ] Required handlers (OnInit, OnDeinit) cannot be disabled
- [ ] Multiple handlers can be enabled simultaneously
- [ ] Handler state persists in localStorage
- [ ] Handler state passed to code assembly engine
- [ ] Preset buttons apply predefined configurations
- [ ] Dependency warnings shown for handlers with requirements

### Code Generation
- [ ] Enabled handlers appear in generated code
- [ ] Disabled handlers do NOT appear in code
- [ ] OnInit and OnDeinit always in code
- [ ] Handlers appear in correct MQL5 order
- [ ] Function signatures are syntactically correct
- [ ] Comments explain each handler's purpose
- [ ] Dependencies noted in OnInit/OnDeinit (e.g., EventSetTimer)

### Integration
- [ ] Tab communicates with code assembly engine
- [ ] Tab accessible from Code Library (5th default tab)
- [ ] Preview shows enabled handlers in statistics
- [ ] Export includes only enabled handlers
- [ ] Workspace state saves handler configuration
- [ ] Configuration persists across sessions
- [ ] Tab switching preserves handler selections

## Testing Requirements

### E2E Test Cases

```typescript
// Test 1: Default State
test('Event Handler Tab shows required handlers enabled by default', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Click Event Handlers tab in Code Library
  await page.locator('button:has-text("Event Handlers")').click();
  
  // Check OnInit is visible and enabled
  const onInitHandler = page.locator('[data-handler="OnInit"]');
  await expect(onInitHandler).toBeVisible();
  await expect(onInitHandler).toHaveClass(/opacity-60/); // grayed out
  
  // Check OnDeinit is visible and enabled
  const onDeinitHandler = page.locator('[data-handler="OnDeinit"]');
  await expect(onDeinitHandler).toBeVisible();
});

// Test 2: Toggle Optional Handler
test('User can enable OnTick handler', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Find OnTick toggle
  const onTickToggle = page.locator('[data-handler="OnTick"] >> role=switch');
  await expect(onTickToggle).not.toBeChecked();
  
  // Enable OnTick
  await onTickToggle.click();
  await expect(onTickToggle).toBeChecked();
  
  // Check visual feedback (green border)
  const onTickContainer = page.locator('[data-handler="OnTick"]');
  await expect(onTickContainer).toHaveClass(/border-green-500/);
});

// Test 3: Multiple Handler Selection
test('User can enable multiple handlers simultaneously', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Enable OnTick, OnTimer, OnTrade
  await page.locator('[data-handler="OnTick"] >> role=switch').click();
  await page.locator('[data-handler="OnTimer"] >> role=switch').click();
  await page.locator('[data-handler="OnTrade"] >> role=switch').click();
  
  // Verify all enabled
  await expect(page.locator('[data-handler="OnTick"] >> role=switch')).toBeChecked();
  await expect(page.locator('[data-handler="OnTimer"] >> role=switch')).toBeChecked();
  await expect(page.locator('[data-handler="OnTrade"] >> role=switch')).toBeChecked();
});

// Test 4: Code Generation with Handlers
test('Enabled handlers appear in generated code', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Enable OnTick
  await page.locator('[data-handler="OnTick"] >> role=switch').click();
  
  // Click preview
  await page.locator('button:has-text("Preview")').click();
  
  // Check code contains OnInit, OnDeinit, OnTick
  const codePreview = page.locator('[data-testid="code-preview"]');
  await expect(codePreview).toContainText('int OnInit()');
  await expect(codePreview).toContainText('void OnDeinit');
  await expect(codePreview).toContainText('void OnTick()');
  
  // Check OnTimer NOT present (not enabled)
  await expect(codePreview).not.toContainText('void OnTimer()');
});

// Test 5: Quick Presets
test('Standard EA preset enables OnTick only', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Click "Standard EA" preset
  await page.locator('button:has-text("Standard EA")').click();
  
  // Verify OnTick enabled, others disabled
  await expect(page.locator('[data-handler="OnTick"] >> role=switch')).toBeChecked();
  await expect(page.locator('[data-handler="OnTimer"] >> role=switch')).not.toBeChecked();
  await expect(page.locator('[data-handler="OnTrade"] >> role=switch')).not.toBeChecked();
});

// Test 6: Persistence
test('Handler selection persists across page reloads', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Enable OnTick and OnTimer
  await page.locator('[data-handler="OnTick"] >> role=switch').click();
  await page.locator('[data-handler="OnTimer"] >> role=switch').click();
  
  // Reload page
  await page.reload();
  
  // Verify handlers still enabled
  await expect(page.locator('[data-handler="OnTick"] >> role=switch')).toBeChecked();
  await expect(page.locator('[data-handler="OnTimer"] >> role=switch')).toBeChecked();
});

// Test 7: Dependency Warning
test('OnTimer shows dependency warning when enabled', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Enable OnTimer
  await page.locator('[data-handler="OnTimer"] >> role=switch').click();
  
  // Check for warning message
  const warningText = page.locator('[data-handler="OnTimer"] >> text=/Requires.*EventSetTimer/');
  await expect(warningText).toBeVisible();
});
```

### Unit Test Cases

```typescript
// Test handler toggle logic
describe('EventHandlerTab', () => {
  it('should toggle optional handler on click', () => {
    const { getByTestId } = render(<EventHandlerTab onHandlersChange={jest.fn()} />);
    const onTickSwitch = getByTestId('handler-switch-OnTick');
    
    expect(onTickSwitch).not.toBeChecked();
    fireEvent.click(onTickSwitch);
    expect(onTickSwitch).toBeChecked();
  });

  it('should not toggle required handlers', () => {
    const { getByTestId } = render(<EventHandlerTab onHandlersChange={jest.fn()} />);
    const onInitContainer = getByTestId('handler-OnInit');
    
    expect(onInitContainer).toHaveClass('opacity-60');
    // No toggle switch should exist for required handlers
    expect(within(onInitContainer).queryByRole('switch')).toBeNull();
  });

  it('should call onHandlersChange with enabled handler IDs', () => {
    const mockCallback = jest.fn();
    const { getByTestId } = render(<EventHandlerTab onHandlersChange={mockCallback} />);
    
    fireEvent.click(getByTestId('handler-switch-OnTick'));
    
    expect(mockCallback).toHaveBeenCalledWith(['OnInit', 'OnDeinit', 'OnTick']);
  });
});

// Test code generation with handlers
describe('generateEventHandlers', () => {
  it('should include OnInit and OnDeinit for empty array', () => {
    const code = generateEventHandlers(['OnInit', 'OnDeinit']);
    expect(code).toContain('int OnInit()');
    expect(code).toContain('void OnDeinit');
  });

  it('should include OnTick when enabled', () => {
    const code = generateEventHandlers(['OnInit', 'OnDeinit', 'OnTick']);
    expect(code).toContain('void OnTick()');
  });

  it('should maintain correct handler order', () => {
    const code = generateEventHandlers(['OnInit', 'OnDeinit', 'OnTick', 'OnTimer']);
    const onTickIndex = code.indexOf('void OnTick()');
    const onTimerIndex = code.indexOf('void OnTimer()');
    expect(onTickIndex).toBeLessThan(onTimerIndex);
  });
});
```

## Out of Scope

- ❌ **Custom Event Handler Creation**: Users cannot create their own event handlers (MQL5 limitation)
- ❌ **Event Handler Code Editing**: Users cannot modify handler function signatures (only bodies via snippets)
- ❌ **Conditional Handler Inclusion**: Handlers are either fully included or excluded (no conditional compilation)
- ❌ **Handler Performance Metrics**: No tracking of handler execution times or call counts
- ❌ **AI-Suggested Handlers**: No automatic recommendation of which handlers to enable based on snippets

## Success Metrics

- **Handler Selection Rate**: % of users who enable at least one optional handler (target: >70%)
- **OnTick Adoption**: % of EAs with OnTick enabled (target: >80%, as it's most common)
- **Preset Usage**: % of users who use quick presets vs manual selection (target: >40% use presets)
- **Error Reduction**: Decrease in EAs with missing event handlers (target: 95% have correct handlers)
- **User Satisfaction**: Survey rating for "Event handler control is clear and helpful" (target: >4.5/5)

## Best Practices Guidance

### Displayed in Tab (Info Panel)

**For Standard Trading EAs:**
✅ Enable OnTick for tick-by-tick analysis

**For Time-Based EAs:**
✅ Enable OnTick + OnTimer
⚠️ Remember to add EventSetTimer() in OnInit

**For Event-Driven EAs:**
✅ Enable OnTick + OnTrade or OnTradeTransaction
💡 OnTradeTransaction provides more detail than OnTrade

**For Interactive EAs:**
✅ Enable OnTick + OnChartEvent
💡 Use for buttons, input fields, custom controls

**For Strategy Tester:**
✅ Enable OnTester for custom optimization criteria
✅ Enable OnTesterInit/OnTesterDeinit for test setup/cleanup

**General Tips:**
⚠️ Don't enable handlers you don't use (adds code bloat)
✅ OnInit and OnDeinit are always required
💡 Hover over any handler for detailed explanation

---

**Feature Status**: ✅ Specification Complete  
**Priority**: P0 (Critical - Foundation Feature)  
**Estimated Effort**: 2-3 days  
**Dependencies**: Dashboard Layout (PRP-01), Code Assembly Engine (PRP-10)
