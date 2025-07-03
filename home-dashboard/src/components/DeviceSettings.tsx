import React, { useState } from 'react';

interface Device {
  id: string;
  name: string;
  type: string;
  room: string;
  connectionType: 'Wi-Fi' | 'Bluetooth' | 'Zigbee' | 'Z-Wave';
  status: 'online' | 'offline' | 'error';
  isEnabled: boolean;
  lastSeen: string;
  firmwareVersion?: string;
  batteryLevel?: number;
  ipAddress?: string;
}

interface DeviceSettingsProps {
  className?: string;
}

export default function DeviceSettings({ className = "" }: DeviceSettingsProps) {
  const [expandedDevices, setExpandedDevices] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('all');

  // Mock devices data
  const devices: Device[] = [
    {
      id: '1',
      name: 'Living Room TV',
      type: 'Apple TV',
      room: 'Living Room',
      connectionType: 'Wi-Fi',
      status: 'online',
      isEnabled: true,
      lastSeen: '2 min ago',
      firmwareVersion: '15.0',
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      name: 'Sonos Speaker',
      type: 'Speaker',
      room: 'Living Room',
      connectionType: 'Wi-Fi',
      status: 'online',
      isEnabled: true,
      lastSeen: '1 min ago',
      firmwareVersion: '14.12',
      ipAddress: '192.168.1.101'
    },
    {
      id: '3',
      name: 'Kitchen Speaker',
      type: 'Speaker',
      room: 'Kitchen',
      connectionType: 'Bluetooth',
      status: 'offline',
      isEnabled: false,
      lastSeen: '15 min ago',
      batteryLevel: 45
    },
    {
      id: '4',
      name: 'Ecobee Thermostat',
      type: 'Thermostat',
      room: 'Living Room',
      connectionType: 'Wi-Fi',
      status: 'online',
      isEnabled: true,
      lastSeen: '5 min ago',
      firmwareVersion: '4.7.33',
      ipAddress: '192.168.1.102'
    },
    {
      id: '5',
      name: 'Flo by Moen',
      type: 'Water Monitor',
      room: 'Basement',
      connectionType: 'Zigbee',
      status: 'error',
      isEnabled: true,
      lastSeen: '1 hour ago',
      batteryLevel: 78
    },
    {
      id: '6',
      name: 'Security Camera',
      type: 'Camera',
      room: 'Front Door',
      connectionType: 'Wi-Fi',
      status: 'online',
      isEnabled: true,
      lastSeen: '30 sec ago',
      firmwareVersion: '2.1.4',
      ipAddress: '192.168.1.103'
    },
    {
      id: '7',
      name: 'Smart Lock',
      type: 'Lock',
      room: 'Front Door',
      connectionType: 'Z-Wave',
      status: 'online',
      isEnabled: true,
      lastSeen: '5 min ago',
      batteryLevel: 92
    },
    {
      id: '8',
      name: 'Motion Sensor',
      type: 'Sensor',
      room: 'Kitchen',
      connectionType: 'Zigbee',
      status: 'online',
      isEnabled: true,
      lastSeen: '2 min ago',
      batteryLevel: 67
    }
  ];

  const rooms = ['all', ...Array.from(new Set(devices.map(d => d.room)))];
  const filteredDevices = selectedRoom === 'all' 
    ? devices 
    : devices.filter(d => d.room === selectedRoom);

  const toggleDeviceExpansion = (deviceId: string) => {
    setExpandedDevices(prev => 
      prev.includes(deviceId) 
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const toggleDeviceEnabled = (deviceId: string) => {
    // Mock toggle functionality
    console.log(`Toggling device ${deviceId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'error': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getConnectionIcon = (type: string) => {
    switch (type) {
      case 'Wi-Fi': return '📶';
      case 'Bluetooth': return '📱';
      case 'Zigbee': return '🕷️';
      case 'Z-Wave': return '🌊';
      default: return '🔗';
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'Apple TV': return '📺';
      case 'Speaker': return '🔊';
      case 'Thermostat': return '🌡️';
      case 'Water Monitor': return '💧';
      case 'Camera': return '📹';
      case 'Lock': return '🔒';
      case 'Sensor': return '📡';
      default: return '📱';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">Device Settings</h2>
        <div className="text-sm text-zinc-500 dark:text-zinc-500">
          {filteredDevices.length} devices
        </div>
      </div>

      {/* Room Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => setSelectedRoom(room)}
            className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedRoom === room
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {room === 'all' ? 'All Rooms' : room}
          </button>
        ))}
      </div>

      {/* Devices List */}
      <div className="space-y-3">
        {filteredDevices.map((device) => {
          const isExpanded = expandedDevices.includes(device.id);
          
          return (
            <div
              key={device.id}
              className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden"
            >
              {/* Device Header */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Device Icon */}
                    <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center">
                      <span className="text-lg">{getDeviceIcon(device.type)}</span>
                    </div>
                    
                    {/* Device Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-zinc-800 dark:text-zinc-200 truncate">
                          {device.name}
                        </h3>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`}></div>
                      </div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-500">
                        {device.type} • {device.room}
                      </div>
                    </div>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center gap-3">
                    {/* Enable/Disable Toggle */}
                    <button
                      onClick={() => toggleDeviceEnabled(device.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        device.isEnabled ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          device.isEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    
                    {/* Expand Button */}
                    <button
                      onClick={() => toggleDeviceExpansion(device.id)}
                      className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                    >
                      {isExpanded ? '▼' : '▶'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-zinc-200 dark:border-zinc-700 p-4 bg-zinc-50 dark:bg-zinc-900/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Connection Info */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-zinc-800 dark:text-zinc-200 text-sm">Connection</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-600 dark:text-zinc-400">Type:</span>
                          <div className="flex items-center gap-1">
                            <span>{getConnectionIcon(device.connectionType)}</span>
                            <span className="text-zinc-800 dark:text-zinc-200">{device.connectionType}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-600 dark:text-zinc-400">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            device.status === 'online' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                            device.status === 'offline' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {device.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-600 dark:text-zinc-400">Last seen:</span>
                          <span className="text-zinc-800 dark:text-zinc-200">{device.lastSeen}</span>
                        </div>
                        {device.ipAddress && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-zinc-600 dark:text-zinc-400">IP Address:</span>
                            <span className="text-zinc-800 dark:text-zinc-200 font-mono text-xs">{device.ipAddress}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Device Info */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-zinc-800 dark:text-zinc-200 text-sm">Device Info</h4>
                      <div className="space-y-2">
                        {device.firmwareVersion && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-zinc-600 dark:text-zinc-400">Firmware:</span>
                            <span className="text-zinc-800 dark:text-zinc-200">{device.firmwareVersion}</span>
                          </div>
                        )}
                        {device.batteryLevel !== undefined && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-zinc-600 dark:text-zinc-400">Battery:</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    device.batteryLevel > 50 ? 'bg-green-500' :
                                    device.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${device.batteryLevel}%` }}
                                ></div>
                              </div>
                              <span className="text-zinc-800 dark:text-zinc-200 text-xs">{device.batteryLevel}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700 flex gap-2">
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">
                      Edit
                    </button>
                    <button className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm font-medium transition-colors">
                      Restart
                    </button>
                    <button className="px-3 py-1.5 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredDevices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-2">No devices found</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            {selectedRoom === 'all' ? 'No devices are currently connected.' : `No devices found in ${selectedRoom}.`}
          </p>
        </div>
      )}
    </div>
  );
} 