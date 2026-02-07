export interface PartNode {
  id: string;
  name: string;
  children?: PartNode[];
}

export const DRONE_PARTS: PartNode[] = [
  {
    id: "drone",
    name: "전체 드론",
    children: [
      {
        id: "wing",
        name: "날개",
        children: [
          { id: "arm-gear", name: "Arm gear" },
          { id: "impellar-blade", name: "Impellar Blade" },
          { id: "gearing", name: "Gearing" },
        ],
      },
      {
        id: "body",
        name: "몸통",
        children: [
          { id: "main-frame", name: "Main Frame" },
          { id: "xyz", name: "xyz" },
          { id: "main-frame-mir", name: "Main frame_MIR" },
          { id: "beater-disc", name: "Beater disc" },
          { id: "leg", name: "Leg" },
          { id: "nut", name: "Nut" },
          { id: "screw", name: "Screw" },
        ],
      },
    ],
  },
];
