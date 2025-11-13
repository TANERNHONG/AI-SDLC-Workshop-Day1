import { EventHandler } from './types';

export const defaultEventHandlers: EventHandler[] = [
  // REQUIRED HANDLERS (Always included)
  {
    id: 'onInit',
    name: 'OnInit',
    displayName: 'OnInit',
    description: 'Called when EA is loaded or attached to chart. Used for initialization and setup.',
    useCase: 'Initialize indicators, set up timers, validate inputs',
    required: true,
    enabled: true,
    category: 'lifecycle',
    signature: 'int OnInit()',
  },
  {
    id: 'onDeinit',
    name: 'OnDeinit',
    displayName: 'OnDeinit',
    description: 'Called when EA is removed from chart. Used for cleanup and resource release.',
    useCase: 'Release indicator handles, kill timers, save data',
    required: true,
    enabled: true,
    category: 'lifecycle',
    signature: 'void OnDeinit(const int reason)',
  },

  // OPTIONAL HANDLERS (User toggleable)
  {
    id: 'onStart',
    name: 'OnStart',
    displayName: 'OnStart',
    description: 'Entry point for scripts and service programs. Not typically used in EAs.',
    useCase: 'Script entry point, batch processing',
    required: false,
    enabled: false,
    category: 'lifecycle',
    signature: 'void OnStart()',
  },
  {
    id: 'onTick',
    name: 'OnTick',
    displayName: 'OnTick',
    description: 'Called on every incoming price tick. Main function for trading logic.',
    useCase: 'Check signals, open/close positions, monitor trades',
    required: false,
    enabled: false,
    category: 'trading',
    signature: 'void OnTick()',
  },
  {
    id: 'onCalculate',
    name: 'OnCalculate',
    displayName: 'OnCalculate',
    description: 'Used for custom indicators. Calculates indicator values on new bar.',
    useCase: 'Custom indicator calculations, buffer management',
    required: false,
    enabled: false,
    category: 'data',
    signature: 'int OnCalculate(const int rates_total, const int prev_calculated, const datetime &time[], const double &open[], const double &high[], const double &low[], const double &close[], const long &tick_volume[], const long &volume[], const int &spread[])',
  },
  {
    id: 'onTimer',
    name: 'OnTimer',
    displayName: 'OnTimer',
    description: 'Called at specified intervals. Requires EventSetTimer() in OnInit.',
    useCase: 'Periodic checks, time-based actions, logging',
    required: false,
    enabled: false,
    category: 'trading',
    dependencies: ['EventSetTimer() must be called in OnInit'],
    signature: 'void OnTimer()',
  },
  {
    id: 'onTrade',
    name: 'OnTrade',
    displayName: 'OnTrade',
    description: 'Called when trade operation is completed. Simple notification of trade events.',
    useCase: 'Log trade completions, send notifications',
    required: false,
    enabled: false,
    category: 'trading',
    signature: 'void OnTrade()',
  },
  {
    id: 'onTradeTransaction',
    name: 'OnTradeTransaction',
    displayName: 'OnTradeTransaction',
    description: 'Called on trade transaction event. Provides detailed trade information.',
    useCase: 'Advanced trade tracking, order state monitoring',
    required: false,
    enabled: false,
    category: 'trading',
    signature: 'void OnTradeTransaction(const MqlTradeTransaction &trans, const MqlTradeRequest &request, const MqlTradeResult &result)',
  },
  {
    id: 'onBookEvent',
    name: 'OnBookEvent',
    displayName: 'OnBookEvent',
    description: 'Called when market depth (DOM) changes for subscribed symbol.',
    useCase: 'Depth of market analysis, order book trading',
    required: false,
    enabled: false,
    category: 'data',
    dependencies: ['MarketBookAdd() must be called for symbol'],
    signature: 'void OnBookEvent(const string &symbol)',
  },
  {
    id: 'onChartEvent',
    name: 'OnChartEvent',
    displayName: 'OnChartEvent',
    description: 'Called on chart events (click, object creation, keyboard input).',
    useCase: 'Interactive EAs, GUI elements, hotkey support',
    required: false,
    enabled: false,
    category: 'interaction',
    signature: 'void OnChartEvent(const int id, const long &lparam, const double &dparam, const string &sparam)',
  },
  {
    id: 'onTester',
    name: 'OnTester',
    displayName: 'OnTester',
    description: 'Called after strategy tester run. Returns custom optimization criterion.',
    useCase: 'Custom optimization metrics, fitness functions',
    required: false,
    enabled: false,
    category: 'testing',
    signature: 'double OnTester()',
  },
  {
    id: 'onTesterInit',
    name: 'OnTesterInit',
    displayName: 'OnTesterInit',
    description: 'Called at start of strategy tester optimization.',
    useCase: 'Initialize tester variables, setup optimization',
    required: false,
    enabled: false,
    category: 'testing',
    signature: 'void OnTesterInit()',
  },
  {
    id: 'onTesterDeinit',
    name: 'OnTesterDeinit',
    displayName: 'OnTesterDeinit',
    description: 'Called at end of strategy tester optimization.',
    useCase: 'Cleanup after optimization, save results',
    required: false,
    enabled: false,
    category: 'testing',
    signature: 'void OnTesterDeinit()',
  },
  {
    id: 'onTesterPass',
    name: 'OnTesterPass',
    displayName: 'OnTesterPass',
    description: 'Called when optimization pass frame received from strategy tester agent.',
    useCase: 'Process optimization pass results in real-time',
    required: false,
    enabled: false,
    category: 'testing',
    signature: 'void OnTesterPass()',
  },
];

export function getHandlersByCategory(handlers: EventHandler[]) {
  return {
    required: handlers.filter(h => h.required),
    lifecycle: handlers.filter(h => h.category === 'lifecycle' && !h.required),
    trading: handlers.filter(h => h.category === 'trading'),
    data: handlers.filter(h => h.category === 'data'),
    interaction: handlers.filter(h => h.category === 'interaction'),
    testing: handlers.filter(h => h.category === 'testing'),
  };
}

export function getEnabledHandlers(handlers: EventHandler[]): EventHandler[] {
  return handlers.filter(h => h.enabled);
}

export function generateHandlerCode(handler: EventHandler): string {
  if (handler.name === 'OnInit') {
    return `${handler.signature} {
   // Initialization code here
   Print("EA Initialized");
   return(INIT_SUCCEEDED);
}`;
  }

  if (handler.name === 'OnDeinit') {
    return `${handler.signature} {
   // Cleanup code here
   Print("EA Deinitialized");
}`;
  }

  return `${handler.signature} {
   // ${handler.displayName} logic here
}`;
}
