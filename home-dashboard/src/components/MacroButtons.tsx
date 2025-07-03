import React, { useState } from 'react';

interface Macro {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  actions: string[];
}

interface MacroButtonsProps {
  className?: string;
}

export default function MacroButtons({ className = "" }: MacroButtonsProps) {
  const [activeMacros, setActiveMacros] = useState<string[]>([]);

  // Mock macro data
  const macros: Macro[] = [
    {
      id: 'movie-mode',
      name: 'Movie Mode',
      description: 'TV + Surround On',
      icon: '🎬',
      color: 'from-purple-500 to-pink-500',
      isActive: false,
      actions: ['Turn on Living Room TV', 'Activate Surround Sound', 'Dim lights to 20%', 'Close blinds']
    },
    {
      id: 'winter-mode',
      name: 'Winter Mode',
      description: 'All Ecobees set to Heat',
      icon: '❄️',
      color: 'from-blue-500 to-cyan-500',
      isActive: false,
      actions: ['Set all thermostats to Heat mode', 'Set temperature to 72°F', 'Enable eco mode']
    },
    {
      id: 'away-mode',
      name: 'Away Mode',
      description: 'Alarm on, lights off',
      icon: '🏠',
      color: 'from-orange-500 to-red-500',
      isActive: false,
      actions: ['Arm security system', 'Turn off all lights', 'Set thermostats to 65°F', 'Lock all doors']
    },
    {
      id: 'party-mode',
      name: 'Party Mode',
      description: 'Lights + Music',
      icon: '🎉',
      color: 'from-pink-500 to-purple-500',
      isActive: false,
      actions: ['Activate party lighting', 'Start playlist', 'Set volume to 70%', 'Disable motion sensors']
    },
    {
      id: 'sleep-mode',
      name: 'Sleep Mode',
      description: 'Quiet & Dark',
      icon: '😴',
      color: 'from-indigo-500 to-purple-500',
      isActive: false,
      actions: ['Turn off all lights', 'Set volume to 0%', 'Arm security', 'Set thermostats to 68°F']
    },
    {
      id: 'work-mode',
      name: 'Work Mode',
      description: 'Focus Environment',
      icon: '💼',
      color: 'from-green-500 to-emerald-500',
      isActive: false,
      actions: ['Turn on desk lights', 'Start focus playlist', 'Set temperature to 70°F', 'Enable do not disturb']
    }
  ];

  const handleMacroToggle = (macroId: string) => {
    setActiveMacros(prev => {
      if (prev.includes(macroId)) {
        return prev.filter(id => id !== macroId);
      } else {
        return [...prev, macroId];
      }
    });

    // Mock action execution
    const macro = macros.find(m => m.id === macroId);
    if (macro) {
      console.log(`Executing ${macro.name}:`, macro.actions);
      
      // Simulate action feedback
      setTimeout(() => {
        console.log(`${macro.name} completed successfully`);
      }, 1000);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Scenes & Macros</h3>
        <span className="text-sm text-zinc-500 dark:text-zinc-500">
          {activeMacros.length} active
        </span>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {macros.map((macro) => {
          const isActive = activeMacros.includes(macro.id);
          
          return (
            <button
              key={macro.id}
              onClick={() => handleMacroToggle(macro.id)}
              className={`relative p-4 rounded-xl border transition-all duration-200 text-left group ${
                isActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                  : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600'
              }`}
            >
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              )}
              
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${macro.color} flex items-center justify-center mb-3 text-2xl`}>
                {macro.icon}
              </div>
              
              {/* Content */}
              <div>
                <h4 className={`font-medium text-sm mb-1 ${
                  isActive ? 'text-blue-700 dark:text-blue-300' : 'text-zinc-800 dark:text-zinc-200'
                }`}>
                  {macro.name}
                </h4>
                <p className={`text-xs ${
                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500 dark:text-zinc-500'
                }`}>
                  {macro.description}
                </p>
              </div>
              
              {/* Hover Actions Preview */}
              <div className="absolute inset-0 bg-black bg-opacity-75 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="text-center p-3">
                  <div className="text-white text-xs font-medium mb-2">Actions:</div>
                  <div className="text-white text-xs space-y-1">
                    {macro.actions.slice(0, 2).map((action, index) => (
                      <div key={index}>• {action}</div>
                    ))}
                    {macro.actions.length > 2 && (
                      <div>• +{macro.actions.length - 2} more</div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Quick Actions Row */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button className="flex-shrink-0 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-xs font-medium transition-colors">
          All Off
        </button>
        <button className="flex-shrink-0 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-xs font-medium transition-colors">
          All On
        </button>
        <button className="flex-shrink-0 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-xs font-medium transition-colors">
          Reset
        </button>
      </div>
    </div>
  );
} 