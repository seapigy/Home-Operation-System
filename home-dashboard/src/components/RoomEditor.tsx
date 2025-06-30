import { useState } from "react";
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
import WaterStatusWidget from "./WaterStatusWidget";
import SceneButtons from "./SceneButtons";

type Widget = {
  id: string;
  type: 'energy' | 'water' | 'scene' | 'temperature' | 'weather' | 'toggle';
  title: string;
  component: React.ReactNode;
};

type RoomEditorProps = {
  activeRoom: string;
  isEditMode: boolean;
  onToggleEditMode: () => void;
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

export default function RoomEditor({ activeRoom, isEditMode, onToggleEditMode }: RoomEditorProps) {
  const [widgets, setWidgets] = useState<Widget[]>(() => {
    // Initialize with default widgets based on room
    if (activeRoom === "Home") {
      return [
        {
          id: 'scene-buttons',
          type: 'scene',
          title: 'Scene Controls',
          component: <SceneButtons />
        },
        {
          id: 'energy-widget',
          type: 'energy',
          title: 'Energy Usage',
          component: <EnergyWidget />
        },
        {
          id: 'water-widget',
          type: 'water',
          title: 'Water Status',
          component: <WaterStatusWidget />
        }
      ];
    } else {
      return [
        {
          id: 'energy-widget',
          type: 'energy',
          title: 'Energy Usage',
          component: <EnergyWidget />
        },
        {
          id: 'water-widget',
          type: 'water',
          title: 'Water Status',
          component: <WaterStatusWidget />
        }
      ];
    }
  });

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

  return (
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
            <span>Drag widgets to rearrange or click the X to remove them</span>
          </div>
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
              ? 'Add widgets to customize your room layout'
              : 'Enable edit mode to add widgets'
            }
          </p>
        </div>
      )}
    </div>
  );
} 