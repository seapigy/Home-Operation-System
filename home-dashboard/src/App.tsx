import { useState } from "react";
import TopNavBar from "./components/TopNavBar";
import LeftPanel from "./components/LeftPanel";
import CenterPanel from "./components/CenterPanel";
import RightPanel from "./components/RightPanel";
import BottomNavBar from "./components/BottomNavBar";
import MusicControlWidget from "./components/MusicControlWidget";
import SystemAlerts from "./components/SystemAlerts";
import MacroButtons from "./components/MacroButtons";
import SystemStatusPanel from "./components/SystemStatusPanel";
import NotificationCenter from "./components/NotificationCenter";
import DeviceSettings from "./components/DeviceSettings";

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
    <div className="h-screen flex flex-col bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors">
      <TopNavBar activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden h-full">
        {mainTab === "home" ? (
          <>
            <div className="flex flex-col h-full w-full lg:w-1/4 lg:min-w-[280px] lg:max-w-sm">
              <LeftPanel 
                activeRoom={activeRoom} 
                isEditMode={isEditMode} 
              />
            </div>
            <div className="flex flex-col h-full flex-1 min-w-0">
              <CenterPanel 
                activeRoom={activeRoom} 
                isEditMode={isEditMode} 
                onToggleEditMode={handleToggleEditMode}
                shouldOpenWidgetLibrary={shouldOpenWidgetLibrary}
                onWidgetLibraryOpened={handleWidgetLibraryOpened}
              />
            </div>
            <div className="flex flex-col h-full w-full lg:w-1/4 lg:min-w-[280px] lg:max-w-sm">
              <RightPanel activeRoom={activeRoom} />
            </div>
          </>
        ) : null}
        {mainTab === "player" && (
          <div className="flex-1 w-full h-full">
            <MusicControlWidget />
          </div>
        )}
        {mainTab === "settings" && (
          <div className="flex-1 w-full h-full p-6 overflow-y-auto">
            <DeviceSettings />
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

      {/* Floating Components */}
      <SystemAlerts />
      <SystemStatusPanel />
      <div className="fixed top-4 left-4 z-40">
        <NotificationCenter />
      </div>
    </div>
  );
}
