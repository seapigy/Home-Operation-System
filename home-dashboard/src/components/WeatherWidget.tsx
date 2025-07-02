import { useState, useEffect } from "react";

export default function WeatherWidget() {
  const [view, setView] = useState<'day' | 'week'>('day');
  const [animateTrend, setAnimateTrend] = useState(false);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);

  const current = {
    temp: 72,
    condition: "Partly Cloudy",
    icon: "⛅",
    summary: "Clear skies and warm. Great day for outdoor activities!"
  };

  const dailyTrend = [
    { time: "Morning", temp: 68, icon: "☀️", condition: "Sunny", color: "text-yellow-500" },
    { time: "Midday", temp: 72, icon: "⛅", condition: "Partly Cloudy", color: "text-blue-400" },
    { time: "Afternoon", temp: 70, icon: "🌧️", condition: "Light Rain", color: "text-blue-600" },
    { time: "Evening", temp: 66, icon: "🌥️", condition: "Cloudy", color: "text-gray-500" },
    { time: "Night", temp: 62, icon: "🌙", condition: "Clear", color: "text-indigo-400" }
  ];

  const weatherAlerts = [
    { 
      type: "uv", 
      message: "High UV Index", 
      icon: "☀️", 
      time: "2h ago", 
      color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
      textColor: "text-orange-700 dark:text-orange-300"
    },
    { 
      type: "rain", 
      message: "Heavy rain expected at 3 PM", 
      icon: "🌧️", 
      time: "1h ago", 
      color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      textColor: "text-blue-700 dark:text-blue-300"
    }
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

  // Trigger animation when switching to day view
  useEffect(() => {
    if (view === 'day') {
      setAnimateTrend(false);
      setTimeout(() => setAnimateTrend(true), 100);
    }
  }, [view]);

  // Handle tap effect
  function handleTap(index: number) {
    setTappedIndex(index);
    setTimeout(() => setTappedIndex(null), 180);
  }

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

          {/* Touch-optimized Animated Daily Trend */}
          <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3">
            <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-3 text-center">
              Today's Trend
            </div>
            <div className="flex justify-between items-end space-x-1">
              {dailyTrend.map((period, index) => (
                <button
                  key={index}
                  className={`flex flex-col items-center space-y-2 flex-1 transition-all duration-700 ease-out focus:outline-none active:outline-none bg-transparent ${
                    animateTrend 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  } ${
                    tappedIndex === index ? 'scale-105 shadow-md' : ''
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  tabIndex={0}
                  onTouchStart={() => handleTap(index)}
                  onClick={() => handleTap(index)}
                >
                  {/* Time Label */}
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    {period.time}
                  </div>
                  {/* Animated Weather Icon (fade/slide in) */}
                  <div
                    className={`text-xl ${period.color} transition-all duration-700 ease-out
                      ${animateTrend ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2'}`}
                    style={{ transitionDelay: `${index * 180 + 100}ms` }}
                  >
                    <span>{period.icon}</span>
                  </div>
                  {/* Temperature with fade-in */}
                  <div className={`text-sm font-semibold text-zinc-800 dark:text-zinc-200 transition-all duration-500 ${
                    animateTrend ? 'opacity-100' : 'opacity-0'
                  }`} style={{ transitionDelay: `${index * 180 + 200}ms` }}>
                    {period.temp}°
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Weather Alerts */}
          {weatherAlerts.length > 0 && (
            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3">
              <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-2 text-center">
                Weather Alerts
              </div>
              <div className="space-y-2">
                {weatherAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border transition-all duration-500 ease-out ${
                      animateTrend ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    } ${alert.color}`}
                    style={{ transitionDelay: `${index * 200 + 800}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{alert.icon}</span>
                        <span className={`text-sm font-medium ${alert.textColor}`}>
                          {alert.message}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {alert.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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