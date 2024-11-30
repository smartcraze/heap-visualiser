import React, { useEffect, useRef } from 'react';
import { HeapNode as HeapNodeType, HeapState } from '../types/heap';

interface HeapVisualizerProps {
  heap: HeapState;
}

const HeapVisualizer: React.FC<HeapVisualizerProps> = ({ heap }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;

    heap.nodes.forEach((node, index) => {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (leftChild < heap.nodes.length) {
        drawEdge(ctx, node, heap.nodes[leftChild]);
      }
      if (rightChild < heap.nodes.length) {
        drawEdge(ctx, node, heap.nodes[rightChild]);
      }
    });
  }, [heap]);

  const drawEdge = (
    ctx: CanvasRenderingContext2D,
    from: HeapNodeType,
    to: HeapNodeType
  ) => {
    ctx.beginPath();
    ctx.moveTo(from.x * 6, from.y * 4);
    ctx.lineTo(to.x * 6, to.y * 4);
    ctx.stroke();
  };

  return (
    <div className="relative w-full h-[400px]">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="absolute inset-0 w-full h-full"
      />
      {heap.nodes.map((node, index) => (
        <div
          key={index}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300
            ${heap.highlightedNodes.includes(index)
              ? 'bg-yellow-400 text-gray-900 scale-110'
              : 'bg-blue-500 text-white'}`}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
        >
          {node.value}
        </div>
      ))}
    </div>
  );
};

export default HeapVisualizer;