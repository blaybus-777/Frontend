export interface AssetData {
  image: string;
  parts: Record<string, string>;
}

export const FINAL_ASSET_URLS: Partial<Record<string, string>> = {
  Quadcopter_DRONE: '/models/final/Drone2.glb',
};

export const ASSETS: Record<string, AssetData> = {
  Quadcopter_DRONE: {
    image: '/img/1.png',
    parts: {
      main_frame: '/models/drone/Main frame.glb',
      arm_gear: '/models/drone/Arm gear.glb',
      beater_disc: '/models/drone/Beater disc.glb',
      gearing: '/models/drone/Gearing.glb',
      xyz: '/models/drone/xyz.glb',
      screw: '/models/drone/Screw.glb',
      nut: '/models/drone/Nut.glb',
      main_frame_mir: '/models/drone/Main frame_MIR.glb',
      leg: '/models/drone/Leg.glb',
      impeller_blade: '/models/drone/Impellar Blade.glb',
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
      part2: '/models/robotArm/Part2.glb',
      part3: '/models/robotArm/Part3.glb',
      part4: '/models/robotArm/Part4.glb',
      part5: '/models/robotArm/Part5.glb',
      part6: '/models/robotArm/Part6.glb',
      part7: '/models/robotArm/Part7.glb',
      part8: '/models/robotArm/Part8.glb',
      base: '/models/robotArm/base.glb',
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
      base: '/models/suspention/BASE.glb',
      nit: '/models/suspention/NIT.glb',
      nut: '/models/suspention/NUT.glb',
      rod: '/models/suspention/ROD.glb',
      spring: '/models/suspention/SPRING.glb',
    },
  },
  V4_ENGINE: {
    image: '/img/7.png',
    parts: {
      connecting_rod_cap: '/models/v4/Connecting Rod Cap.glb',
      connecting_rod: '/models/v4/Connecting Rod.glb',
      conrod_bolt: '/models/v4/Conrod Bolt.glb',
      crankshaft: '/models/v4/Crankshaft.glb',
      piston_pin: '/models/v4/Piston Pin.glb',
      piston_ring: '/models/v4/Piston Ring.glb',
      piston: '/models/v4/Piston.glb',
    },
  },
};