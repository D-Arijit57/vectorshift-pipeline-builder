import React from 'react';
import { Handle, Position } from 'reactflow';
import { X, GripVertical } from 'lucide-react';
import { useStore } from '../../store';

export interface HandleConfig {
  id: string;
  position: Position;
  type: 'source' | 'target';
  style?: React.CSSProperties;
  label?: string;
}

interface BaseNodeProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  handles?: HandleConfig[];
  selected?: boolean;
}

// Reusable Handle Component
export const BaseHandle: React.FC<{
  id?: string;
  type: 'source' | 'target';
  position: Position;
  style?: React.CSSProperties;
  className?: string;
}> = ({ id, type, position, style, className }) => {
  return (
    <Handle
      type={type}
      position={position}
      id={id}
      className={`
        !w-3 !h-3 !border-2 transition-colors z-50
        !bg-white dark:!bg-[#000] !border-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]
        hover:!bg-indigo-500 hover:!border-white hover:shadow-[0_0_12px_rgba(99,102,241,0.8)]
        ${className || ''}
      `}
      style={style}
    />
  );
};

export const BaseNode: React.FC<BaseNodeProps> = ({
  id,
  title,
  icon,
  children,
  handles = [],
  selected,
}) => {
  const deleteNode = useStore((state) => state.deleteNode);

  return (
    <div 
      className={`
        relative min-w-[250px] rounded-xl shadow-xl border transition-all duration-300 group/node
        backdrop-blur-xl 
        bg-white/80 dark:bg-black/60
        ${selected 
          ? 'border-indigo-500 shadow-indigo-500/20' 
          : 'border-slate-200 dark:border-white/10 hover:border-purple-500/50'
        }
      `}
    >
      {/* Gradient Overlay for subtle glow - Rounded to match parent */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 pointer-events-none rounded-xl" />

      {/* Header - Rounded Top */}
      <div className={`
        relative flex items-center justify-between px-4 py-3 border-b
        border-slate-100 dark:border-white/5
        bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20
        rounded-t-xl
      `}>
        <div className="flex items-center gap-2 font-semibold text-sm text-slate-700 dark:text-slate-100">
          {icon && <span className="text-indigo-500 dark:text-indigo-400">{icon}</span>}
          <span>{title}</span>
        </div>
        
        {/* Delete Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent node selection
            deleteNode(id);
          }}
          className="
            text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 
            transition-colors p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5
            opacity-0 group-hover/node:opacity-100 focus:opacity-100
          "
          title="Delete Node"
        >
          <X size={14} />
        </button>
      </div>

      {/* Body */}
      <div className="relative p-4">
        {children}
      </div>

      {/* Legacy Handles (for Primitive Nodes that pass handles via props) */}
      {handles.map((handle) => (
        <div key={handle.id} className="absolute z-50" 
             style={{
               top: handle.style?.top || '50%',
               [handle.position === Position.Left ? 'left' : 'right']: '-7px'
             }}
        >
           <BaseHandle
             id={handle.id}
             type={handle.type}
             position={handle.position}
             style={{
                // Reset styling here because positioning is handled by the wrapper div above
                position: 'static', 
                transform: 'translateY(-50%)'
             }}
           />
          {handle.label && (
             <span 
               className={`
                 absolute text-[10px] whitespace-nowrap top-1/2 -translate-y-1/2
                 text-slate-500 dark:text-slate-400
                 ${handle.position === Position.Left ? 'left-4' : 'right-4'}
               `}
             >
               {handle.label}
             </span>
          )}
        </div>
      ))}
    </div>
  );
};