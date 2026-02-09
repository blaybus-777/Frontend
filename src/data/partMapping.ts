export const DRONE_PART_ID_TO_FILE: Record<string, string> = {
  '1': 'Arm gear.glb',
  '4': 'Impellar Blade.glb',
  '3': 'Gearing.glb',
  '7': 'Main frame.glb',
  '10': 'xyz.glb',
  '6': 'Main frame_MIR.glb',
  '2': 'Beater disc.glb',
  '5': 'Leg.glb',
  '8': 'Nut.glb',
  '9': 'Screw.glb',
};

// GLB 파일 이름(Mesh 이름) -> Hierarchy Tree ID 매핑
export const PART_ID_MAPPING: Record<string, string> = {
  // 1. 드론 (1-10)
  'Arm gear': '1',
  'Beater disc': '2',
  Gearing: '3',
  'Impellar Blade': '4',
  Leg: '5',
  'Main frame_MIR': '6',
  'Main frame': '7',
  Nut: '8',
  Screw: '9',
  xyz: '10',

  // 2. 리프 스프링 (11-20)
  'Clamp-Center': '11',
  'Clamp-Primary': '12',
  'Clamp-Secondary': '13',
  'Leaf-Layer': '14',
  Support: '15',
  'Support-Chassis Rigid': '16',
  'Support-Chassis': '17',
  'Support-Rubber 60mm': '18',
  'Support-Rubber': '19',

  // 3. 머신 바이스 (21-30)
  'Part1 Fuhrung': '21',
  Part1: '22',
  'Part2 Feste Backe': '23',
  'Part3-lose backe': '24',
  'Part4 spindelsockel': '25',
  'Part5-Spannbacke': '26',
  'Part6-fuhrungschiene': '27',
  'Part7-TrapezSpindel': '28',
  'Part8-grundplatte': '29',
  'Part9-Druckhulse': '30',

  // 4. 로봇 암 (31-40)
  base: '31',
  Part2: '32',
  Part3: '33',
  Part4: '34',
  Part5: '35',
  Part6: '36',
  Part7: '37',
  Part8: '38',

  // 5. 로봇 그리퍼 (41-50)
  'Base Gear': '41',
  'Base Mounting bracket': '42',
  'Base Plate': '43',
  'Gear link 1': '44',
  'Gear link 2': '45',
  Gripper: '46',
  Link: '47',
  Pin: '48',

  // 6. 서스펜션 (51-60)
  BASE: '51',
  NIT: '52',
  NUT: '53',
  ROD: '54',
  SPRING: '55',

  // 7. V4 엔진 (61-70)
  'Connecting Rod Cap': '61',
  'Connecting Rod': '62',
  'Conrod Bolt': '63',
  Crankshaft: '64',
  'Piston Pin': '65',
  'Piston Ring': '66',
  Piston: '67',
};

// 반대 매핑: ID -> Mesh 이름
export const PART_NAME_MAPPING: Record<string, string> = Object.entries(
  PART_ID_MAPPING
).reduce(
  (acc, [name, id]) => {
    acc[id] = name;
    return acc;
  },
  {} as Record<string, string>
);
