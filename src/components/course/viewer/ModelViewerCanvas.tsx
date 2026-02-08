import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import ModelScene from "./ModelScene";
import type { PartInfoMap, SelectedPart } from "./types";

interface ModelViewerCanvasProps {
  urls: string[];
  explodeDistance: number;
  explodeSpace: "local" | "world";
  partInfo?: PartInfoMap;
  onSelect?: (part: SelectedPart | null) => void;
  selectedPartId?: string | null;
  viewMode?: "general" | "wireframe";
  assemblyMode?: "single" | "assembly";
  assetKey?: string;
}

export default function ModelViewerCanvas({
  urls,
  explodeDistance,
  explodeSpace,
  partInfo,
  onSelect,
  selectedPartId,
  viewMode,
  assemblyMode,
  assetKey,
}: ModelViewerCanvasProps) {
  const showWorldAxes = true;
  return (
    <div className="w-full h-full" onContextMenu={(event) => event.preventDefault()}>
      <Canvas
        camera={{ fov: 45 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#0a0e18");
        }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[6, 6, 6]} />
        <Environment preset="studio" />
        <gridHelper args={[10, 20, 0x324055, 0x1a2333]} position={[0, -0.0005, 0]} />
        {showWorldAxes && <axesHelper args={[1.2]} />}

        <Suspense fallback={null}>
          <ModelScene
            urls={urls}
            explodeDistance={explodeDistance}
            explodeSpace={explodeSpace}
            partInfo={partInfo}
            onSelect={onSelect}
            selectedPartId={selectedPartId}
            viewMode={viewMode}
            assemblyMode={assemblyMode}
            assetKey={assetKey}
          />
        </Suspense>

        <OrbitControls
          enableDamping
          enableZoom
          enablePan
          mouseButtons={{
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE,
          }}
        />
      </Canvas>
    </div>
  );
}
