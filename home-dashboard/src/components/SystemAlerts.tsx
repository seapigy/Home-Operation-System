import React, { useState } from 'react';

interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  title: string;
  message: string;
  timestamp: string;
  device?: string;
  isActive: boolean;
}

interface SystemAlertsProps {
  className?: string;
}

export default function SystemAlerts({ className = "" }: SystemAlertsProps) {
  const [showAlertLog, setShowAlertLog] = useState(false);

  // Mock alerts data
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'critical',
      title: 'Low PSI Detected',
      message: 'Water pressure below normal levels in main line',
      timestamp: '2 min ago',
      device: 'Flo by Moen',
      isActive: true
    },
    {
      id: '2',
      type: 'warning',
      title: 'Wi-Fi Disconnected',
      message: 'Living Room TV lost connection to network',
      timestamp: '5 min ago',
      device: 'Living Room TV',
      isActive: true
    },
    {
      id: '3',
      type: 'warning',
      title: 'Device Offline',
      message: 'Kitchen Speaker not responding',
      timestamp: '12 min ago',
      device: 'Kitchen Speaker',
      isActive: true
    },
    {
      id: '4',
      type: 'info',
      title: 'Alarm Armed',
      message: 'Security system activated in Away mode',
      timestamp: '1 hour ago',
      device: 'Security System',
      isActive: false
    },
    {
      id: '5',
      type: 'info',
      title: 'Temperature Alert',
      message: 'Bedroom temperature set to 72°F',
      timestamp: '2 hours ago',
      device: 'Ecobee Thermostat',
      isActive: false
    }
  ];

  const activeAlerts = alerts.filter(alert => alert.isActive);
  const criticalAlerts = activeAlerts.filter(alert => alert.type === 'critical');
  const warningAlerts = activeAlerts.filter(alert => alert.type === 'warning');

  const getSystemStatus = () => {
    if (criticalAlerts.length > 0) return 'critical';
    if (warningAlerts.length > 0) return 'warning';
    return 'ok';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'ok': return 'bg-green-500';
      default: return 'bg-green-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'critical': return 'Critical';
      case 'warning': return 'Warning';
      case 'ok': return 'OK';
      default: return 'OK';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800';
      case 'warning': return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'info': return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800';
      default: return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800';
    }
  };

  const systemStatus = getSystemStatus();

  return (
    <>
      {/* Floating Alert Badge */}
      <button
        onClick={() => setShowAlertLog(true)}
        className={`fixed top-4 right-4 z-40 flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-800 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-700 transition-all duration-200 ${className}`}
      >
        {/* Status Indicator */}
        <div className={`w-3 h-3 rounded-full ${getStatusColor(systemStatus)}`}></div>
        
        {/* Alert Count */}
        {activeAlerts.length > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {activeAlerts.length}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              {activeAlerts.length === 1 ? 'Alert' : 'Alerts'}
            </span>
          </div>
        )}
        
        {/* Status Text */}
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {getStatusText(systemStatus)}
        </span>
        
        {/* Alert Icon */}
        {activeAlerts.length > 0 && (
          <span className="text-lg">
            {criticalAlerts.length > 0 ? '🚨' : '⚠️'}
          </span>
        )}
      </button>

      {/* Alert Log Modal */}
      {showAlertLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 max-w-md w-full max-h-[80vh] flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-center mb-2">System Alerts</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                {activeAlerts.length} active alerts
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${getAlertColor(alert.type)} ${
                    !alert.isActive ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{getAlertIcon(alert.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-zinc-800 dark:text-zinc-200 text-sm">
                          {alert.title}
                        </h4>
                        <span className="text-xs text-zinc-500 dark:text-zinc-500">
                          {alert.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                        {alert.message}
                      </p>
                      {alert.device && (
                        <div className="text-xs text-zinc-500 dark:text-zinc-500">
                          Device: {alert.device}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setShowAlertLog(false)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 