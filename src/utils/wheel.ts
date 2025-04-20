import { WheelSegment } from '../types';

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const calculateAngle = (index: number, total: number): number => {
  return (index / total) * 360;
};

export const distributeEvenProbabilities = (segments: WheelSegment[]): WheelSegment[] => {
  const probability = 100 / segments.length;
  return segments.map(segment => ({
    ...segment,
    probability: Number(probability.toFixed(2))
  }));
};

export const validateProbabilities = (segments: WheelSegment[]): boolean => {
  const sum = segments.reduce((acc, segment) => acc + segment.probability, 0);
  return Math.abs(sum - 100) < 0.01; // Allow for small rounding errors
};

export const adjustProbabilities = (segments: WheelSegment[]): WheelSegment[] => {
  const sum = segments.reduce((acc, segment) => acc + segment.probability, 0);
  
  if (Math.abs(sum - 100) < 0.01) return segments;
  
  // Distribute the difference proportionally
  const factor = 100 / sum;
  return segments.map(segment => ({
    ...segment,
    probability: Number((segment.probability * factor).toFixed(2))
  }));
};

export const getRandomSegment = (segments: WheelSegment[]): WheelSegment => {
  const randVal = Math.random() * 100;
  let currentProb = 0;
  
  for (const segment of segments) {
    currentProb += segment.probability;
    if (randVal <= currentProb) {
      return segment;
    }
  }
  
  // Fallback (should never happen if probabilities sum to 100)
  return segments[segments.length - 1];
};

export const calculateRotationAngle = (
  segments: WheelSegment[],
  selectedSegment: WheelSegment,
  currentRotation: number
): number => {
  // Find the index of the selected segment
  const selectedIndex = segments.findIndex(segment => segment.id === selectedSegment.id);
  
  // Calculate the angle for each segment
  const segmentAngle = 360 / segments.length;
  
  // Calculate the base angle needed to get the selected segment to the top (270 degrees)
  const baseAngle = (selectedIndex * segmentAngle + segmentAngle / 2);
  
  // Calculate how many degrees we need to rotate to get to the target position
  const targetAngle = (360 - baseAngle + 270) % 360;
  
  // Calculate the minimum rotation needed (including current rotation)
  const minRotation = Math.floor(currentRotation / 360) * 360;
  
  // Add extra full rotations (between 5 and 8)
  const extraRotations = getRandomInt(5, 8) * 360;
  
  // Return the total rotation needed
  return minRotation + extraRotations + targetAngle;
};

export const getSegmentColor = (index: number): string => {
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#8AE87E', '#FF6B8B', '#5CC3F0', '#FEE440'
  ];
  return colors[index % colors.length];
};

export const getContrastColor = (hexColor: string): string => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black or white based on luminance
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};