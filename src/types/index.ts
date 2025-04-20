export interface WheelSegment {
  id: string;
  text: string;
  color: string;
  textColor: string;
  icon?: string;
  probability: number;
}

export interface WheelConfig {
  segments: WheelSegment[];
  pointerColor: string;
  borderColor: string;
  borderWidth: number;
  spinDuration: number;
  fontFamily: string;
}

export interface WheelTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  config: WheelConfig;
  thumbnail: string;
}

export interface SpinResult {
  id: string;
  segmentId: string;
  segmentText: string;
  timestamp: number;
}

export type ProbabilityMode = 'smart' | 'advanced';