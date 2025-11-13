# PRP-01: Sidebar Navigation System

## Feature Overview

The **Sidebar Navigation System** provides a collapsible left-side navigation bar that enables multi-page architecture and future feature expansion. The sidebar toggles between a minimal 64px icon-only mode (collapsed) and a full 240px menu mode (expanded), allowing users to navigate between different pages while maximizing workspace area.

**Key Capabilities:**
- Collapsible sidebar (64px ↔ 240px) with smooth animations
- Icon-only mode when collapsed, full labels when expanded
- Multi-page navigation (Dashboard, Settings, Templates, Documentation, Export History)
- Keyboard shortcut (Ctrl/Cmd + B) for toggle
- State persistence via localStorage
- Current page indicator with visual highlighting
- Future-ready architecture for adding new pages/features

## User Stories

### Story 1: First-Time User
**As a** new user opening the MQL5 EA Builder  
**I want to** see a clean interface with collapsible navigation  
**So that** I have maximum workspace while still accessing different app sections

**Acceptance Criteria:**
- Sidebar starts collapsed (64px, icons only) by default
- Dashboard page is active and visible on initial load
- Hamburger menu icon (☰) is prominent and clickable
- Hovering over icons shows tooltips with page names
- Clicking hamburger expands sidebar to show full navigation

### Story 2: Power User Navigation
**As an** experienced user building multiple EAs  
**I want to** quickly navigate between Dashboard, Templates, and Settings  
**So that** I can efficiently manage my workflow across app features

**Acceptance Criteria:**
- Clicking any navigation item switches to that page
- Current page shows visual indicator (highlight, border, or background)
- Keyboard shortcut (Ctrl/Cmd + B) toggles sidebar
- Sidebar state persists across page navigation
- Future pages (Templates, Settings, etc.) show "Coming Soon" placeholder

### Story 3: Space-Conscious Developer
**As a** developer on a laptop with limited screen space  
**I want to** minimize the sidebar to gain more workspace  
**So that** I can see more of my code blocks and library at once

**Acceptance Criteria:**
- Collapsed sidebar only 64px wide (icon-only)
- Expanded sidebar 240px wide (icon + labels)
- Smooth animation during expand/collapse (300ms ease)
- Workspace and library sections adjust width automatically
- Sidebar state saved in localStorage (persists across sessions)

## User Flow

### Basic Flow: Toggle Sidebar

1. User opens MQL5 EA Builder at localhost:3000
2. Dashboard page loads with sidebar **collapsed** (default state)
3. Sidebar shows 64px wide vertical bar with icons:
   - 🏠 (Dashboard - highlighted)
   - ⚙️ (Settings)
   - 📋 (Templates)
   - 📚 (Documentation)
   - 📦 (Export History)
4. User clicks **hamburger menu icon (☰)** at top of sidebar
5. Sidebar smoothly expands to 240px showing full labels:
   - 🏠 Dashboard ← current page (highlighted)
   - ⚙️ Settings
   - 📋 Templates
   - 📚 Documentation
   - 📦 Export History
6. User continues working on Dashboard
7. User presses **Ctrl+B** (or Cmd+B on Mac)
8. Sidebar smoothly collapses back to 64px (icons only)
9. User's sidebar state persisted for next session

### Advanced Flow: Multi-Page Navigation

1. User on Dashboard with sidebar expanded
2. User clicks **📋 Templates** navigation item
3. Dashboard content fades out
4. Templates page loads with message: "Coming Soon - Template management will be available here"
5. Sidebar shows Templates as active (🟢 indicator)
6. User clicks **🏠 Dashboard** to return
7. Dashboard reloads with previous workspace state intact
8. Sidebar remains expanded (state preserved)

### Keyboard Shortcut Flow

1. User working on Dashboard
2. User presses **Ctrl+B** (Windows/Linux) or **Cmd+B** (Mac)
3. Sidebar toggles instantly (collapsed ↔ expanded)
4. No page reload, only sidebar width changes
5. Workspace adjusts width to accommodate
6. Focus returns to previous element

## Technical Requirements

### Component Structure

