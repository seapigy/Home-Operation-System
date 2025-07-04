import { useState } from "react";

// Icon Components
function PlayIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" className={className} width="1em" height="1em">
      <polygon points="16,12 40,24 16,36" />
    </svg>
  );
}

function PauseIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" className={className} width="1em" height="1em">
      <rect x="12" y="12" width="8" height="24" />
      <rect x="28" y="12" width="8" height="24" />
    </svg>
  );
}

function PrevIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" className={className} width="1em" height="1em">
      <polygon points="12,12 24,24 12,36" />
      <rect x="28" y="12" width="8" height="24" />
    </svg>
  );
}

function NextIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" className={className} width="1em" height="1em">
      <polygon points="36,12 24,24 36,36" />
      <rect x="12" y="12" width="8" height="24" />
    </svg>
  );
}

function ShuffleIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" className={className} width="1em" height="1em">
      <path d="M10.59 13.41c.78-.78 2.05-.78 2.83 0l4.24 4.24 4.24-4.24c.78-.78 2.05-.78 2.83 0 .78.78.78 2.05 0 2.83L20.29 22l4.24 4.24c.78.78.78 2.05 0 2.83-.78.78-2.05.78-2.83 0L17.46 24.83l-4.24 4.24c-.78.78-2.05.78-2.83 0-.78-.78-.78-2.05 0-2.83L17.46 22l-6.87-6.87c-.78-.78-.78-2.05 0-2.83z"/>
      <path d="M37.41 13.41c-.78-.78-2.05-.78-2.83 0L30.34 18.17l-4.24-4.24c-.78-.78-2.05-.78-2.83 0-.78.78-.78 2.05 0 2.83L27.51 22l-4.24 4.24c-.78.78-.78 2.05 0 2.83.78.78 2.05.78 2.83 0l4.24-4.24 4.24 4.24c.78.78 2.05.78 2.83 0 .78-.78.78-2.05 0-2.83L32.49 22l4.92-4.92c.78-.78.78-2.05 0-2.83z"/>
    </svg>
  );
}

function RepeatIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" className={className} width="1em" height="1em">
      <path d="M24 8V2l-7 7 7 7v-6c6.63 0 12 5.37 12 12s-5.37 12-12 12-12-5.37-12-12H4c0 8.84 7.16 16 16 16s16-7.16 16-16S32.84 8 24 8z"/>
    </svg>
  );
}

function SearchIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width="1em" height="1em">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" className={className} width="1em" height="1em">
      <path d="M18 32.34L9.66 24l-2.83 2.83L18 38l24-24-2.83-2.83z"/>
    </svg>
  );
}

function LockIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" className={className} width="1em" height="1em">
      <path d="M24 4c-5.52 0-10 4.48-10 10v4H8v20h32V18h-6v-4c0-5.52-4.48-10-10-10zm0 2c4.42 0 8 3.58 8 8v4H16v-4c0-4.42 3.58-8 8-8z"/>
    </svg>
  );
}

