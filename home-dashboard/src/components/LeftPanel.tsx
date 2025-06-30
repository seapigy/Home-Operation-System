import TemperatureCard from "./TemperatureCard";

type LeftPanelProps = {
  activeRoom: string;
};

export default function LeftPanel({ activeRoom }: LeftPanelProps) {
  const allThermostats = [
    {
      roomName: "Living Room",
      currentTemp: 72,
      targetTemp: 74,
      mode: "Cool" as const,
      humidity: 45,
    },
    {
      roomName: "Bedroom",
      currentTemp: 68,
      targetTemp: 70,
      mode: "Heat" as const,
      humidity: 50,
    },
    {
      roomName: "Kitchen",
      currentTemp: 75,
      targetTemp: 73,
      mode: "Cool" as const,
      humidity: 42,
    },
  ];

  const getThermostatsToShow = () => {
    if (activeRoom === "Home") {
      return allThermostats;
    }
    return allThermostats.filter(thermostat => thermostat.roomName === activeRoom);
  };

  const thermostatsToShow = getThermostatsToShow();

  return (
    <div className="w-full lg:w-1/5 p-3 sm:p-4 lg:border-r lg:border-zinc-300 lg:dark:border-zinc-700 space-y-3 sm:space-y-4">
      <h2 className="text-base sm:text-lg font-semibold mb-2">Temperature Controls</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
        {thermostatsToShow.map((thermostat) => (
          <TemperatureCard
            key={thermostat.roomName}
            roomName={thermostat.roomName}
            currentTemp={thermostat.currentTemp}
            targetTemp={thermostat.targetTemp}
            mode={thermostat.mode}
            humidity={thermostat.humidity}
          />
        ))}
      </div>
    </div>
  );
} 