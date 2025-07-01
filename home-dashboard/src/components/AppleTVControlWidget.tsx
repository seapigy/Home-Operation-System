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
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4 flex items-center gap-2">
        <span className="text-xl">🍎</span>
        Apple TV Controls
      </h3>

      {/* Directional Controls */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">Navigation</h4>
        <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
          {/* Top row */}
          <div></div>
          <button
            onClick={() => handleDirectionalClick('up')}
            className="p-3 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div></div>

          {/* Middle row */}
          <button
            onClick={() => handleDirectionalClick('left')}
            className="p-3 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => handleDirectionalClick('select')}
            className="p-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => handleDirectionalClick('right')}
            className="p-3 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Bottom row */}
          <div></div>
          <button
            onClick={() => handleDirectionalClick('down')}
            className="p-3 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div></div>
        </div>
      </div>

      {/* Media Controls */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">Media Controls</h4>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => handleMediaClick('menu')}
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg transition-colors text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Menu
          </button>
          <button
            onClick={() => handleMediaClick('play/pause')}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors text-sm font-medium text-white"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
      </div>

      {/* Volume Controls */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">Volume</h4>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => handleVolumeClick('down')}
            className="p-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4a1 1 0 00-1.414 0L4.586 7.172a1 1 0 00-.293.707v4.242a1 1 0 00.293.707L7.586 16A1 1 0 009 16V4zM13.586 7.172a1 1 0 00-1.414 0L9 9.586V14.414l3.172-2.414a1 1 0 001.414 0L15.414 12a1 1 0 000-1.414L13.586 7.172z" />
            </svg>
          </button>
          <div className="w-16 h-2 bg-zinc-200 dark:bg-zinc-600 rounded-full self-center">
            <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
          </div>
          <button
            onClick={() => handleVolumeClick('up')}
            className="p-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4a1 1 0 00-1.414 0L4.586 7.172a1 1 0 00-.293.707v4.242a1 1 0 00.293.707L7.586 16A1 1 0 009 16V4zM13.586 7.172a1 1 0 00-1.414 0L9 9.586V14.414l3.172-2.414a1 1 0 001.414 0L15.414 12a1 1 0 000-1.414L13.586 7.172z" />
              <path d="M15.5 8.5a1 1 0 00-1.414 0L12 10.586l-2.086-2.086a1 1 0 00-1.414 1.414L10.586 12l-2.086 2.086a1 1 0 001.414 1.414L12 13.414l2.086 2.086a1 1 0 001.414-1.414L13.414 12l2.086-2.086a1 1 0 000-1.414z" />
            </svg>
          </button>
        </div>
      </div>

      {/* App Launch Buttons */}
      <div>
        <h4 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">Quick Launch</h4>
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