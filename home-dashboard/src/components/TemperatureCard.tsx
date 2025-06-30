import { useState } from "react";
import TemperatureDial from "./TemperatureDial";

type TemperatureCardProps = {
  roomName: string;
  currentTemp: number;
  targetTemp: number;
  mode: "Heat" | "Cool" | "Off";
  humidity: number;
};

export default function TemperatureCard({
  roomName,
  currentTemp,
  targetTemp,
  mode: initialMode,
  humidity,
}: TemperatureCardProps) {
  const [temp, setTemp] = useState(targetTemp);
  const [mode, setMode] = useState<"Heat" | "Cool" | "Blow" | "Auto">("Cool");

  const modes: Array<"Heat" | "Cool" | "Blow" | "Auto"> = ["Heat", "Cool", "Blow", "Auto"];

  return (
    <div className="bg-white dark:bg-zinc-800 p-3 sm:p-4 rounded-xl shadow-md space-y-3 sm:space-y-4">
      <h3 className="text-base sm:text-lg font-semibold">{roomName}</h3>
      
      <div className="flex justify-center">
        <div className="w-full max-w-[140px] sm:max-w-[180px] lg:max-w-[200px] xl:max-w-[250px]">
          <TemperatureDial 
            min={52} 
            max={111} 
            value={temp} 
            onChange={setTemp} 
          />
        </div>
      </div>
      
      <div className="flex gap-1 sm:gap-2 justify-center flex-wrap">
        {modes.map((modeOption) => (
          <button
            key={modeOption}
            onClick={() => setMode(modeOption)}
            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded ${
              mode === modeOption
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-zinc-700 text-black dark:text-white"
            }`}
          >
            {modeOption}
          </button>
        ))}
      </div>
      
      <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 text-center">
        Mode: {mode}
      </div>
      
      <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 flex justify-between">
        <span>Current: {currentTemp}°</span>
        <span>Humidity: {humidity}%</span>
      </div>
    </div>
  );
} 