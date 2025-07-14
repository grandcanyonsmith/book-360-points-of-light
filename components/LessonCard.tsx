'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CompassPoint, FamilyStory, addFamilyStory, getFamilyStoriesForDay } from '@/data/compassPoints';
import { Heart, Star, Shield, BookOpen, Users, Gift, HeartHandshake, Clock, UserCheck, Zap, Quote, Target, Lightbulb, Plus, Calendar, X, Share2, MessageCircle } from 'lucide-react';
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
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [familyStories, setFamilyStories] = useState<FamilyStory[]>([]);
  const [activeTab, setActiveTab] = useState<'lesson' | 'stories'>('lesson');

  useEffect(() => {
    const stories = getFamilyStoriesForDay(point.dayOfYear);
    setFamilyStories(stories);
  }, [point.dayOfYear]);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAddStory = (storyData: Omit<FamilyStory, 'id' | 'timestamp' | 'dayOfYear'>) => {
    const newStory = addFamilyStory(point.dayOfYear, storyData);
    setFamilyStories([...familyStories, newStory]);
    setShowStoryForm(false);
  };

  const CategoryIcon = categoryIcons[point.category as keyof typeof categoryIcons] || Star;
  const categoryColor = categoryColors[point.category as keyof typeof categoryColors] || 'border-gray-500 bg-gray-50';
  const categoryGradient = categoryGradients[point.category as keyof typeof categoryGradients] || 'from-gray-400 to-gray-600';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className={`relative bg-gradient-to-br ${categoryGradient} p-8 text-white`}>
          <div className="absolute inset-0 bg-black/10" />
          
          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>

          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <motion.div 
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <CategoryIcon className="w-8 h-8" />
              </motion.div>
              <div>
                <p className="text-white/80 text-sm font-medium">Day {point.dayOfYear} • {point.category}</p>
                <h2 className="text-3xl font-bold font-display">{point.title}</h2>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{point.dateString}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>{familyStories.length} Family Stories</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('lesson')}
            className={`flex-1 px-6 py-4 font-medium transition-all duration-300 ${
              activeTab === 'lesson'
                ? 'text-spiritual-faith border-b-2 border-spiritual-faith bg-spiritual-faith/5'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Daily Lesson</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('stories')}
            className={`flex-1 px-6 py-4 font-medium transition-all duration-300 ${
              activeTab === 'stories'
                ? 'text-spiritual-faith border-b-2 border-spiritual-faith bg-spiritual-faith/5'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="w-4 h-4" />
              <span>Family Stories ({familyStories.length})</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-280px)] scrollbar-thin">
          <AnimatePresence mode="wait">
            {activeTab === 'lesson' ? (
              <motion.div
                key="lesson"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-8"
              >
                {/* Main Lesson */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg first-letter:text-5xl first-letter:font-bold first-letter:text-spiritual-faith first-letter:float-left first-letter:mr-3">
                    {point.lesson}
                  </p>
                </div>

                {/* Scripture */}
                {point.scripture && (
                  <div className="mt-8">
                    <div className="scripture-quote">
                      <Quote className="w-5 h-5 text-spiritual-gold mb-2" />
                      <p className="text-lg">{point.scripture}</p>
                      {point.scriptureReference && (
                        <p className="text-sm text-gray-500 mt-2 not-italic">
                          — {point.scriptureReference}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Reflection Questions */}
                {point.reflectionQuestions && (
                  <div className="mt-8 p-6 bg-spiritual-peace/30 rounded-2xl">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-spiritual-faith" />
                      Reflection Questions
                    </h3>
                    <ul className="space-y-3">
                      {point.reflectionQuestions.map((question, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-spiritual-faith/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-sm font-medium text-spiritual-faith">{index + 1}</span>
                          </span>
                          <span className="text-gray-700">{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Button */}
                <div className="mt-8 flex justify-center">
                  <motion.button
                    onClick={() => setActiveTab('stories')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="spiritual-button"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    View Family Stories
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="stories"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                {/* Add Story Button */}
                {!showStoryForm && (
                  <motion.button
                    onClick={() => setShowStoryForm(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-6 border-2 border-dashed border-spiritual-faith/30 rounded-2xl hover:border-spiritual-faith/50 hover:bg-spiritual-faith/5 transition-all duration-300 mb-6"
                  >
                    <div className="flex items-center justify-center gap-3 text-spiritual-faith">
                      <Plus className="w-6 h-6" />
                      <span className="font-medium text-lg">Add Your Family Story</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Share how this lesson has touched your family
                    </p>
                  </motion.button>
                )}

                {/* Story Form */}
                <AnimatePresence>
                  {showStoryForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6"
                    >
                      <FamilyStoryInput
                        dayOfYear={point.dayOfYear}
                        onSubmit={handleAddStory}
                        onClose={() => setShowStoryForm(false)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Family Stories */}
                <div className="space-y-4">
                  {familyStories.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No family stories yet</p>
                      <p className="text-gray-400 text-sm">Be the first to share your thoughts!</p>
                    </div>
                  ) : (
                    <FamilyStoryDisplay stories={familyStories} dayOfYear={point.dayOfYear} />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
} 