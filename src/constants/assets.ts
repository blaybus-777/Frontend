export interface AssetData {
  image: string;
  parts: Record<string, string>;
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
    parts: {
      main_frame: '/models/last/drone/Main_Frame.glb',
      arm_gear: '/models/last/drone/Arm Gear.glb',
      beater_disc: '/models/last/drone/Beater_Disc.glb',
      gearing: '/models/last/drone/Gearing.glb',
      xyz: '/models/last/drone/xyz.glb',
      screw: '/models/last/drone/Screw.glb',
      nut: '/models/last/drone/Nut.glb',
      main_frame_mir: '/models/last/drone/Main_Frame_MIR.glb',
      leg: '/models/last/drone/Leg.glb',
      impeller_blade: '/models/last/drone/Impeller_blade.glb',
    },
  },
  LEAF_SPRING: {
    image: '/img/2.png',
    parts: {
      clamp_center: '/models/spring/Clamp-Center.glb',
      clamp_secondary: '/models/spring/Clamp-Secondary.glb',
      support_chassis_rigid: '/models/spring/Support-Chassis Rigid.glb',
      support_rubber_60mm: '/models/spring/Support-Rubber 60mm.glb',
      support: '/models/spring/Support.glb',
      leaf_layer: '/models/spring/Leaf-Layer.glb',
      support_chassis: '/models/spring/Support-Chassis.glb',
      support_rubber: '/models/spring/Support-Rubber.glb',
      clamp_primary: '/models/spring/Clamp-Primary.glb',
    },
  },
  MACHINE_VICE: {
    image: '/img/3.jpg',
    parts: {
      part1_fuhrung: '/models/machine/Part1 Fuhrung.glb',
      part2_feste_backe: '/models/machine/Part2 Feste Backe.glb',
      part4_spindelsockel: '/models/machine/Part4 spindelsockel.glb',
      part6_fuhrungschiene: '/models/machine/Part6-fuhrungschiene.glb',
      part8_grundplatte: '/models/machine/Part8-grundplatte.glb',
      part1: '/models/machine/Part1.glb',
      part3_lose_backe: '/models/machine/Part3-lose backe.glb',
      part5_spannbacke: '/models/machine/Part5-Spannbacke.glb',
      part7_trapezspindel: '/models/machine/Part7-TrapezSpindel.glb',
      part9_druckhulse: '/models/machine/Part9-Druckhulse.glb',
    },
  },
  ROBOT_ARM: {
    image: '/img/4.png',
    parts: {
      actuator_housing: '/models/last/robotArm/Actuator_Hoursing.glb',
      end_effector_mount: '/models/last/robotArm/End_Effector_Mount1.glb',
      wrist_joint: '/models/last/robotArm/Wrist_Joint.glb',
      parallel_gripper: '/models/last/robotArm/Parallel_Gripper.glb',
      link_arm: '/models/last/robotArm/Link_Arm.glb',
      joint_bracket: '/models/last/robotArm/Join_Bracket.glb',
      rotary_base: '/models/last/robotArm/Rotary_Base.glb',
      joint_coupling: '/models/last/robotArm/Join_Coupling.glb',
    },
  },
  ROBOT_GRIPPER: {
    image: '/img/5.png',
    parts: {
      base_gear: '/models/robotGr/Base Gear.glb',
      base_plate: '/models/robotGr/Base Plate.glb',
      gear_link_2: '/models/robotGr/Gear link 2.glb',
      link: '/models/robotGr/Link.glb',
      base_mounting_bracket: '/models/robotGr/Base Mounting bracket.glb',
      gear_link_1: '/models/robotGr/Gear link 1.glb',
      gripper: '/models/robotGr/Gripper.glb',
      pin: '/models/robotGr/Pin.glb',
    },
  },
  SUSPENSION: {
    image: '/img/6.png',
    parts: {
      base: '/models/last/suspention/Base.glb',
      rod: '/models/last/suspention/Rod.glb',
      nut: '/models/last/suspention/Nut1.glb',
      spring: '/models/last/suspention/Spring.glb',
    },
  },
  V4_ENGINE: {
    image: '/img/7.png',
    parts: {
      connecting_rod_cap: '/models/last/v4/Connecting_Rod_Cap.glb',
      connecting_rod: '/models/last/v4/Conecting_Rod.glb',
      conrod_bolt: '/models/last/v4/Conrod_Bolt.glb',
      crankshaft: '/models/last/v4/Cranksharft.glb',
      piston_pin: '/models/last/v4/Piston_Pin.glb',
      piston_ring: '/models/last/v4/Piston_Ring.glb',
      piston: '/models/last/v4/Piston.glb',
    },
  },
};
