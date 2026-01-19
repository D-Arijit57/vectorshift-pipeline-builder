import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Position, NodeProps } from 'reactflow';
import { BaseNode, BaseHandle } from './BaseNode';
import { FileText } from 'lucide-react';

export const TextNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea logic
  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(Math.max(textareaRef.current.scrollHeight, 60), 300);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [currText]);

  // Variable Detection
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const uniqueVars = Array.from(new Set(matches.map(m => m[1].trim())));
    setVariables(uniqueVars);
    data.text = currText;
    data.variables = uniqueVars;
  }, [currText, id, data]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrText(e.target.value);
  };

  // Sync scrolling between textarea and backdrop
  const handleScroll = () => {
    if (textareaRef.current && backdropRef.current) {
      backdropRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Render text with highlights for the backdrop
  const renderHighlightedText = (text: string) => {
    const regex = /(\{\{\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*\}\})/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (regex.test(part)) {
        const match = part.match(/(\{\{)(\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*)(\}\})/);
        if (match) {
            const [, leftBrace, prefixSpace, varName, suffixSpace, rightBrace] = match;
            return (
                <React.Fragment key={index}>
                    <span className="text-transparent">{leftBrace}</span>
                    <span className="whitespace-pre">{prefixSpace}</span>
                    <span 
                      className="bg-indigo-500 text-white rounded px-1 py-0.5 shadow-sm"
                      style={{ marginLeft: '-2px', marginRight: '-2px', position: 'relative', zIndex: 1 }}
                    >
                        {varName}
                    </span>
                    <span className="whitespace-pre">{suffixSpace}</span>
                    <span className="text-transparent">{rightBrace}</span>
                </React.Fragment>
            );
        }
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <BaseNode
      id={id}
      title="Text"
      icon={<FileText size={16} />}
      selected={selected}
      handles={[]}
    >
      <div className="flex flex-col gap-2 transition-all duration-200">
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          Text Content
        </label>
        
        {/* Container for the Rich Text Editor effect */}
        <div className="
          relative w-full min-h-[60px] max-h-[300px] rounded-lg border 
          bg-white dark:bg-black/30 
          border-slate-200 dark:border-white/10 
          overflow-hidden
          focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500
        ">
          
          {/* Backdrop Layer: Renders the styles */}
          <div 
            ref={backdropRef}
            className="
              absolute inset-0 p-3 
              font-mono text-sm leading-relaxed whitespace-pre-wrap break-words 
              text-slate-800 dark:text-slate-200 
              pointer-events-none overflow-hidden
            "
            aria-hidden="true"
          >
            {renderHighlightedText(currText)}
             {currText.endsWith('\n') && <br />}
          </div>

          {/* Foreground Layer: Handles Input */}
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            onScroll={handleScroll}
            spellCheck={false}
            className="
              relative z-10 block w-full h-full p-3 
              font-mono text-sm leading-relaxed whitespace-pre-wrap break-words 
              bg-transparent text-transparent 
              caret-indigo-500 dark:caret-white 
              resize-none focus:outline-none overflow-y-auto
            "
            placeholder="Type {{variable}} to add dynamic inputs..."
            style={{ 
               color: 'transparent',
               boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Dynamic Variables Visualization */}
        <div className="flex flex-col gap-2 mt-1">
            {variables.length > 0 && (
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-white/10 mt-1">
                   <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                     Detected Variables
                   </span>
                   <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 px-1.5 py-0.5 rounded-full font-mono border border-indigo-200 dark:border-indigo-500/20">
                     {variables.length}
                   </span>
                </div>
            )}
            
            {variables.map((variable) => (
                <div 
                  key={variable} 
                  className="
                    relative flex items-center h-9 rounded-md px-3 border shadow-sm 
                    bg-slate-50 dark:bg-black/20 
                    border-slate-200 dark:border-white/5 
                    hover:border-indigo-400/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/10
                    transition-all duration-200 group
                  "
                >
                    <BaseHandle 
                        id={`${id}-var-${variable}`}
                        type="target"
                        position={Position.Left}
                        style={{ top: '50%', left: '-12px' }}
                        className="!bg-indigo-400 ring-2 ring-white dark:ring-slate-900"
                    />
                    
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 truncate flex-1 font-mono">
                      {variable}
                    </span>
                </div>
            ))}
        </div>

         <div className="relative flex items-center justify-end h-7 mt-2">
             <span className="text-xs font-semibold text-slate-500 mr-2 uppercase tracking-wide">Output</span>
             <BaseHandle 
                id={`${id}-output`}
                type="source"
                position={Position.Right}
                style={{ top: '50%', right: '-19px' }}
            />
         </div>
      </div>
    </BaseNode>
  );
};