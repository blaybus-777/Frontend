import ModelViewerCanvas from "./viewer/ModelViewerCanvas";
import type { PartInfoMap, SelectedPart } from "./viewer/types";

interface ModelViewerProps {
  urls: string[];
  partInfo?: PartInfoMap;
  onSelect?: (part: SelectedPart | null) => void;
  selectedPartId?: string | null;
  viewMode?: "general" | "wireframe";
  assemblyMode?: "single" | "assembly";
  explodeDistance: number;
  explodeSpace: "local" | "world";
  assetKey?: string;
}

export default function ModelViewer({
  urls,
  partInfo,
  onSelect,
  selectedPartId,
  viewMode = "general",
  assemblyMode = "assembly",
  explodeDistance,
  explodeSpace,
  assetKey,
}: ModelViewerProps) {
  const resolvedExplodeDistance =
    assemblyMode === "assembly" ? explodeDistance : 0;

  return (
    <div className="w-full h-full">
      <ModelViewerCanvas
        urls={urls}
        explodeDistance={resolvedExplodeDistance}
        explodeSpace={explodeSpace}
        partInfo={partInfo}
        onSelect={onSelect}
        selectedPartId={selectedPartId}
        viewMode={viewMode}
        assemblyMode={assemblyMode}
        assetKey={assetKey}
      />
    </div>
  );
}
