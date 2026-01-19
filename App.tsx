import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  MiniMap,
  NodeTypes,
} from 'reactflow';

import { useStore } from './store';
import { Toolbar } from './components/Toolbar';
import { SubmitButton } from './components/SubmitButton';
import { NodeType } from './types';

// Node Components
import { InputNode, OutputNode, LLMNode } from './components/nodes/PrimitiveNodes';
import { TextNode } from './components/nodes/TextNode';
import { NoteNode, EmailNode, TranslationNode, APINode, FilterNode, LoggerNode, ConditionNode, MergeNode, DelayNode, TransformNode } from './components/nodes/AdvancedNodes';

// Register Node Types
const nodeTypes: NodeTypes = {
  [NodeType.INPUT]: InputNode,
  [NodeType.OUTPUT]: OutputNode,
  [NodeType.TEXT]: TextNode,
  [NodeType.LLM]: LLMNode,
  [NodeType.NOTE]: NoteNode,
  [NodeType.EMAIL]: EmailNode,
  [NodeType.TRANSLATION]: TranslationNode,
  [NodeType.API]: APINode,
  [NodeType.FILTER]: FilterNode,
  [NodeType.LOGGER]: LoggerNode,
  [NodeType.CONDITION]: ConditionNode,
  [NodeType.MERGE]: MergeNode,
  [NodeType.DELAY]: DelayNode,
  [NodeType.TRANSFORM]: TransformNode,
};

const PipelineBuilder = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode
  } = useStore();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Initialize node data. For TEXT nodes, include a default text and variables
      // so their variable handles are rendered immediately (avoids handle registration races).
      const baseData: any = { label: `${type} node` };
      if (type === NodeType.TEXT) {
        baseData.text = '{{input}}';
        baseData.variables = ['input'];
      }

      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: baseData,
      };

      addNode(newNode);
    },
    [reactFlowInstance, nodes, addNode]
  );

  // Styling for Edges - Dark Mode Fixed
  const defaultEdgeOptions = {
    style: { 
      stroke: '#a5b4fc', // Indigo-300
      strokeWidth: 2,
    },
    type: 'smoothstep',
    animated: true,
  };

  return (
    <div className="dark flex flex-col h-screen overflow-hidden relative transition-colors duration-300 bg-[#050505] text-slate-200">
      
      {/* Aurora Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-500">
           {/* Top Left Purple Glow */}
          <div 
            className={`
              absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] mix-blend-screen animate-pulse
              bg-purple-700/20
            `} 
            style={{ animationDuration: '8s' }} 
          />
           {/* Bottom Right Blue Glow */}
          <div 
            className={`
              absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] mix-blend-screen
              bg-indigo-700/20
            `} 
          />
           {/* Center Indigo Accent */}
          <div 
            className={`
              absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full blur-[150px] mix-blend-screen
              bg-violet-900/20
            `} 
          />
      </div>

      {/* Header */}
      <div className="
        relative z-10 flex items-center justify-between px-6 py-4 border-b transition-all duration-200 backdrop-blur-md
        bg-black/20 border-white/10
      ">
         <div className="flex items-center gap-4">
           <div className={`flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold shadow-lg shadow-purple-900/20`}>
             VS
           </div>
           <h1 className="text-xl font-bold text-slate-100">
             VectorShift <span className="text-indigo-400 font-normal">Pipelines</span>
           </h1>
         </div>
         
         <div className="flex items-center gap-4">
            <SubmitButton />
         </div>
      </div>

      {/* Toolbar */}
      <div className="relative z-10">
        <Toolbar />
      </div>

      {/* Canvas Area */}
      <div className="flex-grow w-full h-full relative z-0" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
          className="bg-transparent"
        >
          <Background 
            color="#6366f1" 
            gap={25} 
            size={1}
            className="opacity-20"
          />
          <Controls 
            className="
              !bg-black/40 
              !border-white/10 
              !fill-slate-200 
              backdrop-blur-md shadow-xl rounded-lg overflow-hidden
            " 
          />
          <MiniMap 
            className="
              !bg-black/40 
              !border-white/10 
              backdrop-blur-md rounded-lg overflow-hidden
            "
            nodeColor="#6366f1" 
            maskColor="rgba(0, 0, 0, 0.6)"
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ReactFlowProvider>
      <PipelineBuilder />
    </ReactFlowProvider>
  );
}