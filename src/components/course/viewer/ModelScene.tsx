import { TransformControls, useGLTF } from '@react-three/drei';
import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
  type MutableRefObject,
} from 'react';
import * as THREE from 'three';
import type { PartInfoMap, SelectedPart } from './types';
import { DRONE_PART_ID_TO_FILE, PART_NAME_MAPPING } from '@/data/partMapping';
import { FINAL_ASSET_URLS } from '@/constants/assets';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useCourseStore } from '@/stores/useCourseStore';
import { useShallow } from 'zustand/react/shallow';

interface ModelSceneProps {
  urls: string[];
  explodeDistance: number;
  explodeSpace: 'local' | 'world';
  partInfo?: PartInfoMap;
  onSelect?: (part: SelectedPart | null) => void;
  onRegisterClearSelection?: (clearFn: () => void) => void;
  selectedPartId?: string | null;
  viewMode?: 'general' | 'wireframe';
  assetKey?: string;
  htmlPortal?: RefObject<HTMLElement>;
  orbitRef?: RefObject<OrbitControlsImpl | null>;
  canSetDefaultView?: boolean;
  resetToken?: number;
  storageKey?: string;
  onRequestRestore?: () => void;
  hasStoredView?: boolean;
}

interface MeshExplodeData {
  mesh: THREE.Mesh;
  originalPosition: THREE.Vector3;
  localDirection: THREE.Vector3;
  worldDirection: THREE.Vector3;
  sizeRatio: number;
}

function hasColor(
  material: THREE.Material
): material is THREE.Material & { color: THREE.Color } {
  return (material as { color?: unknown }).color instanceof THREE.Color;
}

function hasEmissive(
  material: THREE.Material
): material is THREE.Material & { emissive: THREE.Color } {
  return (material as { emissive?: unknown }).emissive instanceof THREE.Color;
}

function hasWireframe(
  material: THREE.Material
): material is THREE.Material & { wireframe: boolean } {
  return 'wireframe' in material;
}

function hasMetalness(
  material: THREE.Material
): material is THREE.MeshStandardMaterial {
  return 'metalness' in material;
}

function hasRoughness(
  material: THREE.Material
): material is THREE.MeshStandardMaterial {
  return 'roughness' in material;
}

function cloneMaterial(material: THREE.Material) {
  const cloned = material.clone();
  if (hasColor(cloned)) {
    cloned.userData.__baseColor = cloned.color.clone();
  }
  if (hasEmissive(cloned)) {
    cloned.userData.__baseEmissive = cloned.emissive.clone();
  }
  return cloned;
}

function prepareMaterials(object: THREE.Object3D) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.userData.__selectable = true;
      if (Array.isArray(child.material)) {
        child.material = child.material.map((material) =>
          cloneMaterial(material)
        );
      } else if (child.material) {
        child.material = cloneMaterial(child.material);
      }
    }
  });
}

function ensureMeshNames(object: THREE.Object3D, fallbackName: string) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (!child.name || child.name.trim().length === 0) {
        child.name = fallbackName;
      }
    }
  });
}

function setHighlight(mesh: THREE.Mesh, mode: 'hover' | 'select' | 'none') {
  const highlightColor =
    mode === 'select' ? new THREE.Color('#f59e0b') : new THREE.Color('#60a5fa');

  const materials: THREE.Material[] = Array.isArray(mesh.material)
    ? mesh.material
    : [mesh.material];

  materials.forEach((material) => {
    if (hasEmissive(material)) {
      const baseEmissive =
        material.userData.__baseEmissive ?? material.emissive.clone();
      material.userData.__baseEmissive = baseEmissive;
      material.emissive =
        mode === 'none' ? baseEmissive.clone() : highlightColor;
    } else if (hasColor(material)) {
      const baseColor = material.userData.__baseColor ?? material.color.clone();
      material.userData.__baseColor = baseColor;
      material.color = mode === 'none' ? baseColor.clone() : highlightColor;
    }
    material.needsUpdate = true;
  });
}

function buildSelectedPart(
  mesh: THREE.Mesh,
  partInfo?: PartInfoMap
): SelectedPart {
  const material = Array.isArray(mesh.material)
    ? mesh.material[0]
    : mesh.material;
  const materialName = material?.name ?? null;
  const role = partInfo?.[mesh.name]?.role ?? null;

  return {
    name: mesh.name || '이름 없음',
    materialName: materialName && materialName.length > 0 ? materialName : null,
    role,
  };
}

