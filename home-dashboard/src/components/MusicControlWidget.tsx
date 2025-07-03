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
      <rect x="14" y="12" width="7" height="24" rx="2" />
      <rect x="27" y="12" width="7" height="24" rx="2" />
    </svg>
  );
}

function PrevIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} width="1em" height="1em">
      <polygon points="32,12 16,24 32,36" fill="currentColor" />
      <line x1="14" y1="12" x2="14" y2="36" stroke="currentColor" />
    </svg>
  );
}

function NextIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} width="1em" height="1em">
      <polygon points="16,12 32,24 16,36" fill="currentColor" />
      <line x1="34" y1="12" x2="34" y2="36" stroke="currentColor" />
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width="1em" height="1em">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

function LockIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width="1em" height="1em">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <circle cx="12" cy="16" r="1" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// Mock data for different music services
const mockData = {
  appleMusic: {
    isConnected: true,
    nowPlaying: {
      title: "City Lights",
      artist: "Jane Doe",
      album: "Midnight Dreams",
      cover: "🎵"
    },
    recentlyPlayed: [
      { title: "Summer Vibes", artist: "Chill Wave", cover: "🌊" },
      { title: "Electric Dreams", artist: "Synth Pop", cover: "⚡" },
      { title: "Ocean Waves", artist: "Nature Sounds", cover: "🌊" }
    ]
  },
  pandora: {
    isConnected: false,
    nowPlaying: {
      title: "Chill Station",
      artist: "Pandora Radio",
      album: "Personalized",
      cover: "📻"
    },
    stations: [
      { name: "Chill Vibes", genre: "Ambient" },
      { name: "Workout Mix", genre: "Electronic" },
      { name: "Dinner Jazz", genre: "Jazz" }
    ]
  },
  spotify: {
    isConnected: true,
    nowPlaying: {
      title: "Electric Feel",
      artist: "MGMT",
      album: "Oracular Spectacular",
      cover: "🎸"
    },
    playlists: [
      { name: "Daily Mix 1", tracks: 45 },
      { name: "Discover Weekly", tracks: 30 },
      { name: "Liked Songs", tracks: 127 }
    ]
  },
  local: {
    isConnected: true,
    nowPlaying: {
      title: "Local File",
      artist: "Unknown Artist",
      album: "Local Library",
      cover: "💾"
    },
    folders: [
      { name: "Downloads", tracks: 23 },
      { name: "Music", tracks: 156 },
      { name: "Podcasts", tracks: 12 }
    ]
  },
  airplay: {
    isConnected: false,
    nowPlaying: {
      title: "AirPlay Stream",
      artist: "iPhone",
      album: "Streaming",
      cover: "📱"
    },
    devices: [
      { name: "Living Room TV", type: "Apple TV" },
      { name: "Kitchen Speaker", type: "HomePod" },
      { name: "Bedroom", type: "AirPlay Speaker" }
    ]
  }
};

