import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { Input } from "@/components/ui/input";

export const TerminalHeader = () => {
  return (
    <header className="h-16 bg-[#1a2942]/80 backdrop-blur-lg border-b border-white/10">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              type="search"
              placeholder="Search assets..."
              className="pl-10 bg-white/5 border-white/10 focus:border-blue-500/50 transition-colors"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
};