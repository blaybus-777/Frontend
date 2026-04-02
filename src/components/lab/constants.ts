import type { Edge } from '@xyflow/react';
import type { LabNode } from '@/types/lab';

export const LAB_STORAGE_KEY = 'lab-flow';

export const INITIAL_LAB_NODES: LabNode[] = [
  {
    id: 'node-1',
    type: 'labNote',
    position: { x: 120, y: 120 },
    data: {
      title: '워크 프로세스',
      text: '현재 단계에서 수정사항과 아이디어를 기록하세요.',
      attachments: [],
    },
  },
  {
    id: 'node-2',
    type: 'labNote',
    position: { x: 520, y: 240 },
    data: {
      title: '검토 메모',
      text: '검토 대상 링크와 파일을 정리하세요.',
      attachments: [],
    },
  },
];

export const INITIAL_LAB_EDGES: Edge[] = [
  {
    id: 'edge-1-2',
    source: 'node-1',
    target: 'node-2',
    animated: true,
  },
];
