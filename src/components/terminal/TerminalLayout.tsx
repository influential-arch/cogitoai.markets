import React from 'react';
import { TerminalSidebar } from './TerminalSidebar';
import { TerminalHeader } from './TerminalHeader';
import { TerminalMainPanel } from './TerminalMainPanel';
import { TerminalRightPanel } from './TerminalRightPanel';
import { AIAssistant } from './AIAssistant';

export const TerminalLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white">
      <TerminalHeader />
      <div className="flex">
        <TerminalSidebar />
        <div className="flex-1 p-4">
          <TerminalMainPanel />
        </div>
        <TerminalRightPanel />
      </div>
      <AIAssistant />
    </div>
  );
};