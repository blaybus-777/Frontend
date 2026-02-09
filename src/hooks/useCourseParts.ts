import { useMemo } from 'react';
import { ASSETS } from '@/constants/assets';
import { MOCK_PARTS } from '@/components/course/assistant-panel/mockData';
import type { Part } from '@/components/course/assistant-panel/types';
import { PART_ID_MAPPING } from '@/data/partMapping';

// Map course IDs to ASSETS keys
const COURSE_ID_MAP: Record<string, string> = {
  '1': 'Quadcopter_DRONE',
  '2': 'LEAF_SPRING',
  '3': 'MACHINE_VICE',
  '4': 'ROBOT_ARM',
  '5': 'ROBOT_GRIPPER',
  '6': 'SUSPENSION',
  '7': 'V4_ENGINE',
};

/**
 * Hook to retrieve parts for a given course ID.
 * Encapsulates the logic of mapping course IDs to asset keys and transforming asset data into Part objects.
 *
 * @param courseId The ID of the course.
 * @returns An object containing the list of parts.
 */
export function useCourseParts(courseId?: string) {
  const parts = useMemo(() => {
    // Map the numeric course ID to the asset key
    const assetKey = courseId ? COURSE_ID_MAP[courseId] : undefined;

    if (!assetKey || !ASSETS[assetKey]) return MOCK_PARTS;

    return Object.values(ASSETS[assetKey].parts).map((url: string): Part => {
      // Extract name from file path: "/models/drone/Arm gear.glb" -> "Arm gear"
      const fileName = url.split('/').pop() || '';
      const name = fileName.replace('.glb', '');

      // 데이터 일관성을 위해 ID 매핑 적용
      const id = PART_ID_MAPPING[name] || name;

      return {
        id: id,
        name: name,
        image: url,
        englishName: name,
      };
    });
  }, [courseId]);

  return { parts };
}