function applyViewerMaterialTuning(
  object: THREE.Object3D,
  viewMode: 'general' | 'wireframe'
) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const materials: THREE.Material[] = Array.isArray(child.material)
      ? child.material
      : [child.material];
    materials.forEach((material) => {
      if (hasWireframe(material)) {
        if (material.userData.__baseWireframe === undefined) {
          material.userData.__baseWireframe = material.wireframe;
        }
        material.wireframe = viewMode === 'wireframe';
      }

      if (hasMetalness(material)) {
        const current = material.metalness ?? 0;
        material.metalness = Math.max(current, 0.4);
      }
      if (hasRoughness(material)) {
        const current = material.roughness ?? 1;
        material.roughness = Math.min(current, 0.35);
      }
      if ('envMapIntensity' in material) {
        material.envMapIntensity = 1.2;
      }
      material.needsUpdate = true;
    });
  });
}

// function saveSceneTransforms(
//   root: THREE.Object3D,
//   storageKey: string | null,
//   lastSavedRef: MutableRefObject<number>
// ) {
//   if (assetKey && assetKey !== 'Quadcopter_DRONE') {
//     const finalUrl = FINAL_ASSET_URLS[assetKey];
//     return finalUrl ? [finalUrl] : urls.slice(0, 1);
//   }
//   if (!selectedPartId || assetKey !== 'Quadcopter_DRONE') {
//     return urls.slice(0, 1);
//   }
//   const file = DRONE_PART_ID_TO_FILE[selectedPartId];
//   if (!file) return urls.slice(0, 1);
//   const match = urls.find((url) => url.endsWith(`/${file}`));
//   return match ? [match] : urls.slice(0, 1);
// }

function getExplodeScale(assetKey: string | undefined) {
  if (assetKey === 'SUSPENSION') return 0.85;
  if (assetKey === 'ROBOT_ARM') return 0.75;
  return 1;
}

function weightDirection(
  assetKey: string | undefined,
  direction: THREE.Vector3
) {
  if (assetKey === 'SUSPENSION') {
    return new THREE.Vector3(
      direction.x * 0.6,
      direction.y * 1.4,
      direction.z * 0.8
    ).normalize();
  }
  if (assetKey === 'ROBOT_ARM') {
    return new THREE.Vector3(
      direction.x * 1.2,
      direction.y * 0.8,
      direction.z * 1.1
    ).normalize();
  }
  return direction;
}

function saveSceneTransforms(
  root: THREE.Object3D,
  storageKey: string | null,
  lastSavedRef: MutableRefObject<number>
) {
  if (!storageKey) return;
  const now = Date.now();
  if (now - lastSavedRef.current < 150) return;
  lastSavedRef.current = now;
  const payload: Record<
    string,
    { position: number[]; quaternion: number[]; scale: number[] }
  > = {};
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    if (!child.userData.__selectable || !child.name) return;
    payload[child.name] = {
      position: child.position.toArray(),
      quaternion: child.quaternion.toArray(),
      scale: child.scale.toArray(),
    };
  });
  try {
    localStorage.setItem(storageKey, JSON.stringify(payload));
  } catch {
    // ignore
  }
}

function restoreSceneTransforms(
  root: THREE.Object3D,
  storageKey: string | null
) {
  if (!storageKey) return;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Record<
      string,
      { position?: number[]; quaternion?: number[]; scale?: number[] }
    >;
    root.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      if (!child.userData.__selectable || !child.name) return;
      const data = parsed[child.name];
      if (!data) return;
      if (data.position?.length === 3) {
        child.position.fromArray(data.position);
      }
      if (data.quaternion?.length === 4) {
        child.quaternion.fromArray(
          data.quaternion as [number, number, number, number]
        );
      }
      if (data.scale?.length === 3) {
        child.scale.fromArray(data.scale);
      }
      child.updateMatrixWorld();
    });
  } catch {
    // ignore
  }
}

