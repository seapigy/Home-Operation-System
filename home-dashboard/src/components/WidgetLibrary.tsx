import { useState } from "react";
import EnergyWidget from "./EnergyWidget";
import WaterStatusWidget from "./WaterStatusWidget";
import SceneButtons from "./SceneButtons";
import TemperatureCard from "./TemperatureCard";

type WidgetType = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'monitoring' | 'control' | 'media' | 'utility';
  component: React.ReactNode;
};

type WidgetLibraryProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddWidget: (widget: WidgetType) => void;
  existingWidgetIds: string[];
};

const availableWidgets: WidgetType[] = [
  {
    id: 'energy-widget',
    name: 'Energy Usage',
    description: 'Monitor electricity consumption and costs',
    icon: '⚡',
    category: 'monitoring',
    component: <EnergyWidget />
  },
  {
    id: 'water-widget',
    name: 'Water Status',
    description: 'Track water usage and leak detection',
    icon: '💧',
    category: 'monitoring',
    component: <WaterStatusWidget />
  },
  {
    id: 'scene-buttons',
    name: 'Scene Controls',
    description: 'Quick access to room scenes and presets',
    icon: '🎭',
    category: 'control',
    component: <SceneButtons />
  },
  {
    id: 'temperature-card',
    name: 'Temperature',
    description: 'Control thermostat and view temperature',
    icon: '🌡️',
    category: 'control',
    component: <TemperatureCard 
      roomName="Living Room"
      currentTemp={72}
      targetTemp={70}
      mode="Cool"
      humidity={45}
    />
  },
  {
    id: 'media-controls',
    name: 'Media Controls',
    description: 'Control music, TV, and entertainment',
    icon: '🎵',
    category: 'media',
    component: <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Media Controls</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-700 rounded-lg">
          <span className="text-zinc-700 dark:text-zinc-300">Living Room TV</span>
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Power</button>
        </div>
        <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-700 rounded-lg">
          <span className="text-zinc-700 dark:text-zinc-300">Kitchen Speaker</span>
          <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">Play</button>
        </div>
      </div>
    </div>
  },
  {
    id: 'notes-widget',
    name: 'Notes',
    description: 'Quick notes and reminders for the room',
    icon: '📝',
    category: 'utility',
    component: <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Notes</h3>
      <textarea 
        className="w-full p-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 resize-none"
        placeholder="Add a note for this room..."
        rows={4}
      />
      <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Save Note</button>
    </div>
  },
  {
    id: 'lighting-controls',
    name: 'Lighting',
    description: 'Control room lights and brightness',
    icon: '💡',
    category: 'control',
    component: <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Lighting Controls</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-zinc-700 dark:text-zinc-300">Main Lights</span>
          <button className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">On</button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-700 dark:text-zinc-300">Ambient</span>
          <div className="w-20 h-2 bg-zinc-300 dark:bg-zinc-600 rounded-full">
            <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  },
  {
    id: 'security-widget',
    name: 'Security',
    description: 'Monitor security cameras and alarms',
    icon: '🔒',
    category: 'monitoring',
    component: <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Security Status</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <span className="text-xl">✅</span>
          <span className="text-sm">System Armed</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
          <span className="text-xl">📹</span>
          <span className="text-sm">3 cameras active</span>
        </div>
      </div>
    </div>
  }
];

const categoryLabels = {
  monitoring: 'Monitoring',
  control: 'Control',
  media: 'Media',
  utility: 'Utility'
};

export default function WidgetLibrary({ isOpen, onClose, onAddWidget, existingWidgetIds }: WidgetLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'monitoring' | 'control' | 'media' | 'utility'>('all');

  if (!isOpen) return null;

  const filteredWidgets = selectedCategory === 'all' 
    ? availableWidgets 
    : availableWidgets.filter(widget => widget.category === selectedCategory);

  const availableWidgetsToShow = filteredWidgets.filter(widget => !existingWidgetIds.includes(widget.id));

  const handleAddWidget = (widget: WidgetType) => {
    onAddWidget(widget);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-200 dark:border-zinc-700">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
            Add Widget
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Category Filter */}
        <div className="p-4 sm:p-6 border-b border-zinc-200 dark:border-zinc-700">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600'
              }`}
            >
              All
            </button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as any)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Widget List */}
        <div className="overflow-y-auto max-h-[60vh] p-4 sm:p-6">
          {availableWidgetsToShow.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-zinc-400 dark:text-zinc-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                No widgets available
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                All available widgets are already added to this room
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableWidgetsToShow.map((widget) => (
                <button
                  key={widget.id}
                  onClick={() => handleAddWidget(widget)}
                  className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors text-left group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{widget.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {widget.name}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                        {widget.description}
                      </p>
                      <span className="inline-block mt-2 px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded">
                        {categoryLabels[widget.category]}
                      </span>
                    </div>
                    <svg className="w-5 h-5 text-zinc-400 group-hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 