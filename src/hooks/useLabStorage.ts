import { useEffect } from 'react';
import type { Edge } from '@xyflow/react';
import type { LabNode } from '@/types/lab';
import {
  INITIAL_LAB_EDGES,
  INITIAL_LAB_NODES,
  LAB_STORAGE_KEY,
} from '@/components/lab/constants';
import { useLabStore } from '@/stores/labStore';
import { useShallow } from 'zustand/react/shallow';

export default function useLabStorage() {
  const { nodes, edges, hydrated, setNodes, setEdges, setHydrated } =
    useLabStore(
      useShallow((state) => ({
        nodes: state.nodes,
        edges: state.edges,
        hydrated: state.hydrated,
        setNodes: state.setNodes,
        setEdges: state.setEdges,
        setHydrated: state.setHydrated,
      }))
    );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LAB_STORAGE_KEY);
      if (!raw) {
        setNodes(INITIAL_LAB_NODES);
        setEdges(INITIAL_LAB_EDGES);
        setHydrated(true);
        return;
      }
      const parsed = JSON.parse(raw) as { nodes: LabNode[]; edges: Edge[] };
      if (Array.isArray(parsed.nodes)) {
        setNodes(parsed.nodes);
      } else {
        setNodes(INITIAL_LAB_NODES);
      }
      if (Array.isArray(parsed.edges)) {
        setEdges(parsed.edges);
      } else {
        setEdges(INITIAL_LAB_EDGES);
      }
    } catch {
      setNodes(INITIAL_LAB_NODES);
      setEdges(INITIAL_LAB_EDGES);
    } finally {
      setHydrated(true);
    }
  }, [setEdges, setHydrated, setNodes]);

  useEffect(() => {
    if (!hydrated) return;
    if (nodes.length === 0 && edges.length === 0) return;
    const payload = {
      nodes: nodes.map((node) => ({
        ...node,
        data: {
          title: node.data.title,
          text: node.data.text,
          attachments: node.data.attachments.map((item) => ({
            ...item,
            url: item.type === 'file' ? '' : item.url,
          })),
        },
      })),
      edges,
    };
    try {
      localStorage.setItem(LAB_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore storage errors
    }
  }, [edges, hydrated, nodes]);
}
