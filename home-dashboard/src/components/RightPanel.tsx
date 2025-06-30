import WeatherWidget from "./WeatherWidget";
import ToggleCard from "./ToggleCard";

export default function RightPanel() {
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

  const handleMusicToggle = (isOn: boolean) => {
    console.log(`Music ${isOn ? 'started' : 'stopped'}`);
    // TODO: Integrate with Sonos Control API
  };

  return (
    <div className="w-full lg:w-1/5 p-3 sm:p-4 lg:border-l lg:border-zinc-300 lg:dark:border-zinc-700 space-y-3 sm:space-y-4">
      <WeatherWidget />
      
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
        onToggle={handleMusicToggle}
      />
    </div>
  );
} 