export default function MusicControlWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [currentRoom] = useState("Living Room");
  const [selectedApp, setSelectedApp] = useState("appleMusic"); // Default to Apple Music
  const [searchQuery, setSearchQuery] = useState("");
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [signInApp, setSignInApp] = useState("");
  const [showDevicePicker, setShowDevicePicker] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("Sonos"); // Default output device

  const currentAppData = mockData[selectedApp as keyof typeof mockData];
  const nowPlaying = currentAppData.nowPlaying;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? "Pause" : "Play");
  };

  const handlePrevious = () => {
    console.log("Previous Track");
  };

  const handleNext = () => {
    console.log("Next Track");
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    console.log(`Volume: ${newVolume}%`);
  };

  const handleConnect = (appName: string) => {
    console.log(`Connect to ${appName}`);
    // In real implementation, this would trigger OAuth flow
  };

  const handleAppSelect = (app: string) => {
    const appData = mockData[app as keyof typeof mockData];
    if (!appData.isConnected) {
      setSignInApp(app);
      setShowSignInModal(true);
    } else {
      setSelectedApp(app);
    }
  };

  const handleSignIn = () => {
    console.log(`Signing in to ${signInApp}`);
    // In real implementation, this would trigger OAuth flow
    setShowSignInModal(false);
    setSignInApp("");
  };

  // Mock output devices
  const outputDevices = [
    { id: "sonos", name: "Sonos", type: "Speaker", isDefault: true },
    { id: "living-room-tv", name: "Living Room TV", type: "Apple TV" },
    { id: "bluetooth-speaker", name: "Bluetooth Speaker", type: "Bluetooth" },
    { id: "office-airplay", name: "Office AirPlay", type: "AirPlay" },
    { id: "kitchen-speaker", name: "Kitchen Speaker", type: "HomePod" }
  ];

  const handleDeviceSelect = (deviceId: string) => {
    const device = outputDevices.find(d => d.id === deviceId);
    if (device) {
      setSelectedDevice(device.name);
      setShowDevicePicker(false);
      console.log(`Switched to output device: ${device.name}`);
    }
  };

  const renderAppContent = () => {
    return (
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search songs, artists, or albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Content based on selected app */}
        <div>
          {selectedApp === "appleMusic" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Recently Played</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(currentAppData as any).recentlyPlayed?.map((item: any, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">{item.cover}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.title}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400 truncate">{item.artist}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedApp === "pandora" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Your Stations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(currentAppData as any).stations?.map((station: any, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-orange-400 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">📻</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{station.name}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400 truncate">{station.genre}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedApp === "spotify" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Your Playlists</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(currentAppData as any).playlists?.map((playlist: any, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">🎵</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{playlist.name}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400 truncate">{playlist.tracks} tracks</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedApp === "local" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Local Library</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(currentAppData as any).folders?.map((folder: any, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">📁</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{folder.name}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400 truncate">{folder.tracks} tracks</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedApp === "airplay" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Available Devices</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(currentAppData as any).devices?.map((device: any, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{device.name}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400 truncate">{device.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-white dark:bg-zinc-900 flex flex-col">
      {/* Top: App Selector */}
      <div className="flex-shrink-0 p-6 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {Object.keys(mockData).map((app) => {
            const appData = mockData[app as keyof typeof mockData];
            const isSelected = selectedApp === app;
            const appName = app.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            
            return (
              <button
                key={app}
                onClick={() => handleAppSelect(app)}
                className={`flex items-center gap-2 px-4 py-3 rounded-full font-medium transition-all duration-200 whitespace-nowrap relative ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : appData.isConnected
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 active:bg-zinc-200 dark:active:bg-zinc-700'
                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <span className="text-lg">{appData.nowPlaying.cover}</span>
                <span>{appName}</span>
                
                {/* Signed-in indicator */}
                {appData.isConnected ? (
                  <CheckIcon className="w-4 h-4 text-green-500" />
                ) : (
                  <LockIcon className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                )}
              </button>
            );
          })}
        </div>
        
        {/* Status indicator for selected app */}
        <div className="mt-3">
          {(() => {
            const selectedAppData = mockData[selectedApp as keyof typeof mockData];
            return (
              <div className={`text-sm font-medium ${
                selectedAppData.isConnected 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}>
                {selectedAppData.isConnected ? '✓ Signed In' : '🔒 Sign in required'}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {currentAppData.isConnected ? (
          <>
            {/* Left Column: Album Art, Song Info, Playback Controls */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-8">
              {/* Album Art */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                <span className="text-4xl sm:text-5xl lg:text-6xl">{nowPlaying.cover}</span>
              </div>
              
              {/* Song Info */}
              <div className="text-center mb-6">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">
                  {nowPlaying.title}
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-zinc-600 dark:text-zinc-400">
                  {nowPlaying.artist}
                </p>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-6 sm:gap-8 lg:gap-10">
                <button
                  onClick={handlePrevious}
                  className="p-3 sm:p-4 rounded-full border-2 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 transition-all duration-200 active:scale-90"
                  aria-label="Previous"
                >
                  <PrevIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className="p-4 sm:p-5 lg:p-6 rounded-full bg-blue-600 text-white transition-all duration-200 active:scale-95"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <PauseIcon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                  ) : (
                    <PlayIcon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="p-3 sm:p-4 rounded-full border-2 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 transition-all duration-200 active:scale-90"
                  aria-label="Next"
                >
                  <NextIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
              </div>
            </div>

            {/* Right Column: Volume and Device Controls */}
            <div className="flex-shrink-0 w-full lg:w-80 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-700">
              <div className="space-y-6">
                {/* Volume Control */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Volume</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-500">{volume}%</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-zinc-500 dark:text-zinc-500">🔇</span>
                    <div className="flex-1 relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-full h-2 bg-zinc-200 dark:bg-zinc-600 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, #e5e7eb ${volume}%, #e5e7eb 100%)`
                        }}
                      />
                    </div>
                    <span className="text-lg text-zinc-500 dark:text-zinc-500">🔊</span>
                  </div>
                </div>

                {/* Playing To Device */}
                <button
                  onClick={() => setShowDevicePicker(true)}
                  className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📡</span>
                    <div className="text-left">
                      <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Playing To</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-500">{selectedDevice}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-zinc-400 dark:text-zinc-500">▼</span>
                  </div>
                </button>

                {/* Mute Toggle */}
                <button
                  onClick={() => setVolume(volume > 0 ? 0 : 75)}
                  className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{volume > 0 ? '🔊' : '🔇'}</span>
                    <div className="text-left">
                      <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {volume > 0 ? 'Mute' : 'Unmute'}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-500">
                        {volume > 0 ? 'Silence audio' : 'Restore audio'}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Sign In Prompt for Unconnected Apps */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-6xl mb-6">{nowPlaying.cover}</div>
            <h2 className="text-2xl font-bold mb-4">Connect to {selectedApp.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-md">
              Sign in to access your music library and start streaming
            </p>
            <button
              onClick={() => handleConnect(selectedApp)}
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium transition-all duration-200 active:scale-95"
            >
              Sign In
            </button>
          </div>
        )}
      </div>

      {/* Bottom: Content for Connected Apps (only on larger screens) */}
      {currentAppData.isConnected && (
        <div className="hidden lg:block flex-shrink-0 p-6 border-t border-zinc-200 dark:border-zinc-700">
          <div className="max-w-4xl mx-auto">
            {renderAppContent()}
          </div>
        </div>
      )}

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
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 max-w-sm w-full">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-center mb-2">Choose Output Device</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                Select where you want to play music
              </p>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {outputDevices.map((device) => (
                <button
                  key={device.id}
                  onClick={() => handleDeviceSelect(device.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    selectedDevice === device.name
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700'
                      : 'bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📡</span>
                    <div className="text-left">
                      <div className="font-medium text-zinc-700 dark:text-zinc-300">{device.name}</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-500">{device.type}</div>
                    </div>
                  </div>
                  {selectedDevice === device.name && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setShowDevicePicker(false)}
                className="w-full px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 