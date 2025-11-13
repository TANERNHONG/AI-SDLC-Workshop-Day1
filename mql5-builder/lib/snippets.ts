import { CodeSnippet } from './types';

export const defaultSnippets: CodeSnippet[] = [
  // UTILITIES TAB
  {
    id: 'util-1',
    name: 'Calculate Lot Size',
    description: 'Calculates position size based on account balance, risk percentage, and stop loss distance',
    category: 'Utilities',
    globalVariables: [
      {
        id: 'g_risk_percent',
        name: 'g_risk_percent',
        type: 'double',
        defaultValue: 1.0,
        currentValue: 1.0,
        description: 'Risk percentage per trade',
        min: 0.1,
        max: 10.0,
        step: 0.1,
        usedBy: ['util-1'],
        isModified: false,
      },
    ],
    code: `double CalculateLotSize(double riskPercent, double stopLossPips) {
   double accountBalance = AccountInfoDouble(ACCOUNT_BALANCE);
   string symbol = Symbol();
   double tickValue = SymbolInfoDouble(symbol, SYMBOL_TRADE_TICK_VALUE);
   double tickSize = SymbolInfoDouble(symbol, SYMBOL_TRADE_TICK_SIZE);
   double point = SymbolInfoDouble(symbol, SYMBOL_POINT);
   
   double riskAmount = accountBalance * (riskPercent / 100.0);
   double pipValue = (tickValue / tickSize) * point;
   double lotSize = riskAmount / (stopLossPips * pipValue * 10);
   
   double minLot = SymbolInfoDouble(symbol, SYMBOL_VOLUME_MIN);
   double maxLot = SymbolInfoDouble(symbol, SYMBOL_VOLUME_MAX);
   double lotStep = SymbolInfoDouble(symbol, SYMBOL_VOLUME_STEP);
   
   lotSize = MathFloor(lotSize / lotStep) * lotStep;
   lotSize = MathMax(minLot, MathMin(maxLot, lotSize));
   
   return lotSize;
}`,
    parameters: ['riskPercent: double', 'stopLossPips: double'],
    returnType: 'double',
  },
  {
    id: 'util-2',
    name: 'Trailing Stop',
    description: 'Adjusts stop loss to lock in profits as price moves favorably',
    category: 'Utilities',
    code: `void TrailingStop(double trailDistance) {
   for(int i = PositionsTotal() - 1; i >= 0; i--) {
      if(PositionSelectByTicket(PositionGetTicket(i))) {
         if(PositionGetString(POSITION_SYMBOL) == Symbol()) {
            double positionOpenPrice = PositionGetDouble(POSITION_PRICE_OPEN);
            double currentSL = PositionGetDouble(POSITION_SL);
            double currentPrice = PositionGetInteger(POSITION_TYPE) == POSITION_TYPE_BUY ? 
                                   SymbolInfoDouble(Symbol(), SYMBOL_BID) : 
                                   SymbolInfoDouble(Symbol(), SYMBOL_ASK);
            
            double newSL;
            if(PositionGetInteger(POSITION_TYPE) == POSITION_TYPE_BUY) {
               newSL = currentPrice - trailDistance * Point();
               if(newSL > currentSL && newSL < currentPrice) {
                  MqlTradeRequest request;
                  MqlTradeResult result;
                  ZeroMemory(request);
                  request.action = TRADE_ACTION_SLTP;
                  request.position = PositionGetTicket(i);
                  request.sl = NormalizeDouble(newSL, Digits());
                  request.tp = PositionGetDouble(POSITION_TP);
                  OrderSend(request, result);
               }
            } else {
               newSL = currentPrice + trailDistance * Point();
               if((currentSL == 0 || newSL < currentSL) && newSL > currentPrice) {
                  MqlTradeRequest request;
                  MqlTradeResult result;
                  ZeroMemory(request);
                  request.action = TRADE_ACTION_SLTP;
                  request.position = PositionGetTicket(i);
                  request.sl = NormalizeDouble(newSL, Digits());
                  request.tp = PositionGetDouble(POSITION_TP);
                  OrderSend(request, result);
               }
            }
         }
      }
   }
}`,
    parameters: ['trailDistance: double'],
    returnType: 'void',
  },
  {
    id: 'util-3',
    name: 'Trading Hours Filter',
    description: 'Checks if current time is within specified trading hours',
    category: 'Utilities',
    code: `bool IsTradingHours(int startHour, int endHour) {
   MqlDateTime timeStruct;
   TimeToStruct(TimeCurrent(), timeStruct);
   int currentHour = timeStruct.hour;
   
   if(startHour < endHour) {
      return (currentHour >= startHour && currentHour < endHour);
   } else {
      return (currentHour >= startHour || currentHour < endHour);
   }
}`,
    parameters: ['startHour: int', 'endHour: int'],
    returnType: 'bool',
  },
  {
    id: 'util-4',
    name: 'Check Free Margin',
    description: 'Verifies sufficient free margin before opening position',
    category: 'Utilities',
    code: `bool HasSufficientMargin(double lotSize) {
   double freeMargin = AccountInfoDouble(ACCOUNT_MARGIN_FREE);
   double requiredMargin = 0;
   
   if(!OrderCalcMargin(ORDER_TYPE_BUY, Symbol(), lotSize, 
                        SymbolInfoDouble(Symbol(), SYMBOL_ASK), requiredMargin)) {
      return false;
   }
   
   return (freeMargin >= requiredMargin * 1.5);
}`,
    parameters: ['lotSize: double'],
    returnType: 'bool',
  },

  // INDICATORS TAB
  {
    id: 'ind-1',
    name: 'Moving Average Crossover',
    description: 'Detects MA crossover signals for entry',
    category: 'Indicators',
    globalVariables: [
      {
        id: 'g_ma_fast_period',
        name: 'g_ma_fast_period',
        type: 'int',
        defaultValue: 10,
        currentValue: 10,
        description: 'Fast MA period',
        min: 1,
        max: 200,
        step: 1,
        usedBy: ['ind-1'],
        isModified: false,
      },
      {
        id: 'g_ma_slow_period',
        name: 'g_ma_slow_period',
        type: 'int',
        defaultValue: 20,
        currentValue: 20,
        description: 'Slow MA period',
        min: 1,
        max: 200,
        step: 1,
        usedBy: ['ind-1'],
        isModified: false,
      },
    ],
    code: `int CheckMACrossover(int fastPeriod, int slowPeriod) {
   double fastMA[], slowMA[];
   ArraySetAsSeries(fastMA, true);
   ArraySetAsSeries(slowMA, true);
   
   int fastHandle = iMA(Symbol(), PERIOD_CURRENT, fastPeriod, 0, MODE_EMA, PRICE_CLOSE);
   int slowHandle = iMA(Symbol(), PERIOD_CURRENT, slowPeriod, 0, MODE_EMA, PRICE_CLOSE);
   
   if(CopyBuffer(fastHandle, 0, 0, 3, fastMA) < 3 || 
      CopyBuffer(slowHandle, 0, 0, 3, slowMA) < 3) {
      return 0;
   }
   
   // Bullish crossover
   if(fastMA[1] > slowMA[1] && fastMA[2] <= slowMA[2]) {
      return 1;
   }
   
   // Bearish crossover
   if(fastMA[1] < slowMA[1] && fastMA[2] >= slowMA[2]) {
      return -1;
   }
   
   return 0;
}`,
    parameters: ['fastPeriod: int', 'slowPeriod: int'],
    returnType: 'int (1=buy, -1=sell, 0=no signal)',
  },
  {
    id: 'ind-2',
    name: 'RSI Overbought/Oversold',
    description: 'Checks RSI levels for reversal signals',
    category: 'Indicators',
    globalVariables: [
      {
        id: 'g_rsi_period',
        name: 'g_rsi_period',
        type: 'int',
        defaultValue: 14,
        currentValue: 14,
        description: 'RSI period',
        min: 2,
        max: 100,
        step: 1,
        usedBy: ['ind-2'],
        isModified: false,
      },
      {
        id: 'g_rsi_overbought',
        name: 'g_rsi_overbought',
        type: 'double',
        defaultValue: 70.0,
        currentValue: 70.0,
        description: 'RSI overbought level',
        min: 50,
        max: 100,
        step: 5,
        usedBy: ['ind-2'],
        isModified: false,
      },
      {
        id: 'g_rsi_oversold',
        name: 'g_rsi_oversold',
        type: 'double',
        defaultValue: 30.0,
        currentValue: 30.0,
        description: 'RSI oversold level',
        min: 0,
        max: 50,
        step: 5,
        usedBy: ['ind-2'],
        isModified: false,
      },
    ],
    code: `int CheckRSI(int period, double overbought, double oversold) {
   double rsi[];
   ArraySetAsSeries(rsi, true);
   
   int handle = iRSI(Symbol(), PERIOD_CURRENT, period, PRICE_CLOSE);
   if(CopyBuffer(handle, 0, 0, 2, rsi) < 2) {
      return 0;
   }
   
   // Oversold condition (buy signal)
   if(rsi[1] < oversold && rsi[0] >= oversold) {
      return 1;
   }
   
   // Overbought condition (sell signal)
   if(rsi[1] > overbought && rsi[0] <= overbought) {
      return -1;
   }
   
   return 0;
}`,
    parameters: ['period: int', 'overbought: double', 'oversold: double'],
    returnType: 'int (1=buy, -1=sell, 0=no signal)',
  },
  {
    id: 'ind-3',
    name: 'Bollinger Bands Breakout',
    description: 'Detects price breaking out of Bollinger Bands',
    category: 'Indicators',
    code: `int CheckBollingerBreakout(int period, double deviation) {
   double upper[], lower[], middle[];
   ArraySetAsSeries(upper, true);
   ArraySetAsSeries(lower, true);
   ArraySetAsSeries(middle, true);
   
   int handle = iBands(Symbol(), PERIOD_CURRENT, period, 0, deviation, PRICE_CLOSE);
   if(CopyBuffer(handle, 1, 0, 2, upper) < 2 || 
      CopyBuffer(handle, 2, 0, 2, lower) < 2) {
      return 0;
   }
   
   double close = iClose(Symbol(), PERIOD_CURRENT, 0);
   double prevClose = iClose(Symbol(), PERIOD_CURRENT, 1);
   
   // Upper band breakout (buy)
   if(close > upper[0] && prevClose <= upper[1]) {
      return 1;
   }
   
   // Lower band breakout (sell)
   if(close < lower[0] && prevClose >= lower[1]) {
      return -1;
   }
   
   return 0;
}`,
    parameters: ['period: int', 'deviation: double'],
    returnType: 'int (1=buy, -1=sell, 0=no signal)',
  },
  {
    id: 'ind-4',
    name: 'MACD Signal',
    description: 'Generates signals based on MACD histogram',
    category: 'Indicators',
    code: `int CheckMACD(int fastEMA, int slowEMA, int signalSMA) {
   double macd[], signal[];
   ArraySetAsSeries(macd, true);
   ArraySetAsSeries(signal, true);
   
   int handle = iMACD(Symbol(), PERIOD_CURRENT, fastEMA, slowEMA, signalSMA, PRICE_CLOSE);
   if(CopyBuffer(handle, 0, 0, 3, macd) < 3 || 
      CopyBuffer(handle, 1, 0, 3, signal) < 3) {
      return 0;
   }
   
   double histogram0 = macd[0] - signal[0];
   double histogram1 = macd[1] - signal[1];
   double histogram2 = macd[2] - signal[2];
   
   // Bullish crossover
   if(histogram0 > 0 && histogram1 <= 0) {
      return 1;
   }
   
   // Bearish crossover
   if(histogram0 < 0 && histogram1 >= 0) {
      return -1;
   }
   
   return 0;
}`,
    parameters: ['fastEMA: int', 'slowEMA: int', 'signalSMA: int'],
    returnType: 'int (1=buy, -1=sell, 0=no signal)',
  },

  // PRE-MADE FUNCTIONS TAB
  {
    id: 'func-1',
    name: 'Open Buy Position',
    description: 'Opens a buy position with specified parameters',
    category: 'Pre-made Functions',
    code: `bool OpenBuyPosition(double lotSize, double stopLoss, double takeProfit, string comment = "") {
   MqlTradeRequest request;
   MqlTradeResult result;
   ZeroMemory(request);
   ZeroMemory(result);
   
   double ask = SymbolInfoDouble(Symbol(), SYMBOL_ASK);
   double sl = (stopLoss > 0) ? NormalizeDouble(ask - stopLoss * Point(), Digits()) : 0;
   double tp = (takeProfit > 0) ? NormalizeDouble(ask + takeProfit * Point(), Digits()) : 0;
   
   request.action = TRADE_ACTION_DEAL;
   request.symbol = Symbol();
   request.volume = lotSize;
   request.type = ORDER_TYPE_BUY;
   request.price = ask;
   request.sl = sl;
   request.tp = tp;
   request.deviation = 10;
   request.magic = 123456;
   request.comment = comment;
   
   if(!OrderSend(request, result)) {
      Print("Buy order failed: ", GetLastError());
      return false;
   }
   
   return (result.retcode == TRADE_RETCODE_DONE);
}`,
    parameters: ['lotSize: double', 'stopLoss: double', 'takeProfit: double', 'comment: string'],
    returnType: 'bool',
  },
  {
    id: 'func-2',
    name: 'Open Sell Position',
    description: 'Opens a sell position with specified parameters',
    category: 'Pre-made Functions',
    code: `bool OpenSellPosition(double lotSize, double stopLoss, double takeProfit, string comment = "") {
   MqlTradeRequest request;
   MqlTradeResult result;
   ZeroMemory(request);
   ZeroMemory(result);
   
   double bid = SymbolInfoDouble(Symbol(), SYMBOL_BID);
   double sl = (stopLoss > 0) ? NormalizeDouble(bid + stopLoss * Point(), Digits()) : 0;
   double tp = (takeProfit > 0) ? NormalizeDouble(bid - takeProfit * Point(), Digits()) : 0;
   
   request.action = TRADE_ACTION_DEAL;
   request.symbol = Symbol();
   request.volume = lotSize;
   request.type = ORDER_TYPE_SELL;
   request.price = bid;
   request.sl = sl;
   request.tp = tp;
   request.deviation = 10;
   request.magic = 123456;
   request.comment = comment;
   
   if(!OrderSend(request, result)) {
      Print("Sell order failed: ", GetLastError());
      return false;
   }
   
   return (result.retcode == TRADE_RETCODE_DONE);
}`,
    parameters: ['lotSize: double', 'stopLoss: double', 'takeProfit: double', 'comment: string'],
    returnType: 'bool',
  },
  {
    id: 'func-3',
    name: 'Close All Positions',
    description: 'Closes all open positions for current symbol',
    category: 'Pre-made Functions',
    code: `void CloseAllPositions() {
   for(int i = PositionsTotal() - 1; i >= 0; i--) {
      if(PositionSelectByTicket(PositionGetTicket(i))) {
         if(PositionGetString(POSITION_SYMBOL) == Symbol()) {
            MqlTradeRequest request;
            MqlTradeResult result;
            ZeroMemory(request);
            ZeroMemory(result);
            
            request.action = TRADE_ACTION_DEAL;
            request.position = PositionGetTicket(i);
            request.symbol = Symbol();
            request.volume = PositionGetDouble(POSITION_VOLUME);
            request.type = (PositionGetInteger(POSITION_TYPE) == POSITION_TYPE_BUY) ? 
                           ORDER_TYPE_SELL : ORDER_TYPE_BUY;
            request.price = (PositionGetInteger(POSITION_TYPE) == POSITION_TYPE_BUY) ? 
                           SymbolInfoDouble(Symbol(), SYMBOL_BID) : 
                           SymbolInfoDouble(Symbol(), SYMBOL_ASK);
            request.deviation = 10;
            request.magic = 123456;
            
            OrderSend(request, result);
         }
      }
   }
}`,
    parameters: [],
    returnType: 'void',
  },
  {
    id: 'func-4',
    name: 'Count Open Positions',
    description: 'Returns the number of open positions for current symbol',
    category: 'Pre-made Functions',
    code: `int CountOpenPositions() {
   int count = 0;
   for(int i = 0; i < PositionsTotal(); i++) {
      if(PositionSelectByTicket(PositionGetTicket(i))) {
         if(PositionGetString(POSITION_SYMBOL) == Symbol()) {
            count++;
         }
      }
   }
   return count;
}`,
    parameters: [],
    returnType: 'int',
  },
];

export const defaultTabs = [
  { id: 'utilities', name: 'Utilities', icon: '🔧', isDefault: true },
  { id: 'indicators', name: 'Indicators', icon: '📊', isDefault: true },
  { id: 'pre-made-functions', name: 'Pre-made Functions', icon: '⚡', isDefault: true },
  { id: 'event-handlers', name: 'Event Handlers', icon: '⚙️', isDefault: true },
  { id: 'documentations', name: 'Documentations', icon: '📝', isDefault: true },
];
