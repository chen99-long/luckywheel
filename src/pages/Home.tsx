import React, { useState, useEffect } from 'react';
import LuckyWheel from '../components/wheel/LuckyWheel';
import ConfigPanel from '../components/config/ConfigPanel';
import TemplateSelector from '../components/templates/TemplateSelector';
import SpinHistory from '../components/stats/SpinHistory';
import { WheelConfig, SpinResult } from '../types';
import { createDefaultWheel } from '../utils/templates';
import { saveWheelConfig, loadWheelConfig, loadSpinHistory, clearSpinHistory } from '../utils/storage';
import { Sparkles as FileSparkles, Gauge, History } from 'lucide-react';

const Home: React.FC = () => {
  const [config, setConfig] = useState<WheelConfig>(createDefaultWheel());
  const [activeTab, setActiveTab] = useState<'config' | 'templates' | 'history'>('config');
  const [spinHistory, setSpinHistory] = useState<SpinResult[]>([]);
  const [spinResult, setSpinResult] = useState<SpinResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  
  // Load saved config and history on mount
  useEffect(() => {
    const savedConfig = loadWheelConfig();
    if (savedConfig) {
      setConfig(savedConfig);
    }
    
    setSpinHistory(loadSpinHistory());
  }, []);
  
  // Save config whenever it changes
  useEffect(() => {
    saveWheelConfig(config);
  }, [config]);
  
  const handleConfigChange = (newConfig: WheelConfig) => {
    setConfig(newConfig);
  };
  
  const handleTemplateSelect = (template: { config: WheelConfig }) => {
    setConfig(template.config);
    setActiveTab('config');
  };
  
  const handleSpinStart = () => {
    setShowResult(false);
  };
  
  const handleSpinEnd = (result: SpinResult) => {
    setSpinResult(result);
    setShowResult(true);
    setSpinHistory(loadSpinHistory());
  };
  
  const handleClearHistory = () => {
    clearSpinHistory();
    setSpinHistory([]);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wheel Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <LuckyWheel 
              config={config} 
              onSpinStart={handleSpinStart}
              onSpinEnd={handleSpinEnd}
              size={Math.min(window.innerWidth * 0.8, 500)}
            />
            
            {/* Result Notification */}
            {showResult && spinResult && (
              <div className="mt-6 p-4 bg-purple-100 rounded-lg text-center w-full max-w-md animate-fade-in">
                <h3 className="text-lg font-bold text-purple-800 mb-1">Result</h3>
                <p className="text-3xl font-bold text-purple-900">{spinResult.segmentText}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Control Panel */}
        <div>
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`px-4 py-2 text-sm font-medium flex items-center ${
                activeTab === 'config'
                  ? 'text-purple-700 border-b-2 border-purple-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('config')}
            >
              <Gauge className="w-4 h-4 mr-1" />
              Configure
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium flex items-center ${
                activeTab === 'templates'
                  ? 'text-purple-700 border-b-2 border-purple-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('templates')}
            >
              <FileSparkles className="w-4 h-4 mr-1" />
              Templates
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium flex items-center ${
                activeTab === 'history'
                  ? 'text-purple-700 border-b-2 border-purple-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('history')}
            >
              <History className="w-4 h-4 mr-1" />
              History
            </button>
          </div>
          
          {/* Tab Content */}
          <div>
            {activeTab === 'config' && (
              <ConfigPanel 
                config={config}
                onChange={handleConfigChange}
              />
            )}
            
            {activeTab === 'templates' && (
              <TemplateSelector 
                onSelect={handleTemplateSelect}
              />
            )}
            
            {activeTab === 'history' && (
              <SpinHistory 
                history={spinHistory}
                onClear={handleClearHistory}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;