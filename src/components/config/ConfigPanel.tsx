import React, { useState, useEffect } from 'react';
import { WheelConfig, WheelSegment, ProbabilityMode } from '../../types';
import { getSegmentColor, getContrastColor, generateRandomId, distributeEvenProbabilities, adjustProbabilities } from '../../utils/wheel';
import { Settings, Plus, Trash2, RefreshCw } from 'lucide-react';
import SegmentEditor from './SegmentEditor';
import { useTranslation } from 'react-i18next';

interface ConfigPanelProps {
  config: WheelConfig;
  onChange: (newConfig: WheelConfig) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onChange }) => {
  const { t } = useTranslation();
  const [probabilityMode, setProbabilityMode] = useState<ProbabilityMode>('smart');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showProbabilityWarning, setShowProbabilityWarning] = useState<boolean>(false);
  
  // Check probability sum whenever segments change
  useEffect(() => {
    if (probabilityMode === 'advanced') {
      const sum = config.segments.reduce((acc, segment) => acc + segment.probability, 0);
      setShowProbabilityWarning(Math.abs(sum - 100) > 0.01);
    } else {
      setShowProbabilityWarning(false);
    }
  }, [config.segments, probabilityMode]);
  
  const handleAddSegment = () => {
    if (config.segments.length >= 20) return; // Max 20 segments
    
    const index = config.segments.length;
    const color = getSegmentColor(index);
    const textColor = getContrastColor(color);
    
    const newSegment: WheelSegment = {
      id: generateRandomId(),
      text: `Option ${index + 1}`,
      color,
      textColor,
      probability: 0 // Will be adjusted by distributeEvenProbabilities
    };
    
    const newSegments = [...config.segments, newSegment];
    const adjustedSegments = probabilityMode === 'smart' 
      ? distributeEvenProbabilities(newSegments)
      : newSegments;
    
    onChange({
      ...config,
      segments: adjustedSegments
    });
  };
  
  const handleDeleteSegment = (index: number) => {
    if (config.segments.length <= 2) return; // Minimum 2 segments
    
    const newSegments = [...config.segments];
    newSegments.splice(index, 1);
    
    const adjustedSegments = probabilityMode === 'smart'
      ? distributeEvenProbabilities(newSegments)
      : newSegments;
    
    onChange({
      ...config,
      segments: adjustedSegments
    });
  };
  
  const handleUpdateSegment = (index: number, updatedSegment: WheelSegment) => {
    const newSegments = [...config.segments];
    newSegments[index] = updatedSegment;
    
    onChange({
      ...config,
      segments: newSegments
    });
    
    setEditingIndex(null);
  };
  
  const handleProbabilityModeChange = (mode: ProbabilityMode) => {
    setProbabilityMode(mode);
    
    if (mode === 'smart') {
      const evenSegments = distributeEvenProbabilities(config.segments);
      onChange({
        ...config,
        segments: evenSegments
      });
    }
  };
  
  const handleAdjustProbabilities = () => {
    const adjustedSegments = adjustProbabilities(config.segments);
    onChange({
      ...config,
      segments: adjustedSegments
    });
  };
  
  const handleStyleChange = (key: keyof WheelConfig, value: string | number) => {
    onChange({
      ...config,
      [key]: value
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-h-[600px] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-purple-800 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          {t('wheel.settings.title')}
        </h2>
      </div>
      
      {/* Probability Mode Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">{t('wheel.settings.probability.mode')}</h3>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md text-sm ${
              probabilityMode === 'smart'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleProbabilityModeChange('smart')}
          >
            {t('wheel.settings.probability.smart')}
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm ${
              probabilityMode === 'advanced'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleProbabilityModeChange('advanced')}
          >
            {t('wheel.settings.probability.advanced')}
          </button>
        </div>
      </div>
      
      {/* Segments List */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700">{t('wheel.segment.text')}</h3>
          <button
            className="p-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200"
            onClick={handleAddSegment}
            title={t('wheel.segment.add')}
            disabled={config.segments.length >= 20}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        {showProbabilityWarning && (
          <div className="flex justify-between items-center p-2 mb-2 bg-amber-100 text-amber-800 rounded-md text-xs">
            <span>{t('wheel.settings.probabilityWarning')}</span>
            <button
              className="p-1 bg-amber-200 text-amber-800 rounded-md hover:bg-amber-300 flex items-center"
              onClick={handleAdjustProbabilities}
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              {t('wheel.settings.adjust')}
            </button>
          </div>
        )}
        
        <div className="space-y-2 max-h-[300px] overflow-y-auto p-1">
          {config.segments.map((segment, index) => (
            <div
              key={segment.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-6 h-6 rounded-md"
                  style={{ backgroundColor: segment.color }}
                ></div>
                <span className="truncate max-w-[150px]" title={segment.text}>
                  {segment.text}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {probabilityMode === 'advanced' && (
                  <span className="text-xs text-gray-500 w-12 text-right">
                    {Number(segment.probability).toFixed(2)}%
                  </span>
                )}
                
                <button
                  className="p-1 text-gray-500 hover:text-purple-700"
                  onClick={() => setEditingIndex(index)}
                >
                  <Settings className="w-4 h-4" />
                </button>
                
                <button
                  className="p-1 text-gray-500 hover:text-red-700"
                  onClick={() => handleDeleteSegment(index)}
                  disabled={config.segments.length <= 2}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Style Options */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('wheel.settings.pointerColor')}
          </label>
          <input
            type="color"
            className="w-full h-10 rounded-md cursor-pointer"
            value={config.pointerColor}
            onChange={(e) => handleStyleChange('pointerColor', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('wheel.settings.borderColor')}
          </label>
          <input
            type="color"
            className="w-full h-10 rounded-md cursor-pointer"
            value={config.borderColor}
            onChange={(e) => handleStyleChange('borderColor', e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('wheel.settings.borderWidth')}
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            className="w-full"
            value={config.borderWidth}
            onChange={(e) => handleStyleChange('borderWidth', parseFloat(e.target.value))}
          />
          <div className="text-xs text-gray-500 text-right">{config.borderWidth}px</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('wheel.settings.duration')}
          </label>
          <input
            type="range"
            min="2"
            max="10"
            step="0.5"
            className="w-full"
            value={config.spinDuration}
            onChange={(e) => handleStyleChange('spinDuration', parseFloat(e.target.value))}
          />
          <div className="text-xs text-gray-500 text-right">{config.spinDuration}s</div>
        </div>
      </div>
      
      {/* Segment Editor Modal */}
      {editingIndex !== null && (
        <SegmentEditor
          segment={config.segments[editingIndex]}
          onSave={(updatedSegment) => handleUpdateSegment(editingIndex, updatedSegment)}
          onCancel={() => setEditingIndex(null)}
          probabilityMode={probabilityMode}
        />
      )}
    </div>
  );
};

export default ConfigPanel;