```typescript
// Sidebar state management
interface SidebarState {
  isExpanded: boolean;
  currentPage: string;
  width: {
    collapsed: number; // 64px
    expanded: number;  // 240px
  };
}

interface NavigationItem {
  id: string;
  label: string;
  icon: string; // emoji or icon component
  href: string;
  available: boolean; // true for Dashboard, false for future pages
  badge?: string; // e.g., "Beta", "New"
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '🏠',
    href: '/',
    available: true,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    href: '/settings',
    available: false, // Coming soon
  },
  {
    id: 'templates',
    label: 'Templates',
    icon: '📋',
    href: '/templates',
    available: false,
  },
  {
    id: 'documentation',
    label: 'Documentation',
    icon: '📚',
    href: '/documentation',
    available: false,
  },
  {
    id: 'export-history',
    label: 'Export History',
    icon: '📦',
    href: '/export-history',
    available: false,
  },
];
```

### React Component Example

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Menu, ChevronLeft } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar_expanded');
    if (savedState !== null) {
      setIsExpanded(JSON.parse(savedState));
    }
  }, []);

  // Save sidebar state to localStorage
  const toggleSidebar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    localStorage.setItem('sidebar_expanded', JSON.stringify(newState));
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-gray-900 dark:bg-gray-950 text-white transition-all duration-300 ease-in-out z-50 flex flex-col ${
        isExpanded ? 'w-60' : 'w-16'
      }`}
    >
      {/* Header with toggle button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          title={isExpanded ? 'Collapse sidebar (Ctrl+B)' : 'Expand sidebar (Ctrl+B)'}
        >
          {isExpanded ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
        {isExpanded && (
          <span className="text-sm font-semibold">MQL5 Builder</span>
        )}
      </div>

      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto py-4">
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => item.available && onNavigate(item.id)}
            disabled={!item.available}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-all relative group ${
              currentPage === item.id
                ? 'bg-blue-600 text-white'
                : item.available
                ? 'hover:bg-gray-800 text-gray-300 hover:text-white'
                : 'text-gray-600 cursor-not-allowed'
            }`}
            title={isExpanded ? undefined : item.label}
          >
            {/* Active indicator */}
            {currentPage === item.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
            )}

            {/* Icon */}
            <span className="text-2xl flex-shrink-0">{item.icon}</span>

            {/* Label (only shown when expanded) */}
            {isExpanded && (
              <div className="flex-1 flex items-center justify-between">
                <span className="text-sm font-medium">{item.label}</span>
                {!item.available && (
                  <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">
                    Soon
                  </span>
                )}
                {item.badge && (
                  <span className="text-xs bg-green-600 px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </div>
            )}

            {/* Tooltip (only shown when collapsed) */}
            {!isExpanded && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.label}
                {!item.available && ' (Coming Soon)'}
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        {isExpanded ? (
          <div className="text-xs text-gray-500">
            <p>Version 1.0.0</p>
            <p className="mt-1">Press Ctrl+B to collapse</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="text-xs text-gray-600">v1.0</span>
          </div>
        )}
      </div>
    </aside>
  );
}
```

### Layout Integration

The main page layout needs to adjust for the sidebar:

```tsx
// app/layout.tsx or app/page.tsx
'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  // Calculate content margin based on sidebar state
  const contentMargin = sidebarExpanded ? 'ml-60' : 'ml-16';

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      
      {/* Main content area with dynamic margin */}
      <main className={`flex-1 overflow-hidden transition-all duration-300 ${contentMargin}`}>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'settings' && <ComingSoonPage title="Settings" />}
        {currentPage === 'templates' && <ComingSoonPage title="Templates" />}
        {currentPage === 'documentation' && <ComingSoonPage title="Documentation" />}
        {currentPage === 'export-history' && <ComingSoonPage title="Export History" />}
      </main>
    </div>
  );
}
```

### LocalStorage Persistence

```typescript
// Sidebar state management
const SIDEBAR_STORAGE_KEY = 'mql5_sidebar_state';

interface StoredSidebarState {
  isExpanded: boolean;
  lastPage: string;
  timestamp: string;
}

// Save sidebar state
const saveSidebarState = (state: { isExpanded: boolean; currentPage: string }) => {
  const stored: StoredSidebarState = {
    isExpanded: state.isExpanded,
    lastPage: state.currentPage,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(stored));
};

// Load sidebar state
const loadSidebarState = (): StoredSidebarState | null => {
  const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
};

