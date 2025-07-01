import { useState } from "react";

type AppButton = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

const appButtons: AppButton[] = [
  { id: 'youtube', name: 'YouTube', icon: '📺', color: 'bg-red-500 hover:bg-red-600' },
  { id: 'netflix', name: 'Netflix', icon: '🎬', color: 'bg-red-600 hover:bg-red-700' },
  { id: 'disney', name: 'Disney+', icon: '🏰', color: 'bg-blue-600 hover:bg-blue-700' },
  { id: 'hulu', name: 'Hulu', icon: '🟢', color: 'bg-green-500 hover:bg-green-600' },
  { id: 'prime', name: 'Prime', icon: '📦', color: 'bg-blue-500 hover:bg-blue-600' },
  { id: 'hbo', name: 'HBO Max', icon: '🟣', color: 'bg-purple-600 hover:bg-purple-700' }
];

export default function AppleTVControlWidget() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDirectionalClick = (direction: string) => {
    console.log(`Apple TV: ${direction} button pressed`);
  };

  const handleMediaClick = (action: string) => {
    console.log(`Apple TV: ${action} button pressed`);
    if (action === 'play/pause') {
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeClick = (direction: string) => {
    console.log(`Apple TV: Volume ${direction}`);
  };

  const handleAppLaunch = (appName: string) => {
    console.log(`Apple TV: Launching ${appName}`);
  };

  return (
    <div className="bg-zinc-900 dark:bg-zinc-800 rounded-xl shadow-md p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-zinc-100 dark:text-zinc-200 mb-6 flex items-center gap-2">
        <span className="text-xl">🍎</span>
        Apple TV Controls
      </h3>

      {/* Circular Directional Controls */}
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

      {/* Media Controls */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-zinc-400 dark:text-zinc-400 mb-3 text-center">Media Controls</h4>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => handleMediaClick('menu')}
            className="px-6 py-3 bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-700 dark:hover:bg-zinc-600 rounded-full transition-colors text-sm font-medium text-zinc-300 dark:text-zinc-300 border border-zinc-600 dark:border-zinc-500"
          >
            Menu
          </button>
          <button
            onClick={() => handleMediaClick('play/pause')}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors text-sm font-medium text-white"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
      </div>

      {/* Volume Controls */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-zinc-400 dark:text-zinc-400 mb-3 text-center">Volume</h4>
        <div className="flex gap-3 justify-center items-center">
          <button
            onClick={() => handleVolumeClick('down')}
            className="p-3 bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-700 dark:hover:bg-zinc-600 rounded-full transition-colors border border-zinc-600 dark:border-zinc-500"
          >
            <svg className="w-5 h-5 text-zinc-300 dark:text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4a1 1 0 00-1.414 0L4.586 7.172a1 1 0 00-.293.707v4.242a1 1 0 00.293.707L7.586 16A1 1 0 009 16V4zM13.586 7.172a1 1 0 00-1.414 0L9 9.586V14.414l3.172-2.414a1 1 0 001.414 0L15.414 12a1 1 0 000-1.414L13.586 7.172z" />
            </svg>
          </button>
          <div className="w-20 h-2 bg-zinc-700 dark:bg-zinc-600 rounded-full">
            <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
          </div>
          <button
            onClick={() => handleVolumeClick('up')}
            className="p-3 bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-700 dark:hover:bg-zinc-600 rounded-full transition-colors border border-zinc-600 dark:border-zinc-500"
          >
            <svg className="w-5 h-5 text-zinc-300 dark:text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4a1 1 0 00-1.414 0L4.586 7.172a1 1 0 00-.293.707v4.242a1 1 0 00.293.707L7.586 16A1 1 0 009 16V4zM13.586 7.172a1 1 0 00-1.414 0L9 9.586V14.414l3.172-2.414a1 1 0 001.414 0L15.414 12a1 1 0 000-1.414L13.586 7.172z" />
              <path d="M15.5 8.5a1 1 0 00-1.414 0L12 10.586l-2.086-2.086a1 1 0 00-1.414 1.414L10.586 12l-2.086 2.086a1 1 0 001.414 1.414L12 13.414l2.086 2.086a1 1 0 001.414-1.414L13.414 12l2.086-2.086a1 1 0 000-1.414z" />
            </svg>
          </button>
        </div>
      </div>

      {/* App Launch Buttons */}
      <div>
        <h4 className="text-sm font-medium text-zinc-400 dark:text-zinc-400 mb-3 text-center">Quick Launch</h4>
        <div className="grid grid-cols-3 gap-2">
          {appButtons.map((app) => (
            <button
              key={app.id}
              onClick={() => handleAppLaunch(app.name)}
              className={`p-3 rounded-lg transition-colors text-center ${app.color}`}
            >
              <div className="text-lg mb-1">{app.icon}</div>
              <div className="text-xs text-white font-medium">{app.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 