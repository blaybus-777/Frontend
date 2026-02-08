export interface AssetData {
  image: string;
  modelUrls: string[];
}

export const FINAL_ASSET_URLS: Partial<Record<keyof typeof ASSETS, string>> = {
  DRONE: "/models/final/Drone2.glb",
};

export const MODEL_ID_TO_ASSET_KEY: Record<string, keyof typeof ASSETS> = {
  "1": "DRONE",
  "24": "DRONE",
  "2": "LEAF_SPRING",
  "3": "MACHINE_VISE",
  "4": "ROBOT_ARM",
  "5": "ROBOT_GRIPPER",
  "6": "SUSPENSION",
  "7": "V4_ENGINE",
};

export const ASSETS: Record<string, AssetData> = {
  DRONE: {
    image: '/img/1.png',
    modelUrls: [
      '/models/drone/Main frame.glb',
      '/models/drone/Arm gear.glb',
      '/models/drone/Beater disc.glb',
      '/models/drone/Gearing.glb',
      '/models/drone/xyz.glb',
      '/models/drone/Screw.glb',
      '/models/drone/Nut.glb',
      '/models/drone/Main frame_MIR.glb',
      '/models/drone/Leg.glb',
      '/models/drone/Impellar Blade.glb',
    ],
  },
  LEAF_SPRING: {
    image: '/img/2.png',
    modelUrls: [
      '/models/spring/Clamp-Center.glb',
      '/models/spring/Clamp-Secondary.glb',
      '/models/spring/Support-Chassis Rigid.glb',
      '/models/spring/Support-Rubber 60mm.glb',
      '/models/spring/Support.glb',
      '/models/spring/Leaf-Layer.glb',
      '/models/spring/Support-Chassis.glb',
      '/models/spring/Support-Rubber.glb',
      '/models/spring/Clamp-Primary.glb',
    ],
  },
  MACHINE_VISE: {
    image: '/img/3.jpg',
    modelUrls: [
      '/models/machine/Part1 Fuhrung.glb',
      '/models/machine/Part2 Feste Backe.glb',
      '/models/machine/Part4 spindelsockel.glb',
      '/models/machine/Part6-fuhrungschiene.glb',
      '/models/machine/Part8-grundplatte.glb',
      '/models/machine/Part1.glb',
      '/models/machine/Part3-lose backe.glb',
      '/models/machine/Part5-Spannbacke.glb',
      '/models/machine/Part7-TrapezSpindel.glb',
      '/models/machine/Part9-Druckhulse.glb',
    ],
  },
  ROBOT_ARM: {
    image: '/img/4.png',
    modelUrls: [
      '/models/robotArm/Part2.glb',
      '/models/robotArm/Part3.glb',
      '/models/robotArm/Part4.glb',
      '/models/robotArm/Part5.glb',
      '/models/robotArm/Part6.glb',
      '/models/robotArm/Part7.glb',
      '/models/robotArm/Part8.glb',
      '/models/robotArm/base.glb',
    ],
  },
  ROBOT_GRIPPER: {
    image: '/img/5.png',
    modelUrls: [
      '/models/robotGr/Base Gear.glb',
      '/models/robotGr/Base Plate.glb',
      '/models/robotGr/Gear link 2.glb',
      '/models/robotGr/Link.glb',
      '/models/robotGr/Base Mounting bracket.glb',
      '/models/robotGr/Gear link 1.glb',
      '/models/robotGr/Gripper.glb',
      '/models/robotGr/Pin.glb',
    ],
  },
  SUSPENSION: {
    image: '/img/6.png',
    modelUrls: [
      '/models/suspention/BASE.glb',
      '/models/suspention/NIT.glb',
      '/models/suspention/NUT.glb',
      '/models/suspention/ROD.glb',
      '/models/suspention/SPRING.glb',
    ],
  },
  V4_ENGINE: {
    image: '/img/7.png',
    modelUrls: [
      '/models/v4/Connecting Rod Cap.glb',
      '/models/v4/Connecting Rod.glb',
      '/models/v4/Conrod Bolt.glb',
      '/models/v4/Crankshaft.glb',
      '/models/v4/Piston Pin.glb',
      '/models/v4/Piston Ring.glb',
      '/models/v4/Piston.glb',
    ],
  },
};
