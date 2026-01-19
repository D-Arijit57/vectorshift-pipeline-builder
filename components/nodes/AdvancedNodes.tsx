import React from 'react';
import { Position, NodeProps } from 'reactflow';
import { BaseNode, BaseHandle } from './BaseNode';
import { StickyNote, Mail, Languages, Server, Filter, Bot, Terminal, SlidersHorizontal, Layers, Clock, Repeat } from 'lucide-react';

// --- Note Node ---
export const NoteNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      title="Note"
      icon={<StickyNote size={16} />}
      selected={selected}
      handles={[]}
    >
      <textarea
        className="
          w-full h-20 p-2 text-sm border rounded resize-none focus:outline-none
          bg-yellow-900/20 border-yellow-700/30 text-yellow-100 placeholder-yellow-500/50
        "
        placeholder="Add a note..."
        defaultValue={data?.text || ''}
        onChange={(e) => data.text = e.target.value}
      />
    </BaseNode>
  );
};

// --- Email Node ---
export const EmailNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      title="Send Email"
      icon={<Mail size={16} />}
      selected={selected}
      handles={[]}
    >
      <div className="flex flex-col gap-3">
         {/* Recipient Input */}
         <div className="
           relative flex items-center h-8 rounded px-2 border
           bg-black/30 border-white/10
         ">
            <BaseHandle id={`${id}-recipient`} type="target" position={Position.Left} style={{ top: '50%', left: '-18px' }} />
            <span className="text-xs font-medium text-slate-300">To (Email)</span>
         </div>
         
         {/* Body Input */}
         <div className="
           relative flex items-center h-8 rounded px-2 border
           bg-black/30 border-white/10
         ">
             <BaseHandle id={`${id}-body`} type="target" position={Position.Left} style={{ top: '50%', left: '-18px' }} />
            <span className="text-xs font-medium text-slate-300">Body</span>
         </div>

         {/* Trigger Output */}
         <div className="
           relative flex items-center justify-end h-8 rounded px-2 border
           bg-indigo-900/20 border-indigo-500/20
         ">
            <span className="text-xs font-medium text-indigo-400">On Sent</span>
            <BaseHandle id={`${id}-trigger`} type="source" position={Position.Right} style={{ top: '50%', right: '-18px' }} />
         </div>
         
         <div className="mt-2 border-t pt-2 border-white/10">
            <div className="text-xs text-slate-400 mb-1">Options</div>
             <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-3 h-3 text-indigo-600 rounded focus:ring-indigo-500 bg-slate-800 border-slate-600" />
                <span className="text-xs text-slate-400">Confidential</span>
            </label>
         </div>
      </div>
    </BaseNode>
  );
};

// --- Translation Node ---
export const TranslationNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      title="Translator"
      icon={<Languages size={16} />}
      selected={selected}
      handles={[]}
    >
       <div className="flex flex-col gap-3">
        <div className="relative flex items-center gap-2">
          <BaseHandle id={`${id}-input`} type="target" position={Position.Left} style={{ top: '50%', left: '-18px' }} />
          <select className="w-[80px] text-xs border p-1 rounded bg-black/30 border-white/10 text-slate-200">
            <option>English</option>
            <option>Spanish</option>
          </select>
          <span className="text-slate-500 text-xs">to</span>
          <select className="w-[80px] text-xs border p-1 rounded bg-black/30 border-white/10 text-slate-200">
            <option>French</option>
            <option>German</option>
          </select>
          <BaseHandle id={`${id}-output`} type="source" position={Position.Right} style={{ top: '50%', right: '-18px' }} />
        </div>
        <div className="text-xs text-slate-500 text-center">Auto-translates input text</div>
      </div>
    </BaseNode>
  );
};

