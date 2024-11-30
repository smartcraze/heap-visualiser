export const getParentIndex = (index: number): number => Math.floor((index - 1) / 2);
export const getLeftChildIndex = (index: number): number => 2 * index + 1;
export const getRightChildIndex = (index: number): number => 2 * index + 2;

export const insertNode = (
  heap: number[],
  value: number,
  heapType: 'max' | 'min'
): { array: number[]; steps: number[][] } => {
  const steps: number[][] = [];
  const newHeap = [...heap, value];
  let currentIndex = newHeap.length - 1;

  while (currentIndex > 0) {
    const parentIndex = getParentIndex(currentIndex);
    const shouldSwap =
      heapType === 'max'
        ? newHeap[parentIndex] < newHeap[currentIndex]
        : newHeap[parentIndex] > newHeap[currentIndex];

    if (shouldSwap) {
      steps.push([parentIndex, currentIndex]);
      [newHeap[parentIndex], newHeap[currentIndex]] = [
        newHeap[currentIndex],
        newHeap[parentIndex],
      ];
      currentIndex = parentIndex;
    } else {
      break;
    }
  }

  return { array: newHeap, steps };
};

export const heapify = (
  arr: number[],
  index: number,
  heapType: 'max' | 'min'
): { array: number[]; steps: number[][] } => {
  const steps: number[][] = [];
  const result = [...arr];
  let largest = index;
  const leftChild = getLeftChildIndex(index);
  const rightChild = getRightChildIndex(index);

  const compare = (a: number, b: number) =>
    heapType === 'max' ? result[a] < result[b] : result[a] > result[b];

  if (leftChild < result.length && compare(largest, leftChild)) {
    largest = leftChild;
  }

  if (rightChild < result.length && compare(largest, rightChild)) {
    largest = rightChild;
  }

  if (largest !== index) {
    steps.push([index, largest]);
    [result[index], result[largest]] = [result[largest], result[index]];
    const subsequentSteps = heapify(result, largest, heapType);
    return {
      array: subsequentSteps.array,
      steps: [...steps, ...subsequentSteps.steps],
    };
  }

  return { array: result, steps };
};

export const buildHeap = (
  arr: number[],
  heapType: 'max' | 'min'
): { array: number[]; steps: number[][] } => {
  const result = [...arr];
  const steps: number[][] = [];

  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    const heapifyResult = heapify(result, i, heapType);
    result.splice(0, result.length, ...heapifyResult.array);
    steps.push(...heapifyResult.steps);
  }

  return { array: result, steps };
};