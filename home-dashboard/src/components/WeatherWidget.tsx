import { useState } from "react";

type WeatherData = {
  current: {
    temp: number;
    condition: string;
    icon: string;
    feelsLike: number;
  };
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
  }>;
};

export default function WeatherWidget() {
  // Mock weather data
  const [weatherData] = useState<WeatherData>({
    current: {
      temp: 72,
      condition: "Partly Cloudy",
      icon: "⛅",
      feelsLike: 74,
    },
    forecast: [
      {
        day: "Today",
        high: 78,
        low: 65,
        condition: "Partly Cloudy",
        icon: "⛅",
      },
      {
        day: "Tomorrow",
        high: 82,
        low: 68,
        condition: "Sunny",
        icon: "☀️",
      },
      {
        day: "Wed",
        high: 75,
        low: 62,
        condition: "Rainy",
        icon: "🌧️",
      },
    ],
  });

  const getWeatherIcon = (condition: string) => {
    const iconMap: { [key: string]: string } = {
      "Sunny": "☀️",
      "Partly Cloudy": "⛅",
      "Cloudy": "☁️",
      "Rainy": "🌧️",
      "Stormy": "⛈️",
      "Snowy": "❄️",
      "Foggy": "🌫️",
    };
    return iconMap[condition] || "🌤️";
  };

  return (
    <div className="bg-white dark:bg-zinc-800 p-3 sm:p-4 rounded-xl shadow-md space-y-3 sm:space-y-4">
      <h3 className="text-base sm:text-lg font-semibold">Weather</h3>
      
      {/* Current Weather */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-2xl sm:text-3xl">{getWeatherIcon(weatherData.current.condition)}</span>
          <div>
            <div className="text-xl sm:text-2xl font-bold">{weatherData.current.temp}°</div>
            <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Feels like {weatherData.current.feelsLike}°
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm sm:text-base font-medium">{weatherData.current.condition}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Current</div>
        </div>
      </div>

      {/* 3-Day Forecast */}
      <div className="space-y-2 sm:space-y-3">
        <h4 className="text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-300">
          3-Day Forecast
        </h4>
        <div className="space-y-2">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between py-1 sm:py-2 border-b border-zinc-200 dark:border-zinc-700 last:border-b-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-lg sm:text-xl">{getWeatherIcon(day.condition)}</span>
                <div>
                  <div className="text-sm sm:text-base font-medium">{day.day}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{day.condition}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm sm:text-base font-medium">{day.high}°</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">{day.low}°</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 