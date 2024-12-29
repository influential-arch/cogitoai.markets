import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { Card } from "@/components/ui/card";

interface ForecastData {
  date: string;
  actual?: number;
  predicted?: number;
  upperBound?: number;
  lowerBound?: number;
}

interface ForecastChartProps {
  data: ForecastData[];
  accuracy: number;
}

export const ForecastChart = ({ data, accuracy }: ForecastChartProps) => {
  return (
    <Card className="p-6 glass-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Market Forecast</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Accuracy:</span>
          <span className="text-primary font-semibold animate-glow">{accuracy}%</span>
        </div>
      </div>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" stroke="#888888" fontSize={12} />
            <YAxis stroke="#888888" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
              }}
            />
            <Area
              dataKey="upperBound"
              stroke="none"
              fill="hsl(var(--primary))"
              fillOpacity={0.1}
            />
            <Area
              dataKey="lowerBound"
              stroke="none"
              fill="hsl(var(--primary))"
              fillOpacity={0.1}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              strokeDasharray="5 5"
              className="animate-glow"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};