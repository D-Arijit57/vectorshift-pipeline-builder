import React, { useState } from 'react';
import { useStore } from '../store';
import { parsePipeline } from '../services/pipelineService';
import { Play, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export const SubmitButton: React.FC = () => {
  const { nodes, edges } = useStore((state) => ({ nodes: state.nodes, edges: state.edges }));
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any default browser behavior
    console.log("Submit clicked. Processing...");
    
    setLoading(true);
    try {
      // Frontend -> Backend Integration Point
      const result = await parsePipeline(nodes, edges);
      
      console.log("Analysis Result:", result);

      const message = `
        Pipeline Analysis:
        ------------------
        Nodes: ${result.num_nodes}
        Edges: ${result.num_edges}
        Is DAG: ${result.is_dag} ${result.is_dag ? '✅' : '❌'}
      `;
      alert(message);
      
    } catch (error) {
      console.error("Pipeline submission error:", error);
      alert('Failed to parse pipeline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSubmit}
      disabled={loading}
      className="
        flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md font-medium shadow-sm
        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        disabled:opacity-70 disabled:cursor-not-allowed transition-all
        active:scale-95 select-none
      "
    >
      {loading ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} />}
      <span>Submit Pipeline</span>
    </button>
  );
};