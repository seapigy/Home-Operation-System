import WeatherWidget from "./WeatherWidget";
import ToggleCard from "./ToggleCard";

export default function RightPanel({ activeRoom = "Home" }: { activeRoom?: string }) {
  // Handler functions for future device integrations
  const handleWiFiToggle = (isOn: boolean) => {
    console.log(`Wi-Fi ${isOn ? 'enabled' : 'disabled'}`);
    // TODO: Integrate with UniFi Controller API
  };

  const handleTVToggle = (isOn: boolean) => {
    console.log(`TV ${isOn ? 'turned on' : 'turned off'}`);
    // TODO: Integrate with Apple TV via pyatv
  };

  const handleAlarmToggle = (isOn: boolean) => {
    console.log(`Alarm ${isOn ? 'armed' : 'disarmed'}`);
    // TODO: Integrate with Alarm.com API
  };

  // Only show toggles for rooms other than Home
  const showToggles = activeRoom !== "Home";

  return (
    <div className="w-full lg:border-l lg:border-zinc-300 lg:dark:border-zinc-700 flex flex-col h-full">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
        <WeatherWidget />
        {showToggles ? (
          <>
            <ToggleCard 
              title="Wi-Fi" 
              icon="📶" 
              initialState={true}
              onToggle={handleWiFiToggle}
              isWiFi={true}
            />
            <ToggleCard 
              title="TV" 
              icon="📺" 
              initialState={false}
              onToggle={handleTVToggle}
            />
            <ToggleCard 
              title="Alarm" 
              icon="🚨" 
              initialState={false}
              onToggle={handleAlarmToggle}
            />
            <ToggleCard 
              title="Music" 
              icon="🎵" 
              initialState={false}
              onToggle={() => {}}
            />
          </>
        ) : (
          // On Home, show the simple Music toggle
          <ToggleCard 
            title="Music" 
            icon="🎵" 
            initialState={false}
            onToggle={() => {}}
          />
        )}
        </div>
      </div>
    </div>
  );
} 