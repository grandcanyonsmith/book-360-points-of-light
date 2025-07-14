'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CompassPoint, FamilyStory, addFamilyStory, getFamilyStoriesForDay } from '@/data/compassPoints';
import { Heart, Star, Shield, BookOpen, Users, Gift, HeartHandshake, Clock, UserCheck, Zap, Quote, Target, Lightbulb, Plus, Calendar } from 'lucide-react';
import FamilyStoryInput from './FamilyStoryInput';
import FamilyStoryDisplay from './FamilyStoryDisplay';

interface LessonCardProps {
  point: CompassPoint;
  onClose: () => void;
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
  faith: 'border-yellow-500 bg-yellow-50',
  hope: 'border-blue-500 bg-blue-50',
  love: 'border-red-500 bg-red-50',
  repentance: 'border-purple-500 bg-purple-50',
  service: 'border-green-500 bg-green-50',
  gratitude: 'border-orange-500 bg-orange-50',
  forgiveness: 'border-pink-500 bg-pink-50',
  patience: 'border-indigo-500 bg-indigo-50',
  humility: 'border-gray-500 bg-gray-50',
  courage: 'border-teal-500 bg-teal-50'
};

const categoryGradients = {
  faith: 'from-yellow-400 to-yellow-600',
  hope: 'from-blue-400 to-blue-600',
  love: 'from-red-400 to-red-600',
  repentance: 'from-purple-400 to-purple-600',
  service: 'from-green-400 to-green-600',
  gratitude: 'from-orange-400 to-orange-600',
  forgiveness: 'from-pink-400 to-pink-600',
  patience: 'from-indigo-400 to-indigo-600',
  humility: 'from-gray-400 to-gray-600',
  courage: 'from-teal-400 to-teal-600'
};

export default function LessonCard({ point, onClose }: LessonCardProps) {
  const [familyStories, setFamilyStories] = useState<FamilyStory[]>([]);
  const [showStoryInput, setShowStoryInput] = useState(false);
  const [activeTab, setActiveTab] = useState<'lesson' | 'stories'>('lesson');
  
  const IconComponent = categoryIcons[point.category];
  const cardColor = categoryColors[point.category];
  const gradient = categoryGradients[point.category];

  useEffect(() => {
    // Load family stories for this day
    const stories = getFamilyStoriesForDay(point.dayOfYear);
    setFamilyStories(stories);
  }, [point.dayOfYear]);

  const handleAddStory = (storyData: Omit<FamilyStory, 'id' | 'timestamp' | 'dayOfYear'>) => {
    const newStory = addFamilyStory(point.dayOfYear, storyData);
    setFamilyStories(prev => [newStory, ...prev]);
    setShowStoryInput(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className={`relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden ${cardColor}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${gradient} text-white p-6 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <IconComponent size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-serif">{point.title}</h2>
                  <p className="text-white/80 text-sm">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {point.dateString} - Day {point.dayOfYear}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <span className="text-white font-bold">×</span>
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('lesson')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'lesson'
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Lightbulb className="w-4 h-4 inline mr-2" />
                Today's Lesson
              </button>
              <button
                onClick={() => setActiveTab('stories')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'stories'
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Heart className="w-4 h-4 inline mr-2" />
                Family Stories ({familyStories.length})
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'lesson' ? (
            <div className="space-y-6">
              {/* Main Lesson */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Lightbulb size={20} className="text-spiritual-gold" />
                  <h3 className="text-lg font-semibold">Spiritual Lesson</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">{point.lesson}</p>
              </div>

              {/* Scripture */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Quote size={20} className="text-spiritual-gold" />
                  <h3 className="text-lg font-semibold">Scripture Reference</h3>
                </div>
                <div className="bg-white/60 rounded-lg p-4 border-l-4 border-spiritual-gold">
                  <p className="text-gray-700 italic font-serif">{point.scripture}</p>
                </div>
              </div>

              {/* Application */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Target size={20} className="text-spiritual-gold" />
                  <h3 className="text-lg font-semibold">Daily Application</h3>
                </div>
                <div className="bg-gradient-to-r from-spiritual-peace to-white rounded-lg p-4 border border-spiritual-faith/20">
                  <p className="text-gray-700 leading-relaxed">{point.application}</p>
                </div>
              </div>

              {/* Category Badge */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Category:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${gradient}`}>
                    {point.category.charAt(0).toUpperCase() + point.category.slice(1)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Day: {point.dayOfYear}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Add Story Button */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Family Stories & Thoughts</h3>
                <button
                  onClick={() => setShowStoryInput(true)}
                  className="flex items-center space-x-2 bg-spiritual-gold text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Story</span>
                </button>
              </div>

              {/* Family Stories Display */}
              <div className="max-h-96 overflow-y-auto">
                <FamilyStoryDisplay stories={familyStories} dayOfYear={point.dayOfYear} />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven." - Matthew 5:16
            </p>
            <button
              onClick={onClose}
              className="spiritual-button text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>

      {/* Family Story Input Modal */}
      <AnimatePresence>
        {showStoryInput && (
          <FamilyStoryInput
            dayOfYear={point.dayOfYear}
            onSubmit={handleAddStory}
            onClose={() => setShowStoryInput(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
} 