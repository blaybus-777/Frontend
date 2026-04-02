export interface SelectedPart {
  name: string;
  materialName: string | null;
  role: string | null;
}

export type PartInfoMap = Record<string, { role?: string }>;
