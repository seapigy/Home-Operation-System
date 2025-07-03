import React, { useState } from 'react';

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'error';
  room: string;
  lastSeen: string;
}

interface SystemStatusPanelProps {
  className?: string;
}

export default function SystemStatusPanel({ className = "" }: SystemStatusPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock system data
  const devices: Device[] = [
    { id: '1', name: 'Living Room TV', type: 'Apple TV', status: 'online', room: 'Living Room', lastSeen: '2 min ago' },
    { id: '2', name: 'Sonos Speaker', type: 'Speaker', status: 'online', room: 'Living Room', lastSeen: '1 min ago' },
    { id: '3', name: 'Kitchen Speaker', type: 'Speaker', status: 'offline', room: 'Kitchen', lastSeen: '15 min ago' },
    { id: '4', name: 'Ecobee Thermostat', type: 'Thermostat', status: 'online', room: 'Living Room', lastSeen: '5 min ago' },
    { id: '5', name: 'Flo by Moen', type: 'Water Monitor', status: 'error', room: 'Basement', lastSeen: '1 hour ago' },
    { id: '6', name: 'Security Camera', type: 'Camera', status: 'online', room: 'Front Door', lastSeen: '30 sec ago' }
  ];

  const onlineDevices = devices.filter(d => d.status === 'online');
  const offlineDevices = devices.filter(d => d.status === 'offline');
  const errorDevices = devices.filter(d => d.status === 'error');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'error': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      case 'error': return 'Error';
      default: return 'Unknown';
    }
  };

  const getSystemHealth = () => {
    if (errorDevices.length > 0) return 'warning';
    if (offlineDevices.length > 0) return 'attention';
    return 'good';
  };

  const systemHealth = getSystemHealth();

  return (
    <div className={`fixed bottom-4 right-4 z-40 ${className}`}>
      {/* Collapsed State */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-800 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-700 transition-all duration-200"
        >
          {/* System Health Indicator */}
          <div className={`w-3 h-3 rounded-full ${
            systemHealth === 'good' ? 'bg-green-500' :
            systemHealth === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
          }`}></div>
          
          {/* Device Count */}
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {onlineDevices.length}/{devices.length}
          </span>
          
          {/* Status Icon */}
          <span className="text-lg">📱</span>
        </button>
      )}

      {/* Expanded State */}
      {isExpanded && (
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 w-80 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">System Status</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                ✕
              </button>
            </div>
            
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
                <div className="text-green-600 dark:text-green-400 font-semibold">{onlineDevices.length}</div>
                <div className="text-xs text-green-600 dark:text-green-400">Online</div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-2">
                <div className="text-red-600 dark:text-red-400 font-semibold">{offlineDevices.length}</div>
                <div className="text-xs text-red-600 dark:text-red-400">Offline</div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-2">
                <div className="text-yellow-600 dark:text-yellow-400 font-semibold">{errorDevices.length}</div>
                <div className="text-xs text-yellow-600 dark:text-yellow-400">Errors</div>
              </div>
            </div>
          </div>

          {/* Device List */}
          <div className="p-4 max-h-64 overflow-y-auto">
            <div className="space-y-2">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {/* Status Indicator */}
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`}></div>
                    
                    {/* Device Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-zinc-800 dark:text-zinc-200 truncate">
                        {device.name}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-500">
                        {device.type} • {device.room}
                      </div>
                    </div>
                  </div>
                  
                  {/* Last Seen */}
                  <div className="text-xs text-zinc-500 dark:text-zinc-500">
                    {device.lastSeen}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">
                System Health: {systemHealth === 'good' ? 'Good' : systemHealth === 'warning' ? 'Warning' : 'Attention'}
              </span>
              <button className="text-blue-600 dark:text-blue-400 hover:underline">
                View Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 