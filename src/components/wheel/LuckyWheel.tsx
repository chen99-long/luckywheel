import React, { useRef, useState, useEffect } from 'react';
import { WheelConfig, WheelSegment, SpinResult } from '../../types';
import { calculateAngle, calculateRotationAngle, getRandomSegment, generateRandomId } from '../../utils/wheel';
import { saveSpinResult } from '../../utils/storage';
import WheelPointer from './WheelPointer';

interface LuckyWheelProps {
  config: WheelConfig;
  onSpinStart?: () => void;
  onSpinEnd?: (result: SpinResult) => void;
  size?: number;
  disabled?: boolean;
}

const LuckyWheel: React.FC<LuckyWheelProps> = ({ 
  config, 
  onSpinStart, 
  onSpinEnd, 
  size = 400,
  disabled = false 
}) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedSegment, setSelectedSegment] = useState<WheelSegment | null>(null);
  
  const spinWheel = () => {
    if (isSpinning || disabled) return;
    
    setIsSpinning(true);
    onSpinStart?.();
    
    // Determine winner based on probabilities
    const winner = getRandomSegment(config.segments);
    setSelectedSegment(winner);
    
    // Calculate rotation to land on the winner
    const targetRotation = calculateRotationAngle(config.segments, winner);
    
    // Set the final rotation (current + target)
    const finalRotation = rotation + targetRotation;
    setRotation(finalRotation);
    
    // Create spin result
    const result: SpinResult = {
      id: generateRandomId(),
      segmentId: winner.id,
      segmentText: winner.text,
      timestamp: Date.now()
    };
    
    // Save the result and notify parent after spinning is complete
    setTimeout(() => {
      saveSpinResult(result);
      setIsSpinning(false);
      onSpinEnd?.(result);
    }, config.spinDuration * 1000);
  };
  
  const renderSegments = () => {
    return config.segments.map((segment, index) => {
      const startAngle = calculateAngle(index, config.segments.length);
      const endAngle = calculateAngle(index + 1, config.segments.length);
      const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
      
      // Calculate the path for each segment
      const segmentSize = size / 2 - config.borderWidth;
      const startX = segmentSize * Math.cos((startAngle * Math.PI) / 180);
      const startY = segmentSize * Math.sin((startAngle * Math.PI) / 180);
      const endX = segmentSize * Math.cos((endAngle * Math.PI) / 180);
      const endY = segmentSize * Math.sin((endAngle * Math.PI) / 180);
      
      const pathData = [
        `M 0 0`,
        `L ${startX} ${startY}`,
        `A ${segmentSize} ${segmentSize} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        'Z'
      ].join(' ');
      
      // Calculate text position
      const midAngle = (startAngle + endAngle) / 2;
      const textRadius = segmentSize * 0.65;
      const textX = textRadius * Math.cos((midAngle * Math.PI) / 180);
      const textY = textRadius * Math.sin((midAngle * Math.PI) / 180);
      
      // Determine if text should be flipped based on angle
      const flipText = midAngle > 90 && midAngle < 270;
      const textRotation = flipText ? midAngle + 180 : midAngle;
      
      return (
        <g key={segment.id}>
          <path 
            d={pathData} 
            fill={segment.color}
            stroke={config.borderColor}
            strokeWidth={config.borderWidth}
          />
          <text
            x={textX}
            y={textY}
            fill={segment.textColor}
            fontFamily={config.fontFamily}
            fontSize={size / 25}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${textRotation}, ${textX}, ${textY})`}
          >
            {segment.text}
          </text>
        </g>
      );
    });
  };
  
  const wheelStyle: React.CSSProperties = {
    width: size,
    height: size,
    transition: isSpinning ? `transform ${config.spinDuration}s cubic-bezier(0.17, 0.67, 0.35, 0.96)` : 'none',
    transform: `rotate(${rotation}deg)`
  };
  
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {/* Wheel */}
      <div 
        ref={wheelRef}
        className="absolute top-0 left-0 w-full h-full"
        style={wheelStyle}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`-${size/2} -${size/2} ${size} ${size}`}
        >
          {renderSegments()}
        </svg>
      </div>
      
      {/* Pointer */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <WheelPointer color={config.pointerColor} width={size / 10} height={size / 5} />
      </div>
      
      {/* Spin button */}
      <button
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center
          text-sm font-bold transition-transform ${isSpinning ? 'scale-90' : 'hover:scale-110'}`}
        onClick={spinWheel}
        disabled={isSpinning || disabled}
      >
        <span className="text-purple-700">SPIN</span>
      </button>
    </div>
  );
};

export default LuckyWheel;