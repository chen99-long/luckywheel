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
  selectedSegment: WheelSegment
): number => {
  let totalAngle = 0;
  let segmentStartAngle = 0;

  // Find the starting angle of the selected segment
  for (let i = 0; i < segments.length; i++) {
    if (segments[i].id === selectedSegment.id) {
      segmentStartAngle = totalAngle;
      break;
    }
    totalAngle += (segments[i].probability / 100) * 360;
  }

  // Calculate middle angle of the segment
  const segmentAngle = (selectedSegment.probability / 100) * 360;
  const middleAngle = segmentStartAngle + segmentAngle / 2;

  // The wheel spins clockwise, so we want the selected segment to end at the top (270 degrees)
  // Add extra rotations for a more satisfying spin (between 2 and 5 full rotations)
  const extraRotations = getRandomInt(2, 5) * 360;
  const targetAngle = 270 - middleAngle;

  return extraRotations + targetAngle;
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