import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Repeat, Info } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <header className={`${isLandingPage ? 'bg-transparent' : 'bg-gradient-to-r from-purple-700 to-indigo-800'} text-white shadow-md`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="bg-white rounded-full p-2 mr-3">
              <Repeat className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">LuckyWheel</h1>
              <p className="text-xs text-purple-200">Custom Wheel Generator</p>
            </div>
          </Link>
          
          <div className="flex space-x-4">
            {!isLandingPage && (
              <Link 
                to="/"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-md flex items-center text-sm font-medium transition-colors"
              >
                Home
              </Link>
            )}
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-md flex items-center text-sm font-medium transition-colors">
              <Info className="w-4 h-4 mr-1" />
              <span>About</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;