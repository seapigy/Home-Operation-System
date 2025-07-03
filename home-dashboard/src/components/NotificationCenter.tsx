import React, { useState } from 'react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  device?: string;
  isRead: boolean;
  canDismiss: boolean;
}

interface NotificationCenterProps {
  className?: string;
}

export default function NotificationCenter({ className = "" }: NotificationCenterProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'info',
      title: 'SONOS turned off',
      message: 'Living Room speaker was powered down',
      timestamp: '9:14 AM',
      device: 'Sonos',
      isRead: false,
      canDismiss: true
    },
    {
      id: '2',
      type: 'success',
      title: 'Apple TV launched YouTube',
      message: 'YouTube app started successfully',
      timestamp: '9:01 AM',
      device: 'Apple TV',
      isRead: false,
      canDismiss: true
    },
    {
      id: '3',
      type: 'success',
      title: 'Alarm armed',
      message: 'Security system activated in Away mode',
      timestamp: '8:30 AM',
      device: 'Security System',
      isRead: true,
      canDismiss: false
    },
    {
      id: '4',
      type: 'warning',
      title: 'Temperature alert',
      message: 'Bedroom temperature dropped below 65°F',
      timestamp: '8:15 AM',
      device: 'Ecobee Thermostat',
      isRead: false,
      canDismiss: true
    },
    {
      id: '5',
      type: 'info',
      title: 'Motion detected',
      message: 'Front door camera detected movement',
      timestamp: '8:00 AM',
      device: 'Security Camera',
      isRead: true,
      canDismiss: true
    },
    {
      id: '6',
      type: 'success',
      title: 'Lights turned on',
      message: 'Kitchen lights activated by motion sensor',
      timestamp: '7:45 AM',
      device: 'Smart Lights',
      isRead: true,
      canDismiss: true
    },
    {
      id: '7',
      type: 'error',
      title: 'Wi-Fi disconnected',
      message: 'Kitchen Speaker lost network connection',
      timestamp: '7:30 AM',
      device: 'Kitchen Speaker',
      isRead: false,
      canDismiss: true
    },
    {
      id: '8',
      type: 'info',
      title: 'System startup',
      message: 'Home automation system initialized',
      timestamp: '7:00 AM',
      device: 'System',
      isRead: true,
      canDismiss: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800';
      case 'warning': return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'error': return 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800';
      case 'info': return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800';
      default: return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications(prev => prev.filter(n => !n.canDismiss));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  return (
    <>
      {/* Notification Bell Button */}
      <button
        onClick={() => setShowNotifications(true)}
        className={`relative flex items-center justify-center w-10 h-10 bg-white dark:bg-zinc-800 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-700 transition-all duration-200 ${className}`}
      >
        <span className="text-lg">🔔</span>
        
        {/* Unread Badge */}
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </button>

      {/* Notification Center Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 max-w-md w-full max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {unreadCount} unread notifications
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Mark all read
                  </button>
                  <button
                    onClick={clearAll}
                    className="text-xs text-red-600 dark:text-red-400 hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            </div>
            
            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔔</div>
                  <h4 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-2">No notifications</h4>
                  <p className="text-zinc-600 dark:text-zinc-400">You're all caught up!</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      getNotificationColor(notification.type)
                    } ${!notification.isRead ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-medium text-sm ${
                            !notification.isRead ? 'text-zinc-800 dark:text-zinc-200' : 'text-zinc-600 dark:text-zinc-400'
                          }`}>
                            {notification.title}
                          </h4>
                          <span className="text-xs text-zinc-500 dark:text-zinc-500">
                            {notification.timestamp}
                          </span>
                        </div>
                        
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                          {notification.message}
                        </p>
                        
                        {notification.device && (
                          <div className="text-xs text-zinc-500 dark:text-zinc-500">
                            Device: {notification.device}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Mark read
                          </button>
                        )}
                        
                        {notification.canDismiss && (
                          <button
                            onClick={() => dismissNotification(notification.id)}
                            className="text-xs text-red-600 dark:text-red-400 hover:underline"
                          >
                            Dismiss
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
              <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
                <span>Total: {notifications.length} notifications</span>
                <span>Unread: {unreadCount}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 