export interface AssetData {
  image: string;
  modelUrls: string[];
}

export const FINAL_ASSET_URLS: Partial<Record<keyof typeof ASSETS, string>> = {
  Quadcopter_DRONE: '/models/last/final/Drone.glb',
  V4_ENGINE: '/models/last/final/v4.glb',
  ROBOT_ARM: '/models/last/final/RobotArm.glb',
  SUSPENSION: '/models/last/final/Suspention1.glb',
};

export const FINAL_PREVIEW_URLS = FINAL_ASSET_URLS;

export const ASSETS: Record<string, AssetData> = {
  Quadcopter_DRONE: {
    image: '/img/1.png',
    modelUrls: [
      '/models/last/drone/Main_Frame.glb',
      '/models/last/drone/Arm Gear.glb',
      '/models/last/drone/Beater_Disc.glb',
      '/models/last/drone/Gearing.glb',
      '/models/last/drone/xyz.glb',
      '/models/last/drone/Screw.glb',
      '/models/last/drone/Nut.glb',
      '/models/last/drone/Main_Frame_MIR.glb',
      '/models/last/drone/Leg.glb',
      '/models/last/drone/Impeller_blade.glb',
    ],
  },
  ROBOT_ARM: {
    image: '/img/4.png',
    modelUrls: [
      '/models/last/robotArm/Actuator_Hoursing.glb',
      '/models/last/robotArm/End_Effector_Mount1.glb',
      '/models/last/robotArm/Wrist_Joint.glb',
      '/models/last/robotArm/Parallel_Gripper.glb',
      '/models/last/robotArm/Link_Arm.glb',
      '/models/last/robotArm/Join_Bracket.glb',
      '/models/last/robotArm/Rotary_Base.glb',
      '/models/last/robotArm/Join_Coupling.glb',
    ],
  },
  SUSPENSION: {
    image: '/img/6.png',
    modelUrls: [
      '/models/last/suspention/Base.glb',
      '/models/last/suspention/Rod.glb',
      '/models/last/suspention/Nut1.glb',
      '/models/last/suspention/Spring.glb',
    ],
  },
  V4_ENGINE: {
    image: '/img/7.png',
    modelUrls: [
      '/models/last/v4/Connecting_Rod_Cap.glb',
      '/models/last/v4/Conecting_Rod.glb',
      '/models/last/v4/Conrod_Bolt.glb',
      '/models/last/v4/Cranksharft.glb',
      '/models/last/v4/Piston_Pin.glb',
      '/models/last/v4/Piston_Ring.glb',
      '/models/last/v4/Piston.glb',
    ],
  },
};
