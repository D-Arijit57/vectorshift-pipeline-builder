import React from 'react';
import { NodeType } from '../types';
import { 
  ArrowRightToLine, ArrowLeftFromLine, FileText, Bot, 
  StickyNote, Mail, Languages, Server, Filter, GripHorizontal,
  Terminal, SlidersHorizontal, Layers, Clock, Repeat
} from 'lucide-react';

export const Toolbar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const DraggableItem = ({ type, label, icon }: { type: NodeType, label: string, icon: React.ReactNode }) => (
    <div
      className="
        flex flex-col items-center justify-center gap-2 p-3 
        border rounded-xl cursor-grab transition-all w-[80px] h-[80px]
        hover:scale-105 active:scale-95
        bg-black/40 border-white/10 hover:border-indigo-500/50 hover:bg-white/5 text-slate-200
        backdrop-blur-sm
      "
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <div className="text-indigo-400 drop-shadow-sm">{icon}</div>
      <span className="text-[10px] font-medium text-center leading-tight text-slate-400 group-hover:text-slate-200">
        {label}
      </span>
    </div>
  );

  return (
    <div className="
      p-4 border-b shadow-lg backdrop-blur-md
      bg-black/20 border-white/5
    ">
      <div className="max-w-7xl mx-auto flex items-center gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
        <div className="flex items-center gap-2 mr-2 text-slate-500">
            <GripHorizontal size={20} />
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500/80">Nodes</span>
        </div>
        
        <DraggableItem type={NodeType.INPUT} label="Input" icon={<ArrowRightToLine size={20} />} />
        <DraggableItem type={NodeType.OUTPUT} label="Output" icon={<ArrowLeftFromLine size={20} />} />
        <DraggableItem type={NodeType.TEXT} label="Text" icon={<FileText size={20} />} />
        <DraggableItem type={NodeType.LLM} label="LLM" icon={<Bot size={20} />} />
        
        <div className="w-[1px] h-10 mx-2 bg-white/10" />
        
        <DraggableItem type={NodeType.NOTE} label="Note" icon={<StickyNote size={20} />} />
        <DraggableItem type={NodeType.EMAIL} label="Email" icon={<Mail size={20} />} />
        <DraggableItem type={NodeType.TRANSLATION} label="Translate" icon={<Languages size={20} />} />
        <DraggableItem type={NodeType.API} label="API" icon={<Server size={20} />} />
        <DraggableItem type={NodeType.FILTER} label="Filter" icon={<Filter size={20} />} />
    <DraggableItem type={NodeType.LOGGER} label="Logger" icon={<Terminal size={20} />} />
    <DraggableItem type={NodeType.CONDITION} label="Condition" icon={<SlidersHorizontal size={20} />} />
    <DraggableItem type={NodeType.MERGE} label="Merge" icon={<Layers size={20} />} />
    <DraggableItem type={NodeType.DELAY} label="Delay" icon={<Clock size={20} />} />
    <DraggableItem type={NodeType.TRANSFORM} label="Transform" icon={<Repeat size={20} />} />
      </div>
    </div>
  );
};