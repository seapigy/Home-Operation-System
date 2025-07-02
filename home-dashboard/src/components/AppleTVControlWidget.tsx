import { useState } from "react";

export default function AppleTVControlWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeDevice, setActiveDevice] = useState("Living Room");
  const [sonosVolume, setSonosVolume] = useState(75);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [isPoweredOn, setIsPoweredOn] = useState(true);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const minSwipeDistance = 30;

    if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
      console.log("Select");
      return;
    }

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        console.log("Swipe Right");
      } else {
        console.log("Swipe Left");
      }
    } else {
      if (deltaY > 0) {
        console.log("Swipe Down");
      } else {
        console.log("Swipe Up");
      }
    }
    
    setTouchStart(null);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? "Pause" : "Play");
  };



  const handleMenu = () => {
    console.log("Menu");
  };

  const handleVoice = () => {
    console.log("Voice Input (not implemented)");
  };

  const handleAppLaunch = (appName: string) => {
    console.log(`Launching ${appName}`);
  };

  const handleDeviceSwitch = (device: string) => {
    setActiveDevice(device);
    console.log(`Switched to: ${device}`);
  };

  const handlePowerToggle = () => {
    setIsPoweredOn(!isPoweredOn);
    console.log(`Apple TV ${isPoweredOn ? 'Off' : 'On'}`);
  };

  const handleSonosVolumeChange = (direction: 'up' | 'down') => {
    if (direction === 'up' && sonosVolume < 100) {
      setSonosVolume(sonosVolume + 10);
      console.log("Sonos Volume Up");
    } else if (direction === 'down' && sonosVolume > 0) {
      setSonosVolume(sonosVolume - 10);
      console.log("Sonos Volume Down");
    }
  };

  const apps = [
    { name: "Netflix", icon: "📺", color: "bg-red-500" },
    { name: "YouTube", icon: "📱", color: "bg-red-600" },
    { name: "Prime Video", icon: "📦", color: "bg-blue-500" },
    { name: "Apple TV+", icon: "🍎", color: "bg-gray-600" },
    { name: "Disney+", icon: "🏰", color: "bg-blue-600" }
  ];

  const devices = ["Living Room", "Bedroom", "Office"];

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-4 sm:p-6 min-h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
          <span className="text-xl">🍎</span>
          Apple TV Controls
        </h3>
        <button
          onClick={handlePowerToggle}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105 active:scale-95 ${
            isPoweredOn 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg' 
              : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="text-sm">⚡</span>
            {isPoweredOn ? 'Turn Off' : 'Turn On'}
          </span>
        </button>
      </div>

      {/* Device Switcher */}
      <div className="mb-4">
        <select
          value={activeDevice}
          onChange={(e) => handleDeviceSwitch(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {devices.map((device) => (
            <option key={device} value={device}>{device}</option>
          ))}
        </select>
      </div>

      {/* Now Playing Display */}
      <div className="mb-4 p-3 bg-zinc-50 dark:bg-zinc-700 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-600 rounded-lg flex items-center justify-center">
            <span className="text-zinc-500 dark:text-zinc-400 text-lg">🎬</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Now Playing: The Mandalorian
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Season 3, Episode 2
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Touchpad */}
        <div className="flex flex-col h-full">
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="w-full flex-1 min-h-[280px] rounded-xl bg-zinc-100 dark:bg-zinc-700 border-2 border-zinc-300 dark:border-zinc-500 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-600 hover:shadow-lg active:scale-95 active:shadow-xl"
          >
            <div className="text-center">
              <div className="text-2xl text-zinc-400 dark:text-zinc-500 mb-2">⌚</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                Touch to Navigate
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Controls Stack */}
        <div className="flex flex-col gap-4">
          {/* Control Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleMenu}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg transition-colors text-sm font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-500"
            >
              Menu
            </button>
            <button
              onClick={handlePlayPause}
              className="w-full px-4 py-3 bg-green-500 hover:bg-green-600 rounded-lg transition-colors text-sm font-medium text-white"
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <button
              onClick={handleVoice}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg transition-colors text-sm font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-500"
            >
              🎤 Voice Command
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex flex-col gap-2">
            <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Volume</div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSonosVolumeChange('down')}
                className="p-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg transition-colors border border-zinc-300 dark:border-zinc-500"
              >
                <span className="text-zinc-600 dark:text-zinc-400 text-sm">🔇</span>
              </button>
              <div className="flex-1 relative">
                <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-600 rounded-full">
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all duration-200"
                    style={{ width: `${sonosVolume}%` }}
                  ></div>
                </div>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-800 px-1 rounded">
                  {sonosVolume}%
                </div>
              </div>
              <button
                onClick={() => handleSonosVolumeChange('up')}
                className="p-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg transition-colors border border-zinc-300 dark:border-zinc-500"
              >
                <span className="text-zinc-600 dark:text-zinc-400 text-sm">🔊</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* App Launcher Row */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {apps.map((app) => (
          <button
            key={app.name}
            onClick={() => handleAppLaunch(app.name)}
            className={`p-3 rounded-lg transition-colors text-center ${app.color} hover:opacity-80 active:scale-95`}
          >
            <div className="text-lg mb-1">{app.icon}</div>
            <div className="text-xs text-white font-medium truncate">{app.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
} 