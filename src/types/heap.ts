export type HeapType = 'max' | 'min';

export interface HeapNode {
  value: number;
  x: number;
  y: number;
  id: string; // Added for stable animations
}

export interface HeapState {
  nodes: HeapNode[];
  type: HeapType;
  highlightedNodes: number[];
}

export interface AnimationState {
  swapping: boolean;
  sourceIndex: number;
  targetIndex: number;
}