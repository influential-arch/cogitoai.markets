import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from 'lucide-react';

export const AIAssistant = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          className="w-12 h-12 rounded-full shadow-lg hover:shadow-primary/50 transition-shadow"
        >
          <MessageSquare className="w-5 h-5" />
        </Button>
      ) : (
        <Card className="w-96 h-[500px] glass-card flex flex-col">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-semibold">AI Assistant</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
            >
              ×
            </Button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-3 max-w-[80%]">
                How can I help you analyze the markets today?
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about market analysis..."
                className="bg-white/5 border-white/10"
              />
              <Button size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};