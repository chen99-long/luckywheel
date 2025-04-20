import React from 'react';
import { WheelTemplate } from '../../types';
import { templates } from '../../utils/templates';

interface TemplateSelectorProps {
  onSelect: (template: WheelTemplate) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  // Group templates by category
  const templatesByCategory = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, WheelTemplate[]>);
  
  const renderWheel = (template: WheelTemplate) => {
    // Create a simple preview of the wheel
    const segments = template.config.segments;
    const size = 100; // Preview size
    const center = size / 2;
    
    return (
      <svg width={size} height={size} className="rounded-full overflow-hidden">
        {segments.map((segment, index) => {
          const startAngle = (index / segments.length) * 2 * Math.PI;
          const endAngle = ((index + 1) / segments.length) * 2 * Math.PI;
          
          const x1 = center + Math.cos(startAngle) * center;
          const y1 = center + Math.sin(startAngle) * center;
          const x2 = center + Math.cos(endAngle) * center;
          const y2 = center + Math.sin(endAngle) * center;
          
          // Calculate the flag for large arcs
          const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;
          
          const pathData = [
            `M ${center} ${center}`,
            `L ${x1} ${y1}`,
            `A ${center} ${center} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');
          
          return <path key={index} d={pathData} fill={segment.color} />;
        })}
      </svg>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold text-purple-800 mb-4">Template Gallery</h2>
      
      <div className="space-y-6">
        {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
          <div key={category}>
            <h3 className="text-lg font-medium text-gray-800 mb-2">{category}</h3>
            <div className="grid grid-cols-1 gap-4">
              {categoryTemplates.map((template) => (
                <div
                  key={template.id}
                  className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onSelect(template)}
                >
                  <div className="flex">
                    <div className="mr-3">
                      {renderWheel(template)}
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-700">{template.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{template.config.segments.length} segments</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;