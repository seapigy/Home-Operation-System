import WeatherWidget from "./WeatherWidget";

export default function RightPanel() {
  return (
    <div className="w-full lg:w-1/5 p-3 sm:p-4 lg:border-l lg:border-zinc-300 lg:dark:border-zinc-700 space-y-3 sm:space-y-4">
      <WeatherWidget />
      <div className="h-12 sm:h-16 bg-gray-200 dark:bg-zinc-800 rounded p-3 sm:p-4">[Wi-Fi Toggle]</div>
      <div className="h-12 sm:h-16 bg-gray-200 dark:bg-zinc-800 rounded p-3 sm:p-4">[TV Toggle]</div>
      <div className="h-12 sm:h-16 bg-gray-200 dark:bg-zinc-800 rounded p-3 sm:p-4">[Alarm Toggle]</div>
      <div className="h-12 sm:h-16 bg-gray-200 dark:bg-zinc-800 rounded p-3 sm:p-4">[Music Toggle]</div>
    </div>
  );
} 