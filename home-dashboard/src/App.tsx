import { useState } from "react";
import TopNavBar from "./components/TopNavBar";
import LeftPanel from "./components/LeftPanel";
import CenterPanel from "./components/CenterPanel";
import RightPanel from "./components/RightPanel";
import BottomNavBar from "./components/BottomNavBar";

export default function App() {
  const [activeRoom, setActiveRoom] = useState("Home");
  const [isEditMode, setIsEditMode] = useState(false);
  const [shouldOpenWidgetLibrary, setShouldOpenWidgetLibrary] = useState(false);

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleAddWidget = () => {
    if (isEditMode) {
      setShouldOpenWidgetLibrary(true);
    }
  };

  const handleWidgetLibraryOpened = () => {
    setShouldOpenWidgetLibrary(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors">
      <TopNavBar activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden lg:pb-20">
        <LeftPanel activeRoom={activeRoom} />
        <CenterPanel 
          activeRoom={activeRoom} 
          isEditMode={isEditMode} 
          onToggleEditMode={handleToggleEditMode}
          onAddWidget={handleAddWidget}
          shouldOpenWidgetLibrary={shouldOpenWidgetLibrary}
          onWidgetLibraryOpened={handleWidgetLibraryOpened}
        />
        <RightPanel />
      </div>
      <BottomNavBar 
        activeRoom={activeRoom} 
        isEditMode={isEditMode} 
        onToggleEditMode={handleToggleEditMode}
        onAddWidget={handleAddWidget}
      />
    </div>
  );
}
