'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Eye, Download, Trash2, FileCode2, X } from 'lucide-react';
import { CodeSnippet, WorkspaceBlock, LibraryTab, GlobalVariable, EventHandler, Documentation } from '@/lib/types';
import { defaultSnippets, defaultTabs } from '@/lib/snippets';
import { defaultEventHandlers } from '@/lib/eventHandlers';
import { assembleCode, downloadCode, getCodeStatistics } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';
import ComingSoonPage from '@/components/ComingSoonPage';
import SnippetCard from '@/components/SnippetCard';
import WorkspaceBlockComponent from '@/components/WorkspaceBlock';
import EventHandlerTab from '@/components/EventHandlerTab';
import GlobalVariableBlock from '@/components/GlobalVariableBlock';
import { DocumentationCard, DocumentationModal } from '@/components/DocumentationComponents';

// Dashboard Component
function Dashboard() {
  const router = useRouter();
  
  // Core State
  const [tabs, setTabs] = useState<LibraryTab[]>(defaultTabs);
  const [activeTab, setActiveTab] = useState<string>('utilities');
  const [snippets, setSnippets] = useState<CodeSnippet[]>(defaultSnippets);
  const [workspaceBlocks, setWorkspaceBlocks] = useState<WorkspaceBlock[]>([]);
  const [globalVariables, setGlobalVariables] = useState<GlobalVariable[]>([]);
  const [eventHandlers, setEventHandlers] = useState<EventHandler[]>(defaultEventHandlers);
  const [documentations, setDocumentations] = useState<Documentation[]>([]);

  // UI State
  const [draggedSnippet, setDraggedSnippet] = useState<CodeSnippet | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showAddSnippet, setShowAddSnippet] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Documentation | null>(null);
  const [newSnippet, setNewSnippet] = useState({ name: '', description: '', code: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mql5-builder-state');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        if (state.globalVariables) setGlobalVariables(state.globalVariables);
        if (state.eventHandlers) setEventHandlers(state.eventHandlers);
        if (state.documentations) setDocumentations(state.documentations);
        if (state.workspaceBlocks) setWorkspaceBlocks(state.workspaceBlocks);
        if (state.snippets) setSnippets([...defaultSnippets, ...state.snippets.filter((s: CodeSnippet) => s.isCustom)]);
      } catch (e) {
        console.error('Failed to load saved state:', e);
      }
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const state = {
      globalVariables,
      eventHandlers,
      documentations,
      workspaceBlocks,
      snippets: snippets.filter(s => s.isCustom),
    };
    localStorage.setItem('mql5-builder-state', JSON.stringify(state));
  }, [globalVariables, eventHandlers, documentations, workspaceBlocks, snippets]);

  // Event Handler Management
  const handleToggleEventHandler = (handlerId: string) => {
    setEventHandlers(handlers =>
      handlers.map(h =>
        h.id === handlerId ? { ...h, enabled: !h.enabled } : h
      )
    );
  };

  // Global Variable Management
  const handleUpdateGlobal = (id: string, newValue: string | number | boolean) => {
    setGlobalVariables(vars =>
      vars.map(v =>
        v.id === id
          ? { ...v, currentValue: newValue, isModified: newValue !== v.defaultValue }
          : v
      )
    );
  };

  const handleDeleteGlobal = (id: string) => {
    const variable = globalVariables.find(v => v.id === id);
    if (variable && variable.usedBy && variable.usedBy.length > 0) {
      if (!confirm(`This variable is used by ${variable.usedBy.length} block(s). Delete anyway?`)) {
        return;
      }
    }
    setGlobalVariables(vars => vars.filter(v => v.id !== id));
  };

  const handleResetGlobal = (id: string) => {
    setGlobalVariables(vars =>
      vars.map(v =>
        v.id === id
          ? { ...v, currentValue: v.defaultValue, isModified: false }
          : v
      )
    );
  };

  // Drag and Drop
  const handleDragStart = (snippet: CodeSnippet) => {
    setDraggedSnippet(snippet);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedSnippet) {
      // Create main block
      const newBlock: WorkspaceBlock = {
        id: `block-${Date.now()}`,
        snippetId: draggedSnippet.id,
        snippet: draggedSnippet,
        position: workspaceBlocks.filter(b => b.section === 'main').length,
        isExpanded: false,
        section: 'main',
      };
      setWorkspaceBlocks([...workspaceBlocks, newBlock]);

      // Auto-create global variables if snippet has them
      if (draggedSnippet.globalVariables && draggedSnippet.globalVariables.length > 0) {
        const newGlobals = draggedSnippet.globalVariables.map(gv => ({
          ...gv,
          id: `${gv.id}-${Date.now()}`,
          usedBy: [newBlock.id],
        })).filter(
          gv => !globalVariables.some(existing => existing.name === gv.name)
        );
        setGlobalVariables([...globalVariables, ...newGlobals]);
      }

      setDraggedSnippet(null);
    }
  };

  const handleDeleteBlock = (id: string) => {
    const block = workspaceBlocks.find(b => b.id === id);
    if (block) {
      // Remove globals associated ONLY with this block
      const snippetGlobals = block.snippet.globalVariables || [];
      const globalIdsToCheck = snippetGlobals.map(g => g.id);
      
      // Only remove globals that are ONLY used by this block
      setGlobalVariables(vars => 
        vars.filter(v => {
          if (v.usedBy && v.usedBy.includes(id)) {
            // Remove this block from usedBy
            const remaining = v.usedBy.filter(blockId => blockId !== id);
            if (remaining.length === 0) {
              return false; // Remove global if no blocks use it
            }
          }
          return true;
        }).map(v => ({
          ...v,
          usedBy: v.usedBy?.filter(blockId => blockId !== id) || []
        }))
      );
    }
    setWorkspaceBlocks(workspaceBlocks.filter(block => block.id !== id));
  };

  const handleToggleExpand = (id: string) => {
    setWorkspaceBlocks(
      workspaceBlocks.map(block =>
        block.id === id ? { ...block, isExpanded: !block.isExpanded } : block
      )
    );
  };

  // Custom Snippets
  const handleAddCustomSnippet = () => {
    if (newSnippet.name && newSnippet.code) {
      const customSnippet: CodeSnippet = {
        id: `custom-${Date.now()}`,
        name: newSnippet.name,
        description: newSnippet.description,
        code: newSnippet.code,
        category: activeTab === 'utilities' ? 'Utilities' : activeTab === 'indicators' ? 'Indicators' : 'Pre-made Functions',
        isCustom: true,
      };
      setSnippets([...snippets, customSnippet]);
      setNewSnippet({ name: '', description: '', code: '' });
      setShowAddSnippet(false);
    }
  };

  // Documentation Management
  const handleSaveDoc = (docData: Omit<Documentation, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingDoc) {
      // Update existing
      setDocumentations(docs =>
        docs.map(d =>
          d.id === editingDoc.id
            ? { ...d, ...docData, updatedAt: new Date().toISOString() }
            : d
        )
      );
    } else {
      // Create new
      const newDoc: Documentation = {
        id: `doc-${Date.now()}`,
        ...docData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setDocumentations([...documentations, newDoc]);
    }
    setEditingDoc(null);
    setShowDocModal(false);
  };

  const handleDeleteDoc = (id: string) => {
    if (confirm('Delete this documentation?')) {
      setDocumentations(docs => docs.filter(d => d.id !== id));
    }
  };

  const handleTogglePin = (id: string) => {
    setDocumentations(docs =>
      docs.map(d => (d.id === id ? { ...d, isPinned: !d.isPinned } : d))
    );
  };

  const handleViewDoc = (doc: Documentation) => {
    setEditingDoc(doc);
    setShowDocModal(true);
  };

  const handleEditDoc = (doc: Documentation) => {
    setEditingDoc(doc);
    setShowDocModal(true);
  };

  // Preview and Export
  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleExport = () => {
    const code = assembleCode(workspaceBlocks, globalVariables, eventHandlers);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    downloadCode(code, `EA_${timestamp}.txt`);
  };

  const assembledCode = assembleCode(workspaceBlocks, globalVariables, eventHandlers);
  const stats = getCodeStatistics(assembledCode);

  // Filter snippets and documentations
  const filteredSnippets = snippets.filter(snippet => {
    if (activeTab === 'documentations' || activeTab === 'event-handlers') return false;
    
    const categoryMap: Record<string, string> = {
      'utilities': 'Utilities',
      'indicators': 'Indicators',
      'pre-made-functions': 'Pre-made Functions',
    };
    
    const matchesCategory = snippet.category === categoryMap[activeTab];
    const matchesSearch = searchQuery === '' || 
      snippet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const filteredDocs = documentations.filter(doc => {
    const matchesSearch = searchQuery === '' ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    // Pinned docs first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const enabledHandlerCount = eventHandlers.filter(h => h.enabled).length;
  const modifiedGlobalCount = globalVariables.filter(v => v.isModified).length;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            🔧 MQL5 Expert Advisor Builder
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Drag and drop code snippets to build your trading bot • {enabledHandlerCount} handlers enabled • {modifiedGlobalCount} globals modified
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Workspace (Left) */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                📦 Workspace
              </h2>
              <button
                onClick={() => {
                  if (confirm('Clear all blocks and globals?')) {
                    setWorkspaceBlocks([]);
                    setGlobalVariables([]);
                  }
                }}
                className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                disabled={workspaceBlocks.length === 0}
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>

            {/* Global Variables Section */}
            {globalVariables.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <span>🔹</span>
                  Global Variables ({globalVariables.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {globalVariables.map(variable => (
                    <GlobalVariableBlock
                      key={variable.id}
                      variable={variable}
                      onUpdate={handleUpdateGlobal}
                      onDelete={handleDeleteGlobal}
                      onReset={handleResetGlobal}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Code Blocks Section */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`flex-1 border-2 border-dashed rounded-lg p-4 ${
                draggedSnippet
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              {workspaceBlocks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 py-20">
                  <FileCode2 className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg">Drag code snippets here to start building</p>
                  <p className="text-sm mt-2">Your Expert Advisor will be assembled automatically</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {workspaceBlocks.map(block => (
                    <WorkspaceBlockComponent
                      key={block.id}
                      block={block}
                      onDelete={handleDeleteBlock}
                      onToggleExpand={handleToggleExpand}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Library (Right) */}
        <div className="w-96 bg-white dark:bg-gray-800 shadow-lg border-l border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              📚 Code Library
            </h2>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {tab.icon} {tab.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {/* Event Handlers Tab */}
            {activeTab === 'event-handlers' && (
              <EventHandlerTab
                handlers={eventHandlers}
                onToggleHandler={handleToggleEventHandler}
              />
            )}

            {/* Documentations Tab */}
            {activeTab === 'documentations' && (
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setEditingDoc(null);
                    setShowDocModal(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Documentation
                </button>

                {filteredDocs.map(doc => (
                  <DocumentationCard
                    key={doc.id}
                    documentation={doc}
                    onView={handleViewDoc}
                    onEdit={handleEditDoc}
                    onDelete={handleDeleteDoc}
                    onTogglePin={handleTogglePin}
                  />
                ))}
              </div>
            )}

            {/* Code Snippets Tabs */}
            {activeTab !== 'event-handlers' && activeTab !== 'documentations' && (
              <div className="space-y-2">
                {filteredSnippets.map(snippet => (
                  <SnippetCard
                    key={snippet.id}
                    snippet={snippet}
                    onDragStart={handleDragStart}
                  />
                ))}

                {/* Add Custom Snippet Button */}
                {!showAddSnippet && (
                  <button
                    onClick={() => setShowAddSnippet(true)}
                    className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <Plus className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">Add Custom Snippet</span>
                  </button>
                )}

                {showAddSnippet && (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
                    <input
                      type="text"
                      placeholder="Snippet Name"
                      value={newSnippet.name}
                      onChange={(e) => setNewSnippet({ ...newSnippet, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={newSnippet.description}
                      onChange={(e) => setNewSnippet({ ...newSnippet, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    />
                    <textarea
                      placeholder="MQL5 Code"
                      value={newSnippet.code}
                      onChange={(e) => setNewSnippet({ ...newSnippet, code: e.target.value })}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded font-mono text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddCustomSnippet}
                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setShowAddSnippet(false)}
                        className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
            <span>Blocks: <strong className="text-gray-900 dark:text-white">{workspaceBlocks.length}</strong></span>
            <span>Globals: <strong className="text-gray-900 dark:text-white">{globalVariables.length}</strong></span>
            <span>Handlers: <strong className="text-gray-900 dark:text-white">{enabledHandlerCount}/{eventHandlers.length}</strong></span>
            <span>Lines: <strong className="text-gray-900 dark:text-white">{stats.lines}</strong></span>
            <span>Functions: <strong className="text-gray-900 dark:text-white">{stats.functions}</strong></span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handlePreview}
              disabled={workspaceBlocks.length === 0}
              className="flex items-center gap-2 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Eye className="w-5 h-5" />
              Preview Code
            </button>
            <button
              onClick={handleExport}
              disabled={workspaceBlocks.length === 0}
              className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              Export EA
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Code Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                aria-label="Close preview"
                title="Close preview"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                <code>{assembledCode}</code>
              </pre>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400 flex gap-4">
                <span>{stats.lines} lines</span>
                <span>{stats.functions} functions</span>
                <span>{enabledHandlerCount} handlers</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(assembledCode);
                    alert('Code copied to clipboard!');
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Copy to Clipboard
                </button>
                <button
                  onClick={() => {
                    handleExport();
                    setShowPreview(false);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documentation Modal */}
      {showDocModal && (
        <DocumentationModal
          documentation={editingDoc}
          onClose={() => {
            setShowDocModal(false);
            setEditingDoc(null);
          }}
          onSave={handleSaveDoc}
        />
      )}
    </div>
  );
}

// Main App Component with Sidebar
export default function Home() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  // Listen to sidebar state changes
  useEffect(() => {
    const checkSidebarState = () => {
      const saved = localStorage.getItem('mql5_sidebar_expanded');
      if (saved !== null) {
        setSidebarExpanded(JSON.parse(saved));
      }
    };

    checkSidebarState();
    window.addEventListener('storage', checkSidebarState);
    return () => window.removeEventListener('storage', checkSidebarState);
  }, []);

  const handleNavigate = (pageId: string) => {
    // Route to Trading Journal using Next.js router
    if (pageId === 'trading-journal') {
      router.push('/trading-journal');
      return;
    }
    // For other pages, use local state
    setCurrentPage(pageId);
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      
      {/* Main content area with dynamic margin based on sidebar state */}
      <main 
        className={`flex-1 overflow-hidden transition-all duration-300 ${
          sidebarExpanded ? 'ml-60' : 'ml-16'
        }`}
        data-testid="main-content"
      >
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'settings' && (
          <ComingSoonPage 
            title="Settings" 
            description="Configure application preferences, theme customization, and keyboard shortcuts."
            onBack={handleBackToDashboard}
          />
        )}
        {currentPage === 'templates' && (
          <ComingSoonPage 
            title="Templates" 
            description="Save and manage EA templates for quick loading and sharing."
            onBack={handleBackToDashboard}
          />
        )}
        {currentPage === 'documentation' && (
          <ComingSoonPage 
            title="Documentation" 
            description="Access comprehensive guides, video tutorials, and API reference."
            onBack={handleBackToDashboard}
          />
        )}
        {currentPage === 'export-history' && (
          <ComingSoonPage 
            title="Export History" 
            description="View past exports, re-download EAs, and compare versions."
            onBack={handleBackToDashboard}
          />
        )}
      </main>
    </div>
  );
}
