import { useState } from "react";

const MOCK_LOCATION = "San Francisco, CA";
const MOCK_DATE = "Tue, Jun 11";
const MOCK_DAY = true; // Toggle for day/night

// Mock 7-day forecast data
const MOCK_FORECAST = [
  { day: "Mon", icon: "☀️", high: 75, low: 62, condition: "Sunny" },
  { day: "Tue", icon: "⛅", high: 72, low: 58, condition: "Partly Cloudy" },
  { day: "Wed", icon: "🌧️", high: 68, low: 55, condition: "Rainy" },
  { day: "Thu", icon: "☁️", high: 70, low: 57, condition: "Cloudy" },
  { day: "Fri", icon: "☀️", high: 78, low: 63, condition: "Sunny" },
  { day: "Sat", icon: "⛅", high: 76, low: 61, condition: "Partly Cloudy" },
  { day: "Sun", icon: "☀️", high: 80, low: 65, condition: "Sunny" },
];

export default function WeatherWidget() {
  const [view, setView] = useState<'day' | 'week'>('day');
  const isDay = MOCK_DAY;

  // Placeholder data
  const current = {
    temp: 72,
    condition: isDay ? "Cloudless" : "Clear Night",
    icon: isDay ? "☀️" : "🌙",
    summary: isDay
      ? "Clear skies and warm. Great day for outdoor activities!"
      : "Clear and calm night. Perfect for stargazing.",
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-4 sm:p-6 space-y-4 w-full max-w-full">
      {/* Top section: icon, location, toggles */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-2xl sm:text-3xl">{current.icon}</span>
          <span className="text-base sm:text-lg font-semibold text-zinc-700 dark:text-zinc-200">{MOCK_LOCATION}</span>
        </div>
        <div className="flex gap-1 mt-2 sm:mt-0">
          <button
            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
              view === 'day' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600'
            }`}
            onClick={() => setView('day')}
          >
            Day
          </button>
          <button
            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
              view === 'week' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600'
            }`}
            onClick={() => setView('week')}
          >
            Week
          </button>
        </div>
      </div>

      {view === 'day' ? (
        <>
          {/* Current date, temp, condition */}
          <div className="flex flex-col items-center text-center space-y-1">
            <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">{MOCK_DATE}</div>
            <div className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white">{current.temp}&deg;F</div>
            <div className="text-base sm:text-lg font-medium text-zinc-600 dark:text-zinc-300">{current.condition}</div>
          </div>

          {/* Large sun/moon icon */}
          <div className="flex justify-center items-center">
            <span className="text-7xl sm:text-8xl select-none">
              {isDay ? "☀️" : "🌙"}
            </span>
          </div>

          {/* Weather summary */}
          <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 text-center px-2">
            {current.summary}
          </div>
        </>
      ) : (
        <>
          {/* Current date and temp for week view */}
          <div className="flex flex-col items-center text-center space-y-1">
            <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">{MOCK_DATE}</div>
            <div className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">{current.temp}&deg;F</div>
            <div className="text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-300">{current.condition}</div>
          </div>

          {/* 7-Day Forecast */}
          <div className="space-y-3">
            <h4 className="text-sm sm:text-base font-semibold text-zinc-700 dark:text-zinc-200 text-center">
              7-Day Forecast
            </h4>
            <div className="grid grid-cols-7 gap-2">
              {MOCK_FORECAST.map((day, index) => (
                <div key={index} className="flex flex-col items-center space-y-1 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-700/50">
                  <div className="text-xs font-medium text-zinc-600 dark:text-zinc-300">{day.day}</div>
                  <div className="text-lg sm:text-xl">{day.icon}</div>
                  <div className="text-xs font-semibold text-zinc-900 dark:text-white">{day.high}&deg;</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{day.low}&deg;</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
} 