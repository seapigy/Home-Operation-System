import { useState } from "react";

type RoomTabsProps = {
  activeRoom: string;
  setActiveRoom: (room: string) => void;
};

export default function RoomTabs({ activeRoom, setActiveRoom }: RoomTabsProps) {
  const [rooms, setRooms] = useState(["Home", "Living Room", "Kitchen", "Bedroom"]);

  const addRoom = () => {
    const name = prompt("Enter room name:");
    if (name && !rooms.includes(name)) {
      setRooms([...rooms, name]);
      setActiveRoom(name);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 w-full">
      <div className="flex gap-1 sm:gap-2 overflow-x-auto flex-nowrap w-full sm:w-auto pb-1 sm:pb-0 scrollable-widget">
        {rooms.map((room) => (
          <button
            key={room}
            className={`min-w-[80px] sm:min-w-[100px] px-2 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base whitespace-nowrap flex-shrink-0 ${
              room === activeRoom
                ? "bg-blue-600 text-white"
                : "bg-gray-300 dark:bg-zinc-700 text-black dark:text-white"
            }`}
            onClick={() => setActiveRoom(room)}
          >
            {room}
          </button>
        ))}
      </div>
      <button
        onClick={addRoom}
        className="px-2 sm:px-3 py-1.5 sm:py-2 bg-green-500 text-white rounded text-sm sm:text-base whitespace-nowrap flex-shrink-0"
      >
        + Add Room
      </button>
    </div>
  );
} 