// 1. Model ID별 백엔드 Code -> Part ID 매핑
// Model ID: 드론(1), 로봇암(4), 서스펜션(6), V4엔진(7)
export const PART_CODE_TO_ID: Record<string, Record<string, string>> = {
  '1': {
    // 드론 (Part ID: 1-10)
    arm_gear: '1',
    beater_disc: '2',
    gearing: '3',
    impeller_blade: '4',
    leg: '5',
    main_frame: '6',
    main_frame_mir: '7',
    nut: '8',
    screw: '9',
    xyz: '10',
  },
  '4': {
    // 로봇 암 (Part ID: 30-37)
    rotary_base: '30',
    joint_bracket: '31',
    link_arm: '32',
    actuator_housing: '33',
    joint_coupling: '34',
    wrist_joint: '35',
    end_effector_mount: '36',
    parallel_gripper: '37',
  },
  '6': {
    // 서스펜션 (Part ID: 71-75)
    base: '71',
    nit: '72',
    nut: '73',
    rod: '74',
    spring: '75',
  },
  '7': {
    // V4 엔진 (Part ID: 51-57)
    connecting_rod_cap: '51',
    connecting_rod: '52',
    conrod_bolt: '53',
    crankshaft: '54',
    piston_pin: '55',
    piston_ring: '56',
    piston: '57',
  },
};

// Asset Key → Model ID 매핑
export const ASSET_KEY_TO_MODEL_ID: Record<string, string> = {
  Quadcopter_DRONE: '1',
  ROBOT_ARM: '4',
  SUSPENSION: '6',
  V4_ENGINE: '7',
};

// 2. 3D Mesh 이름 -> 백엔드 Code 매핑
// GLB 파일 내부의 Mesh 명칭을 시스템 시스템 코드(snake_case)로 연결합니다.
export const MESH_NAME_TO_CODE: Record<string, string> = {
  // 드론
  'Arm Gear': 'arm_gear',
  'Beater Disc': 'beater_disc',
  Gearing: 'gearing',
  'Impeller Blade': 'impeller_blade',
  Leg: 'leg',
  'Main Frame': 'main_frame',
  'Main Frame_MIR': 'main_frame_mir',
  Nut: 'nut',
  Screw: 'screw',
  xyz: 'xyz',

  // 로봇 암
  'Rotary Base': 'rotary_base',
  'Joint Bracket': 'joint_bracket',
  'Link Arm': 'link_arm',
  'Actuator Housing': 'actuator_housing',
  'Joint Coupling': 'joint_coupling',
  'Wrist Joint': 'wrist_joint',
  'End Effector Mount': 'end_effector_mount',
  'Parallel Gripper': 'parallel_gripper',

  // 서스펜션
  BASE: 'base',
  NUT: 'nut',
  ROD: 'rod',
  SPRING: 'spring',

  // V4 엔진
  'Connecting Rod Cap': 'connecting_rod_cap',
  'Connecting Rod': 'connecting_rod',
  'Conrod Bolt': 'conrod_bolt',
  Crankshaft: 'crankshaft',
  'Piston Pin': 'piston_pin',
  'Piston Ring': 'piston_ring',
  Piston: 'piston',

  // 2. 리프 스프링 (추후 Code 확정 시 업데이트 필요)
  'Clamp-Center': 'clamp_center',
  'Clamp-Primary': 'clamp_primary',
  'Clamp-Secondary': 'clamp_secondary',
  'Leaf-Layer': 'leaf_layer',
  Support: 'support',
  'Support-Chassis Rigid': 'support_chassis_rigid',
  'Support-Chassis': 'support_chassis',
  'Support-Rubber 60mm': 'support_rubber_60mm',
  'Support-Rubber': 'support_rubber',
};

// 3. 기존 호환성을 위한 파생 매핑 (Mesh Name -> Part ID)
// Model ID별로분리된 매핑을 flat하게 병합
export const PART_ID_MAPPING: Record<string, string> = Object.entries(
  MESH_NAME_TO_CODE
).reduce(
  (acc, [mesh, code]) => {
    // 모든 모델에서 해당 code 찾기
    for (const modelMappings of Object.values(PART_CODE_TO_ID)) {
      const id = modelMappings[code];
      if (id) {
        acc[mesh] = id;
        break;
      }
    }
    return acc;
  },
  {} as Record<string, string>
);

// 4. 역방향 매핑 (Part ID -> Mesh Name)
export const PART_NAME_MAPPING: Record<string, string> = Object.entries(
  PART_ID_MAPPING
).reduce(
  (acc, [name, id]) => {
    acc[id] = name;
    return acc;
  },
  {} as Record<string, string>
);

// 5. Part ID -> Code 매핑 (Code 기반 URL 매칭에 사용)
// Model ID별로 분리된 매핑을 flat하게 병합
export const PART_ID_TO_CODE: Record<string, string> = Object.values(
  PART_CODE_TO_ID
).reduce(
  (acc, modelMappings) => {
    Object.entries(modelMappings).forEach(([code, id]) => {
      acc[id] = code;
    });
    return acc;
  },
  {} as Record<string, string>
);

/**
 * @deprecated ASSETS의 code 기반 경로를 직접 사용하도록 변경 권장
 */
export const DRONE_PART_ID_TO_FILE: Record<string, string> = {
  '1': 'Arm Gear.glb',
  '4': 'Impeller Blade.glb',
  '3': 'Gearing.glb',
  '6': 'Main Frame.glb',
  '10': 'xyz.glb',
  '7': 'Main Frame_MIR.glb',
  '2': 'Beater Disc.glb',
  '5': 'Leg.glb',
  '8': 'Nut.glb',
  '9': 'Screw.glb',
};
