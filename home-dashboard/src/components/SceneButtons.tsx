export default function SceneButtons() {
  const scenes = ["Movie Time", "Away", "Summer Mode", "Night Mode"];

  return (
    <div className="mb-4 sm:mb-6">
      <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Scenes</h3>
      <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3">
        {scenes.map((scene) => (
          <button
            key={scene}
            className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
          >
            {scene}
          </button>
        ))}
      </div>
    </div>
  );
} 