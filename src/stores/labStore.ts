import { create } from 'zustand';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type NodeChange,
} from '@xyflow/react';
import type { LabNode, LabNodeData } from '@/types/lab';

interface LabState {
  nodes: LabNode[];
  edges: Edge[];
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  setNodes: (nodes: LabNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  applyNodeChanges: (changes: NodeChange<LabNode>[]) => void;
  applyEdgeChanges: (changes: EdgeChange[]) => void;
  addConnection: (connection: Connection) => void;
  updateNodeData: (
    nodeId: string,
    updater: (data: LabNodeData) => LabNodeData
  ) => void;
  addNode: (node: LabNode) => void;
  deleteNode: (nodeId: string) => void;
}

export const useLabStore = create<LabState>((set) => ({
  nodes: [],
  edges: [],
  hydrated: false,
  setHydrated: (value) => set({ hydrated: value }),
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  applyNodeChanges: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),
  applyEdgeChanges: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),
  addConnection: (connection) =>
    set((state) => ({
      edges: addEdge({ ...connection, animated: true }, state.edges),
    })),
  updateNodeData: (nodeId, updater) =>
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id !== nodeId) return node;
        return {
          ...node,
          data: updater(node.data),
        };
      }),
    })),
  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),
  deleteNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    })),
}));
