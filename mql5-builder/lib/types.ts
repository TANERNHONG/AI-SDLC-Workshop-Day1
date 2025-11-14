// Types for code snippets
export interface CodeSnippet {
  id: string;
  name: string;
  description: string;
  code: string;
  category: string;
  parameters?: string[];
  returnType?: string;
  isCustom?: boolean;
  globalVariables?: GlobalVariable[]; // Auto-generated globals for this snippet
}

// Types for global variables
export interface GlobalVariable {
  id: string;
  name: string;
  type: 'int' | 'double' | 'string' | 'bool' | 'datetime';
  defaultValue: string | number | boolean;
  currentValue: string | number | boolean;
  description: string;
  min?: number;
  max?: number;
  step?: number;
  usedBy: string[]; // IDs of blocks that use this global
  isModified: boolean;
}

// Types for library tabs
export interface LibraryTab {
  id: string;
  name: string;
  icon?: string;
  isDefault: boolean;
}

// Types for workspace blocks
export interface WorkspaceBlock {
  id: string;
  snippetId: string;
  snippet: CodeSnippet;
  position: number;
  isExpanded: boolean;
  parameters?: Record<string, any>;
  section: 'globals' | 'handlers' | 'main';
}

// Types for templates
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  blocks: WorkspaceBlock[];
}

// Types for event handlers
export interface EventHandler {
  id: string;
  name: string;
  displayName: string;
  description: string;
  useCase: string;
  required: boolean;
  enabled: boolean;
  category: 'lifecycle' | 'trading' | 'testing' | 'interaction' | 'data';
  dependencies?: string[];
  signature: string;
}

// Types for documentation
export interface Documentation {
  id: string;
  title: string;
  category: 'strategy' | 'parameter' | 'setup' | 'troubleshooting' | 'journal' | 'general';
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
}

// Types for Trading Journal (PRP-15)
export type TradeType = 'BUY' | 'SELL';
export type Platform = 'MT5' | 'MT4' | 'cTrader' | 'Other';
export type SecurityType = 'Forex' | 'Stocks' | 'Futures' | 'Crypto' | 'Other';
export type ViewMode = 'day' | 'week' | 'month' | 'year';

export interface Trade {
  id: string;
  type: TradeType;
  volume: number;
  symbol: string;
  dateTime: string; // ISO 8601 format
  profitLoss: number;
  broker: string;
  platform: Platform;
  securityType: SecurityType;
  comments: string;
  createdAt: string;
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  totalVolume: number;
  tradeCount: number;
  winCount: number;
  lossCount: number;
  winRate: number; // percentage
  totalProfitLoss: number;
  comments: string;
}

export interface FilterOptions {
  symbol?: string;
  type?: TradeType | 'all';
  securityType?: SecurityType | 'all';
  broker?: string;
  platform?: Platform | 'all';
  startDate?: string;
  endDate?: string;
}

export interface CSVImportResult {
  trades: Trade[];
  duplicates: Trade[];
  errors: string[];
}
