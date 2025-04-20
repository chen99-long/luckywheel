import React from 'react';

interface WheelPointerProps {
  color: string;
  width: number;
  height: number;
}

const WheelPointer: React.FC<WheelPointerProps> = ({ color, width, height }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 40 80">
      <path
        d="M20 0 L40 30 L20 80 L0 30 Z"
        fill={color}
        stroke="#FFF"
        strokeWidth="2"
      />
      <circle cx="20" cy="30" r="8" fill="#FFF" />
    </svg>
  );
};

export default WheelPointer;