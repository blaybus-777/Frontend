import { Slider } from "@/components/ui/slider";

interface CourseControlPanelProps {
  viewMode: "general" | "wireframe";
  onViewModeChange: (mode: "general" | "wireframe") => void;
  assemblyMode: "single" | "assembly";
  onAssemblyModeChange: (mode: "single" | "assembly") => void;
  explosionLevel: number;
  onExplosionLevelChange: (level: number) => void;
}

export default function CourseControlPanel({
  viewMode,
  onViewModeChange,
  assemblyMode,
  onAssemblyModeChange,
  explosionLevel,
  onExplosionLevelChange,
}: CourseControlPanelProps) {
  return (
    <div className="w-3xs bg-[#252627] rounded-lg p-4 text-neutral-50 shadow-lg flex flex-col gap-4">
      {/* Assembly Mode Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-bold border-b border-secondary py-2 pl-2.5">쿼드콥터 드론 시스템</h2>
        <div className="">
          <div className="grid grid-cols-2 gap-3 h-10">
            <button
              onClick={() => onAssemblyModeChange("single")}
              className={`align-center py-2 px-3 rounded-md text-sm font-semibold transition-colors ${
                assemblyMode === "single"
                  ? "bg-[#3469FF] text-white"
                  : "bg-gray-600 text-gray-200 hover:bg-gray-700"
              }`}
            >
              단일 부품
            </button>
            <button
              onClick={() => onAssemblyModeChange("assembly")}
              className={`align-center py-2 px-3 rounded-md text-sm font-semibold transition-colors ${
                assemblyMode === "assembly"
                  ? "bg-[#3469FF] text-white"
                  : "bg-gray-600 text-gray-200 hover:bg-gray-700"
              }`}
            >
              조립도
            </button>
          </div>
        </div>
      </div>

      {/* View Mode Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-bold border-b border-secondary py-2 pl-2.5">View mode</h2>
        <div className="grid grid-cols-2 gap-3 h-10">
          <button
            onClick={() => onViewModeChange("general")}
            className={`py-2 px-3 rounded-md text-sm font-semibold transition-colors ${
              viewMode === "general"
                ? "bg-[#3469FF] text-white"
                : "bg-gray-600 text-gray-200 hover:bg-gray-700"
            }`}
          >
            General
          </button>
          <button
            onClick={() => onViewModeChange("wireframe")}
            className={`py-2 px-3 rounded-md text-sm font-semibold transition-colors ${
              viewMode === "wireframe"
                ? "bg-[#3469FF] text-white"
                : "bg-gray-600 text-gray-200 hover:bg-gray-700"
            }`}
          >
            Wireframe
          </button>
        </div>
      </div>

      {/* Explosion Slider Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-bold py-2 pl-2.5">분해 슬라이더</h2>
        <div className="flex items-center gap-2.5 px-2 h-6">
          <Slider
            value={[explosionLevel]}
            onValueChange={(vals) => onExplosionLevelChange(vals[0])}
            max={100}
            step={1}
            className="w-full **:data-[slot=slider-range]:bg-[#3469FF] **:data-[slot=slider-thumb]:border-[#3469FF] **:data-[slot=slider-thumb]:bg-[#3469FF]"
          />
          <span className="text-sm font-medium w-10 text-right">{explosionLevel}%</span>
        </div>
      </div>
    </div>
  );
}