function ModelPart({
  url,
  viewMode,
}: {
  url: string;
  viewMode: 'general' | 'wireframe';
}) {
  const { scene } = useGLTF(url) as unknown as { scene: THREE.Group };
  const fallbackName = useMemo(() => {
    const file = url.split('/').pop() ?? 'part';
    return file.replace(/\.[^/.]+$/, '');
  }, [url]);
  const cloned = useMemo(() => {
    const copy = scene.clone(true);
    prepareMaterials(copy);
    ensureMeshNames(copy, fallbackName);
    return copy;
  }, [scene, fallbackName]);

  useEffect(() => {
    applyViewerMaterialTuning(cloned, viewMode);
  }, [cloned, viewMode]);

  return <primitive object={cloned} />;
}

export default function ModelScene({
  urls,
  explodeDistance,
  explodeSpace,
  partInfo,
  onSelect,
  onRegisterClearSelection,
  selectedPartId,
  viewMode = 'general',
  assetKey,
  htmlPortal,
  orbitRef,
  canSetDefaultView = true,
  resetToken = 0,
  storageKey,
  onRequestRestore,
  hasStoredView = false,
}: ModelSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const explodeDataRef = useRef<MeshExplodeData[]>([]);
  const selectedRef = useRef<THREE.Mesh | null>(null);
  const labelAnchorRef = useRef<THREE.Object3D | null>(null);
  const labelGroupRef = useRef<THREE.Group | null>(null);
  const hoveredRef = useRef<THREE.Mesh | null>(null);
  const { camera, controls } = useThree();
  const orbitControls =
    orbitRef?.current ?? (controls as OrbitControlsImpl | undefined);
  const [selectedLabel, setSelectedLabel] = useState<SelectedPart | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<SelectedPart | null>(null);
  const [labelDistanceFactor, setLabelDistanceFactor] = useState(6);
  const [selectedObject, setSelectedObject] = useState<THREE.Object3D | null>(
    null
  );
  const transformSavedRef = useRef(0);
  const transformsKey = storageKey ? `${storageKey}:transforms` : null;
  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3());
  const isMovingCamera = useRef(false);

  const { transformMode } = useCourseStore(
    useShallow((state) => ({
      transformMode: state.transformMode,
    }))
  );
  const setSelectedPartTransform = useCourseStore(
    (state) => state.setSelectedPartTransform
  );

  const resolvedUrls = useMemo(() => {
    // 1. 선택된 부품이 있는 경우, 해당 부품의 개별 GLB만 보여줌
    if (selectedPartId) {
      const fileName = DRONE_PART_ID_TO_FILE[selectedPartId];
      if (fileName) {
        const match = urls.find((url) => url.endsWith(`/${fileName}`));
        if (match) return [match];
      }

      // DRONE_PART_ID_TO_FILE에 없더라도 PART_NAME_MAPPING을 통해 유추 시도
      const meshName = PART_NAME_MAPPING[selectedPartId];
      if (meshName) {
        const match = urls.find((url) => {
          const decodedUrl = decodeURIComponent(url);
          return decodedUrl.endsWith(`/${meshName}.glb`);
        });
        if (match) return [match];
      }
    }
    // if (assemblyMode === 'assembly') {
    //   return resolveAssemblyUrls(assetKey, urls, explodeDistance);

    // 2. 선택된 부품이 없거나 개별 GLB를 못 찾은 경우, 전체 조립 모델 표시
    if (assetKey) {
      const finalUrl = FINAL_ASSET_URLS[assetKey];
      if (finalUrl) return [finalUrl];
    }

    return urls;
  }, [urls, selectedPartId, assetKey]);

  const watchKey = useMemo(() => resolvedUrls.join('|'), [resolvedUrls]);

  console.log('ModelScene - Props:', {
    assetKey,
    urlsCount: urls.length,
    resolvedUrlsCount: resolvedUrls.length,
    resolvedUrls,
  });

  useEffect(() => {
    if (!onRegisterClearSelection) return;
    onRegisterClearSelection(() => {
      if (selectedRef.current) {
        setHighlight(selectedRef.current, 'none');
      }
      selectedRef.current = null;
      setSelectedLabel(null);
      setHoveredLabel(null);
      setSelectedObject(null);
      setSelectedPartTransform(null);
      if (onSelect) onSelect(null);
    });
  }, [onRegisterClearSelection, onSelect, setSelectedPartTransform]);

  // 하이라키 트리 등 외부에서의 선택 상태 반영
  useEffect(() => {
    if (!groupRef.current) return;

    // 선택이 해제된 경우
    if (!selectedPartId) {
      if (selectedRef.current) {
        setHighlight(selectedRef.current, 'none');
        selectedRef.current = null;
        setSelectedLabel(null);
        setSelectedObject(null);
      }
      return;
    }

    // ID를 Mesh 이름으로 변환
    const meshName = PART_NAME_MAPPING[selectedPartId];
    if (!meshName) return;

    // 이미 선택된 것과 같다면 무시
    if (selectedRef.current?.name === meshName) return;

    let targetMesh: THREE.Mesh | null = null;
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.name === meshName) {
        targetMesh = child;
      }
    });

    if (targetMesh) {
      if (selectedRef.current && selectedRef.current !== targetMesh) {
        setHighlight(selectedRef.current, 'none');
      }
      selectedRef.current = targetMesh;
      setHighlight(targetMesh, 'select');
      const selected = buildSelectedPart(targetMesh, partInfo);
      setSelectedLabel(selected);
      setHoveredLabel(null);
      labelAnchorRef.current = targetMesh;
      setSelectedObject(targetMesh);

      // 카메라 포커싱 추가
      const box = new THREE.Box3().setFromObject(targetMesh);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3()).length();

      // 부품 크기에 맞춰 화면에 꽉 차도록 거리 계산 (최소 거리 제한을 대폭 낮춤)
      // size * 1.5~2.0 정도면 45도 FOV에서 부품이 화면에 적절히 꽉 참
      const targetDistance = Math.max(size * 1.8, 0.1);

      if (orbitControls) {
        targetLookAt.current.copy(center);
        const direction = camera.position.clone().sub(center).normalize();
        targetCameraPos.current.copy(
          center.clone().add(direction.multiplyScalar(targetDistance))
        );
        isMovingCamera.current = true;
      }
    }
  }, [selectedPartId, watchKey, partInfo, orbitControls, camera]);

  useEffect(() => {
    console.log('ModelScene - Mounted/Updated with watchKey:', watchKey);
    if (!groupRef.current) return;

    const group = groupRef.current;
    console.log('ModelScene - Group children count:', group.children.length);

    group.position.set(0, 0, 0);
    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3()).length();
    const groupSize = size || 1;
    const center = box.getCenter(new THREE.Vector3());

    console.log('ModelScene - Bounding box size:', size, 'center:', center);

    group.position.sub(center);

    restoreSceneTransforms(group, transformsKey);

    const distance = Math.max(size * 0.8, 2);
    const defaultDistance = Math.max(size * 0.8, 2);

    if (!hasStoredView && (!orbitControls || canSetDefaultView)) {
      camera.position.set(distance, distance * 0.75, distance);
      camera.lookAt(0, 0, 0);
      if (orbitControls) {
        orbitControls.target.set(0, 0, 0);
        orbitControls.update();
        orbitControls.saveState();
      }
    }
    if (hasStoredView && orbitControls) {
      const centerWorld = new THREE.Vector3(0, 0, 0);
      const cameraDistance = camera.position.distanceTo(centerWorld);
      const targetDistance = orbitControls.target.distanceTo(centerWorld);
      const minDistance = Math.max(size * 0.2, 0.8);
      const maxDistance = Math.max(size * 6, 12);
      const maxTargetDistance = Math.max(size * 1.5, 3);
      const invalidCamera =
        !Number.isFinite(cameraDistance) ||
        cameraDistance < minDistance ||
        cameraDistance > maxDistance;
      const invalidTarget =
        !Number.isFinite(targetDistance) || targetDistance > maxTargetDistance;
      if (invalidCamera || invalidTarget) {
        camera.position.set(
          defaultDistance,
          defaultDistance * 0.75,
          defaultDistance
        );
        camera.lookAt(0, 0, 0);
        orbitControls.target.set(0, 0, 0);
        orbitControls.update();
        orbitControls.saveState();
      }
    }
    targetCameraPos.current.set(distance, distance * 0.75, distance);
    targetLookAt.current.set(0, 0, 0);
    isMovingCamera.current = true;

    const factor = Math.min(6, Math.max(2.5, size * 0.3));
    setLabelDistanceFactor(factor);

    const meshes: MeshExplodeData[] = [];
    group.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const originalPosition = child.position.clone();
      const meshBox = new THREE.Box3().setFromObject(child);
      const meshCenterWorld = meshBox.getCenter(new THREE.Vector3());
      const centerWorld = new THREE.Vector3(0, 0, 0);
      const worldDirection = meshCenterWorld
        .clone()
        .sub(centerWorld)
        .normalize();

      let localDirection = originalPosition.clone().normalize();
      if (localDirection.length() === 0 && worldDirection.length() > 0) {
        localDirection = worldDirection.clone();
      }
      const meshSize = meshBox.getSize(new THREE.Vector3()).length();
      const sizeRatio = Math.min(1, meshSize / groupSize);

      meshes.push({
        mesh: child,
        originalPosition,
        localDirection,
        worldDirection,
        sizeRatio,
      });
    });
    explodeDataRef.current = meshes;
    if (hasStoredView || !canSetDefaultView) {
      onRequestRestore?.();
    }
  }, [
    camera,
    watchKey,
    orbitControls,
    canSetDefaultView,
    transformsKey,
    onRequestRestore,
    hasStoredView,
  ]);

  useEffect(() => {
    if (!groupRef.current) return;
    if (resetToken === 0) return;

    if (transformsKey) {
      try {
        localStorage.removeItem(transformsKey);
      } catch {
        // ignore
      }
    }

    if (selectedRef.current) {
      setHighlight(selectedRef.current, 'none');
    }
    selectedRef.current = null;
    setSelectedLabel(null);
    setHoveredLabel(null);
    setSelectedObject(null);
    setSelectedPartTransform(null);
    labelAnchorRef.current = null;

    const group = groupRef.current;
    group.position.set(0, 0, 0);
    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());
    group.position.sub(center);

    const distance = Math.max(size * 0.8, 2);
    camera.position.set(distance, distance * 0.75, distance);
    camera.lookAt(0, 0, 0);
    if (orbitControls) {
      orbitControls.target.set(0, 0, 0);
      orbitControls.update();
      orbitControls.saveState();
    }
  }, [
    resetToken,
    camera,
    orbitControls,
    setSelectedPartTransform,
    transformsKey,
  ]);

  useEffect(() => {
    if (!groupRef.current) return;
    applyViewerMaterialTuning(groupRef.current, viewMode);
  }, [viewMode, watchKey]);

  useEffect(() => {
    explodeDataRef.current.forEach((item) => {
      const baseDirection =
        explodeSpace === 'local' ? item.localDirection : item.worldDirection;
      const direction = weightDirection(assetKey, baseDirection.clone());
      const distance =
        explodeDistance *
        getExplodeScale(assetKey) *
        (1 + item.sizeRatio * 0.6);
      item.mesh.position.copy(
        item.originalPosition
          .clone()
          .add(direction.clone().multiplyScalar(distance))
      );
    });
  }, [explodeDistance, explodeSpace, assetKey]);

  useFrame(() => {
    if (!isMovingCamera.current || !orbitControls) return;

    // 카메라 위치 보간 (Lerp)
    camera.position.lerp(targetCameraPos.current, 0.1);
    orbitControls.target.lerp(targetLookAt.current, 0.1);
    orbitControls.update();

    // 목표 지점에 충분히 도달하면 이동 중지
    if (
      camera.position.distanceTo(targetCameraPos.current) < 0.01 &&
      orbitControls.target.distanceTo(targetLookAt.current) < 0.01
    ) {
      isMovingCamera.current = false;
    }
  });

  useFrame(() => {
    if (!labelAnchorRef.current || !labelGroupRef.current) return;

    const anchor = labelAnchorRef.current;
    const position = anchor.getWorldPosition(new THREE.Vector3());
    labelGroupRef.current.position.copy(position);
    labelGroupRef.current.quaternion.copy(camera.quaternion);
  });

  useFrame(() => {
    if (!selectedRef.current) return;
    const { x, y, z } = selectedRef.current.position;
    setSelectedPartTransform({ x, y, z });
  });

  return (
    <group
      ref={groupRef}
      onPointerMove={(event) => {
        event.stopPropagation();
        const selectableHit = event.intersections.find(
          (hit) =>
            hit.object instanceof THREE.Mesh &&
            (hit.object as THREE.Mesh).userData.__selectable
        );
        const target =
          selectableHit?.object instanceof THREE.Mesh
            ? selectableHit.object
            : null;
        if (!target) return;
        if (hoveredRef.current && hoveredRef.current !== target) {
          if (hoveredRef.current !== selectedRef.current) {
            setHighlight(hoveredRef.current, 'none');
          }
        }
        hoveredRef.current = target;
        if (target !== selectedRef.current) {
          setHighlight(target, 'hover');
          if (!selectedRef.current) {
            setHoveredLabel(buildSelectedPart(target, partInfo));
            labelAnchorRef.current = target;
          }
        }
      }}
      onPointerOut={() => {
        if (hoveredRef.current && hoveredRef.current !== selectedRef.current) {
          setHighlight(hoveredRef.current, 'none');
        }
        hoveredRef.current = null;
        if (!selectedRef.current) {
          setHoveredLabel(null);
          labelAnchorRef.current = null;
        }
      }}
      onPointerMissed={() => {
        if (hoveredRef.current && hoveredRef.current !== selectedRef.current) {
          setHighlight(hoveredRef.current, 'none');
        }
        hoveredRef.current = null;
        if (!selectedRef.current) {
          setHoveredLabel(null);
          labelAnchorRef.current = null;
        }
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
        const selectableHit = event.intersections.find(
          (hit) =>
            hit.object instanceof THREE.Mesh &&
            (hit.object as THREE.Mesh).userData.__selectable
        );
        const target =
          selectableHit?.object instanceof THREE.Mesh
            ? selectableHit.object
            : null;
        if (!target) return;

        if (selectedRef.current === target) {
          setHighlight(target, 'none');
          selectedRef.current = null;
          setSelectedLabel(null);
          setHoveredLabel(null);
          labelAnchorRef.current = null;
          setSelectedObject(null);
          setSelectedPartTransform(null);
          if (onSelect) onSelect(null);
          return;
        }

        if (selectedRef.current && selectedRef.current !== target) {
          setHighlight(selectedRef.current, 'none');
        }

        selectedRef.current = target;
        setHighlight(target, 'select');
        const selected = buildSelectedPart(target, partInfo);
        setSelectedLabel(selected);
        setHoveredLabel(null);
        labelAnchorRef.current = target;
        setSelectedObject(target);
        setSelectedPartTransform({
          x: target.position.x,
          y: target.position.y,
          z: target.position.z,
        });
        if (onSelect) onSelect(selected);
      }}
    >
      {resolvedUrls.map((url) => (
        <ModelPart key={url} url={url} viewMode={viewMode} />
      ))}
      {selectedObject ? (
        <TransformControls
          object={selectedObject}
          mode={transformMode}
          space="world"
          onMouseDown={() => {
            if (orbitControls) orbitControls.enabled = false;
          }}
          onMouseUp={() => {
            if (orbitControls) orbitControls.enabled = true;
          }}
          onObjectChange={() => {
            if (!selectedRef.current) return;
            const { x, y, z } = selectedRef.current.position;
            setSelectedPartTransform({ x, y, z });
            saveSceneTransforms(
              groupRef.current ?? selectedRef.current,
              transformsKey,
              transformSavedRef
            );
          }}
        />
      ) : null}
      {(selectedLabel ?? hoveredLabel) ? (
        <group ref={labelGroupRef}>
          <Html
            position={[0, 0.25, 0]}
            center
            transform
            distanceFactor={labelDistanceFactor}
            style={{ pointerEvents: 'none' }}
            portal={htmlPortal}
          >
            <div className="rounded-full border border-gray-300 bg-white/90 px-1.5 py-0.5 text-[4px] whitespace-nowrap text-gray-800 shadow-sm">
              {(selectedLabel ?? hoveredLabel)?.materialName ? (
                <span className="text-[5px] text-gray-500">
                  {(selectedLabel ?? hoveredLabel)?.materialName}
                </span>
              ) : null}
            </div>
          </Html>
        </group>
      ) : null}
    </group>
  );
}
