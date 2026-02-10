import { useCallback, useRef } from 'react';
import {
  useReactFlow,
  type Connection,
  type EdgeChange,
  type Node,
  type NodeChange,
} from '@xyflow/react';
import type { LabNode } from '@/types/lab';
import { useLabStore } from '@/stores/labStore';

interface LabFlowHandlers {
  reactFlowWrapper: React.RefObject<HTMLDivElement | null>;
  handleAddNode: () => void;
  onConnect: (connection: Connection) => void;
  onNodesChange: (changes: NodeChange<LabNode>[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onNodesDelete: (deleted: Node[]) => void;
}

export default function useLabFlowHandlers(): LabFlowHandlers {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  const addNode = useLabStore((state) => state.addNode);
  const addConnection = useLabStore((state) => state.addConnection);
  const applyNodeChanges = useLabStore((state) => state.applyNodeChanges);
  const applyEdgeChanges = useLabStore((state) => state.applyEdgeChanges);

  const onConnect = useCallback(
    (connection: Connection) => {
      addConnection(connection);
    },
    [addConnection]
  );

  const onNodesChange = useCallback(
    (changes: NodeChange<LabNode>[]) => {
      applyNodeChanges(changes);
    },
    [applyNodeChanges]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      applyEdgeChanges(changes);
    },
    [applyEdgeChanges]
  );

  const handleAddNode = useCallback(() => {
    const wrapperBounds = reactFlowWrapper.current?.getBoundingClientRect();
    const center = wrapperBounds
      ? {
          x: wrapperBounds.left + wrapperBounds.width / 2,
          y: wrapperBounds.top + wrapperBounds.height / 2,
        }
      : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const position = screenToFlowPosition(center);
    const id = crypto.randomUUID();
    const newNode: LabNode = {
      id,
      type: 'labNote',
      position,
      data: {
        title: '새 노트',
        text: '',
        attachments: [],
      },
    };
    addNode(newNode);
  }, [addNode, screenToFlowPosition]);

  const onNodesDelete = useCallback((deleted: Node[]) => {
    deleted.forEach((node) => {
      const attachments = (
        node.data as { attachments?: { type: string; url: string }[] }
      )?.attachments;
      attachments?.forEach((item) => {
        if (item.type === 'file') {
          URL.revokeObjectURL(item.url);
        }
      });
    });
  }, []);

  return {
    reactFlowWrapper,
    handleAddNode,
    onConnect,
    onNodesChange,
    onEdgesChange,
    onNodesDelete,
  };
}
