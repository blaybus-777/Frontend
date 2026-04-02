import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

/**
 * WebGL 메모리 상태를 주기적으로 모니터링합니다.
 * - geometry / texture / program 수 추적
 * - 개발 환경에서 누수 탐지용
 */
export function useThreeMemoryMonitor(intervalMs = 2000) {
  const { gl } = useThree();
  const lastGeometries = useRef(0);
  const lastTextures = useRef(0);

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const interval = setInterval(() => {
      const info = gl.info.memory;
      const renderInfo = gl.info.render;

      // 이전 값과 비교하여 증가량 체크
      const geoDiff = info.geometries - lastGeometries.current;
      const texDiff = info.textures - lastTextures.current;

      if (geoDiff > 0 || texDiff > 0 || info.geometries > 1000) {
        console.groupCollapsed(
          `[WebGL Memory] Geometries: ${info.geometries}, Textures: ${info.textures}`
        );
        console.log('Programs:', gl.info.programs?.length ?? 'N/A');
        console.log('Frame Calls:', renderInfo.calls);
        console.log('Triangles:', renderInfo.triangles);

        if (geoDiff > 0) console.warn(`Geometry count increased by ${geoDiff}`);
        if (texDiff > 0) console.warn(`Texture count increased by ${texDiff}`);

        console.groupEnd();
      }

      lastGeometries.current = info.geometries;
      lastTextures.current = info.textures;
    }, intervalMs);

    return () => clearInterval(interval);
  }, [gl, intervalMs]);

  // 매 프레임 업데이트가 필요한 경우 useFrame 사용 (여기서는 폴링 방식 채택)
}
