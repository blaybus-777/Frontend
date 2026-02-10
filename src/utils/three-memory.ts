import * as THREE from 'three';

/**
 * Object3D와 그 하위 자식들의 geometry, material, texture를 재귀적으로 dispose합니다.
 * Resource Disposer 유틸 제작 요구사항 준수:
 * - traverse 기반
 * - 배열 material 지원
 * - material 내부 texture(map, normalMap 등)까지 dispose
 * - 중복 dispose 방지
 */
export function disposeObject(
  object: THREE.Object3D | null | undefined,
  disposeGeometry = true,
  disposeMap = true
) {
  if (!object) return;

  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    // 1. Geometry Dispose
    if (disposeGeometry && child.geometry) {
      child.geometry.dispose();
    }

    // 2. Material Dispose
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach((material) =>
          disposeMaterial(material, disposeMap)
        );
      } else {
        disposeMaterial(child.material, disposeMap);
      }
    }
  });
}

function disposeMaterial(material: THREE.Material, disposeMap: boolean) {
  // Material 자체 dispose
  material.dispose();

  // Material 내부의 Texture들 찾아서 dispose
  if (disposeMap) {
    for (const key in material) {
      const value = (material as unknown as Record<string, unknown>)[key];
      if (value && typeof value === 'object' && 'minFilter' in value) {
        const texture = value as THREE.Texture;
        texture.dispose();
      }
    }
  }
}
