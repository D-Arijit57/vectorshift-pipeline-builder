import { Node, Edge } from 'reactflow';
import { PipelineAnalysisResult } from '../types';

export const parsePipeline = async (nodes: Node[], edges: Edge[]): Promise<PipelineAnalysisResult> => {
  try {
    const response = await fetch('http://localhost:8000/pipelines/parse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nodes, edges }),
    });

    if (!response.ok) {
      throw new Error(`Backend Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data as PipelineAnalysisResult;
    
  } catch (error) {
    console.error("Error submitting pipeline:", error);
    throw error;
  }
};