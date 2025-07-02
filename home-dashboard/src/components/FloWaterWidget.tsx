import { useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

type ActivityLogEntry = {
  id: string;
  message: string;
  time: string;
  type: 'success' | 'warning' | 'alert' | 'info';
  icon: string;
};

export default function FloWaterWidget() {
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [systemStatus] = useState<'SECURE' | 'ALERT'>('SECURE');

  // Animated values and mock value change logic
  const [psi, setPsi] = useState(62);
  const [flow, setFlow] = useState(1.4);
  const [temp, setTemp] = useState(72);

  // For animation
  const psiMotion = useMotionValue(62);
  const flowMotion = useMotionValue(1.4);
  const tempMotion = useMotionValue(72);

  // Animate on value change
  useEffect(() => {
    const controls = animate(psiMotion, psi, { duration: 0.5 });
    return controls.stop;
  }, [psi, psiMotion]);
  useEffect(() => {
    const controls = animate(flowMotion, flow, { duration: 0.5 });
    return controls.stop;
  }, [flow, flowMotion]);
  useEffect(() => {
    const controls = animate(tempMotion, temp, { duration: 0.5 });
    return controls.stop;
  }, [temp, tempMotion]);

  // Simulate value changes for demo (every 5–7 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setPsi(Math.round(Math.random() * (85 - 30) + 30));
      setFlow(Number((Math.random() * (3.0 - 0.5) + 0.5).toFixed(1)));
      setTemp(Math.round(Math.random() * (90 - 45) + 45));
    }, Math.round(Math.random() * 2000) + 5000); // 5–7 seconds
    return () => clearInterval(interval);
  }, []);

  // Highlight logic
  const psiColor = psi > 75 ? "text-red-500" : psi < 40 ? "text-yellow-500" : "text-zinc-800 dark:text-zinc-200";
  const flowColor = flow > 2.0 ? "text-red-500" : "text-zinc-800 dark:text-zinc-200";
  const tempColor = temp > 85 || temp < 50 ? "text-orange-500" : "text-zinc-800 dark:text-zinc-200";

  const handlePowerToggle = () => {
    setIsPoweredOn(!isPoweredOn);
    console.log(`Flo System ${isPoweredOn ? 'Off' : 'On'}`);
  };

  const activityLog: ActivityLogEntry[] = [
    {
      id: '1',
      message: "Shutoff triggered - Flow rate exceeded safety threshold",
      time: "1 hour ago",
      type: 'alert',
      icon: '🛑'
    },
    {
      id: '2',
      message: "Flow rate monitoring - Usage pattern detected",
      time: "3 hours ago",
      type: 'warning',
      icon: '⚠️'
    },
    {
      id: '3',
      message: "Manual system check completed - All systems operational",
      time: "1 day ago",
      type: 'success',
      icon: '✅'
    },
    {
      id: '4',
      message: "Scheduled maintenance completed - Filters replaced",
      time: "2 days ago",
      type: 'success',
      icon: '🔧'
    },
    {
      id: '5',
      message: "Pressure reading - 62 PSI (optimal range)",
      time: "3 days ago",
      type: 'info',
      icon: '📊'
    },
    {
      id: '6',
      message: "Temperature reading - 72°F (normal)",
      time: "4 days ago",
      type: 'info',
      icon: '🌡️'
    }
  ];

  const getStatusColor = (type: ActivityLogEntry['type']) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50 dark:bg-green-900/10';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10';
      case 'alert':
        return 'border-l-red-500 bg-red-50 dark:bg-red-900/10';
      case 'info':
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/10';
      default:
        return 'border-l-zinc-300 dark:border-l-zinc-600 bg-zinc-50 dark:bg-zinc-700/30';
    }
  };

  const getStatusTextColor = (type: ActivityLogEntry['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-700 dark:text-green-300';
      case 'warning':
        return 'text-yellow-700 dark:text-yellow-300';
      case 'alert':
        return 'text-red-700 dark:text-red-300';
      case 'info':
        return 'text-blue-700 dark:text-blue-300';
      default:
        return 'text-zinc-700 dark:text-zinc-300';
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-4 sm:p-6">
      {/* Header with Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
          <span className="text-xl">💧</span>
          Flo by Moen
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          systemStatus === 'SECURE' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {systemStatus}
        </span>
      </div>

      {/* Key Data Readouts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-zinc-50 dark:bg-zinc-700 rounded-lg">
          <motion.div 
            className={`text-2xl font-bold transition-colors duration-300 ${psiColor}`}
            animate={{ color: undefined }}
          >
            {Math.round(psi)}
          </motion.div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">PSI</div>
        </div>
        <div className="text-center p-3 bg-zinc-50 dark:bg-zinc-700 rounded-lg">
          <motion.div 
            className={`text-2xl font-bold transition-colors duration-300 ${flowColor}`}
            animate={{ color: undefined }}
          >
            {flow.toFixed(1)}
          </motion.div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">gal/min</div>
        </div>
        <div className="text-center p-3 bg-zinc-50 dark:bg-zinc-700 rounded-lg">
          <motion.div 
            className={`text-2xl font-bold transition-colors duration-300 ${tempColor}`}
            animate={{ color: undefined }}
          >
            {Math.round(temp)}°F
          </motion.div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">Temperature</div>
        </div>
      </div>

      {/* Most Recent Alert */}
      {activityLog.length > 0 && (
        <div className={`mb-4 p-3 rounded-lg border-l-4 shadow-sm ${getStatusColor(activityLog[0].type)}`}>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 text-lg">
              {activityLog[0].icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium ${getStatusTextColor(activityLog[0].type)}`}>
                {activityLog[0].message}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <span className="text-xs">🕒</span>
                  {activityLog[0].time}
                </span>
                <span className="w-1 h-1 bg-zinc-400 dark:bg-zinc-500 rounded-full"></span>
                <span className="capitalize">{activityLog[0].type}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Power Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        <button
          onClick={handlePowerToggle}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105 active:scale-95 ${
            isPoweredOn 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg' 
              : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="text-sm">⚡</span>
            {isPoweredOn ? 'Turn Off' : 'Turn On'}
          </span>
        </button>
      </div>

      {/* Collapsible Details Section */}
      {showDetails && (
        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <span className="text-lg">📋</span>
              Activity Log
            </h4>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-700 px-2 py-1 rounded-full">
              {activityLog.length} entries
            </span>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
            {activityLog.map((log) => (
              <div 
                key={log.id} 
                className={`relative rounded-lg p-3 border-l-4 shadow-sm hover:shadow-md transition-all duration-200 ${getStatusColor(log.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 text-lg mt-0.5">
                    {log.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${getStatusTextColor(log.type)}`}>
                      {log.message}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <span className="text-xs">🕒</span>
                        {log.time}
                      </span>
                      <span className="w-1 h-1 bg-zinc-400 dark:bg-zinc-500 rounded-full"></span>
                      <span className="capitalize">{log.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
              <button className="text-blue-600 dark:text-blue-400 hover:underline">
                View Full Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 