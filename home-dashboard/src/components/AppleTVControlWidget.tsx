import { useState } from "react";

export default function AppleTVControlWidget() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDirectionalClick = (direction: string) => {
    console.log(`Apple TV: ${direction} button pressed`);
  };

  const handleMediaClick = (action: string) => {
    console.log(`Apple TV: ${action} button pressed`);
    if (action === 'play') {
      setIsPlaying(true);
    } else if (action === 'pause') {
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-zinc-900 dark:bg-zinc-800 rounded-xl shadow-md p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-zinc-100 dark:text-zinc-200 mb-6 flex items-center gap-2">
        <span className="text-xl">🍎</span>
        Apple TV Controls
      </h3>

      {/* Directional Controls */}
      <div className="mb-8 flex justify-center">
        <div className="relative">
          {/* Outer ring for directional buttons */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56">
            {/* Up button */}
            <button
              onClick={() => handleDirectionalClick('up')}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-700 dark:hover:bg-zinc-600 rounded-full transition-colors flex items-center justify-center border border-zinc-600 dark:border-zinc-500"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-300 dark:text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Right button */}
            <button
              onClick={() => handleDirectionalClick('right')}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-700 dark:hover:bg-zinc-600 rounded-full transition-colors flex items-center justify-center border border-zinc-600 dark:border-zinc-500"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-300 dark:text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Down button */}
            <button
              onClick={() => handleDirectionalClick('down')}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-700 dark:hover:bg-zinc-600 rounded-full transition-colors flex items-center justify-center border border-zinc-600 dark:border-zinc-500"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-300 dark:text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Left button */}
            <button
              onClick={() => handleDirectionalClick('left')}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-700 dark:hover:bg-zinc-600 rounded-full transition-colors flex items-center justify-center border border-zinc-600 dark:border-zinc-500"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-300 dark:text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Center Select button */}
            <button
              onClick={() => handleDirectionalClick('select')}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors flex items-center justify-center border-2 border-blue-400"
            >
              <span className="text-white font-medium text-sm sm:text-base">Select</span>
            </button>
          </div>
        </div>
      </div>

      {/* Play/Pause Controls */}
      <div className="flex gap-6 justify-center">
        <button
          onClick={() => handleMediaClick('play')}
          className={`px-10 py-4 rounded-full transition-colors text-sm font-medium text-white ${
            isPlaying ? 'bg-zinc-600 dark:bg-zinc-500' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          Play
        </button>
        <button
          onClick={() => handleMediaClick('pause')}
          className={`px-10 py-4 rounded-full transition-colors text-sm font-medium text-white ${
            !isPlaying ? 'bg-zinc-600 dark:bg-zinc-500' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          Pause
        </button>
      </div>
    </div>
  );
} 