import ModelCard from "./ModelCard";
import type { ModelItem } from "@/types/model";

const defaultModels: ModelItem[] = [
  {
    id: "drone1",
    name: "쿼드콥터 드론 시스템 구조 3D 시뮬레이션",
    tags: ["고급 과정", "쿼드콥터", "항공/무인기", "완성형 시스템"],
    modelUrl: [
      "/models/drone/Main frame.glb",
      "/models/drone/Arm gear.glb",
      "/models/drone/Beater disc.glb",
      "/models/drone/Gearing.glb",
      "/models/drone/xyz.glb",
      "/models/drone/Screw.glb",
      "/models/drone/Nut.glb",
      "/models/drone/Main frame_MIR.glb",
      "/models/drone/Leg.glb",
      "/models/drone/Impellar Blade.glb",
    ],
    thumbnail: "/img/1.png",
  },
  {
    id: "spring",
    name: "리프 스프링 시스템 구조 3D 시뮬레이션",
    tags: ["초급 과정", "리프 스프링", "모빌리티/자동차", "단품"],
    modelUrl: [
      "/models/spring/Clamp-Center.glb",
      "/models/spring/Clamp-Secondary.glb",
      "/models/spring/Support-Chassis Rigid.glb",
      "/models/spring/Support-Rubber 60mm.glb",
      "/models/spring/Support.glb",
      "/models/spring/Leaf-Layer.glb",
      "/models/spring/Support-Chassis.glb",
      "/models/spring/Support-Rubber.glb",
      "/models/spring/Clamp-Primary.glb",
    ],
    thumbnail: "/img/2.png",
  },
  {
    id: "machine",
    name: "기계 바이스 시스템 구조 3D 시뮬레이션",
    tags: ["고급 과정", "기계 바이스", "제조/자동화", "완성형 시스템"],
    modelUrl: [
      "/models/machine/Part1 Fuhrung.glb",
      "/models/machine/Part2 Feste Backe.glb",
      "/models/machine/Part4 spindelsockel.glb",
      "/models/machine/Part6-fuhrungschiene.glb",
      "/models/machine/Part8-grundplatte.glb",
      "/models/machine/Part1.glb",
      "/models/machine/Part3-lose backe.glb",
      "/models/machine/Part5-Spannbacke.glb",
      "/models/machine/Part7-TrapezSpindel.glb",
      "/models/machine/Part9-Druckhulse.glb",
    ],
    thumbnail: "/img/3.jpg",
  },
  {
    id: "robotArm",
    name: "로봇 팔 시스템 구조 3D 시뮬레이션",
    tags: ["고급 과정", "로봇 팔", "제조/자동화", "완성형 시스템"],
    modelUrl: [
      "/models/robotArm/Part2.glb",
      "/models/robotArm/Part3.glb",
      "/models/robotArm/Part4.glb",
      "/models/robotArm/Part5.glb",
      "/models/robotArm/Part6.glb",
      "/models/robotArm/Part7.glb",
      "/models/robotArm/Part8.glb",
      "/models/robotArm/base.glb",
    ],
    thumbnail: "/img/4.png",
  },
  {
    id: "robotGr",
    name: "로봇 그리퍼 매커니즘 시스템 구조 3D 시뮬레이션",
    tags: ["중급 과정", "로봇 그리퍼 매커니즘", "제조/자동화", "요소 조립체"],
    modelUrl: [
      "/models/robotGr/Base Gear.glb",
      "/models/robotGr/Base Plate.glb",
      "/models/robotGr/Gear link 2.glb",
      "/models/robotGr/Link.glb",
      "/models/robotGr/Base Mounting bracket.glb",
      "/models/robotGr/Gear link 1.glb",
      "/models/robotGr/Gripper.glb",
      "/models/robotGr/Pin.glb",
    ],
    thumbnail: "/img/5.png",
  },
  {
    id: "suspention",
    name: "Shock absorber 시스템 구조 3D 시뮬레이션",
    tags: ["중급 과정", "Shock absorber", "모빌리티/자동차", "요소 조립체"],
    modelUrl: [
      "/models/suspention/BASE.glb",
      "/models/suspention/NIT.glb",
      "/models/suspention/NUT.glb",
      "/models/suspention/ROD.glb",
      "/models/suspention/SPRING.glb",
    ],
    thumbnail: "/img/6.png",
  },
  {
    id: "v4",
    name: "크랭크샤프트 어셈블리 시스템 구조 3D 시뮬레이션",
    tags: ["중급 과정", "크랭크샤프트 어셈블리", "모빌리티/자동차", "요소 조립체"],
    modelUrl: [
      "/models/v4/Connecting Rod Cap.glb",
      "/models/v4/Connecting Rod.glb",
      "/models/v4/Conrod Bolt.glb",
      "/models/v4/Crankshaft.glb",
      "/models/v4/Piston Pin.glb",
      "/models/v4/Piston Ring.glb",
      "/models/v4/Piston.glb",
    ],
    thumbnail: "/img/6.png",
  },
];

interface ModelCardGridProps {
  items?: ModelItem[];
}

export default function ModelCardGrid({ items }: ModelCardGridProps) {
  const resolvedItems = items ?? defaultModels;

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3 ">
      {resolvedItems.map((item) => (
        <ModelCard key={item.id} item={item} />
      ))}
    </div>
  );
}
