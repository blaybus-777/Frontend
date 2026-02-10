import { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Edge,
  type NodeTypes,
} from '@xyflow/react';
import LabNoteNode from './LabNoteNode';
import type { LabNode } from '@/types/lab';
import { useLabStore } from '@/stores/labStore';
import useLabStorage from '@/hooks/useLabStorage';
import useLabFlowHandlers from '@/hooks/useLabFlowHandlers';
import { useShallow } from 'zustand/react/shallow';

export default function LabFlow() {
  useLabStorage();

  const { nodes, edges, updateNodeData, deleteNode } = useLabStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      updateNodeData: state.updateNodeData,
      deleteNode: state.deleteNode,
    }))
  );

  const {
    reactFlowWrapper,
    handleAddNode,
    onConnect,
    onNodesChange,
    onEdgesChange,
    onNodesDelete,
  } = useLabFlowHandlers();

  const nodesWithHandlers = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onTitleChange: (id: string, value: string) =>
          updateNodeData(id, (data) => ({ ...data, title: value })),
        onTextChange: (id: string, value: string) =>
          updateNodeData(id, (data) => ({ ...data, text: value })),
        onAddLink: (id: string, url: string) => {
          const trimmed = url.trim();
          if (!trimmed) return;
          updateNodeData(id, (data) => ({
            ...data,
            attachments: [
              ...data.attachments,
              {
                id: crypto.randomUUID(),
                type: 'link',
                name: trimmed.replace(/^https?:\/\//, ''),
                url: trimmed,
              },
            ],
          }));
        },
        onAddFiles: (id: string, files: FileList) => {
          const newAttachments = Array.from(files).map((file) => ({
            id: crypto.randomUUID(),
            type: 'file' as const,
            name: file.name,
            url: URL.createObjectURL(file),
          }));
          updateNodeData(id, (data) => ({
            ...data,
            attachments: [...data.attachments, ...newAttachments],
          }));
        },
        onRemoveAttachment: (id: string, attachmentId: string) => {
          updateNodeData(id, (data) => {
            const target = data.attachments.find(
              (item) => item.id === attachmentId
            );
            if (target?.type === 'file') {
              URL.revokeObjectURL(target.url);
            }
            return {
              ...data,
              attachments: data.attachments.filter(
                (item) => item.id !== attachmentId
              ),
            };
          });
        },
        onDeleteNode: (id: string) => {
          deleteNode(id);
        },
      },
    }));
  }, [deleteNode, nodes, updateNodeData]);

  const nodeTypes = useMemo<NodeTypes>(() => ({ labNote: LabNoteNode }), []);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex-1" ref={reactFlowWrapper}>
          <div className="absolute top-6 right-6 z-20">
            <button
              type="button"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
              onClick={handleAddNode}
            >
              새 노드
            </button>
          </div>
          <ReactFlow<LabNode, Edge>
            nodes={nodesWithHandlers}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodesDelete={onNodesDelete}
            onConnect={onConnect}
            fitView
            fitViewOptions={{ padding: 0.25 }}
            defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
          >
            <Background gap={18} size={1} color="#D0D7E2" />
            <MiniMap
              nodeColor={() => '#60a5fa'}
              maskColor="rgba(15, 23, 42, 0.12)"
              className="rounded-lg"
            />
            <Controls position="bottom-right" />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
