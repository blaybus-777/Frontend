import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';
import ModelScene from './ModelScene';
import type { PartInfoMap, SelectedPart } from './types';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface ModelViewerCanvasProps {
  urls: string[];
  explodeDistance: number;
  explodeSpace: 'local' | 'world';
  partInfo?: PartInfoMap;
  onSelect?: (part: SelectedPart | null) => void;
  selectedPartId?: string | null;
  viewMode?: 'general' | 'wireframe';
  assetKey?: string;
  storageKey?: string;
}

export default function ModelViewerCanvas({
  urls,
  explodeDistance,
  explodeSpace,
  partInfo,
  onSelect,
  selectedPartId,
  viewMode,
  assetKey,
  storageKey,
}: ModelViewerCanvasProps) {
  const showWorldAxes = true;
  const htmlPortalRef = useRef<HTMLDivElement>(null!);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const lastSavedRef = useRef<number>(0);
  const saveTimerRef = useRef<number | null>(null);
  const [resetToken, setResetToken] = useState(0);
  const hasStoredView = useMemo(() => {
    if (!storageKey || typeof window === 'undefined') return false;
    try {
      return localStorage.getItem(storageKey) !== null;
    } catch {
      return false;
    }
  }, [storageKey]);
  const restoredViewRef = useRef(false);

  const saveState = useCallback(() => {
    if (!storageKey || !controlsRef.current || !cameraRef.current) return;
    if (hasStoredView && !restoredViewRef.current) return;
    const now = Date.now();
    if (now - lastSavedRef.current < 150) return;
    lastSavedRef.current = now;
    const payload = {
      position: cameraRef.current.position.toArray(),
      target: controlsRef.current.target.toArray(),
      zoom: cameraRef.current.zoom,
    };
    try {
      localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch {
      // ignore storage errors
    }
  }, [hasStoredView, storageKey]);

  const restoreState = useCallback(() => {
    if (!storageKey || !controlsRef.current || !cameraRef.current) return;
    if (restoredViewRef.current) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        position?: number[];
        target?: number[];
        zoom?: number;
      };
      if (parsed.position?.length === 3) {
        cameraRef.current.position.fromArray(parsed.position);
      }
      if (parsed.target?.length === 3) {
        controlsRef.current.target.fromArray(
          parsed.target as [number, number, number]
        );
      }
      if (typeof parsed.zoom === 'number') {
        cameraRef.current.zoom = parsed.zoom;
        cameraRef.current.updateProjectionMatrix();
      }
      controlsRef.current.update();
      controlsRef.current.saveState();
      restoredViewRef.current = true;
    } catch {
      // ignore
    }
  }, [storageKey]);

  const resetView = () => {
    if (!storageKey || !controlsRef.current || !cameraRef.current) return;
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    controlsRef.current.reset();
    restoredViewRef.current = false;
    setResetToken((prev) => prev + 1);
  };

  useEffect(() => {
    if (!storageKey) return;
    let attempts = 0;
    let rafId = 0;
    const tick = () => {
      if (restoredViewRef.current) return;
      restoreState();
      attempts += 1;
      if (attempts < 30 && !restoredViewRef.current) {
        rafId = requestAnimationFrame(tick);
      }
    };
    tick();
    return () => cancelAnimationFrame(rafId);
  }, [restoreState, storageKey]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const onChange = () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
      saveTimerRef.current = window.setTimeout(() => {
        saveState();
      }, 120);
    };

    const onEnd = () => {
      saveState();
    };

    controls.addEventListener('change', onChange);
    controls.addEventListener('end', onEnd);

    return () => {
      controls.removeEventListener('change', onChange);
      controls.removeEventListener('end', onEnd);
    };
  }, [saveState]);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onContextMenu={(event) => event.preventDefault()}
    >
      <div className="absolute top-3 left-3 z-20">
        <button
          type="button"
          className="rounded-md border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur"
          onClick={resetView}
        >
          뷰 초기화
        </button>
      </div>
      <div
        ref={htmlPortalRef}
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      />
      <Canvas
        className="relative z-0"
        camera={{ fov: 45, near: 0.01, far: 1000 }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor('#0a0e18');
          cameraRef.current = camera as THREE.PerspectiveCamera;
          if (controlsRef.current) {
            controlsRef.current.target.set(0, 0, 0);
            controlsRef.current.update();
            controlsRef.current.saveState();
          }
          restoreState();
        }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[6, 6, 6]} />
        <Environment preset="studio" />
        <gridHelper
          args={[10, 20, 0x324055, 0x1a2333]}
          position={[0, -0.0005, 0]}
        />
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
            assetKey={assetKey}
            htmlPortal={htmlPortalRef}
            orbitRef={controlsRef}
            canSetDefaultView={!hasStoredView}
            resetToken={resetToken}
            storageKey={storageKey}
            onRequestRestore={restoreState}
            hasStoredView={hasStoredView}
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          makeDefault
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
