import type { Node } from '@xyflow/react';

export interface LabAttachment {
  id: string;
  type: 'file' | 'link';
  name: string;
  url: string;
}

export interface LabNodeData extends Record<string, unknown> {
  title: string;
  text: string;
  attachments: LabAttachment[];
  onTitleChange?: (id: string, value: string) => void;
  onTextChange?: (id: string, value: string) => void;
  onAddLink?: (id: string, url: string) => void;
  onAddFiles?: (id: string, files: FileList) => void;
  onRemoveAttachment?: (id: string, attachmentId: string) => void;
  onDeleteNode?: (id: string) => void;
}

export type LabNode = Node<LabNodeData, 'labNote'>;