// Initialize sidebar from saved state
const initializeSidebar = (): { isExpanded: boolean; currentPage: string } => {
  const saved = loadSidebarState();
  return {
    isExpanded: saved?.isExpanded ?? false, // Default collapsed
    currentPage: saved?.lastPage ?? 'dashboard', // Default Dashboard
  };
};
```

## Edge Cases

### Edge Case 1: First-Time User (No Saved State)
**Scenario**: User opens app for the first time (no localStorage data)  
**Handling**:
- Sidebar defaults to **collapsed** (64px)
- Dashboard page active by default
- After first toggle, state is saved

### Edge Case 2: Narrow Screen / Mobile
**Scenario**: User accesses app on mobile device or narrow window  
**Handling**:
- Sidebar defaults to collapsed on screens < 768px width
- On mobile, expanded sidebar overlays content (position: fixed)
- Clicking outside sidebar on mobile closes it automatically

### Edge Case 3: Keyboard Shortcut Conflict
**Scenario**: User's browser/OS has Ctrl+B bound to another action  
**Handling**:
- Include alternative: hamburger button always available
- Document shortcut in settings page (future)
- Consider alternative shortcut (Ctrl+Shift+B)

### Edge Case 4: Page Not Available
**Scenario**: User clicks Settings/Templates before they're implemented  
**Handling**:
- Show "Coming Soon" placeholder page with description
- Display expected release timeline
- Provide link back to Dashboard
- Navigation item shows "Soon" badge

### Edge Case 5: Rapid Toggle Spam
**Scenario**: User rapidly clicks toggle button or mashes Ctrl+B  
**Handling**:
- Debounce toggle action (300ms minimum between toggles)
- Animation completes before allowing next toggle
- Visual feedback during transition (disabled state)

### Edge Case 6: localStorage Disabled/Full
**Scenario**: User's browser blocks localStorage or quota exceeded  
**Handling**:
- Sidebar works without persistence (session-based state only)
- Show warning toast: "Preferences not saved (storage disabled)"
- Default to collapsed on each page load

## Acceptance Criteria

### Visual Design
- [ ] Sidebar is 64px wide when collapsed (icon-only)
- [ ] Sidebar is 240px wide when expanded (icon + labels)
- [ ] Smooth transition animation (300ms ease-in-out)
- [ ] Hamburger menu icon (☰) visible at top when collapsed
- [ ] ChevronLeft icon (←) visible at top when expanded
- [ ] Current page has visual indicator (blue background)
- [ ] Unavailable pages show "Soon" badge
- [ ] Tooltips appear on hover when collapsed
- [ ] Dark theme for sidebar (gray-900 background)
- [ ] White text with hover states

### Functionality
- [ ] Clicking hamburger icon toggles sidebar
- [ ] Ctrl+B (or Cmd+B) keyboard shortcut toggles sidebar
- [ ] Clicking Dashboard navigates to dashboard page
- [ ] Clicking unavailable items shows "Coming Soon" page
- [ ] Sidebar state persists in localStorage
- [ ] Sidebar state loads on app start
- [ ] Content area adjusts width when sidebar toggles
- [ ] No horizontal scrollbar appears during transition

### Integration
- [ ] Sidebar integrates with main layout
- [ ] Dashboard page works with sidebar
- [ ] Workspace and library adjust for sidebar width
- [ ] Bottom bar spans full width minus sidebar
- [ ] No z-index conflicts with modals/tooltips

### Responsive Behavior
- [ ] Sidebar collapses automatically on mobile (< 768px)
- [ ] Expanded sidebar overlays content on mobile
- [ ] Clicking outside sidebar closes it on mobile
- [ ] Touch-friendly button sizes on mobile (44px minimum)

## Testing Requirements

### E2E Test Cases

```typescript
// Test 1: Default State
test('Sidebar starts collapsed with Dashboard active', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check sidebar width (collapsed)
  const sidebar = page.locator('[data-testid="sidebar"]');
  await expect(sidebar).toHaveCSS('width', '64px');

  // Check Dashboard is active
  const dashboardNav = page.locator('[data-nav="dashboard"]');
  await expect(dashboardNav).toHaveClass(/bg-blue-600/);
});

// Test 2: Expand Sidebar
test('Clicking hamburger expands sidebar', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click hamburger menu
  await page.locator('button:has-text("☰")').click();

  // Wait for animation
  await page.waitForTimeout(350);

  // Check sidebar width (expanded)
  const sidebar = page.locator('[data-testid="sidebar"]');
  await expect(sidebar).toHaveCSS('width', '240px');

  // Check labels are visible
  await expect(page.locator('text=Dashboard')).toBeVisible();
  await expect(page.locator('text=Settings')).toBeVisible();
});

