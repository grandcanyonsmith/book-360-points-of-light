'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CompassPoint } from '@/data/compassPoints';
import { Heart, Star, Shield, BookOpen, Users, Gift, HeartHandshake, Clock, UserCheck, Zap } from 'lucide-react';

interface CompassProps {
  points: CompassPoint[];
  onPointClick: (point: CompassPoint) => void;
}

const categoryIcons = {
  faith: Star,
  hope: Shield,
  love: Heart,
  repentance: BookOpen,
  service: Users,
  gratitude: Gift,
  forgiveness: HeartHandshake,
  patience: Clock,
  humility: UserCheck,
  courage: Zap
};

const categoryColors = {
  faith: 'bg-yellow-500',
  hope: 'bg-blue-500',
  love: 'bg-red-500',
  repentance: 'bg-purple-500',
  service: 'bg-green-500',
  gratitude: 'bg-orange-500',
  forgiveness: 'bg-pink-500',
  patience: 'bg-indigo-500',
  humility: 'bg-gray-500',
  courage: 'bg-teal-500'
};

export default function Compass({ points, onPointClick }: CompassProps) {
  const [selectedDegree, setSelectedDegree] = useState<number | null>(null);
  const [hoveredDegree, setHoveredDegree] = useState<number | null>(null);
  const [centerPoint, setCenterPoint] = useState<CompassPoint | null>(null);

  useEffect(() => {
    // Set the center point (North - 0 degrees)
    const center = points.find(p => p.degree === 0);
    setCenterPoint(center || null);
  }, [points]);

  const getPointPosition = (degree: number, radius: number) => {
    const radians = (degree - 90) * (Math.PI / 180); // Start from top (North)
    const x = Math.cos(radians) * radius;
    const y = Math.sin(radians) * radius;
    return { x, y };
  };

  const handlePointClick = (point: CompassPoint) => {
    setSelectedDegree(point.degree);
    onPointClick(point);
  };

  const handlePointHover = (degree: number | null) => {
    setHoveredDegree(degree);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Compass Container */}
      <div className="relative w-full aspect-square max-w-2xl mx-auto">
        {/* Compass Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-spiritual-light to-spiritual-peace rounded-full border-4 border-spiritual-gold shadow-2xl">
          {/* Compass Rose */}
          <div className="absolute inset-4 bg-white/20 rounded-full border-2 border-spiritual-gold/50"></div>
          
          {/* Cardinal Directions */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-spiritual-gold">
            N
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-spiritual-gold">
            S
          </div>
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-spiritual-gold">
            W
          </div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-spiritual-gold">
            E
          </div>
        </div>

        {/* Compass Points */}
        {points.map((point) => {
          const radius = 180; // Adjust based on container size
          const position = getPointPosition(point.degree, radius);
          const IconComponent = categoryIcons[point.category];
          const isSelected = selectedDegree === point.degree;
          const isHovered = hoveredDegree === point.degree;

          return (
            <motion.div
              key={point.degree}
              className={`absolute ${categoryColors[point.category]} rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg cursor-pointer transition-all duration-300 ${
                isSelected ? 'scale-125 ring-4 ring-spiritual-gold' : ''
              } ${isHovered ? 'scale-110' : ''}`}
              style={{
                left: `calc(50% + ${position.x}px)`,
                top: `calc(50% + ${position.y}px)`,
                transform: 'translate(-50%, -50%)',
                width: isSelected ? '3rem' : '2rem',
                height: isSelected ? '3rem' : '2rem',
                zIndex: isSelected ? 10 : 1
              }}
              onClick={() => handlePointClick(point)}
              onMouseEnter={() => handlePointHover(point.degree)}
              onMouseLeave={() => handlePointHover(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSelected ? (
                <IconComponent size={16} />
              ) : (
                <span className="text-xs font-bold">{point.degree}</span>
              )}
            </motion.div>
          );
        })}

        {/* Center Point */}
        {centerPoint && (
          <motion.div
            className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-spiritual-gold rounded-full flex items-center justify-center text-white font-bold shadow-2xl cursor-pointer"
            onClick={() => handlePointClick(centerPoint)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Star size={24} />
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(categoryIcons).map(([category, Icon]) => (
          <div key={category} className="flex items-center space-x-2 text-sm">
            <div className={`w-4 h-4 ${categoryColors[category as keyof typeof categoryColors]} rounded-full flex items-center justify-center`}>
              <Icon size={12} className="text-white" />
            </div>
            <span className="capitalize font-medium">{category}</span>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center text-gray-600">
        <p className="text-sm">
          Click on any point to explore its spiritual lesson. Each of the 360 points represents a different aspect of our journey back to Christ.
        </p>
      </div>
    </div>
  );
} 