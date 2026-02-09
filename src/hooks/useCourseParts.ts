import { useMemo } from 'react';
import { ASSETS } from '@/constants/assets';
import { MOCK_PARTS } from '@/components/course/assistant-panel/mockData';
import type { Part } from '@/components/course/assistant-panel/types';

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

// 임시 ID 매핑 (파일 이름 -> studyContentData의 ID)
const PART_ID_MAPPING: Record<string, string> = {
  // 1. 드론 (1-10)
  'Arm gear': '1',
  'Beater disc': '2',
  'Gearing': '3',
  'Impellar Blade': '4',
  'Leg': '5',
  'Main frame_MIR': '6',
  'Main frame': '7',
  'Nut': '8',
  'Screw': '9',
  'xyz': '10',

  // 2. 리프 스프링 (11-20)
  'Clamp-Center': '11',
  'Clamp-Primary': '12',
  'Clamp-Secondary': '13',
  'Leaf-Layer': '14',
  'Support': '15',
  'Support-Chassis Rigid': '16',
  'Support-Chassis': '17',
  'Support-Rubber 60mm': '18',
  'Support-Rubber': '19',

  // 3. 머신 바이스 (21-30)
  'Part1 Fuhrung': '21',
  'Part1': '22',
  'Part2 Feste Backe': '23',
  'Part3-lose backe': '24',
  'Part4 spindelsockel': '25',
  'Part5-Spannbacke': '26',
  'Part6-fuhrungschiene': '27',
  'Part7-TrapezSpindel': '28',
  'Part8-grundplatte': '29',
  'Part9-Druckhulse': '30',

  // 4. 로봇 암 (31-40)
  'base': '31',
  'Part2': '32',
  'Part3': '33',
  'Part4': '34',
  'Part5': '35',
  'Part6': '36',
  'Part7': '37',
  'Part8': '38',

  // 5. 로봇 그리퍼 (41-50)
  'Base Gear': '41',
  'Base Mounting bracket': '42',
  'Base Plate': '43',
  'Gear link 1': '44',
  'Gear link 2': '45',
  'Gripper': '46',
  'Link': '47',
  'Pin': '48',

  // 6. 서스펜션 (51-60)
  'BASE': '51',
  'NIT': '52',
  'NUT': '53',
  'ROD': '54',
  'SPRING': '55',

  // 7. V4 엔진 (61-70)
  'Connecting Rod Cap': '61',
  'Connecting Rod': '62',
  'Conrod Bolt': '63',
  'Crankshaft': '64',
  'Piston Pin': '65',
  'Piston Ring': '66',
  'Piston': '67',
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