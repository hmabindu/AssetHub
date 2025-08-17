import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ChartData {
  name: string;
  value: number;
  color: string;
  change: number;
}

interface ChartProps {
  data?: ChartData[];
  size?: number;
}

const Chart: React.FC<ChartProps> = ({
  data = [
    { name: "Investments", value: 127500, color: "#3b82f6", change: 2.1 },
    { name: "Savings", value: 45000, color: "#10b981", change: 0.5 },
    { name: "Checking", value: 15420, color: "#8b5cf6", change: -0.2 },
    { name: "Crypto", value: 8750, color: "#f59e0b", change: 5.2 },
  ],
  size = 128,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Simple pie chart using CSS conic-gradient
  const generateConicGradient = () => {
    let cumulativePercentage = 0;
    const gradientStops = data.map((item) => {
      const percentage = (item.value / total) * 100;
      const start = cumulativePercentage;
      const end = cumulativePercentage + percentage;
      cumulativePercentage = end;

      return `${item.color} ${start}% ${end}%`;
    });

    return `conic-gradient(${gradientStops.join(", ")})`;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Pie Chart */}
      <div
        className="rounded-full border-4 border-white shadow-lg"
        style={{
          width: size,
          height: size,
          background: generateConicGradient(),
        }}
        aria-label="Portfolio allocation chart"
        role="img"
      >
        {/* Center circle with total */}
        <div
          className="bg-white rounded-full flex flex-col items-center justify-center text-center shadow-inner"
          style={{
            width: size * 0.6,
            height: size * 0.6,
            margin: size * 0.2,
          }}
        >
          <div className="text-xs text-gray-500 font-medium">Total</div>
          <div className="text-sm font-bold text-gray-900">
            ${(total / 1000).toFixed(0)}K
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
              aria-hidden="true"
            />
            <div className="flex flex-col">
              <span className="text-gray-900 font-medium">{item.name}</span>
              <div className="flex items-center space-x-1">
                <span className="text-gray-600">
                  ${(item.value / 1000).toFixed(0)}K
                </span>
                <div
                  className={`flex items-center ${
                    item.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.change >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="ml-1">
                    {item.change >= 0 ? "+" : ""}
                    {item.change.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