// Test 3: Keyboard Shortcut
test('Ctrl+B toggles sidebar', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const sidebar = page.locator('[data-testid="sidebar"]');

  // Initially collapsed
  await expect(sidebar).toHaveCSS('width', '64px');

  // Press Ctrl+B
  await page.keyboard.press('Control+b');
  await page.waitForTimeout(350);

  // Now expanded
  await expect(sidebar).toHaveCSS('width', '240px');

  // Press Ctrl+B again
  await page.keyboard.press('Control+b');
  await page.waitForTimeout(350);

  // Back to collapsed
  await expect(sidebar).toHaveCSS('width', '64px');
});

// Test 4: State Persistence
test('Sidebar state persists across page reloads', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expand sidebar
  await page.locator('button:has-text("☰")').click();
  await page.waitForTimeout(350);

  // Reload page
  await page.reload();

  // Sidebar should still be expanded
  const sidebar = page.locator('[data-testid="sidebar"]');
  await expect(sidebar).toHaveCSS('width', '240px');
});

// Test 5: Coming Soon Pages
test('Unavailable pages show Coming Soon', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expand sidebar
  await page.locator('button:has-text("☰")').click();

  // Click Settings
  await page.locator('[data-nav="settings"]').click();

  // Check for Coming Soon message
  await expect(page.locator('text=Coming Soon')).toBeVisible();
  await expect(page.locator('text=Settings')).toBeVisible();
});

// Test 6: Content Area Adjustment
test('Content area adjusts width when sidebar toggles', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const content = page.locator('[data-testid="main-content"]');

  // Initially has ml-16 (sidebar collapsed)
  await expect(content).toHaveClass(/ml-16/);

  // Expand sidebar
  await page.keyboard.press('Control+b');
  await page.waitForTimeout(350);

  // Now has ml-60 (sidebar expanded)
  await expect(content).toHaveClass(/ml-60/);
});
```

### Unit Test Cases

```typescript
// Test sidebar toggle logic
describe('Sidebar', () => {
  it('toggles expanded state on button click', () => {
    const { getByRole } = render(<Sidebar currentPage="dashboard" onNavigate={jest.fn()} />);
    const toggleButton = getByRole('button', { name: /expand sidebar/i });

    expect(toggleButton).toHaveTextContent('☰');
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent('←');
  });

  it('calls onNavigate with correct page id', () => {
    const mockNavigate = jest.fn();
    const { getByTestId } = render(<Sidebar currentPage="dashboard" onNavigate={mockNavigate} />);

    fireEvent.click(getByTestId('nav-dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith('dashboard');
  });

  it('persists state to localStorage', () => {
    const { getByRole } = render(<Sidebar currentPage="dashboard" onNavigate={jest.fn()} />);
    const toggleButton = getByRole('button', { name: /expand sidebar/i });

    fireEvent.click(toggleButton);
    expect(localStorage.getItem('sidebar_expanded')).toBe('true');
  });
});
```

## Out of Scope

- ❌ **Nested Navigation**: No sub-menus or nested page hierarchies
- ❌ **User Customization**: Users cannot reorder or hide navigation items
- ❌ **Themes**: Sidebar always dark theme (no light/dark toggle)
- ❌ **Multiple Sidebars**: No right-side or secondary sidebars
- ❌ **Resizable Sidebar**: Width is fixed (not draggable)
- ❌ **Sidebar Content**: No widgets, notifications, or user profile in sidebar

## Success Metrics

- **Toggle Rate**: % of users who expand/collapse sidebar (target: >60%)
- **Navigation Usage**: % of users who click non-Dashboard pages (target: >30% once features available)
- **Keyboard Shortcut Adoption**: % of toggle actions via Ctrl+B (target: >20%)
- **Persistence Success**: % of sessions where state loads correctly (target: >95%)
- **User Satisfaction**: Survey rating for "Navigation is intuitive" (target: >4.5/5)

## Best Practices

### For Developers

**Layout Integration:**
- Use fixed positioning for sidebar
- Apply margin-left to main content dynamically
- Ensure z-index hierarchy (sidebar: 50, modals: 100)

**Animation Performance:**
- Use CSS transforms for smooth animations
- Avoid animating width directly (use transform: translateX)
- Apply will-change: transform for performance

**Accessibility:**
- Include aria-labels on navigation items
- Support keyboard navigation (Tab, Enter, Escape)
- Announce page changes to screen readers

**State Management:**
- Use React Context or Zustand for global sidebar state
- Persist state on every toggle, not on page unload
- Handle localStorage errors gracefully

---

**Feature Status**: ✅ Specification Complete  
**Priority**: P0 (Critical - Foundation Feature)  
**Estimated Effort**: 2-3 days  
**Dependencies**: None (foundation feature)  
**Blocks**: All other features (provides navigation structure)
