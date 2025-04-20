import { WheelTemplate } from '../types';
import { generateRandomId, getSegmentColor, getContrastColor } from './wheel';

export const templates: WheelTemplate[] = [
  {
    id: 'lucky-draw',
    name: 'Lucky Draw',
    description: 'Classic lucky draw with 8 prize options',
    category: 'Promotion',
    thumbnail: 'lucky-draw',
    config: {
      segments: [
        { id: generateRandomId(), text: 'Grand Prize', color: '#FF6384', textColor: '#FFFFFF', probability: 5 },
        { id: generateRandomId(), text: 'Second Prize', color: '#36A2EB', textColor: '#FFFFFF', probability: 10 },
        { id: generateRandomId(), text: 'Third Prize', color: '#FFCE56', textColor: '#000000', probability: 15 },
        { id: generateRandomId(), text: 'Small Gift', color: '#4BC0C0', textColor: '#FFFFFF', probability: 20 },
        { id: generateRandomId(), text: 'Discount 10%', color: '#9966FF', textColor: '#FFFFFF', probability: 15 },
        { id: generateRandomId(), text: 'Discount 5%', color: '#FF9F40', textColor: '#000000', probability: 15 },
        { id: generateRandomId(), text: 'Free Shipping', color: '#8AE87E', textColor: '#000000', probability: 10 },
        { id: generateRandomId(), text: 'Try Again', color: '#FF6B8B', textColor: '#FFFFFF', probability: 10 }
      ],
      pointerColor: '#F43F5E',
      borderColor: '#FFFFFF',
      borderWidth: 2,
      spinDuration: 5,
      fontFamily: 'sans-serif',
      size: 400,
      speed: 5,
      duration: 5,
      backgroundColor: '#FFFFFF',
      textColor: '#000000'
    }
  },
  {
    id: 'lunch-decider',
    name: 'Lunch Decider',
    description: 'Can\'t decide what to eat? Spin and find out!',
    category: 'Decision',
    thumbnail: 'lunch-decider',
    config: {
      segments: [
        { id: generateRandomId(), text: 'Pizza', color: '#FF6384', textColor: '#FFFFFF', probability: 12.5 },
        { id: generateRandomId(), text: 'Sushi', color: '#36A2EB', textColor: '#FFFFFF', probability: 12.5 },
        { id: generateRandomId(), text: 'Burger', color: '#FFCE56', textColor: '#000000', probability: 12.5 },
        { id: generateRandomId(), text: 'Salad', color: '#4BC0C0', textColor: '#FFFFFF', probability: 12.5 },
        { id: generateRandomId(), text: 'Pasta', color: '#9966FF', textColor: '#FFFFFF', probability: 12.5 },
        { id: generateRandomId(), text: 'Sandwich', color: '#FF9F40', textColor: '#000000', probability: 12.5 },
        { id: generateRandomId(), text: 'Tacos', color: '#8AE87E', textColor: '#000000', probability: 12.5 },
        { id: generateRandomId(), text: 'Curry', color: '#FF6B8B', textColor: '#FFFFFF', probability: 12.5 }
      ],
      pointerColor: '#3B82F6',
      borderColor: '#FFFFFF',
      borderWidth: 2,
      spinDuration: 4,
      fontFamily: 'sans-serif',
      size: 400,
      speed: 5,
      duration: 4,
      backgroundColor: '#FFFFFF',
      textColor: '#000000'
    }
  },
  {
    id: 'team-picker',
    name: 'Team Picker',
    description: 'Randomly select team members for tasks or presentations',
    category: 'Team',
    thumbnail: 'team-picker',
    config: {
      segments: [
        { id: generateRandomId(), text: 'Alice', color: '#FF6384', textColor: '#FFFFFF', probability: 20 },
        { id: generateRandomId(), text: 'Bob', color: '#36A2EB', textColor: '#FFFFFF', probability: 20 },
        { id: generateRandomId(), text: 'Charlie', color: '#FFCE56', textColor: '#000000', probability: 20 },
        { id: generateRandomId(), text: 'David', color: '#4BC0C0', textColor: '#FFFFFF', probability: 20 },
        { id: generateRandomId(), text: 'Emma', color: '#9966FF', textColor: '#FFFFFF', probability: 20 }
      ],
      pointerColor: '#10B981',
      borderColor: '#FFFFFF',
      borderWidth: 2,
      spinDuration: 3,
      fontFamily: 'sans-serif',
      size: 400,
      speed: 5,
      duration: 3,
      backgroundColor: '#FFFFFF',
      textColor: '#000000'
    }
  },
  {
    id: 'classroom',
    name: 'Classroom Helper',
    description: 'Perfect for teachers to randomly call on students',
    category: 'Education',
    thumbnail: 'classroom',
    config: {
      segments: [
        { id: generateRandomId(), text: 'Group 1', color: '#FF6384', textColor: '#FFFFFF', probability: 25 },
        { id: generateRandomId(), text: 'Group 2', color: '#36A2EB', textColor: '#FFFFFF', probability: 25 },
        { id: generateRandomId(), text: 'Group 3', color: '#FFCE56', textColor: '#000000', probability: 25 },
        { id: generateRandomId(), text: 'Group 4', color: '#4BC0C0', textColor: '#FFFFFF', probability: 25 }
      ],
      pointerColor: '#EF4444',
      borderColor: '#FFFFFF',
      borderWidth: 2,
      spinDuration: 4,
      fontFamily: 'sans-serif',
      size: 400,
      speed: 5,
      duration: 4,
      backgroundColor: '#FFFFFF',
      textColor: '#000000'
    }
  }
];

export const createDefaultWheel = () => {
  const defaultSegments = Array.from({ length: 6 }, (_, index) => {
    const color = getSegmentColor(index);
    return {
      id: generateRandomId(),
      text: `Option ${index + 1}`,
      color,
      textColor: getContrastColor(color),
      probability: 100 / 6
    };
  });

  return {
    segments: defaultSegments,
    pointerColor: '#8B5CF6',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    spinDuration: 5,
    fontFamily: 'sans-serif',
    size: 400,
    speed: 5,
    duration: 5,
    backgroundColor: '#FFFFFF',
    textColor: '#000000'
  };
};

export const getTemplateById = (id: string) => {
  return templates.find(template => template.id === id);
};