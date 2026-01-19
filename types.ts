import { Node, Edge } from 'reactflow';

export interface BaseNodeData {
  label?: string;
  [key: string]: any;
}

export type PipelineNode = Node<BaseNodeData>;

export interface PipelineAnalysisResult {
  num_nodes: number;
  num_edges: number;
  is_dag: boolean;
}

export enum NodeType {
  INPUT = 'customInput',
  OUTPUT = 'customOutput',
  TEXT = 'text',
  LLM = 'llm',
  NOTE = 'note',
  EMAIL = 'email',
  TRANSLATION = 'translation',
  API = 'api',
  FILTER = 'filter'
  ,LOGGER = 'logger'
  ,CONDITION = 'condition'
  ,MERGE = 'merge'
  ,DELAY = 'delay'
  ,TRANSFORM = 'transform'
}
