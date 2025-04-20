import React from 'react';
import { SpinResult } from '../../types';
import { BarChart, RefreshCw, Trash2 } from 'lucide-react';

interface SpinHistoryProps {
  history: SpinResult[];
  onClear: () => void;
}

const SpinHistory: React.FC<SpinHistoryProps> = ({ history, onClear }) => {
  if (history.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="flex justify-center mb-4">
          <RefreshCw className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700">No Spin History</h3>
        <p className="text-sm text-gray-500 mt-2">
          Start spinning the wheel to see your results history here.
        </p>
      </div>
    );
  }
  
  // Get statistics
  const resultCounts = history.reduce((acc, result) => {
    acc[result.segmentText] = (acc[result.segmentText] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Sort by count (descending)
  const sortedResults = Object.entries(resultCounts).sort((a, b) => b[1] - a[1]);
  
  // Calculate percentages
  const total = history.length;
  const percentages = sortedResults.map(([text, count]) => ({
    text,
    count,
    percentage: (count / total) * 100
  }));
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-purple-800 flex items-center">
          <BarChart className="w-5 h-5 mr-2" />
          Spin Statistics
        </h2>
        <button
          className="p-1 text-gray-500 hover:text-red-600"
          onClick={onClear}
          title="Clear History"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="mb-4">
        <div className="text-sm text-gray-700 mb-2">
          Total spins: <span className="font-medium">{total}</span>
        </div>
        <div className="space-y-2">
          {percentages.map(({ text, count, percentage }) => (
            <div key={text}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{text}</span>
                <span className="text-gray-600">{count} ({percentage.toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Spins</h3>
        <div className="space-y-1 max-h-[200px] overflow-y-auto">
          {history.slice(0, 10).map((result) => (
            <div
              key={result.id}
              className="text-sm p-2 rounded-md bg-gray-50 flex justify-between"
            >
              <span>{result.segmentText}</span>
              <span className="text-gray-500">
                {new Date(result.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpinHistory;