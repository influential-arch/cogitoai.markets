import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DataTerminal } from './DataTerminal';

const timeframes = ['1D', '1W', '1M', '1Y'];

export const TerminalMainPanel = () => {
  return (
    <div className="space-y-4">
      <Card className="glass-card p-4">
        <Tabs defaultValue="1D" className="w-full">
          <TabsList className="grid grid-cols-4 w-48">
            {timeframes.map((timeframe) => (
              <TabsTrigger
                key={timeframe}
                value={timeframe}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {timeframe}
              </TabsTrigger>
            ))}
          </TabsList>
          {timeframes.map((timeframe) => (
            <TabsContent key={timeframe} value={timeframe}>
              <DataTerminal />
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
};