import React, { useState, useEffect, useCallback } from 'react';
import HeapVisualizer from './components/HeapVisualizer';
import Controls from './components/Controls';
import NodeInput from './components/NodeInput';
import { HeapType, HeapState } from './types/heap';
import { buildHeap, insertNode } from './utils/heapOperations';

const INITIAL_ARRAY = [4, 10, 3, 5, 1, 2];

const calculateNodePosition = (index: number, totalNodes: number) => {
  const level = Math.floor(Math.log2(index + 1));
  const position = index - Math.pow(2, level) + 1;
  const totalPositionsInLevel = Math.pow(2, level);
  
  const x = (position + 1) * (100 / (totalPositionsInLevel + 1));
  const y = (level + 1) * 20;

  return { x, y };
};

function App() {
  const [heapType, setHeapType] = useState<HeapType>('max');
  const [heapState, setHeapState] = useState<HeapState>({
    nodes: INITIAL_ARRAY.map((value, index) => ({
      value,
      ...calculateNodePosition(index, INITIAL_ARRAY.length),
      id: `node-${index}-${value}`,
    })),
    type: 'max',
    highlightedNodes: [],
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [heapifySteps, setHeapifySteps] = useState<number[][]>([]);
  const [values, setValues] = useState<number[]>(INITIAL_ARRAY);

  const initializeHeap = useCallback(() => {
    const { steps } = buildHeap(values, heapType);
    setHeapifySteps(steps);
    setCurrentStep(0);
    setHeapState((prev) => ({
      ...prev,
      type: heapType,
      nodes: values.map((value, index) => ({
        value,
        ...calculateNodePosition(index, values.length),
        id: `node-${index}-${value}`,
      })),
      highlightedNodes: [],
    }));
  }, [heapType, values]);

  useEffect(() => {
    initializeHeap();
  }, [initializeHeap]);

  useEffect(() => {
    let intervalId: number;
    if (isPlaying && currentStep < heapifySteps.length) {
      intervalId = window.setInterval(() => {
        executeStep();
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, currentStep]);

  const executeStep = () => {
    if (currentStep >= heapifySteps.length) {
      setIsPlaying(false);
      return;
    }

    const [i, j] = heapifySteps[currentStep];
    setHeapState((prev) => {
      const newNodes = [...prev.nodes];
      const tempValue = newNodes[i].value;
      newNodes[i] = { ...newNodes[i], value: newNodes[j].value };
      newNodes[j] = { ...newNodes[j], value: tempValue };
      return {
        ...prev,
        nodes: newNodes,
        highlightedNodes: [i, j],
      };
    });
    setCurrentStep((prev) => prev + 1);
  };

  const handleAddNode = (value: number) => {
    const { array, steps } = insertNode(values, value, heapType);
    setValues(array);
    setHeapifySteps(steps);
    setCurrentStep(0);
    setHeapState((prev) => ({
      ...prev,
      nodes: array.map((val, index) => ({
        value: val,
        ...calculateNodePosition(index, array.length),
        id: `node-${index}-${val}`,
      })),
      highlightedNodes: [],
    }));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setValues(INITIAL_ARRAY);
    initializeHeap();
  };

  const handleHeapTypeChange = (type: HeapType) => {
    setHeapType(type);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          {heapType === 'max' ? 'Max' : 'Min'} Heap Visualizer
        </h1>
        
        <div className="flex items-center justify-between gap-4">
          <Controls
            heapType={heapType}
            onHeapTypeChange={handleHeapTypeChange}
            onReset={handleReset}
            onStep={executeStep}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            canStep={currentStep < heapifySteps.length}
          />
          <NodeInput
            onAddNode={handleAddNode}
            disabled={isPlaying || currentStep < heapifySteps.length}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <HeapVisualizer heap={heapState} />
        </div>

        <div className="text-center text-gray-600">
          <p>Watch how the heap adjusts to maintain the {heapType} heap property.</p>
          <p>Each node must be {heapType === 'max' ? 'greater' : 'smaller'} than its children.</p>
        </div>
      </div>
    </div>
  );
}

export default App;