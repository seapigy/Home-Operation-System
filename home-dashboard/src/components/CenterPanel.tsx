import SceneButtons from "./SceneButtons";
import EnergyWidget from "./EnergyWidget";
import WaterStatusWidget from "./WaterStatusWidget";

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
      
      <div className="space-y-4 sm:space-y-6">
        <EnergyWidget />
        <WaterStatusWidget />
      </div>
    </div>
  );
} 