import { useState } from "react";

type NavItem = {
  id: string;
  label: string;
  icon: string;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "widgets", label: "Widgets", icon: "⚙️" },
  { id: "electricity", label: "Electricity", icon: "⚡" },
  { id: "player", label: "Player", icon: "🎵" },
  { id: "bills", label: "Bills", icon: "💰" },
  { id: "profile", label: "Profile", icon: "👤" },
];

export default function BottomNavBar() {
  const [activeItem, setActiveItem] = useState("home");

  const handleNavClick = (itemId: string) => {
    setActiveItem(itemId);
    // TODO: Handle navigation logic here
    console.log(`Navigated to: ${itemId}`);
  };

  return (
    <nav className="lg:fixed lg:bottom-0 lg:left-0 lg:right-0 bg-white dark:bg-zinc-800 border-t border-zinc-300 dark:border-zinc-700 shadow-lg lg:shadow-xl z-50">
      <div className="px-2 sm:px-4 py-2 sm:py-3">
        <div className="grid grid-cols-6 gap-1 sm:gap-2">
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
        </div>
      </div>
    </nav>
  );
} 