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
  const [controlsReady, setControlsReady] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
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
    if (hasStoredView && !restoredViewRef.current) {
      console.warn('[ModelViewer] Changes ignored: waiting for restore');
      return;
    }
    const now = Date.now();
    if (now - lastSavedRef.current < 150) return;
    lastSavedRef.current = now;
    
    // ... saving logic
    console.log('[ModelViewer] Saving state to localStorage');
    const payload = {
      position: cameraRef.current.position.toArray(),
      target: controlsRef.current.target.toArray(),
      zoom: cameraRef.current.zoom,
    };
    try {
      localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch (e) {
      console.error('[ModelViewer] Failed to save state:', e);
    }
  }, [hasStoredView, storageKey]);

  const restoreState = useCallback(() => {
    if (!storageKey || !controlsRef.current || !cameraRef.current) return;
    
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
      
      // zoom logic for PerspectiveCamera (usually handled by position, but just in case)
      if (typeof parsed.zoom === 'number') {
         cameraRef.current.zoom = parsed.zoom;
         cameraRef.current.updateProjectionMatrix();
      }

      controlsRef.current.update();
      controlsRef.current.saveState();
      restoredViewRef.current = true;
      console.log('[ModelViewer] State restored:', parsed);
    } catch (e) {
      console.warn('[ModelViewer] Failed to restore state:', e);
      // If restore fails, we should still allow saving new state
      restoredViewRef.current = true;
    }
  }, [storageKey]);

  const handleControlsChange = useCallback(() => {
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = window.setTimeout(() => {
      saveState();
    }, 120);
  }, [saveState]);

  const handleControlsEnd = useCallback(() => {
    console.log('[ModelViewer] Controls interaction ended, saving...');
    saveState();
  }, [saveState]);

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
    restoreState();
  }, [restoreState, storageKey]);

  useEffect(() => {
    if (!storageKey || !controlsReady || !cameraReady) return;
    if (restoredViewRef.current) return;
    restoreState();
  }, [storageKey, controlsReady, cameraReady, restoreState]);

  useEffect(() => {
    if (!storageKey || typeof window === 'undefined') return;

    const handlePageHide = () => {
      saveState();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveState();
      }
    };

    window.addEventListener('pagehide', handlePageHide);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pagehide', handlePageHide);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      saveState();
    };
  }, [saveState, storageKey]);

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
        dpr={1}
        camera={{ fov: 45, near: 0.01, far: 1000 }}
        gl={{ antialias: true }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor('#0a0e18');
          cameraRef.current = camera as THREE.PerspectiveCamera;
          setCameraReady(true);
          if (controlsRef.current) {
            controlsRef.current.target.set(0, 0, 0);
            controlsRef.current.update();
          }
          restoreState();

          const handleContextLost = (event: Event) => {
            event.preventDefault();
            console.warn('WebGL Context Lost: Attempting to restore...');
          };

          const handleContextRestored = () => {
            console.log('WebGL Context Restored.');
            if (cameraRef.current) {
              cameraRef.current.updateProjectionMatrix();
            }
            restoreState();
          };

          gl.domElement.addEventListener(
            'webglcontextlost',
            handleContextLost,
            false
          );
          gl.domElement.addEventListener(
            'webglcontextrestored',
            handleContextRestored,
            false
          );

          return () => {
            gl.domElement.removeEventListener(
              'webglcontextlost',
              handleContextLost
            );
            gl.domElement.removeEventListener(
              'webglcontextrestored',
              handleContextRestored
            );
            gl.dispose();
            gl.forceContextLoss();
          };
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
          ref={(instance) => {
            controlsRef.current = instance;
            setControlsReady(Boolean(instance));
          }}
          makeDefault
          enableDamping
          enableZoom
          enablePan
          onChange={handleControlsChange}
          onEnd={handleControlsEnd}
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
