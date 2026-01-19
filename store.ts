import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

interface StoreState {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (node: Node) => void;
  updateNodeData: (nodeId: string, data: any) => void;
  deleteNode: (id: string) => void;
}

// Using the curried create syntax is safer for some ESM environments
export const useStore = create<StoreState>()((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    // Robust edge creation with retries to avoid timing races when target
    // handles are created dynamically (e.g. TextNode variable handles).
    console.info('onConnect: attempt to add edge', connection);

    const isHandleRegistered = (handleId?: string) => {
      if (!handleId) return true;
      try {
        // React Flow may render handle identifiers in a few different DOM
        // attributes depending on version. Check several possibilities to
        // robustly detect the handle element before creating an edge.
        const selectors = [
          `[data-handleid="${handleId}"]`,
          `[data-handle-id="${handleId}"]`,
          `.react-flow__handle[id="${handleId}"]`,
          `.react-flow__handle[data-handleid*="${handleId}"]`,
          `.react-flow__handle[data-handle-id*="${handleId}"]`
        ];

        for (const sel of selectors) {
          if (document.querySelector(sel)) return true;
        }

        // Fallback: scan all handle elements and look for the id inside any
        // of their attributes (covers cases where the handle id is namespaced).
        const handles = Array.from(document.querySelectorAll('.react-flow__handle'));
        for (const h of handles) {
          const attrs = h.attributes;
          for (let i = 0; i < attrs.length; i++) {
            if (String(attrs[i].value).includes(handleId)) return true;
          }
        }

        return false;
      } catch (e) {
        return false;
      }
    };

    const tryAdd = (attempt = 1, maxAttempts = 12, delay = 50) => {
      // If target handle not yet registered in the DOM, wait and retry.
      if (connection.targetHandle && !isHandleRegistered(connection.targetHandle)) {
        if (attempt >= maxAttempts) {
          // eslint-disable-next-line no-console
          console.error(`onConnect: target handle not registered after ${attempt} attempts`, connection);
          return;
        }
        // eslint-disable-next-line no-console
        console.warn(`onConnect: target handle ${connection.targetHandle} not found, retry ${attempt}/${maxAttempts}`);
        setTimeout(() => tryAdd(attempt + 1, maxAttempts, delay), delay);
        return;
      }

      try {
        set({ edges: addEdge(connection, get().edges) });
        console.info('onConnect: edge added');
      } catch (err) {
        if (attempt >= maxAttempts) {
          // eslint-disable-next-line no-console
          console.error(`onConnect: failed after ${attempt} attempts`, err, connection);
          return;
        }
        // eslint-disable-next-line no-console
        console.warn(`onConnect: addEdge failed on attempt ${attempt}, retrying in ${delay}ms`);
        setTimeout(() => tryAdd(attempt + 1, maxAttempts, delay), delay);
      }
    };

    // Start the first try (non-blocking)
    tryAdd();
  },
  addNode: (node: Node) => {
    set({ nodes: [...get().nodes, node] });
  },
  updateNodeData: (nodeId: string, data: any) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...data } };
        }
        return node;
      }),
    });
  },
  deleteNode: (id: string) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter((edge) => edge.source !== id && edge.target !== id),
    });
  },
}));