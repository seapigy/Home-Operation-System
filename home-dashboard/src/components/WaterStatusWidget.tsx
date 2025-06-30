import { useState } from "react";

type ActivityEvent = {
  id: string;
  timestamp: string;
  description: string;
  type: 'info' | 'warning' | 'error' | 'success';
};

export default function WaterStatusWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeviceOn, setIsDeviceOn] = useState(true);

  // Mock Flo by Moen data
  const waterData = {
    security: {
      status: 'secure', // or 'leak_detected'
      lastCheck: '2 hours ago'
    },
    metrics: {
      pressure: {
        value: 65,
        unit: 'PSI',
        status: 'optimal'
      },
      flow: {
        value: 0.8,
        unit: 'GPM',
        status: 'normal'
      },
      temperature: {
        value: 72,
        unit: '°F',
        status: 'normal'
      }
    },
    system: {
      status: 'online',
      battery: 85
    }
  };

  // Mock activity log
  const activityLog: ActivityEvent[] = [
    {
      id: '1',
      timestamp: '2:30 PM',
      description: 'System check completed - all systems normal',
      type: 'success'
    },
    {
      id: '2',
      timestamp: '1:45 PM',
      description: 'Water flow detected - kitchen faucet',
      type: 'info'
    },
    {
      id: '3',
      timestamp: '12:15 PM',
      description: 'Pressure reading: 65 PSI (optimal range)',
      type: 'info'
    },
    {
      id: '4',
      timestamp: '11:30 AM',
      description: 'Temperature reading: 72°F',
      type: 'info'
    },
    {
      id: '5',
      timestamp: '10:00 AM',
      description: 'Daily system maintenance completed',
      type: 'success'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure':
      case 'optimal':
      case 'normal':
      case 'online':
        return 'text-green-600 dark:text-green-400';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'leak_detected':
      case 'error':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-zinc-600 dark:text-zinc-400';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'secure':
      case 'optimal':
      case 'normal':
      case 'online':
        return 'bg-green-100 dark:bg-green-900/20';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900/20';
      case 'leak_detected':
      case 'error':
        return 'bg-red-100 dark:bg-red-900/20';
      default:
        return 'bg-zinc-100 dark:bg-zinc-700';
    }
  };

  const getActivityIcon = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
    }
  };

  const handleDeviceToggle = () => {
    setIsDeviceOn(!isDeviceOn);
    console.log(`Water device ${isDeviceOn ? 'turned off' : 'turned on'}`);
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-zinc-800 dark:text-zinc-200">
          Water Status
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">Flo by Moen</span>
          
          {/* Device On/Off Switch */}
          <button
            onClick={handleDeviceToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 ${
              isDeviceOn 
                ? 'bg-blue-600' 
                : 'bg-zinc-300 dark:bg-zinc-600'
            }`}
            role="switch"
            aria-checked={isDeviceOn}
            aria-label="Toggle water device"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                isDeviceOn ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Security Status */}
      <div className={`p-3 rounded-lg mb-4 ${getStatusBgColor(waterData.security.status)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔒</span>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Security Status</span>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold ${getStatusColor(waterData.security.status)}`}>
              {waterData.security.status === 'secure' ? 'Secure' : 'Leak Detected'}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Checked {waterData.security.lastCheck}
            </div>
          </div>
        </div>
      </div>

      {/* Device Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-700/50">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">📊</span>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Pressure</span>
          </div>
          <div className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
            {waterData.metrics.pressure.value} {waterData.metrics.pressure.unit}
          </div>
          <div className={`text-xs ${getStatusColor(waterData.metrics.pressure.status)}`}>
            {waterData.metrics.pressure.status}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-700/50">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💧</span>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Flow Rate</span>
          </div>
          <div className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
            {waterData.metrics.flow.value} {waterData.metrics.flow.unit}
          </div>
          <div className={`text-xs ${getStatusColor(waterData.metrics.flow.status)}`}>
            {waterData.metrics.flow.status}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-700/50">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🌡️</span>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Temperature</span>
          </div>
          <div className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
            {waterData.metrics.temperature.value} {waterData.metrics.temperature.unit}
          </div>
          <div className={`text-xs ${getStatusColor(waterData.metrics.temperature.status)}`}>
            {waterData.metrics.temperature.status}
          </div>
        </div>
      </div>

      {/* Show Details Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors mb-3"
      >
        {isExpanded ? 'Hide Details' : 'Show Details'} {isExpanded ? '▲' : '▼'}
      </button>

      {/* Activity Log */}
      {isExpanded && (
        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
          <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
            Activity Log
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {activityLog.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-700/30">
                <span className="text-sm mt-0.5">{getActivityIcon(event.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-zinc-800 dark:text-zinc-200">
                    {event.description}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {event.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs text-zinc-500 dark:text-zinc-400 text-center mt-4">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
} 