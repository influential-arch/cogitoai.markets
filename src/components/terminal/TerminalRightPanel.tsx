import React from 'react';
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const TerminalRightPanel = () => {
  return (
    <div className="w-80 p-4 border-l border-white/10">
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="metrics" className="glass-card">
          <AccordionTrigger className="px-4">Key Metrics</AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Volume</span>
                <span className="text-primary">1.2M</span>
              </div>
              <div className="flex justify-between">
                <span>Market Cap</span>
                <span className="text-primary">$2.4B</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sentiment" className="glass-card">
          <AccordionTrigger className="px-4">Market Sentiment</AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Bullish</span>
                <span className="text-green-500">65%</span>
              </div>
              <div className="flex justify-between">
                <span>Bearish</span>
                <span className="text-red-500">35%</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};