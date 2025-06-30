import { useState } from "react";

export default function EnergyWidget() {
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month'>('today');

  // Mock energy data
  const energyData = {
    today: {
      usage: 12.4,
      cost: 2.48,
      unit: 'kWh',
      trend: 'up',
      trendPercent: 8.5
    },
    week: {
      usage: 87.2,
      cost: 17.44,
      unit: 'kWh',
      trend: 'down',
      trendPercent: 3.2
    },
    month: {
      usage: 342.8,
      cost: 68.56,
      unit: 'kWh',
      trend: 'up',
      trendPercent: 12.1
    }
  };

  const currentData = energyData[timeframe];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? '↗️' : '↘️';
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400';
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-zinc-800 dark:text-zinc-200">
          Energy Usage
        </h3>
        <div className="flex gap-1">
          {(['today', 'week', 'month'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                timeframe === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-600'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-zinc-800 dark:text-zinc-200">
            {currentData.usage}
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            {currentData.unit}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-zinc-800 dark:text-zinc-200">
            ${currentData.cost}
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            Estimated Cost
          </div>
        </div>
      </div>

      {/* Simple chart representation */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400 mb-2">
          <span>Usage Trend</span>
          <span className={`flex items-center gap-1 ${getTrendColor(currentData.trend)}`}>
            {getTrendIcon(currentData.trend)} {currentData.trendPercent}%
          </span>
        </div>
        <div className="h-20 bg-zinc-100 dark:bg-zinc-700 rounded-lg p-3">
          <div className="flex items-end justify-between h-full gap-1">
            {[65, 72, 58, 81, 69, 74, 88].map((height, index) => (
              <div
                key={index}
                className="bg-blue-500 dark:bg-blue-400 rounded-t flex-1"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
} 