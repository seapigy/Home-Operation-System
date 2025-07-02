export type WidgetLayout = {
  id: string;
  type: 'energy' | 'scene' | 'temperature' | 'weather' | 'toggle' | 'media' | 'notes' | 'lighting' | 'security' | 'appletv' | 'flo';
  title: string;
  visible: boolean;
  order: number;
};

export type RoomLayout = {
  roomName: string;
  widgets: WidgetLayout[];
  lastUpdated: string;
};

const STORAGE_KEY = 'home-dashboard-room-layouts';

// Default widget layouts for each room
export const getDefaultLayout = (roomName: string): WidgetLayout[] => {
  if (roomName === "Home") {
    return [
      {
        id: 'scene-buttons',
        type: 'scene',
        title: 'Scene Controls',
        visible: true,
        order: 0
      },
      {
        id: 'energy-widget',
        type: 'energy',
        title: 'Energy Usage',
        visible: true,
        order: 1
      },
      {
        id: 'flo-widget',
        type: 'flo',
        title: 'Flo by Moen',
        visible: true,
        order: 2
      }
    ];
  } else {
    return [
      {
        id: 'energy-widget',
        type: 'energy',
        title: 'Energy Usage',
        visible: true,
        order: 0
      }
    ];
  }
};

// Save room layout to localStorage
export const saveRoomLayout = (roomName: string, widgets: WidgetLayout[]): void => {
  try {
    const existingData = getAllRoomLayouts();
    const updatedData = {
      ...existingData,
      [roomName]: {
        roomName,
        widgets,
        lastUpdated: new Date().toISOString()
      }
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Failed to save room layout:', error);
  }
};

// Get room layout from localStorage
export const getRoomLayout = (roomName: string): WidgetLayout[] => {
  try {
    const allLayouts = getAllRoomLayouts();
    const roomLayout = allLayouts[roomName];
    
    if (roomLayout && roomLayout.widgets) {
      // Filter out any water-widget entries that might still exist in old data
      const filteredWidgets = roomLayout.widgets.filter(widget => widget.id !== 'water-widget');
      
      // If we filtered out water-widget, save the cleaned layout
      if (filteredWidgets.length !== roomLayout.widgets.length) {
        const cleanedLayout = {
          ...roomLayout,
          widgets: filteredWidgets.map((widget, index) => ({ ...widget, order: index }))
        };
        saveRoomLayout(roomName, cleanedLayout.widgets);
        return cleanedLayout.widgets.sort((a, b) => a.order - b.order);
      }
      
      // Sort widgets by order
      return filteredWidgets.sort((a, b) => a.order - b.order);
    }
    
    // Return default layout if no saved layout exists
    return getDefaultLayout(roomName);
  } catch (error) {
    console.error('Failed to get room layout:', error);
    return getDefaultLayout(roomName);
  }
};

// Get all room layouts from localStorage
export const getAllRoomLayouts = (): Record<string, RoomLayout> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Failed to get all room layouts:', error);
    return {};
  }
};

// Remove room layout from localStorage
export const removeRoomLayout = (roomName: string): void => {
  try {
    const existingData = getAllRoomLayouts();
    delete existingData[roomName];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
  } catch (error) {
    console.error('Failed to remove room layout:', error);
  }
};

// Clear all room layouts from localStorage
export const clearAllRoomLayouts = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear room layouts:', error);
  }
};

// Check if a room has a saved layout
export const hasRoomLayout = (roomName: string): boolean => {
  try {
    const allLayouts = getAllRoomLayouts();
    return !!allLayouts[roomName];
  } catch (error) {
    console.error('Failed to check room layout:', error);
    return false;
  }
};

// Get the last updated timestamp for a room
export const getRoomLastUpdated = (roomName: string): string | null => {
  try {
    const allLayouts = getAllRoomLayouts();
    const roomLayout = allLayouts[roomName];
    return roomLayout?.lastUpdated || null;
  } catch (error) {
    console.error('Failed to get room last updated:', error);
    return null;
  }
}; 