// Mock data for different music services
const mockData = {
  appleMusic: {
    isConnected: true,
    nowPlaying: {
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      cover: "🎵",
      duration: "3:20"
    },
    recentlyPlayed: [
      { title: "Summer Vibes", artist: "Chill Wave", cover: "🌊" },
      { title: "Electric Dreams", artist: "Synth Pop", cover: "⚡" },
      { title: "Ocean Waves", artist: "Nature Sounds", cover: "🌊" }
    ]
  },
  spotify: {
    isConnected: true,
    nowPlaying: {
      title: "As It Was",
      artist: "Harry Styles",
      album: "Harry's House",
      cover: "🎵",
      duration: "2:47"
    },
    playlists: [
      { name: "Daily Mix 1", tracks: 45 },
      { name: "Discover Weekly", tracks: 30 },
      { name: "Liked Songs", tracks: 127 }
    ]
  },
  pandora: {
    isConnected: false,
    nowPlaying: {
      title: "Sign in to Pandora",
      artist: "Connect your account",
      album: "Pandora",
      cover: "📻",
      duration: "0:00"
    },
    stations: [
      { name: "Chill Vibes", genre: "Ambient" },
      { name: "Workout Mix", genre: "Electronic" },
      { name: "Dinner Jazz", genre: "Jazz" }
    ]
  },
  local: {
    isConnected: true,
    nowPlaying: {
      title: "Local Music",
      artist: "Your Library",
      album: "Local Files",
      cover: "📁",
      duration: "0:00"
    },
    folders: [
      { name: "Downloads", tracks: 23 },
      { name: "Music", tracks: 156 },
      { name: "Podcasts", tracks: 12 }
    ]
  },
  airplay: {
    isConnected: true,
    nowPlaying: {
      title: "AirPlay",
      artist: "Streaming",
      album: "AirPlay",
      cover: "📱",
      duration: "0:00"
    },
    devices: [
      { name: "Living Room TV", type: "Apple TV" },
      { name: "Kitchen Speaker", type: "HomePod" },
      { name: "Bedroom", type: "AirPlay Speaker" }
    ]
  }
};

// Output devices
const outputDevices = [
  { id: "sonos", name: "SONOS Living Room", room: "Living Room", type: "Speaker", icon: "🔊", status: "connected" },
  { id: "airpods", name: "AirPods Pro", room: "Personal", type: "Headphones", icon: "🎧", status: "connected" },
  { id: "homepod", name: "HomePod Mini", room: "Kitchen", type: "Speaker", icon: "🔊", status: "available" },
  { id: "tv", name: "Apple TV", room: "Living Room", type: "TV", icon: "📺", status: "available" },
  { id: "ipad", name: "iPad Speakers", room: "This Device", type: "Built-in", icon: "📱", status: "available" },
  { id: "jbl", name: "JBL Clip 4", room: "Portable", type: "Bluetooth", icon: "🔊", status: "available" }
];