// --- API Node ---
export const APINode: React.FC<NodeProps> = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      title="API Call"
      icon={<Server size={16} />}
      selected={selected}
      handles={[]}
    >
      <div className="flex flex-col gap-3">
         <div className="flex gap-1 relative">
             <select className="text-xs border p-1 rounded font-mono w-[70px] bg-black/30 border-white/10 text-slate-200">
                <option>GET</option>
                <option>POST</option>
             </select>
             <input type="text" placeholder="https://api..." className="text-xs border p-1 rounded w-full bg-black/30 border-white/10 text-slate-200" />
         </div>

         {/* Params Input */}
         <div className="
           relative flex items-center h-8 rounded px-2 border
           bg-black/30 border-white/10
         ">
            <BaseHandle id={`${id}-params`} type="target" position={Position.Left} style={{ top: '50%', left: '-18px' }} />
            <span className="text-xs font-medium text-slate-300">Params (JSON)</span>
         </div>

         {/* Response Output */}
         <div className="
           relative flex items-center justify-end h-8 rounded px-2 border
           bg-indigo-900/20 border-indigo-500/20
         ">
            <span className="text-xs font-medium text-indigo-400">Response</span>
             <BaseHandle id={`${id}-response`} type="source" position={Position.Right} style={{ top: '50%', right: '-18px' }} />
         </div>
      </div>
    </BaseNode>
  );
};

// --- Filter Node ---
export const FilterNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      title="Filter"
      icon={<Filter size={16} />}
      selected={selected}
      handles={[]}
    >
      <div className="flex flex-col gap-3">
          <div className="
            relative flex items-center h-8 rounded px-2 border
            bg-black/30 border-white/10
          ">
             <BaseHandle id={`${id}-input`} type="target" position={Position.Left} style={{ top: '50%', left: '-18px' }} />
             <span className="text-xs font-medium text-slate-300">Input</span>
          </div>

          <div className="flex flex-col gap-1">
             <div className="text-[10px] text-slate-400 font-semibold uppercase">Condition</div>
             <input type="text" placeholder="Regex: ^[0-9]+$" className="w-full border p-1 rounded text-xs font-mono bg-black/30 border-white/10 text-slate-200" />
          </div>

          <div className="flex flex-col gap-2 mt-1">
             {/* Match Output */}
            <div className="relative flex items-center justify-end h-7">
                <span className="text-xs font-medium text-green-400 mr-2">True</span>
                <BaseHandle id={`${id}-match`} type="source" position={Position.Right} style={{ top: '50%', right: '-18px' }} className="!bg-green-500" />
            </div>
             {/* No Match Output */}
            <div className="relative flex items-center justify-end h-7">
                <span className="text-xs font-medium text-red-400 mr-2">False</span>
                <BaseHandle id={`${id}-nomatch`} type="source" position={Position.Right} style={{ top: '50%', right: '-18px' }} className="!bg-red-500" />
            </div>
          </div>
      </div>
    </BaseNode>
  );
};

// --- Logger Node ---
export const LoggerNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  return (
    <BaseNode id={id} title="Logger" icon={<Terminal size={16} />} selected={selected} handles={[]}>
      <div className="flex flex-col gap-3">
        <div className="relative flex items-center h-8 rounded px-2 border bg-black/30 border-white/10">
          <BaseHandle id={`${id}-input`} type="target" position={Position.Left} style={{ top: '50%', left: '-18px' }} />
          <span className="text-xs font-medium text-slate-300">Input</span>
        </div>

        <div className="text-xs text-slate-400">Format</div>
        <input defaultValue={data?.format || "{timestamp} - {value}"} onChange={(e) => data.format = e.target.value}
          className="text-xs w-full border p-1 rounded bg-black/30 border-white/10 text-slate-200" />

        <div className="relative flex items-center justify-end h-7">
          <span className="text-xs font-medium text-indigo-400 mr-2">Logged</span>
          <BaseHandle id={`${id}-logged`} type="source" position={Position.Right} style={{ top: '50%', right: '-18px' }} />
        </div>
      </div>
    </BaseNode>
  );
};

// --- Condition Node ---
export const ConditionNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  const [cond, setCond] = React.useState(data?.condition || "value == 'ok'");
  return (
    <BaseNode id={id} title="Condition" icon={<SlidersHorizontal size={16} />} selected={selected} handles={[]}>
      <div className="flex flex-col gap-3">
        <div className="relative flex items-center h-8 rounded px-2 border bg-black/30 border-white/10">
          <BaseHandle id={`${id}-input`} type="target" position={Position.Left} style={{ top: '50%', left: '-18px' }} />
          <span className="text-xs font-medium text-slate-300">Input</span>
        </div>

        <div className="text-xs text-slate-400">Condition</div>
        <input value={cond} onChange={(e) => { setCond(e.target.value); data.condition = e.target.value }}
          className="text-xs w-full border p-1 rounded bg-black/30 border-white/10 text-slate-200" />

        <div className="flex gap-2 mt-2">
          <div className="relative flex items-center justify-end h-7 flex-1">
            <span className="text-xs font-medium text-green-400 mr-2">True</span>
            <BaseHandle id={`${id}-true`} type="source" position={Position.Right} style={{ top: '50%', right: '-18px' }} className="!bg-green-500" />
          </div>
          <div className="relative flex items-center justify-end h-7 flex-1">
            <span className="text-xs font-medium text-red-400 mr-2">False</span>
            <BaseHandle id={`${id}-false`} type="source" position={Position.Right} style={{ top: '50%', right: '-18px' }} className="!bg-red-500" />
          </div>
        </div>
      </div>
    </BaseNode>
  );
};

