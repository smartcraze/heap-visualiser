import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface NodeInputProps {
  onAddNode: (value: number) => void;
  disabled: boolean;
}

const NodeInput: React.FC<NodeInputProps> = ({ onAddNode, disabled }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(value);
    if (!isNaN(num)) {
      onAddNode(num);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter value"
        className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !value}
        className="p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus size={20} />
      </button>
    </form>
  );
};

export default NodeInput;