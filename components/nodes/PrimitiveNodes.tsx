import React, { useState } from 'react';
import { Position, NodeProps } from 'reactflow';
import { BaseNode, BaseHandle } from './BaseNode';
import { ArrowRightToLine, ArrowLeftFromLine, Bot } from 'lucide-react';

// --- Input Node ---
export const InputNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      icon={<ArrowRightToLine size={16} />}
      selected={selected}
      handles={[{ id: `${id}-value`, type: 'source', position: Position.Right, style: { top: '50%' } }]}
    >
      <div className="flex flex-col gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Name</label>
          <input
            type="text"
            value={currName}
            onChange={(e) => { setCurrName(e.target.value); data.inputName = e.target.value; }}
            className="
              w-full px-2 py-1.5 text-sm rounded-lg border focus:outline-none focus:border-indigo-500
              bg-white dark:bg-black/30 
              border-slate-200 dark:border-white/10 
              text-slate-800 dark:text-slate-200 
              placeholder-slate-400 dark:placeholder-slate-600
            "
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Type</label>
          <select
            value={inputType}
            onChange={(e) => { setInputType(e.target.value); data.inputType = e.target.value; }}
            className="
              w-full px-2 py-1.5 text-sm rounded-lg border focus:outline-none focus:border-indigo-500
              bg-white dark:bg-black/30 
              border-slate-200 dark:border-white/10 
              text-slate-800 dark:text-slate-200
            "
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};

// --- Output Node ---
export const OutputNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon={<ArrowLeftFromLine size={16} />}
      selected={selected}
      handles={[{ id: `${id}-value`, type: 'target', position: Position.Left, style: { top: '50%' } }]}
    >
      <div className="flex flex-col gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Name</label>
          <input
            type="text"
            value={currName}
            onChange={(e) => { setCurrName(e.target.value); data.outputName = e.target.value; }}
            className="
              w-full px-2 py-1.5 text-sm rounded-lg border focus:outline-none focus:border-indigo-500
              bg-white dark:bg-black/30 
              border-slate-200 dark:border-white/10 
              text-slate-800 dark:text-slate-200 
              placeholder-slate-400 dark:placeholder-slate-600
            "
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Type</label>
          <select
            value={outputType}
            onChange={(e) => { setOutputType(e.target.value); data.outputType = e.target.value; }}
            className="
              w-full px-2 py-1.5 text-sm rounded-lg border focus:outline-none focus:border-indigo-500
              bg-white dark:bg-black/30 
              border-slate-200 dark:border-white/10 
              text-slate-800 dark:text-slate-200
            "
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};

// --- LLM Node ---
export const LLMNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon={<Bot size={16} />}
      selected={selected}
      handles={[]}
    >
      <div className="flex flex-col gap-3">
         <div className="text-sm text-slate-600 dark:text-slate-300">
           This is a Large Language Model.
         </div>
         
         <div className="flex flex-col gap-3 mt-1">
            {/* System Row */}
            <div className="
              relative flex items-center h-8 rounded px-2 border
              bg-white dark:bg-black/30 
              border-slate-200 dark:border-white/10
            ">
                <BaseHandle 
                  id={`${id}-system`} 
                  type="target" 
                  position={Position.Left} 
                  style={{ top: '50%', left: '-18px' }} 
                />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">System</span>
            </div>

            {/* Prompt Row */}
            <div className="
              relative flex items-center h-8 rounded px-2 border
              bg-white dark:bg-black/30 
              border-slate-200 dark:border-white/10
            ">
                <BaseHandle 
                  id={`${id}-prompt`} 
                  type="target" 
                  position={Position.Left} 
                  style={{ top: '50%', left: '-18px' }} 
                />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Prompt</span>
            </div>

             {/* Response Row */}
             <div className="
               relative flex items-center justify-end h-8 rounded px-2 border
               bg-indigo-50 dark:bg-indigo-900/20 
               border-indigo-200 dark:border-indigo-500/20
             ">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Response</span>
                <BaseHandle 
                  id={`${id}-response`} 
                  type="source" 
                  position={Position.Right} 
                  style={{ top: '50%', right: '-18px' }} 
                />
            </div>
         </div>
      </div>
    </BaseNode>
  );
};