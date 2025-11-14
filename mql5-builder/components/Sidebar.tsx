'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, ChevronLeft, Home, Settings, FileText, BookOpen, Package, BarChart3 } from 'lucide-react';

interface SidebarProps {
  currentPage?: string;
  onNavigate?: (pageId: string) => void;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  available: boolean;
  badge?: string;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Home className="w-5 h-5" />,
    href: '/',
    available: true,
  },
  {
    id: 'trading-journal',
    label: 'Trading Journal',
    icon: <BarChart3 className="w-5 h-5" />,
    href: '/trading-journal',
    available: true,
    badge: 'NEW',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    href: '/settings',
    available: false,
  },
  {
    id: 'templates',
    label: 'Templates',
    icon: <FileText className="w-5 h-5" />,
    href: '/templates',
    available: false,
  },
  {
    id: 'documentation',
    label: 'Documentation',
    icon: <BookOpen className="w-5 h-5" />,
    href: '/documentation',
    available: false,
  },
  {
    id: 'export-history',
    label: 'Export History',
    icon: <Package className="w-5 h-5" />,
    href: '/export-history',
    available: false,
  },
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine current page from pathname if not provided
  const getCurrentPage = () => {
    if (currentPage) return currentPage;
    if (pathname === '/') return 'dashboard';
    if (pathname === '/trading-journal') return 'trading-journal';
    if (pathname === '/settings') return 'settings';
    if (pathname === '/templates') return 'templates';
    if (pathname === '/documentation') return 'documentation';
    if (pathname === '/export-history') return 'export-history';
    return 'dashboard';
  };

  const activePage = getCurrentPage();

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('mql5_sidebar_expanded');
    if (savedState !== null) {
      setIsExpanded(JSON.parse(savedState));
    }
  }, []);

  // Save sidebar state to localStorage
  const toggleSidebar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    localStorage.setItem('mql5_sidebar_expanded', JSON.stringify(newState));
  };

  // Keyboard shortcut listener (Ctrl+B or Cmd+B)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-gray-900 dark:bg-gray-950 text-white transition-all duration-300 ease-in-out z-50 flex flex-col border-r border-gray-700 ${
        isExpanded ? 'w-60' : 'w-16'
      }`}
      data-testid="sidebar"
    >
      {/* Header with toggle button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          title={isExpanded ? 'Collapse sidebar (Ctrl+B)' : 'Expand sidebar (Ctrl+B)'}
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
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
            onClick={() => {
              if (!item.available) return;
              if (onNavigate) {
                onNavigate(item.id);
              } else {
                router.push(item.href);
              }
            }}
            disabled={!item.available}
            data-nav={item.id}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-all relative group ${
              activePage === item.id
                ? 'bg-blue-600 text-white'
                : item.available
                ? 'hover:bg-gray-800 text-gray-300 hover:text-white'
                : 'text-gray-600 cursor-not-allowed'
            }`}
            title={isExpanded ? undefined : item.label}
          >
            {/* Active indicator */}
            {activePage === item.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
            )}

            {/* Icon */}
            <span className="flex-shrink-0">{item.icon}</span>

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
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
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
