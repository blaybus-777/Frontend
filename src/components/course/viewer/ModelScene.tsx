import { useGLTF } from "@react-three/drei";
import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { PartInfoMap, SelectedPart } from "./types";
import { DRONE_PART_ID_TO_FILE } from "@/data/partMapping";
import { FINAL_ASSET_URLS } from "@/constants/assets";

interface ModelSceneProps {
  urls: string[];
  explodeDistance: number;
  explodeSpace: "local" | "world";
  partInfo?: PartInfoMap;
  onSelect?: (part: SelectedPart | null) => void;
  onRegisterClearSelection?: (clearFn: () => void) => void;
  selectedPartId?: string | null;
  viewMode?: "general" | "wireframe";
  assemblyMode?: "single" | "assembly";
  assetKey?: string;
}

interface MeshExplodeData {
  mesh: THREE.Mesh;
  originalPosition: THREE.Vector3;
  localDirection: THREE.Vector3;
  worldDirection: THREE.Vector3;
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
      if (Array.isArray(child.material)) {
        child.material = child.material.map((material) => cloneMaterial(material));
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

function setHighlight(mesh: THREE.Mesh, mode: "hover" | "select" | "none") {
  const highlightColor =
    mode === "select" ? new THREE.Color("#f59e0b") : new THREE.Color("#60a5fa");

  const materials: THREE.Material[] = Array.isArray(mesh.material)
    ? mesh.material
    : [mesh.material];

  materials.forEach((material) => {
    if (hasEmissive(material)) {
      const baseEmissive =
        material.userData.__baseEmissive ?? material.emissive.clone();
      material.userData.__baseEmissive = baseEmissive;
      material.emissive = mode === "none" ? baseEmissive.clone() : highlightColor;
    } else if (hasColor(material)) {
      const baseColor = material.userData.__baseColor ?? material.color.clone();
      material.userData.__baseColor = baseColor;
      material.color = mode === "none" ? baseColor.clone() : highlightColor;
    }
    material.needsUpdate = true;
  });
}

function buildSelectedPart(mesh: THREE.Mesh, partInfo?: PartInfoMap): SelectedPart {
  const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
  const materialName = material?.name ?? null;
  const role = partInfo?.[mesh.name]?.role ?? null;

  return {
    name: mesh.name || "이름 없음",
    materialName: materialName && materialName.length > 0 ? materialName : null,
    role,
  };
}

function applyViewerMaterialTuning(
  object: THREE.Object3D,
  viewMode: "general" | "wireframe"
) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const materials: THREE.Material[] = Array.isArray(child.material)
      ? child.material
      : [child.material];
    materials.forEach((material) => {
      if (material.userData.__baseWireframe === undefined) {
        material.userData.__baseWireframe = material.wireframe ?? false;
      }
      material.wireframe = viewMode === "wireframe";

      if ("metalness" in material) {
        const current = material.metalness ?? 0;
        material.metalness = Math.max(current, 0.4);
      }
      if ("roughness" in material) {
        const current = material.roughness ?? 1;
        material.roughness = Math.min(current, 0.35);
      }
      if ("envMapIntensity" in material) {
        material.envMapIntensity = 1.2;
      }
      material.needsUpdate = true;
    });
  });
}

function resolveSinglePartUrls(
  urls: string[],
  selectedPartId: string | null | undefined,
  assetKey: string | undefined
) {
  if (!selectedPartId || assetKey !== "DRONE") return urls.slice(0, 1);
  const file = DRONE_PART_ID_TO_FILE[selectedPartId];
  if (!file) return urls.slice(0, 1);
  const match = urls.find((url) => url.endsWith(`/${file}`));
  return match ? [match] : urls.slice(0, 1);
}

function resolveAssemblyUrls(assetKey: string | undefined, urls: string[]) {
  if (!assetKey) return urls;
  const finalUrl = FINAL_ASSET_URLS[assetKey];
  return finalUrl ? [finalUrl] : urls;
}

