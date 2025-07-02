import { useState } from "react";

export default function WeatherWidget() {
  const [view, setView] = useState<'day' | 'week'>('day');

  const current = {
    temp: 72,
    condition: "Partly Cloudy",
    icon: "⛅",
    summary: "Clear skies and warm. Great day for outdoor activities!"
  };

  const dailyTrend = [
    { time: "Morning", temp: 68, icon: "☀️", condition: "Sunny" },
    { time: "Midday", temp: 72, icon: "⛅", condition: "Partly Cloudy" },
    { time: "Afternoon", temp: 70, icon: "🌧️", condition: "Light Rain" },
    { time: "Evening", temp: 66, icon: "🌥️", condition: "Cloudy" },
    { time: "Night", temp: 62, icon: "🌙", condition: "Clear" }
  ];

  const forecast = [
    { day: "Mon", icon: "☀️", high: 75, low: 62 },
    { day: "Tue", icon: "⛅", high: 72, low: 58 },
    { day: "Wed", icon: "🌧️", high: 68, low: 55 },
    { day: "Thu", icon: "☁️", high: 70, low: 57 },
    { day: "Fri", icon: "☀️", high: 78, low: 63 },
    { day: "Sat", icon: "⛅", high: 76, low: 61 },
    { day: "Sun", icon: "☀️", high: 80, low: 65 }
  ];

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌤️</span>
          <span className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Weather</span>
        </div>
        <div className="flex gap-1">
          <button
            className={`px-2 py-1 text-xs rounded transition-colors ${
              view === 'day' 
                ? 'bg-blue-600 text-white' 
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
            }`}
            onClick={() => setView('day')}
          >
            Today
          </button>
          <button
            className={`px-2 py-1 text-xs rounded transition-colors ${
              view === 'week' 
                ? 'bg-blue-600 text-white' 
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
            }`}
            onClick={() => setView('week')}
          >
            Week
          </button>
        </div>
      </div>

      {view === 'day' ? (
        <div className="space-y-4">
          {/* Current Weather */}
          <div className="text-center">
            <div className="text-4xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">
              {current.temp}°F
            </div>
            <div className="text-lg text-zinc-600 dark:text-zinc-400 mb-2">
              {current.condition}
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              {current.summary}
            </div>
          </div>

          {/* Daily Trend */}
          <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3">
            <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-3 text-center">
              Today's Trend
            </div>
            <div className="flex justify-between items-center">
              {dailyTrend.map((period, index) => (
                <div key={index} className="flex flex-col items-center space-y-1">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {period.time}
                  </div>
                  <div className="text-lg transition-all duration-300 hover:scale-110">
                    {period.icon}
                  </div>
                  <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {period.temp}°
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-7 gap-2">
            {forecast.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">{day.day}</div>
                <div className="text-lg mb-1">{day.icon}</div>
                <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{day.high}°</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">{day.low}°</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 