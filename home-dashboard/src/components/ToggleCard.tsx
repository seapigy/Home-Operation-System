import { useState, useEffect } from "react";

type ToggleCardProps = {
  title: string;
  icon: string;
  initialState?: boolean;
  onToggle?: (isOn: boolean) => void;
  isWiFi?: boolean;
};

type WiFiState = 'connected' | 'disconnected' | 'weak' | 'connecting';

export default function ToggleCard({ 
  title, 
  icon, 
  initialState = false, 
  onToggle,
  isWiFi = false
}: ToggleCardProps) {
  const [isOn, setIsOn] = useState(initialState);
  const [wifiState, setWifiState] = useState<WiFiState>('connected');

  // Cycle through Wi-Fi states for demo purposes
  useEffect(() => {
    if (!isWiFi) return;
    
    const interval = setInterval(() => {
      setWifiState(prev => {
        switch (prev) {
          case 'connected': return 'weak';
          case 'weak': return 'connecting';
          case 'connecting': return 'disconnected';
          case 'disconnected': return 'connected';
          default: return 'connected';
        }
      });
    }, 3000); // Change state every 3 seconds

    return () => clearInterval(interval);
  }, [isWiFi]);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    onToggle?.(newState);
  };

  const getWiFiStateConfig = (state: WiFiState) => {
    switch (state) {
      case 'connected':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-100 dark:bg-green-900/20',
          icon: '✓',
          text: 'Connected'
        };
      case 'disconnected':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-100 dark:bg-red-900/20',
          icon: '✕',
          text: 'Disconnected'
        };
      case 'weak':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
          icon: '⚠',
          text: 'Weak Signal'
        };
      case 'connecting':
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-100 dark:bg-blue-900/20',
          icon: '⟳',
          text: 'Connecting...'
        };
    }
  };

  const wifiConfig = isWiFi ? getWiFiStateConfig(wifiState) : null;

  return (
    <div className={`bg-white dark:bg-zinc-800 p-3 sm:p-4 rounded-xl shadow-md ${isWiFi && wifiConfig ? wifiConfig.bgColor : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`text-xl sm:text-2xl ${isWiFi && wifiConfig ? wifiConfig.color : ''}`}>
            {isWiFi && wifiConfig ? wifiConfig.icon : icon}
          </span>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-medium text-zinc-700 dark:text-zinc-200">
              {title}
            </span>
            {isWiFi && wifiConfig && (
              <span className={`text-xs ${wifiConfig.color} font-medium`}>
                {wifiConfig.text}
              </span>
            )}
          </div>
        </div>
        
        {/* Toggle Switch */}
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 ${
            isOn 
              ? 'bg-blue-600' 
              : 'bg-zinc-300 dark:bg-zinc-600'
          }`}
          role="switch"
          aria-checked={isOn}
          aria-label={`Toggle ${title}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
              isOn ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
      
      {/* Status Text */}
      {!isWiFi && (
        <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          {isOn ? 'On' : 'Off'}
        </div>
      )}
    </div>
  );
} 