function ModelPart({
  url,
  viewMode,
}: {
  url: string;
  viewMode: "general" | "wireframe";
}) {
  const { scene } = useGLTF(url) as unknown as { scene: THREE.Group };
  const fallbackName = useMemo(() => {
    const file = url.split("/").pop() ?? "part";
    return file.replace(/\.[^/.]+$/, "");
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
  viewMode = "general",
  assemblyMode = "assembly",
  assetKey,
}: ModelSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const explodeDataRef = useRef<MeshExplodeData[]>([]);
  const hoveredRef = useRef<THREE.Mesh | null>(null);
  const selectedRef = useRef<THREE.Mesh | null>(null);
  const labelAnchorRef = useRef<THREE.Object3D | null>(null);
  const labelGroupRef = useRef<THREE.Group | null>(null);
  const { camera } = useThree();
  const [selectedLabel, setSelectedLabel] = useState<SelectedPart | null>(null);
  const [labelDistanceFactor, setLabelDistanceFactor] = useState(6);

  const resolvedUrls = useMemo(() => {
    if (assemblyMode === "single") {
      return resolveSinglePartUrls(urls, selectedPartId, assetKey);
    }
    if (assemblyMode === "assembly") {
      return resolveAssemblyUrls(assetKey, urls);
    }
    return urls;
  }, [urls, assemblyMode, selectedPartId, assetKey]);

  const watchKey = useMemo(() => resolvedUrls.join("|"), [resolvedUrls]);

  useEffect(() => {
    if (!onRegisterClearSelection) return;
    onRegisterClearSelection(() => {
      if (selectedRef.current) {
        setHighlight(selectedRef.current, "none");
      }
      selectedRef.current = null;
      setSelectedLabel(null);
      if (onSelect) onSelect(null);
    });
  }, [onRegisterClearSelection, onSelect]);

  useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;
    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());

    group.position.sub(center);

    const distance = size * 0.6 || 2;
    camera.position.set(distance, distance, distance);
    camera.lookAt(0, 0, 0);

    const factor = Math.min(6, Math.max(2.5, size * 0.3));
    setLabelDistanceFactor(factor);

    const meshes: MeshExplodeData[] = [];
    group.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const originalPosition = child.position.clone();
      const parent = child.parent ?? group;
      const meshWorld = child.getWorldPosition(new THREE.Vector3());
      const centerWorld = new THREE.Vector3(0, 0, 0);
      const meshLocal = parent.worldToLocal(meshWorld.clone());
      const centerLocal = parent.worldToLocal(centerWorld.clone());
      const worldDirection = meshLocal.sub(centerLocal).normalize();

      let localDirection = originalPosition.clone().normalize();
      if (localDirection.length() === 0 && worldDirection.length() > 0) {
        localDirection = worldDirection.clone();
      }

      meshes.push({
        mesh: child,
        originalPosition,
        localDirection,
        worldDirection,
      });
    });
    explodeDataRef.current = meshes;
  }, [camera, watchKey]);

  useEffect(() => {
    if (!groupRef.current) return;
    applyViewerMaterialTuning(groupRef.current, viewMode);
  }, [viewMode, watchKey]);

  useEffect(() => {
    explodeDataRef.current.forEach((item) => {
      const direction =
        explodeSpace === "local" ? item.localDirection : item.worldDirection;
      item.mesh.position.copy(
        item.originalPosition.clone().add(direction.clone().multiplyScalar(explodeDistance))
      );
    });
  }, [explodeDistance, explodeSpace]);

  useFrame(() => {
    if (!labelAnchorRef.current || !labelGroupRef.current) return;
    const anchor = labelAnchorRef.current;
    const position = anchor.getWorldPosition(new THREE.Vector3());
    labelGroupRef.current.position.copy(position);
    labelGroupRef.current.quaternion.copy(camera.quaternion);
  });

  return (
    <group
      ref={groupRef}
      onPointerMove={(event) => {
        event.stopPropagation();
        const target = event.object;
        if (!(target instanceof THREE.Mesh)) return;
        if (hoveredRef.current && hoveredRef.current !== target) {
          if (hoveredRef.current !== selectedRef.current) {
            setHighlight(hoveredRef.current, "none");
          }
        }
        hoveredRef.current = target;
        if (target !== selectedRef.current) {
          setHighlight(target, "hover");
        }
      }}
      onPointerOut={() => {
        if (hoveredRef.current && hoveredRef.current !== selectedRef.current) {
          setHighlight(hoveredRef.current, "none");
        }
        hoveredRef.current = null;
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
        const target = event.object;
        if (!(target instanceof THREE.Mesh)) return;

        if (selectedRef.current === target) {
          setHighlight(target, "none");
          selectedRef.current = null;
          setSelectedLabel(null);
          labelAnchorRef.current = null;
          if (onSelect) onSelect(null);
          return;
        }

        if (selectedRef.current && selectedRef.current !== target) {
          setHighlight(selectedRef.current, "none");
        }

        selectedRef.current = target;
        setHighlight(target, "select");
        const selected = buildSelectedPart(target, partInfo);
        setSelectedLabel(selected);
        labelAnchorRef.current = target;
        if (onSelect) onSelect(selected);
      }}
    >
      {resolvedUrls.map((url) => (
        <ModelPart key={url} url={url} viewMode={viewMode} />
      ))}
      {selectedLabel ? (
        <group ref={labelGroupRef}>
          <Html
            position={[0, 0.08, 0]}
            center
            transform
            distanceFactor={labelDistanceFactor}
            style={{ pointerEvents: "none" }}
          >
            <div className="bg-white/90 border border-gray-300 text-[5px] text-gray-800 rounded-full px-1.5 py-0.5 shadow-sm whitespace-nowrap">
              <span className="font-semibold text-[5px]">{selectedLabel.name}</span>
              {selectedLabel.materialName ? (
                <span className="ml-1 text-gray-500 text-[5px]">{selectedLabel.materialName}</span>
              ) : null}
            </div>
          </Html>
        </group>
      ) : null}
    </group>
  );
}
