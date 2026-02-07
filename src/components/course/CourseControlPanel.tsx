import { ControlToggleButton } from "./ControlToggleButton";

interface CourseControlPanelProps {
  viewMode: "general" | "wireframe";
  onViewModeChange: (mode: "general" | "wireframe") => void;
  assemblyMode: "single" | "assembly";
  onAssemblyModeChange: (mode: "single" | "assembly") => void;
}

export default function CourseControlPanel({
  viewMode,
  onViewModeChange,
  assemblyMode,
  onAssemblyModeChange,
}: CourseControlPanelProps) {
  return (
    <div className="w-3xs bg-white text-black rounded-md shadow-card-hover flex flex-col">
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
    </div>
  );
}
