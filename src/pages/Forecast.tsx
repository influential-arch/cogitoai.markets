import { BackButton } from "@/components/BackButton";
import { ForecastChart } from "@/components/forecasting/ForecastChart";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";

// Mock data - replace with actual API call
const mockForecastData = [
  { date: "2024-01", actual: 100, predicted: 102, upperBound: 105, lowerBound: 98 },
  { date: "2024-02", actual: 105, predicted: 107, upperBound: 110, lowerBound: 103 },
  { date: "2024-03", actual: 103, predicted: 106, upperBound: 109, lowerBound: 102 },
  { date: "2024-04", predicted: 108, upperBound: 112, lowerBound: 104 },
  { date: "2024-05", predicted: 110, upperBound: 115, lowerBound: 105 },
];

export default function Forecast() {
  const { data: forecastData } = useQuery({
    queryKey: ["forecast"],
    queryFn: async () => {
      // Replace with actual API call
      return {
        data: mockForecastData,
        accuracy: 95.5
      };
    },
  });

  return (
    <div className="min-h-screen p-8">
      <BackButton />
      
      <div className="container mx-auto mt-16 space-y-8">
        <h1 className="text-3xl font-bold mb-8">Market Forecast</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 glass-card">
            <h3 className="text-lg font-semibold mb-2">Reliability Score</h3>
            <p className="text-3xl font-bold text-primary animate-glow">95.5%</p>
          </Card>
          
          <Card className="p-6 glass-card">
            <h3 className="text-lg font-semibold mb-2">Forecast Horizon</h3>
            <p className="text-3xl font-bold text-primary">60 Days</p>
          </Card>
          
          <Card className="p-6 glass-card">
            <h3 className="text-lg font-semibold mb-2">Last Updated</h3>
            <p className="text-3xl font-bold text-primary">Live</p>
          </Card>
        </div>

        {forecastData && (
          <ForecastChart 
            data={forecastData.data} 
            accuracy={forecastData.accuracy} 
          />
        )}
      </div>
    </div>
  );
}