import RoomTabs from "./RoomTabs";
import ThemeToggle from "./ThemeToggle";

type TopNavBarProps = {
  activeRoom: string;
  setActiveRoom: (room: string) => void;
};

export default function TopNavBar({ activeRoom, setActiveRoom }: TopNavBarProps) {
  const getPageTitle = () => {
    return activeRoom === "Home" ? "Home Overview" : activeRoom;
  };

  return (
    <div className="bg-gray-100 dark:bg-zinc-800 border-b border-zinc-300 dark:border-zinc-700">
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 text-center">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{getPageTitle()}</h1>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3">
        <RoomTabs activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
        <ThemeToggle />
      </div>
    </div>
  );
} 