import { useState } from "react";

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

export default function MusicControlWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [currentRoom] = useState("Living Room");

  const nowPlaying = {
    title: "City Lights",
    artist: "Jane Doe",
    album: "Midnight Dreams",
    cover: "🎵" // Placeholder emoji for album art
  };

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

  return (
    <div className="w-full h-full bg-white dark:bg-zinc-900 flex flex-col">
      {/* Top Section - Album Art */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="text-center mb-6">
          <div className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-medium mb-4">
            Now Playing
          </div>
          {/* Large Album Art - Responsive to screen size */}
          <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-2xl mx-auto">
            <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl">{nowPlaying.cover}</span>
          </div>
        </div>
      </div>

      {/* Middle Section - Song Info & Controls */}
      <div className="flex-shrink-0 p-6 sm:p-8 lg:p-12 bg-white dark:bg-zinc-800 rounded-t-3xl shadow-lg">
        {/* Song Information */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">
            {nowPlaying.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-600 dark:text-zinc-400">
            {nowPlaying.artist}
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16 mb-8 sm:mb-10">
          {/* Previous */}
          <button
            onClick={handlePrevious}
            className="p-3 sm:p-4 md:p-5 rounded-full border-2 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-90"
            style={{ minWidth: 56, minHeight: 56 }}
            aria-label="Previous"
          >
            <PrevIcon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={handlePlayPause}
            className="p-6 sm:p-8 md:p-10 rounded-full bg-blue-600 text-white shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 border-4 border-blue-500"
            style={{ minWidth: 96, minHeight: 96 }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <PauseIcon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
            ) : (
              <PlayIcon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
            )}
          </button>

          {/* Next */}
          <button
            onClick={handleNext}
            className="p-3 sm:p-4 md:p-5 rounded-full border-2 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-90"
            style={{ minWidth: 56, minHeight: 56 }}
            aria-label="Next"
          >
            <NextIcon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-base sm:text-lg font-medium text-zinc-600 dark:text-zinc-400">Volume</span>
            <span className="text-base sm:text-lg text-zinc-500 dark:text-zinc-500 font-medium">{volume}%</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-500">🔇</span>
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-3 sm:h-4 bg-zinc-200 dark:bg-zinc-600 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, #e5e7eb ${volume}%, #e5e7eb 100%)`
                }}
              />
            </div>
            <span className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-500">🔊</span>
          </div>
        </div>

        {/* Room Information */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
            Playing in <span className="font-medium text-zinc-700 dark:text-zinc-300">{currentRoom}</span>
          </p>
        </div>
      </div>
    </div>
  );
} 