import React, { useState } from 'react';
import { WheelSegment, ProbabilityMode } from '../../types';
import { getContrastColor } from '../../utils/wheel';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SegmentEditorProps {
  segment: WheelSegment;
  onSave: (segment: WheelSegment) => void;
  onCancel: () => void;
  probabilityMode: ProbabilityMode;
}

const SegmentEditor: React.FC<SegmentEditorProps> = ({ 
  segment, 
  onSave, 
  onCancel,
  probabilityMode
}) => {
  const { t } = useTranslation();
  const [text, setText] = useState(segment.text);
  const [color, setColor] = useState(segment.color);
  const [probability, setProbability] = useState(segment.probability.toString());
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
  };
  
  const handleSave = () => {
    // Validate probability
    const parsedProbability = parseFloat(probability);
    if (isNaN(parsedProbability) || parsedProbability < 0 || parsedProbability > 100) {
      alert('Probability must be between 0 and 100');
      return;
    }
    
    onSave({
      ...segment,
      text: text.trim() || 'Untitled',
      color,
      textColor: getContrastColor(color),
      probability: parsedProbability
    });
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{t('wheel.segment.edit')}</h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onCancel}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('wheel.segment.text')}
            </label>
            <input
              type="text"
              className="w-full rounded-md border-gray-300 shadow-sm px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t('wheel.segment.text')}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('wheel.segment.color')}
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                className="h-10 w-20 rounded cursor-pointer"
                value={color}
                onChange={handleColorChange}
              />
              <input
                type="text"
                className="flex-1 rounded-md border-gray-300 shadow-sm px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#RRGGBB"
              />
            </div>
          </div>
          
          {probabilityMode === 'advanced' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('wheel.segment.probability')}
              </label>
              <input
                type="number"
                className="w-full rounded-md border-gray-300 shadow-sm px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={probability}
                onChange={(e) => setProbability(e.target.value)}
                min="0"
                max="100"
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">
                {t('wheel.settings.probabilityWarning')}
              </p>
            </div>
          )}
          
          <div className="p-3 bg-gray-100 rounded-md">
            <div className="text-sm mb-2">{t('wheel.settings.preview')}</div>
            <div 
              className="p-4 rounded-md flex items-center justify-center"
              style={{ backgroundColor: color }}
            >
              <span style={{ color: getContrastColor(color) }}>
                {text || t('wheel.segment.text')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-2">
          <button
            className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >
            {t('common.cancel')}
          </button>
          <button
            className="px-4 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700"
            onClick={handleSave}
          >
            {t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SegmentEditor;