import { ControlToggleButton } from "./ControlToggleButton";
import { Slider } from "@/components/ui/slider";

interface CourseControlPanelProps {
  viewMode: "general" | "wireframe";
  onViewModeChange: (mode: "general" | "wireframe") => void;
  assemblyMode: "single" | "assembly";
  onAssemblyModeChange: (mode: "single" | "assembly") => void;
  explosionLevel: number[];
  onExplosionLevelChange: (value: number[]) => void;
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
    <div className="w-full flex flex-col">
      {/* Assembly Mode Section */}
      <div className="flex flex-col gap-3 p-4 border-b border-gray-200">
        <h2 className="text-base font-bold pl-1">쿼드콥터 드론 시스템</h2>
        <div className="flex gap-2">
          <ControlToggleButton
            label="단일 부품"
            isActive={assemblyMode === "single"}
            onClick={() => onAssemblyModeChange("single")}
          />
          <ControlToggleButton
            label="조립도"
            isActive={assemblyMode === "assembly"}
            onClick={() => onAssemblyModeChange("assembly")}
          />
        </div>
      </div>

      {/* View Mode Section */}
      <div className="flex flex-col gap-3 p-4">
        <h2 className="text-base font-bold">View mode</h2>
        <div className="flex gap-2">
          <ControlToggleButton
            label="General"
            isActive={viewMode === "general"}
            onClick={() => onViewModeChange("general")}
          />
          <ControlToggleButton
            label="Wireframe"
            isActive={viewMode === "wireframe"}
            onClick={() => onViewModeChange("wireframe")}
          />
        </div>
      </div>

      {/* 분해 슬라이더 섹션 */}
      {assemblyMode === "assembly" && (
        <div className="flex flex-col gap-3 p-4 border-t border-gray-200">
          <h2 className="text-base font-bold">분해 슬라이더</h2>
          <div className="flex items-center gap-4">
            <Slider
              value={explosionLevel}
              onValueChange={onExplosionLevelChange}
              max={100}
              step={1}
              className="flex-1 **:data-[slot=slider-range]:bg-[#3469FF] **:data-[slot=slider-thumb]:bg-[#3469FF] **:data-[slot=slider-thumb]:border-0"
            />
            <span className="text-sm font-medium w-10 text-right">
              {explosionLevel[0]}%
            </span>
          </div>
        </div>
      )}
      <div className=""></div>
    </div>
  );
}
