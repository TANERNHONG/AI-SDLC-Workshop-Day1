# MQL5 Expert Advisor Builder

A visual drag-and-drop web application for building MetaTrader 5 Expert Advisors without writing code from scratch. Combine pre-built MQL5 code snippets through an intuitive interface to create sophisticated trading bots.

## 🚀 Features

- **Drag-and-Drop Interface**: Visual code assembly from library to workspace
- **Pre-built Code Library**: 12+ ready-to-use MQL5 snippets
  - Utilities: Position sizing, trailing stop, time filters
  - Indicators: MA crossover, RSI, Bollinger Bands, MACD
  - Pre-made Functions: Open positions, close all, count positions
- **Custom Snippets**: Add your own reusable MQL5 code
- **Organized Tabs**: Utilities, Indicators, Pre-made Functions
- **Code Preview**: View assembled code with statistics
- **Export System**: Download as .txt file for MetaEditor
- **Expand/Collapse Blocks**: View full code in workspace
- **Dark Mode Support**: Automatic theme detection

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- MetaEditor (for compiling exported EAs)

## 🛠️ Installation

1. Navigate to the project directory:
```bash
cd mql5-builder
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 📖 How to Use

### Building Your First Expert Advisor

1. **Browse the Library** (right side):
   - Click tabs to switch between Utilities, Indicators, and Pre-made Functions
   - Read snippet descriptions to understand functionality

2. **Drag Snippets to Workspace** (left side):
   - Click and hold on any snippet card
   - Drag to the workspace drop zone
   - Release to add the code block

3. **Organize Blocks**:
   - Blocks appear in the order you drag them
   - Click expand/collapse button to view full code
   - Click X button to remove blocks

4. **Add Custom Code** (optional):
   - Click "Add Custom Snippet" in library
   - Fill in name, description, and MQL5 code
   - Save to add to current tab

5. **Preview Your EA**:
   - Click "Preview Code" button at bottom
   - View assembled MQL5 code
   - Check statistics (lines, functions, blocks)

6. **Export**:
   - Click "Export EA" button
   - File downloads as `expert-advisor-[timestamp].txt`
   - Open in MetaEditor and compile

### Example Workflow

Build a simple MA Crossover EA:
1. Drag "Moving Average Crossover" from Indicators
2. Drag "Calculate Lot Size" from Utilities
3. Drag "Open Buy Position" from Pre-made Functions
4. Drag "Open Sell Position" from Pre-made Functions
5. Preview and export

## 🏗️ Project Structure

```
mql5-builder/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard
│   └── globals.css         # Global styles
├── components/
│   ├── SnippetCard.tsx     # Draggable snippet card
│   └── WorkspaceBlock.tsx  # Workspace code block
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   ├── snippets.ts         # Pre-built code library
│   └── utils.ts            # Code assembly functions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎨 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Drag-and-Drop**: Native HTML5 Drag API
- **Target Language**: MQL5 (MetaQuotes Language 5)

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🔧 Customization

### Adding New Snippets

Edit `lib/snippets.ts` and add to `defaultSnippets`:

```typescript
{
  id: 'util-5',
  name: 'Your Function Name',
  description: 'What it does',
  category: 'Utilities', // or 'Indicators' or 'Pre-made Functions'
  code: `double YourFunction() {
    // Your MQL5 code here
    return 0.0;
  }`,
  parameters: ['param1: type'],
  returnType: 'double',
}
```

### Adding New Tabs

Edit `lib/snippets.ts` and add to `defaultTabs`:

```typescript
{ id: 'risk-management', name: 'Risk Management', icon: '🛡️', isDefault: true }
```

## 🐛 Troubleshooting

### Issue: Dependencies not found
**Solution**: Run `npm install` again

### Issue: Port 3000 already in use
**Solution**: Kill the process or use different port:
```bash
npm run dev -- -p 3001
```

### Issue: Dark mode not working
**Solution**: Check browser/OS dark mode settings

## 📝 Notes

- Custom snippets are stored in browser memory (not persisted)
- Exported files must be compiled in MetaEditor
- MQL5 syntax validation is basic (full validation in MetaEditor)
- Works best in Chrome, Firefox, Edge, Safari

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to Railway

```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

## 📚 Resources

- [MQL5 Documentation](https://www.mql5.com/en/docs)
- [MetaTrader 5 Platform](https://www.metatrader5.com/)
- [Next.js Documentation](https://nextjs.org/docs)

## 🤝 Contributing

This is an educational project. Feel free to:
- Add more pre-built snippets
- Improve the UI/UX
- Add code validation features
- Implement snippet persistence (localStorage/database)

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

## 🎯 Future Enhancements

- [ ] LocalStorage persistence for custom snippets
- [ ] Workspace save/load functionality
- [ ] Template system for common EA patterns
- [ ] Advanced MQL5 syntax validation
- [ ] Code optimization suggestions
- [ ] Multi-timeframe support snippets
- [ ] Backtesting integration
- [ ] Community snippet sharing

---

**Created for the AI-SDLC Workshop**  
**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
