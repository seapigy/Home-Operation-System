import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EnergyWidget from "./EnergyWidget";
import SceneButtons from "./SceneButtons";
import WidgetLibrary from "./WidgetLibrary";
import AppleTVControlWidget from "./AppleTVControlWidget";
import FloWaterWidget from "./FloWaterWidget";
import MacroButtons from "./MacroButtons";
import { getRoomLayout, saveRoomLayout, type WidgetLayout } from "../utils/storage";

type Widget = {
  id: string;
  type: 'energy' | 'scene' | 'temperature' | 'weather' | 'toggle' | 'media' | 'notes' | 'lighting' | 'security' | 'appletv' | 'flo';
  title: string;
  component: React.ReactNode;
};

type RoomEditorProps = {
  activeRoom: string;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  shouldOpenWidgetLibrary: boolean;
  onWidgetLibraryOpened: () => void;
};

function SortableWidget({ widget, isEditMode, onRemove }: { widget: Widget; isEditMode: boolean; onRemove: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? 'opacity-50' : ''} ${isEditMode ? 'cursor-move' : ''}`}
    >
      {isEditMode && (
        <div className="flex items-center justify-between mb-2 p-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
          <div className="flex items-center gap-2">
            <div
              {...attributes}
              {...listeners}
              className="p-1 cursor-move hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded"
            >
              <svg className="w-4 h-4 text-zinc-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {widget.title}
            </span>
          </div>
          <button
            className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
            onClick={() => onRemove(widget.id)}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
      <div className={isEditMode ? 'pointer-events-none' : ''}>
        {widget.component}
      </div>
    </div>
  );
}

// Helper function to create widget component from layout data
const createWidgetComponent = (widgetLayout: WidgetLayout): React.ReactNode => {
  switch (widgetLayout.id) {
    case 'scene-buttons':
      return <SceneButtons />;
    case 'energy-widget':
      return <EnergyWidget />;
    case 'temperature-card':
      return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Temperature</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-zinc-800 dark:text-zinc-200">72°F</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Target: 70°F</div>
          </div>
        </div>
      );
    case 'media-controls':
      return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-4 sm:p-6">
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
      );
    case 'notes-widget':
      return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Notes</h3>
          <textarea 
            className="w-full p-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 resize-none"
            placeholder="Add a note for this room..."
            rows={4}
          />
          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Save Note</button>
        </div>
      );
    case 'lighting-controls':
      return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-4 sm:p-6">
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
      );
    case 'security-widget':
      return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-4 sm:p-6">
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
      );
    case 'appletv-controls':
      return <AppleTVControlWidget />;
    case 'flo-widget':
      return <FloWaterWidget />;
    case 'macro-buttons':
      return <MacroButtons />;
    default:
      return <div>Unknown widget: {widgetLayout.id}</div>;
  }
};

export default function RoomEditor({ 
  activeRoom, 
  isEditMode, 
  shouldOpenWidgetLibrary,
  onWidgetLibraryOpened
}: RoomEditorProps) {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [isWidgetLibraryOpen, setIsWidgetLibraryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load widgets from localStorage on mount and when room changes
  useEffect(() => {
    const loadWidgets = () => {
      setIsLoading(true);
      try {
        const savedLayout = getRoomLayout(activeRoom);
        const widgetComponents = savedLayout.map((widgetLayout) => ({
          id: widgetLayout.id,
          type: widgetLayout.type,
          title: widgetLayout.title,
          component: createWidgetComponent(widgetLayout)
        }));
        setWidgets(widgetComponents);
      } catch (error) {
        console.error('Failed to load widgets:', error);
        // Fallback to default widgets
        const defaultLayout = getRoomLayout(activeRoom);
        const defaultWidgets = defaultLayout.map((widgetLayout) => ({
          id: widgetLayout.id,
          type: widgetLayout.type,
          title: widgetLayout.title,
          component: createWidgetComponent(widgetLayout)
        }));
        setWidgets(defaultWidgets);
      } finally {
        setIsLoading(false);
      }
    };

    loadWidgets();
  }, [activeRoom]);

  // Save widgets to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && widgets.length > 0) {
      const widgetLayouts: WidgetLayout[] = widgets.map((widget, index) => ({
        id: widget.id,
        type: widget.type,
        title: widget.title,
        visible: true,
        order: index
      }));
      saveRoomLayout(activeRoom, widgetLayouts);
    }
  }, [widgets, activeRoom, isLoading]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleRemoveWidget = (widgetId: string) => {
    setWidgets((items) => items.filter((item) => item.id !== widgetId));
  };

  const handleAddWidget = (widgetData: any) => {
    const newWidget: Widget = {
      id: widgetData.id,
      type: widgetData.id.replace('-widget', '').replace('-', '') as any,
      title: widgetData.name,
      component: widgetData.component
    };
    
    setWidgets((items) => [...items, newWidget]);
  };

  const handleOpenWidgetLibrary = () => {
    setIsWidgetLibraryOpen(true);
  };

  // Watch for shouldOpenWidgetLibrary prop changes
  useEffect(() => {
    if (shouldOpenWidgetLibrary && isEditMode) {
      setIsWidgetLibraryOpen(true);
      onWidgetLibraryOpened();
    }
  }, [shouldOpenWidgetLibrary, isEditMode, onWidgetLibraryOpened]);

  const handleCloseWidgetLibrary = () => {
    setIsWidgetLibraryOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-zinc-600 dark:text-zinc-400">Loading room layout...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
        {/* Header with Room Title */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-zinc-800 dark:text-zinc-200">
            {activeRoom === "Home" ? "Main Widgets" : `${activeRoom} Widgets`}
          </h2>
        </div>

        {/* Edit Mode Instructions */}
        {isEditMode && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>Drag widgets to rearrange, click X to remove, or use the Add Widget button to add new widgets</span>
            </div>
          </div>
        )}

        {/* Add Widget Button - Only show in edit mode */}
        {isEditMode && (
          <div className="mb-4">
            <button
              onClick={handleOpenWidgetLibrary}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 font-medium text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Add Widget</span>
            </button>
          </div>
        )}

        {/* Widgets Container */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={widgets.map((widget) => widget.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4 sm:space-y-6">
              {widgets.map((widget) => (
                <SortableWidget
                  key={widget.id}
                  widget={widget}
                  isEditMode={isEditMode}
                  onRemove={handleRemoveWidget}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Empty State */}
        {widgets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-zinc-400 dark:text-zinc-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-zinc-600 dark:text-zinc-400 mb-2">
              No widgets configured
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              {isEditMode 
                ? 'Use the Add Widget button to add widgets to this room'
                : 'Enable edit mode to add widgets'
              }
            </p>
          </div>
        )}
      </div>

      {/* Widget Library Modal */}
      <WidgetLibrary
        isOpen={isWidgetLibraryOpen}
        onClose={handleCloseWidgetLibrary}
        onAddWidget={handleAddWidget}
        existingWidgetIds={widgets.map(w => w.id)}
      />
    </>
  );
} 