export default function MusicControlWidget() {
  const [selectedApp, setSelectedApp] = useState("appleMusic");
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(75);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [signInApp, setSignInApp] = useState("");
  const [showDevicePicker, setShowDevicePicker] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("sonos");
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: repeat all, 2: repeat one
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(127); // Current time in seconds
  const [totalTime, setTotalTime] = useState(200); // Total time in seconds

  const currentAppData = mockData[selectedApp as keyof typeof mockData];
  const nowPlaying = currentAppData.nowPlaying;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    // Handle previous track
  };

  const handleNext = () => {
    // Handle next track
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
  };

  const handleConnect = (appName: string) => {
    setSignInApp(appName);
    setShowSignInModal(true);
  };

  const handleAppSelect = (app: string) => {
    setSelectedApp(app);
  };

  const handleSignIn = () => {
    // Mock sign in
    const updatedData = { ...mockData };
    (updatedData as any)[signInApp].isConnected = true;
    setShowSignInModal(false);
  };

  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDevice(deviceId);
  };

  const getSelectedDeviceName = () => {
    return outputDevices.find(device => device.id === selectedDevice)?.name || selectedDevice;
  };

  const handleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
  };

  const handleRepeat = () => {
    setRepeatMode((prev) => (prev + 1) % 3);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseInt(e.target.value));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderAppContent = () => {
    if (selectedApp === "appleMusic") {
      return (currentAppData as any).recentlyPlayed?.map((item: any, index: number) => (
        <div key={index} className="flex items-center p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mr-3">
            <span className="text-sm">{item.cover}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate text-sm">{item.title}</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 truncate">{item.artist}</div>
          </div>
        </div>
      ));
    }

    if (selectedApp === "spotify") {
      return (currentAppData as any).playlists?.map((playlist: any, index: number) => (
        <div key={index} className="flex items-center p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg flex items-center justify-center mr-3">
            <span className="text-sm">🎵</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate text-sm">{playlist.name}</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 truncate">{playlist.tracks} tracks</div>
          </div>
        </div>
      ));
    }

    return null;
  };

  return (
    <div className="w-full h-full bg-white dark:bg-zinc-900 flex flex-col">




      {/* Main Body - 3-column layout */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Left Column: Album Artwork (35-40%) */}
        <div className="w-full lg:w-[35%] lg:min-w-[320px] lg:max-w-md p-4 lg:p-6 flex flex-col items-center justify-center">
          {/* Album Artwork */}
          <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center shadow-2xl mb-6 lg:mb-8 relative">
            <span className="text-6xl lg:text-7xl xl:text-8xl">{nowPlaying.cover}</span>
            {/* Animated border when playing */}
            {isPlaying && (
              <div className="absolute inset-0 rounded-3xl border-4 border-blue-500/30 animate-pulse"></div>
            )}
          </div>

          {/* Output Device Info */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-zinc-500 dark:text-zinc-500">Playing on</span>
            </div>
            <div className="text-base lg:text-lg font-medium text-zinc-700 dark:text-zinc-300">
              {getSelectedDeviceName()}
            </div>
          </div>
        </div>

        {/* Middle Column: Playback Controls (40-50%) */}
        <div className="w-full lg:flex-1 p-4 lg:p-6 lg:p-8 flex flex-col justify-center space-y-6 lg:space-y-8">
          {/* Song Info */}
          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-zinc-800 dark:text-zinc-200 leading-tight">
              {nowPlaying.title}
            </h2>
            <p className="text-lg lg:text-xl xl:text-2xl text-zinc-600 dark:text-zinc-400">
              {nowPlaying.artist}
            </p>
            <p className="text-sm lg:text-base text-zinc-500 dark:text-zinc-500">
              {nowPlaying.album}
            </p>
            
            {/* App Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-sm">
              <span className="text-base">{currentAppData.nowPlaying.cover}</span>
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                {selectedApp.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </span>
              {currentAppData.isConnected && (
                <CheckIcon className="w-4 h-4 text-green-500" />
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(totalTime)}</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0"
                max={totalTime}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full h-3 bg-zinc-200 dark:bg-zinc-600 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / totalTime) * 100}%, #e5e7eb ${(currentTime / totalTime) * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>
          </div>

          {/* Playback Controls */}
          <div className="space-y-6">
            {/* Main Controls */}
            <div className="flex items-center justify-center gap-4 lg:gap-6">
              <button
                onClick={handleShuffle}
                className={`p-3 lg:p-4 rounded-full transition-all duration-200 ${
                  isShuffleOn 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 active:bg-zinc-200 dark:active:bg-zinc-700'
                }`}
                aria-label="Shuffle"
              >
                <ShuffleIcon className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>

              <button
                onClick={handlePrevious}
                className="p-3 lg:p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 active:bg-zinc-200 dark:active:bg-zinc-700 transition-all duration-200"
                aria-label="Previous"
              >
                <PrevIcon className="w-6 h-6 lg:w-7 lg:h-7" />
              </button>

              <button
                onClick={handlePlayPause}
                className="p-4 lg:p-5 xl:p-6 rounded-full bg-blue-600 text-white transition-all duration-200 active:bg-blue-700"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <PauseIcon className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
                ) : (
                  <PlayIcon className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-3 lg:p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 active:bg-zinc-200 dark:active:bg-zinc-700 transition-all duration-200"
                aria-label="Next"
              >
                <NextIcon className="w-6 h-6 lg:w-7 lg:h-7" />
              </button>

              <button
                onClick={handleRepeat}
                className={`p-3 lg:p-4 rounded-full transition-all duration-200 ${
                  repeatMode > 0 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 active:bg-zinc-200 dark:active:bg-zinc-700'
                }`}
                aria-label="Repeat"
              >
                <RepeatIcon className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm lg:text-base font-medium text-zinc-600 dark:text-zinc-400">Volume</span>
                <span className="text-sm lg:text-base text-zinc-500 dark:text-zinc-500">{volume}%</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-lg lg:text-xl text-zinc-500 dark:text-zinc-500">🔇</span>
                <div className="flex-1 relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-3 bg-zinc-200 dark:bg-zinc-600 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, #e5e7eb ${volume}%, #e5e7eb 100%)`
                    }}
                  />
                </div>
                <span className="text-lg lg:text-xl text-zinc-500 dark:text-zinc-500">🔊</span>
              </div>
            </div>

            {/* Output Device Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm lg:text-base font-medium text-zinc-600 dark:text-zinc-400">Output Device</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              
              <button
                onClick={() => setShowDevicePicker(true)}
                className="w-full flex items-center justify-between p-3 lg:p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 active:bg-zinc-100 dark:active:bg-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg lg:text-xl">📡</span>
                  <div className="text-left">
                    <div className="text-sm lg:text-base font-medium text-zinc-700 dark:text-zinc-300">
                      {getSelectedDeviceName()}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-500">
                      {outputDevices.find(d => d.id === selectedDevice)?.room} • {outputDevices.find(d => d.id === selectedDevice)?.type}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400 dark:text-zinc-500 text-xs">▼</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Search & Recent (20-30%) */}
        <div className="w-full lg:w-1/4 lg:min-w-[280px] lg:max-w-sm p-4 lg:p-6 border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-700 flex flex-col">
          {/* Search Bar */}
          <div className="mb-4 lg:mb-6">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <input
                type="text"
                placeholder={`Search ${selectedApp.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Recently Played Section */}
          {currentAppData.isConnected && !searchQuery.trim() && (
            <div className="mb-4 lg:mb-6">
              <h3 className="text-sm lg:text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-3 lg:mb-4">
                Recently Played
              </h3>
              <div className="space-y-2 max-h-48 lg:max-h-56 overflow-y-auto custom-scrollbar">
                {renderAppContent()}
              </div>
            </div>
          )}

          {/* Streaming Service Switcher */}
          <div className="pt-4 lg:pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <h3 className="text-sm lg:text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
              Services
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(mockData).map((app) => {
                const appData = mockData[app as keyof typeof mockData];
                const isSelected = selectedApp === app;
                const appName = app.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                
                return (
                  <button
                    key={app}
                    onClick={() => handleAppSelect(app)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl font-medium transition-all duration-200 text-xs ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : appData.isConnected
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 active:bg-zinc-200 dark:active:bg-zinc-700'
                        : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    <span className="text-lg lg:text-xl">{appData.nowPlaying.cover}</span>
                    <span className="text-center leading-tight">{appName}</span>
                    
                    {/* Connection status */}
                    {appData.isConnected ? (
                      <CheckIcon className="w-3 h-3 text-green-500" />
                    ) : (
                      <LockIcon className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center">
              <div className="text-4xl mb-4">
                {mockData[signInApp as keyof typeof mockData]?.nowPlaying.cover}
              </div>
              <h3 className="text-xl font-bold mb-2">
                Sign in to {signInApp.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Connect your account to access your music library and start streaming
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSignInModal(false)}
                  className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg text-zinc-700 dark:text-zinc-300 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignIn}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium transition-colors active:scale-95"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Output Device Picker Modal */}
      {showDevicePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 max-w-md w-full max-h-[80vh] flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-center mb-2">Select Output Device</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                Choose where to play your music
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2">
              {outputDevices.map((device) => (
                <div
                  key={device.id}
                  className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => handleDeviceSelect(device.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        selectedDevice === device.id
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-zinc-300 dark:border-zinc-600'
                      }`}
                    >
                      {selectedDevice === device.id && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </button>
                    
                    <span className="text-lg">{device.icon}</span>
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-zinc-700 dark:text-zinc-300 truncate">{device.name}</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-500">
                        {device.room} • {device.type}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      device.status === 'connected' ? 'bg-green-500' :
                      device.status === 'available' ? 'bg-blue-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setShowDevicePicker(false)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 