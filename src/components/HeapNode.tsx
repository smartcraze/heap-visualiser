import React from 'react';
import { HeapNode as HeapNodeType } from '../types/heap';

interface HeapNodeProps {
  node: HeapNodeType;
  isHighlighted: boolean;
}

const HeapNode: React.FC<HeapNodeProps> = ({ node, isHighlighted }) => {
  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500
        ${isHighlighted 
          ? 'bg-yellow-400 text-gray-900 scale-110' 
          : 'bg-blue-500 text-white'}`}
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
      }}
    >
      {node.value}
    </div>
  );
};

export default HeapNode;