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
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState<string[]>(["sonos"]); // Multiple device support
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

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

  // Enhanced mock output devices
  const outputDevices = [
    { 
      id: "sonos", 
      name: "Sonos", 
      type: "Wi-Fi", 
      room: "Living Room", 
      status: "connected",
      icon: "🔊"
    },
    { 
      id: "living-room-tv", 
      name: "Living Room TV", 
      type: "Wi-Fi", 
      room: "Living Room", 
      status: "available",
      icon: "📺"
    },
    { 
      id: "bluetooth-speaker", 
      name: "Bluetooth Speaker", 
      type: "Bluetooth", 
      room: "Office", 
      status: "connected",
      icon: "🔊"
    },
    { 
      id: "office-airplay", 
      name: "Office AirPlay", 
      type: "Wi-Fi", 
      room: "Office", 
      status: "available",
      icon: "📱"
    },
    { 
      id: "kitchen-speaker", 
      name: "Kitchen Speaker", 
      type: "Wi-Fi", 
      room: "Kitchen", 
      status: "offline",
      icon: "🔊"
    },
    { 
      id: "bedroom-tv", 
      name: "Bedroom TV", 
      type: "Wi-Fi", 
      room: "Bedroom", 
      status: "available",
      icon: "📺"
    }
  ];

  // Mock discovered devices for "Add Device" functionality
  const discoveredDevices = [
    { 
      id: "new-bluetooth-1", 
      name: "JBL Flip 6", 
      type: "Bluetooth", 
      icon: "🔊"
    },
    { 
      id: "new-wifi-1", 
      name: "Google Nest Audio", 
      type: "Wi-Fi", 
      icon: "🔊"
    },
    { 
      id: "new-bluetooth-2", 
      name: "Bose SoundLink", 
      type: "Bluetooth", 
      icon: "🔊"
    }
  ];

  const handleDeviceToggle = (deviceId: string) => {
    setSelectedDevices(prev => {
      if (prev.includes(deviceId)) {
        return prev.filter(id => id !== deviceId);
      } else {
        return [...prev, deviceId];
      }
    });
  };



  const handleAddDevice = (deviceId: string) => {
    const device = discoveredDevices.find(d => d.id === deviceId);
    if (device) {
      // In real implementation, this would add the device to the user's list
      console.log(`Added device: ${device.name}`);
      setShowAddDevice(false);
    }
  };

  const getSelectedDeviceNames = () => {
    return selectedDevices.map(id => {
      const device = outputDevices.find(d => d.id === id);
      return device?.name || id;
    });
  };

  // Mock search results
  const mockSearchResults = {
    songs: [
      { id: 1, title: "Electric Feel", artist: "MGMT", cover: "⚡", genre: "Indie" },
      { id: 2, title: "Midnight City", artist: "M83", cover: "🌃", genre: "Electronic" },
      { id: 3, title: "Blinding Lights", artist: "The Weeknd", cover: "💡", genre: "Pop" },
      { id: 4, title: "Levitating", artist: "Dua Lipa", cover: "✨", genre: "Pop" }
    ],
    artists: [
      { id: 1, name: "MGMT", cover: "🎸", genre: "Indie" },
      { id: 2, name: "The Weeknd", cover: "🎤", genre: "Pop" },
      { id: 3, name: "Dua Lipa", cover: "🎵", genre: "Pop" }
    ],
    playlists: [
      { id: 1, name: "Chill Vibes", tracks: 45, cover: "🌊", genre: "Lo-fi" },
      { id: 2, name: "Workout Mix", tracks: 32, cover: "💪", genre: "Workout" },
      { id: 3, name: "Jazz Classics", tracks: 28, cover: "🎷", genre: "Jazz" }
    ]
  };

  // Mock genre filters
  const genreFilters = ["All", "Pop", "Lo-fi", "Jazz", "Workout", "Relax", "Focus", "Electronic"];

  // Filter playlists by selected genre
  const getFilteredPlaylists = () => {
    if (!selectedGenre || selectedGenre === "All") {
      return (currentAppData as any).playlists || [];
    }
    return (currentAppData as any).playlists?.filter((playlist: any) => 
      playlist.genre === selectedGenre
    ) || [];
  };

  // Get search results based on query
  const getSearchResults = () => {
    if (!searchQuery.trim()) return null;
    
    const query = searchQuery.toLowerCase();
    const results = {
      songs: mockSearchResults.songs.filter(song => 
        song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
      ),
      artists: mockSearchResults.artists.filter(artist => 
        artist.name.toLowerCase().includes(query)
      ),
      playlists: mockSearchResults.playlists.filter(playlist => 
        playlist.name.toLowerCase().includes(query) || playlist.genre.toLowerCase().includes(query)
      )
    };

    return results;
  };

  const renderAppContent = () => {
    // Return individual items for the responsive grid layout
    if (selectedApp === "appleMusic") {
      return (currentAppData as any).recentlyPlayed?.map((item: any, index: number) => (
        <div key={index} className="flex items-center p-2 lg:p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
          <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mr-3 lg:mr-4">
            <span className="text-sm lg:text-2xl">{item.cover}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate text-sm lg:text-base">{item.title}</div>
            <div className="text-xs lg:text-sm text-zinc-600 dark:text-zinc-400 truncate">{item.artist}</div>
          </div>
        </div>
      ));
    }

    if (selectedApp === "pandora") {
      return (currentAppData as any).stations?.map((station: any, index: number) => (
        <div key={index} className="flex items-center p-2 lg:p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
          <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-red-400 to-orange-400 rounded-lg flex items-center justify-center mr-3 lg:mr-4">
            <span className="text-sm lg:text-2xl">📻</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate text-sm lg:text-base">{station.name}</div>
            <div className="text-xs lg:text-sm text-zinc-600 dark:text-zinc-400 truncate">{station.genre}</div>
          </div>
        </div>
      ));
    }

    if (selectedApp === "spotify") {
      return getFilteredPlaylists().map((playlist: any, index: number) => (
        <div key={index} className="flex items-center p-2 lg:p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
          <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg flex items-center justify-center mr-3 lg:mr-4">
            <span className="text-sm lg:text-2xl">🎵</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate text-sm lg:text-base">{playlist.name}</div>
            <div className="text-xs lg:text-sm text-zinc-600 dark:text-zinc-400 truncate">{playlist.tracks} tracks</div>
          </div>
        </div>
      ));
    }

    if (selectedApp === "local") {
      return (currentAppData as any).folders?.map((folder: any, index: number) => (
        <div key={index} className="flex items-center p-2 lg:p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
          <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-lg flex items-center justify-center mr-3 lg:mr-4">
            <span className="text-sm lg:text-2xl">📁</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate text-sm lg:text-base">{folder.name}</div>
            <div className="text-xs lg:text-sm text-zinc-600 dark:text-zinc-400 truncate">{folder.tracks} tracks</div>
          </div>
        </div>
      ));
    }

    if (selectedApp === "airplay") {
      return (currentAppData as any).devices?.map((device: any, index: number) => (
        <div key={index} className="flex items-center p-2 lg:p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
          <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center mr-3 lg:mr-4">
            <span className="text-sm lg:text-2xl">📱</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate text-sm lg:text-base">{device.name}</div>
            <div className="text-xs lg:text-sm text-zinc-600 dark:text-zinc-400 truncate">{device.type}</div>
          </div>
        </div>
      ));
    }

    return null;
  };

  return (
    <div className="w-full h-full bg-white dark:bg-zinc-900 flex flex-col overflow-hidden">
      {/* Top: App Selector - Compact for iPad */}
      <div className="flex-shrink-0 p-3 lg:p-4 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {Object.keys(mockData).map((app) => {
            const appData = mockData[app as keyof typeof mockData];
            const isSelected = selectedApp === app;
            const appName = app.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            
            return (
              <button
                key={app}
                onClick={() => handleAppSelect(app)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap relative text-sm ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : appData.isConnected
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 active:bg-zinc-200 dark:active:bg-zinc-700'
                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <span className="text-base">{appData.nowPlaying.cover}</span>
                <span>{appName}</span>
                
                {/* Signed-in indicator */}
                {appData.isConnected ? (
                  <CheckIcon className="w-3 h-3 text-green-500" />
                ) : (
                  <LockIcon className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
                )}
              </button>
            );
          })}
        </div>
        
        {/* Status indicator for selected app */}
        <div className="mt-2">
          {(() => {
            const selectedAppData = mockData[selectedApp as keyof typeof mockData];
            return (
              <div className={`text-xs font-medium ${
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

      {/* Main Content Area - Responsive Layout */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {currentAppData.isConnected ? (
          <>
            {/* Left Column: Album Art, Song Info, Playback Controls */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-6">
              {/* Album Art - Smaller on iPad */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg mb-4 lg:mb-6">
                <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">{nowPlaying.cover}</span>
              </div>
              
              {/* Song Info - Compact on iPad */}
              <div className="text-center mb-4 lg:mb-6">
                <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-zinc-800 dark:text-zinc-200 mb-1 lg:mb-2">
            {nowPlaying.title}
          </h1>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-zinc-600 dark:text-zinc-400">
            {nowPlaying.artist}
          </p>
        </div>

              {/* Playback Controls - Compact on iPad */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
          <button
            onClick={handlePrevious}
                  className="p-2.5 sm:p-3 lg:p-4 rounded-full border-2 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 transition-all duration-200 active:scale-90"
            aria-label="Previous"
          >
                  <PrevIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
          </button>

          <button
            onClick={handlePlayPause}
                  className="p-3 sm:p-4 lg:p-5 xl:p-6 rounded-full bg-blue-600 text-white transition-all duration-200 active:scale-95"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
                    <PauseIcon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
            ) : (
                    <PlayIcon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
            )}
          </button>

          <button
            onClick={handleNext}
                  className="p-2.5 sm:p-3 lg:p-4 rounded-full border-2 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 transition-all duration-200 active:scale-90"
            aria-label="Next"
          >
                  <NextIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
          </button>
        </div>

              {/* Playing To Label - Compact on iPad */}
              <div className="mt-4 lg:mt-6 text-center">
                <button
                  onClick={() => setShowDevicePicker(true)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 rounded-full border border-zinc-200 dark:border-zinc-700 transition-colors text-sm"
                >
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Playing to:</span>
                  <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                    {getSelectedDeviceNames().join(", ")}
                  </span>
                  <span className="text-zinc-400 dark:text-zinc-500 text-xs">▼</span>
                </button>
              </div>
            </div>

            {/* Right Column: Volume and Device Controls - Compact on iPad */}
            <div className="flex-shrink-0 w-full lg:w-72 xl:w-80 p-4 lg:p-6 border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-700">
              <div className="space-y-4 lg:space-y-6">
        {/* Volume Control */}
                <div className="space-y-2 lg:space-y-3">
          <div className="flex items-center justify-between">
                    <span className="text-xs lg:text-sm font-medium text-zinc-600 dark:text-zinc-400">Volume</span>
                    <span className="text-xs lg:text-sm text-zinc-500 dark:text-zinc-500">{volume}%</span>
          </div>
          
                  <div className="flex items-center gap-2 lg:gap-3">
                    <span className="text-base lg:text-lg text-zinc-500 dark:text-zinc-500">🔇</span>
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
                    <span className="text-base lg:text-lg text-zinc-500 dark:text-zinc-500">🔊</span>
                  </div>
                </div>

                {/* Playing To Device */}
                <button
                  onClick={() => setShowDevicePicker(true)}
                  className="w-full flex items-center justify-between p-3 lg:p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-2 lg:gap-3">
                    <span className="text-base lg:text-lg">📡</span>
                    <div className="text-left">
                      <div className="text-xs lg:text-sm font-medium text-zinc-700 dark:text-zinc-300">Playing To</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-500">{getSelectedDeviceNames().join(", ")}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-zinc-400 dark:text-zinc-500 text-xs">▼</span>
                  </div>
                </button>

                {/* Mute Toggle */}
                <button
                  onClick={() => setVolume(volume > 0 ? 0 : 75)}
                  className="w-full flex items-center justify-between p-3 lg:p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-2 lg:gap-3">
                    <span className="text-base lg:text-lg">{volume > 0 ? '🔊' : '🔇'}</span>
                    <div className="text-left">
                      <div className="text-xs lg:text-sm font-medium text-zinc-700 dark:text-zinc-300">
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
          <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-8 text-center">
            <div className="text-4xl lg:text-6xl mb-4 lg:mb-6">{nowPlaying.cover}</div>
            <h2 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Connect to {selectedApp.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 lg:mb-8 max-w-md text-sm lg:text-base">
              Sign in to access your music library and start streaming
            </p>
            <button
              onClick={() => handleConnect(selectedApp)}
              className="px-6 lg:px-8 py-2.5 lg:py-3 bg-blue-600 text-white rounded-full font-medium transition-all duration-200 active:scale-95 text-sm lg:text-base"
            >
              Sign In
            </button>
          </div>
        )}
      </div>

      {/* Bottom: Content for Connected Apps - Scrollable on mobile, fixed on iPad */}
      {currentAppData.isConnected && (
        <div className="flex-shrink-0 p-4 lg:p-6 border-t border-zinc-200 dark:border-zinc-700">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar - Compact on iPad */}
            <div className="relative mb-4 lg:mb-6">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4 lg:w-5 lg:h-5" />
              <input
                type="text"
                placeholder={`Search ${selectedApp.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm lg:text-base"
              />
            </div>

            {/* Recently Played Row - Horizontal scroll on iPad */}
            {!searchQuery.trim() && selectedApp === "appleMusic" && (
              <div className="mb-4 lg:mb-6">
                <h3 className="text-base lg:text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2 lg:mb-3">Recently Played</h3>
                <div className="flex gap-2 lg:gap-3 overflow-x-auto pb-2">
                  {(currentAppData as any).recentlyPlayed?.map((item: any, index: number) => (
                    <div key={index} className="flex-shrink-0 w-24 lg:w-32 p-2 lg:p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                      <div className="w-full aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mb-1 lg:mb-2">
                        <span className="text-lg lg:text-2xl">{item.cover}</span>
                      </div>
                      <div className="text-center">
                        <div className="text-xs lg:text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">{item.title}</div>
                        <div className="text-xs text-zinc-600 dark:text-zinc-400 truncate">{item.artist}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Genre Filters - Horizontal scroll on iPad */}
            {!searchQuery.trim() && selectedApp === "spotify" && (
              <div className="mb-4 lg:mb-6">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {genreFilters.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre === "All" ? null : genre)}
                      className={`flex-shrink-0 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full font-medium transition-all duration-200 text-sm ${
                        (selectedGenre === genre) || (!selectedGenre && genre === "All")
                          ? 'bg-blue-600 text-white'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 active:bg-zinc-200 dark:active:bg-zinc-700'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Main Content Grid - Responsive columns */}
            {!searchQuery.trim() && (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3">
                {renderAppContent()}
              </div>
            )}

            {/* Search Results - Responsive grid */}
            {getSearchResults() && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3">
                {Object.entries(getSearchResults()!).map(([type, items]) => {
                  if (items.length === 0) return null;
                  
                  return (
                    <div key={type} className="space-y-2 lg:space-y-3">
                      <h3 className="text-sm lg:text-base font-semibold text-zinc-800 dark:text-zinc-200 capitalize">
                        {type} ({items.length})
                      </h3>
                      <div className="grid grid-cols-1 gap-2 lg:gap-3">
                        {items.slice(0, 4).map((item: any) => (
                          <div key={item.id} className="flex items-center p-2 lg:p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                            <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mr-3 lg:mr-4">
                              <span className="text-sm lg:text-2xl">{item.cover}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate text-sm lg:text-base">
                                {type === 'songs' ? item.title : type === 'artists' ? item.name : item.name}
                              </div>
                              <div className="text-xs lg:text-sm text-zinc-600 dark:text-zinc-400 truncate">
                                {type === 'songs' ? item.artist : type === 'artists' ? item.genre : `${item.tracks} tracks`}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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

      {/* Enhanced Output Device Picker Modal */}
      {showDevicePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 max-w-md w-full max-h-[80vh] flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-center mb-2">Select Output Device</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                Choose one or more devices to play music
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
                      onClick={() => handleDeviceToggle(device.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        selectedDevices.includes(device.id)
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-zinc-300 dark:border-zinc-600'
                      }`}
                    >
                      {selectedDevices.includes(device.id) && (
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
                    {/* Status indicator */}
                    <div className={`w-2 h-2 rounded-full ${
                      device.status === 'connected' ? 'bg-green-500' :
                      device.status === 'available' ? 'bg-blue-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700 space-y-2">
              <button
                onClick={() => setShowAddDevice(true)}
                className="w-full px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium transition-colors"
              >
                + Add Device
              </button>
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

      {/* Add Device Modal */}
      {showAddDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 max-w-sm w-full">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-center mb-2">Add New Device</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                Discovered devices on your network
              </p>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {discoveredDevices.map((device) => (
                <div
                  key={device.id}
                  className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{device.icon}</span>
                    <div className="text-left">
                      <div className="font-medium text-zinc-700 dark:text-zinc-300">{device.name}</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-500">{device.type}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddDevice(device.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setShowAddDevice(false)}
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