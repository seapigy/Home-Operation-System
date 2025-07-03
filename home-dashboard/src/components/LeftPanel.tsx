import { useState, useEffect } from "react";
import TemperatureCard from "./TemperatureCard";
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

type EcobeeWidget = {
  id: string;
  roomName: string;
  currentTemp: number;
  targetTemp: number;
  mode: "Heat" | "Cool" | "Off";
  humidity: number;
};

type LeftPanelProps = {
  activeRoom: string;
  isEditMode: boolean;
};

// Available room names for Ecobee widgets
const availableRooms = [
  "Living Room",
  "Bedroom", 
  "Kitchen",
  "Office",
  "Basement",
  "Garage",
  "Dining Room",
  "Family Room",
  "Master Bedroom",
  "Guest Room"
];

// Generate unique room names for new Ecobee widgets
const getNextAvailableRoom = (existingRooms: string[]): string => {
  for (const room of availableRooms) {
    if (!existingRooms.includes(room)) {
      return room;
    }
  }
  // If all rooms are used, add a number
  let counter = 1;
  while (existingRooms.includes(`Room ${counter}`)) {
    counter++;
  }
  return `Room ${counter}`;
};

// Generate mock data for a room
const generateMockData = (roomName: string): Omit<EcobeeWidget, 'id'> => {
  const modes: Array<"Heat" | "Cool" | "Off"> = ["Heat", "Cool", "Off"];
  return {
    roomName,
    currentTemp: Math.floor(Math.random() * 20) + 65, // 65-85°F
    targetTemp: Math.floor(Math.random() * 10) + 70, // 70-80°F
    mode: modes[Math.floor(Math.random() * modes.length)],
    humidity: Math.floor(Math.random() * 30) + 35, // 35-65%
  };
};

function SortableEcobeeWidget({ 
  widget, 
  isEditMode, 
  onRemove, 
  onUpdate 
}: { 
  widget: EcobeeWidget; 
  isEditMode: boolean; 
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<EcobeeWidget>) => void;
}) {
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
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${isEditMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
      {...attributes}
      {...listeners}
    >
      <TemperatureCard
        roomName={widget.roomName}
        currentTemp={widget.currentTemp}
        targetTemp={widget.targetTemp}
        mode={widget.mode}
        humidity={widget.humidity}
      />
      
      {isEditMode && (
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(widget.id);
            }}
            className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            title="Remove Ecobee widget"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default function LeftPanel({ activeRoom, isEditMode }: LeftPanelProps) {
  const [ecobeeWidgets, setEcobeeWidgets] = useState<EcobeeWidget[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load Ecobee widgets from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`ecobee-widgets-${activeRoom}`);
    if (saved) {
      try {
        setEcobeeWidgets(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load Ecobee widgets:', error);
        setEcobeeWidgets([]);
      }
    } else {
      // Set default widgets for Home
      if (activeRoom === "Home") {
        const defaultWidgets: EcobeeWidget[] = [
          {
            id: 'ecobee-living-room',
            ...generateMockData('Living Room')
          },
          {
            id: 'ecobee-bedroom',
            ...generateMockData('Bedroom')
          },
          {
            id: 'ecobee-kitchen',
            ...generateMockData('Kitchen')
          }
        ];
        setEcobeeWidgets(defaultWidgets);
      } else {
        setEcobeeWidgets([]);
      }
    }
  }, [activeRoom]);

  // Save Ecobee widgets to localStorage
  useEffect(() => {
    if (ecobeeWidgets.length > 0) {
      localStorage.setItem(`ecobee-widgets-${activeRoom}`, JSON.stringify(ecobeeWidgets));
    } else {
      localStorage.removeItem(`ecobee-widgets-${activeRoom}`);
    }
  }, [ecobeeWidgets, activeRoom]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setEcobeeWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleRemoveWidget = (widgetId: string) => {
    setEcobeeWidgets((items) => items.filter((item) => item.id !== widgetId));
  };

  const handleAddEcobeeWidget = () => {
    console.log('handleAddEcobeeWidget called, current count:', ecobeeWidgets.length);
    
    const existingRooms = ecobeeWidgets.map(w => w.roomName);
    const newRoomName = getNextAvailableRoom(existingRooms);
    const newWidget: EcobeeWidget = {
      id: `ecobee-${Date.now()}`,
      ...generateMockData(newRoomName)
    };
    
    console.log('Adding new Ecobee widget:', newWidget);
    setEcobeeWidgets((items) => [...items, newWidget]);
    
    // Auto-scroll to the new widget after it's added
    setTimeout(() => {
      const scrollContainer = document.querySelector('.left-panel-scroll');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }, 100);
  };

  // Listen for Ecobee widget additions from the center panel's Widget Library
  useEffect(() => {
    const handleEcobeeWidgetAdd = (event: CustomEvent) => {
      console.log('LeftPanel received Ecobee widget add event:', event.detail);
      console.log('Current Ecobee count:', ecobeeWidgets.length);
      if (event.detail.widgetId === 'ecobee-widget') {
        console.log('Adding Ecobee widget to left panel');
        handleAddEcobeeWidget();
      }
    };

    window.addEventListener('ecobee-widget-add' as any, handleEcobeeWidgetAdd);
    return () => {
      window.removeEventListener('ecobee-widget-add' as any, handleEcobeeWidgetAdd);
    };
  }, [ecobeeWidgets.length, handleAddEcobeeWidget]);

  const handleUpdateWidget = (id: string, updates: Partial<EcobeeWidget>) => {
    setEcobeeWidgets((items) => 
      items.map((item) => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const getEcobeeWidgetsToShow = () => {
    if (activeRoom === "Home") {
      return ecobeeWidgets;
    }
    return ecobeeWidgets.filter(widget => widget.roomName === activeRoom);
  };

  const widgetsToShow = getEcobeeWidgetsToShow();

  return (
    <div className="w-full lg:border-r lg:border-zinc-300 lg:dark:border-zinc-700 flex flex-col h-full">
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-3 sm:p-4 pb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold">Temperature Controls</h2>
          {isEditMode && (
            <button
              onClick={handleAddEcobeeWidget}
              className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title="Add Ecobee widget"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar left-panel-scroll">
        <div className="px-3 sm:px-4 pb-3 sm:pb-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={widgetsToShow.map((widget) => widget.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3 sm:space-y-4">
              {widgetsToShow.map((widget) => (
                <SortableEcobeeWidget
                  key={widget.id}
                  widget={widget}
                  isEditMode={isEditMode}
                  onRemove={handleRemoveWidget}
                  onUpdate={handleUpdateWidget}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Empty State */}
        {widgetsToShow.length === 0 && (
          <div className="text-center py-8">
            <div className="text-zinc-400 dark:text-zinc-500 mb-3">
              <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {isEditMode ? "No Ecobee widgets configured" : "No temperature controls"}
            </p>
            {isEditMode && (
              <button
                onClick={handleAddEcobeeWidget}
                className="mt-3 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                Add Ecobee Widget
              </button>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
} 