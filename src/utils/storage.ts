import { WheelConfig, SpinResult } from '../types';

const WHEEL_CONFIG_KEY = 'luckyWheel_config';
const SPIN_HISTORY_KEY = 'luckyWheel_history';

export const saveWheelConfig = (config: WheelConfig): void => {
  localStorage.setItem(WHEEL_CONFIG_KEY, JSON.stringify(config));
};

export const loadWheelConfig = (): WheelConfig | null => {
  const saved = localStorage.getItem(WHEEL_CONFIG_KEY);
  return saved ? JSON.parse(saved) : null;
};

export const saveSpinResult = (result: SpinResult): void => {
  const history = loadSpinHistory();
  history.unshift(result);
  
  // Limit history to 100 items to prevent storage issues
  const limitedHistory = history.slice(0, 100);
  localStorage.setItem(SPIN_HISTORY_KEY, JSON.stringify(limitedHistory));
};

export const loadSpinHistory = (): SpinResult[] => {
  const saved = localStorage.getItem(SPIN_HISTORY_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const clearSpinHistory = (): void => {
  localStorage.setItem(SPIN_HISTORY_KEY, JSON.stringify([]));
};