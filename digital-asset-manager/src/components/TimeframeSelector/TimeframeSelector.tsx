import { memo } from "react";
import { TIMEFRAMES } from "../../constants/dashboard";

interface TimeframeSelectorProps {
  selectedTimeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

export const TimeframeSelector = memo<TimeframeSelectorProps>(
  ({ selectedTimeframe, onTimeframeChange }) => (
    <div
      className="flex items-center space-x-2"
      role="tablist"
      aria-label="Time period selector"
    >
      {TIMEFRAMES.map((period) => (
        <button
          key={period}
          onClick={() => onTimeframeChange(period)}
          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            selectedTimeframe === period
              ? "bg-blue-100 text-blue-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          role="tab"
          aria-selected={selectedTimeframe === period}
          aria-controls={`panel-${period}`}
        >
          {period}
        </button>
      ))}
    </div>
  ),
);

TimeframeSelector.displayName = "TimeframeSelector";