// --- Merge Node ---
export const MergeNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  return (
    <BaseNode id={id} title="Merge" icon={<Layers size={16} />} selected={selected} handles={[]}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="relative flex items-center h-8 rounded px-2 border bg-black/30 border-white/10">
            <BaseHandle id={`${id}-a`} type="target" position={Position.Left} style={{ top: '35%', left: '-18px' }} />
            <span className="text-xs font-medium text-slate-300">A</span>
          </div>
          <div className="relative flex items-center h-8 rounded px-2 border bg-black/30 border-white/10">
            <BaseHandle id={`${id}-b`} type="target" position={Position.Left} style={{ top: '35%', left: '-18px' }} />
            <span className="text-xs font-medium text-slate-300">B</span>
          </div>
        </div>

        <div className="relative flex items-center justify-end h-7 mt-1">
          <span className="text-xs font-medium text-indigo-400 mr-2">Merged</span>
          <BaseHandle id={`${id}-out`} type="source" position={Position.Right} style={{ top: '50%', right: '-18px' }} />
        </div>
      </div>
    </BaseNode>
  );
};

// --- Delay Node ---
export const DelayNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  const [ms, setMs] = React.useState(data?.delayMs ?? 1000);
  return (
    <BaseNode id={id} title="Delay" icon={<Clock size={16} />} selected={selected} handles={[]}>
      <div className="flex flex-col gap-3">
        <div className="relative flex items-center h-8 rounded px-2 border bg-black/30 border-white/10">
          <BaseHandle id={`${id}-input`} type="target" position={Position.Left} style={{ top: '50%', left: '-18px' }} />
          <span className="text-xs font-medium text-slate-300">Input</span>
        </div>

        <div className="text-xs text-slate-400">Delay (ms)</div>
        <input type="number" value={ms} onChange={(e) => { const v = Number(e.target.value); setMs(v); data.delayMs = v }}
          className="text-xs w-full border p-1 rounded bg-black/30 border-white/10 text-slate-200" />

        <div className="relative flex items-center justify-end h-7 mt-1">
          <span className="text-xs font-medium text-indigo-400 mr-2">Output</span>
          <BaseHandle id={`${id}-out`} type="source" position={Position.Right} style={{ top: '50%', right: '-18px' }} />
        </div>
      </div>
    </BaseNode>
  );
};

// --- Transform Node ---
export const TransformNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  const [mode, setMode] = React.useState(data?.mode || 'uppercase');
  return (
    <BaseNode id={id} title="Transform" icon={<Repeat size={16} />} selected={selected} handles={[]}>
      <div className="flex flex-col gap-3">
        <div className="relative flex items-center h-8 rounded px-2 border bg-black/30 border-white/10">
          <BaseHandle id={`${id}-input`} type="target" position={Position.Left} style={{ top: '50%', left: '-18px' }} />
          <span className="text-xs font-medium text-slate-300">Input</span>
        </div>

        <div className="text-xs text-slate-400">Mode</div>
        <select value={mode} onChange={(e) => { setMode(e.target.value); data.mode = e.target.value }}
          className="text-xs w-full border p-1 rounded bg-black/30 border-white/10 text-slate-200">
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim</option>
        </select>

        <div className="relative flex items-center justify-end h-7 mt-1">
          <span className="text-xs font-medium text-indigo-400 mr-2">Output</span>
          <BaseHandle id={`${id}-out`} type="source" position={Position.Right} style={{ top: '50%', right: '-18px' }} />
        </div>
      </div>
    </BaseNode>
  );
};