import { useState } from "react";

type NavItem = {
  id: string;
  label: string;
  icon: string;
};

type BottomNavBarProps = {
  activeRoom: string;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onAddWidget: () => void;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "widgets", label: "Widgets", icon: "⚙️" },
  { id: "electricity", label: "Electricity", icon: "⚡" },
  { id: "player", label: "Player", icon: "🎵" },
  { id: "bills", label: "Bills", icon: "💰" },
  { id: "profile", label: "Profile", icon: "👤" },
];

export default function BottomNavBar({ activeRoom, isEditMode, onToggleEditMode, onAddWidget }: BottomNavBarProps) {
  const [activeItem, setActiveItem] = useState("home");

  const handleNavClick = (itemId: string) => {
    setActiveItem(itemId);
    // TODO: Handle navigation logic here
    console.log(`Navigated to: ${itemId}`);
  };

  const showEditButton = activeRoom !== "Home";
  const showAddWidgetButton = isEditMode;

  return (
    <nav className="lg:fixed lg:bottom-0 lg:left-0 lg:right-0 bg-white dark:bg-zinc-800 border-t border-zinc-300 dark:border-zinc-700 shadow-lg lg:shadow-xl z-50">
      <div className="px-2 sm:px-4 py-2 sm:py-3">
        <div className={`grid gap-1 sm:gap-2 ${
          showEditButton || showAddWidgetButton ? 'grid-cols-7' : 'grid-cols-6'
        }`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 sm:px-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 ${
                activeItem === item.id
                  ? "bg-zinc-200 dark:bg-zinc-600 text-zinc-800 dark:text-zinc-200 font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700/50"
              }`}
              aria-label={item.label}
            >
              <span className="text-lg sm:text-xl mb-1">{item.icon}</span>
              <span className="text-xs sm:text-sm font-medium truncate w-full text-center">
                {item.label}
              </span>
            </button>
          ))}
          
          {/* Add Widget Button - Only show in edit mode */}
          {showAddWidgetButton && (
            <button
              onClick={onAddWidget}
              className="flex flex-col items-center justify-center py-2 px-1 sm:px-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 bg-purple-600 text-white hover:bg-purple-700 font-semibold"
              aria-label="Add Widget"
            >
              <span className="text-lg sm:text-xl mb-1">➕</span>
              <span className="text-xs sm:text-sm font-medium truncate w-full text-center">
                Add
              </span>
            </button>
          )}
          
          {/* Edit/Done Button - Only show for specific rooms */}
          {showEditButton && (
            <button
              onClick={onToggleEditMode}
              className={`flex flex-col items-center justify-center py-2 px-1 sm:px-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 ${
                isEditMode
                  ? "bg-green-600 text-white hover:bg-green-700 font-semibold"
                  : "bg-blue-600 text-white hover:bg-blue-700 font-semibold"
              }`}
              aria-label={isEditMode ? "Done" : "Edit Layout"}
            >
              <span className="text-lg sm:text-xl mb-1">
                {isEditMode ? "✓" : "✏️"}
              </span>
              <span className="text-xs sm:text-sm font-medium truncate w-full text-center">
                {isEditMode ? "Done" : "Edit"}
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
} 