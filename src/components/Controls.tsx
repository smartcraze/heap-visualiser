import React from 'react';
import { HeapType } from '../types/heap';
import { Play, Pause, RotateCcw, ArrowUpDown } from 'lucide-react';

interface ControlsProps {
  heapType: HeapType;
  onHeapTypeChange: (type: HeapType) => void;
  onReset: () => void;
  onStep: () => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  canStep: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  heapType,
  onHeapTypeChange,
  onReset,
  onStep,
  isPlaying,
  onPlayPause,
  canStep,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Heap Type:</label>
        <select
          value={heapType}
          onChange={(e) => onHeapTypeChange(e.target.value as HeapType)}
          className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="max">Max Heap</option>
          <option value="min">Min Heap</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onPlayPause}
          className="p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!canStep}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <button
          onClick={onStep}
          className="p-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!canStep || isPlaying}
        >
          <ArrowUpDown size={20} />
        </button>

        <button
          onClick={onReset}
          className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};

export default Controls;