import React from 'react';
import { 
  ArrowLeftRight, 
  BarChart3, 
  TrendingUp, 
  Coffee, 
  FileText, 
  Square 
} from 'lucide-react';

const sidebarItems = [
  {
    icon: ArrowLeftRight,
    label: "Forex",
    subtext: "70+ Forex Currency Pairs"
  },
  {
    icon: BarChart3,
    label: "Shares",
    subtext: "More than 10,000 stocks on global exchanges"
  },
  {
    icon: TrendingUp,
    label: "Indices",
    subtext: "19 major global indices"
  },
  {
    icon: Coffee,
    label: "Commodities",
    subtext: "Coffee, natural gas, corn & more"
  },
  {
    icon: FileText,
    label: "Bonds",
    subtext: "US10YR & UK Long Gilt Futures GILT"
  },
  {
    icon: Square,
    label: "Metals",
    subtext: "Gold, oil, silver & more"
  }
];

export const TerminalSidebar = () => {
  return (
    <aside className="w-64 bg-gradient-to-b from-[#1a2942] to-[#0f172a] p-4 border-r border-white/10">
      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <button
            key={item.label}
            className="w-full p-3 rounded-lg text-left transition-all hover:bg-white/5 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] group"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-gray-400 group-hover:text-gray-300">
                  {item.subtext}
                </div>
              </div>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
};