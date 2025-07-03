import { useState } from "react";
import TopNavBar from "./components/TopNavBar";
import LeftPanel from "./components/LeftPanel";
import CenterPanel from "./components/CenterPanel";
import RightPanel from "./components/RightPanel";
import BottomNavBar from "./components/BottomNavBar";
import MusicControlWidget from "./components/MusicControlWidget";

export default function App() {
  const [activeRoom, setActiveRoom] = useState("Home");
  const [isEditMode, setIsEditMode] = useState(false);
  const [shouldOpenWidgetLibrary, setShouldOpenWidgetLibrary] = useState(false);
  const [mainTab, setMainTab] = useState("home");

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleWidgetLibraryOpened = () => {
    setShouldOpenWidgetLibrary(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors">
      <TopNavBar activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden lg:pb-20">
        {mainTab === "home" ? (
          <>
            <LeftPanel activeRoom={activeRoom} />
            <CenterPanel 
              activeRoom={activeRoom} 
              isEditMode={isEditMode} 
              onToggleEditMode={handleToggleEditMode}
              shouldOpenWidgetLibrary={shouldOpenWidgetLibrary}
              onWidgetLibraryOpened={handleWidgetLibraryOpened}
            />
            <RightPanel activeRoom={activeRoom} />
          </>
        ) : null}
        {mainTab === "player" && (
          <div className="flex-1 w-full h-full">
            <MusicControlWidget />
          </div>
        )}
      </div>
      <BottomNavBar 
        isEditMode={isEditMode} 
        onToggleEditMode={handleToggleEditMode}
        onOpenWidgetLibrary={() => setShouldOpenWidgetLibrary(true)}
        mainTab={mainTab}
        setMainTab={setMainTab}
      />
    </div>
  );
}
