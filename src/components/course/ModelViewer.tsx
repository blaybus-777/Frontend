import ModelViewerCanvas from './viewer/ModelViewerCanvas';
import type { PartInfoMap, SelectedPart } from './viewer/types';

interface ModelViewerProps {
  urls: string[];
  partInfo?: PartInfoMap;
  onSelect?: (part: SelectedPart | null) => void;
  selectedPartId?: string | null;
  viewMode?: 'general' | 'wireframe';
  explodeDistance: number;
  explodeSpace: 'local' | 'world';
  assetKey?: string;
  storageKey?: string;
}

export default function ModelViewer({
  urls,
  partInfo,
  onSelect,
  selectedPartId,
  viewMode = 'general',
  explodeDistance,
  explodeSpace,
  assetKey,
  storageKey,
}: ModelViewerProps) {
  return (
    <div className="h-full w-full">
      <ModelViewerCanvas
        urls={urls}
        explodeDistance={explodeDistance}
        explodeSpace={explodeSpace}
        partInfo={partInfo}
        onSelect={onSelect}
        selectedPartId={selectedPartId}
        viewMode={viewMode}
        assetKey={assetKey}
        storageKey={storageKey}
      />
    </div>
  );
}
