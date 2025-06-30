import SceneButtons from "./SceneButtons";

type CenterPanelProps = {
  activeRoom: string;
};

export default function CenterPanel({ activeRoom }: CenterPanelProps) {
  return (
    <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
      {activeRoom === "Home" && <SceneButtons />}
      <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
        {activeRoom === "Home" ? "Main Widgets" : `${activeRoom} Widgets`}
      </h2>
      <div className="h-48 sm:h-60 bg-gray-200 dark:bg-zinc-800 rounded p-3 sm:p-4 mb-3 sm:mb-4">[Energy Usage Widget]</div>
      <div className="h-32 sm:h-40 bg-gray-200 dark:bg-zinc-800 rounded p-3 sm:p-4">[Water Status Widget]</div>
    </div>
  );
} 