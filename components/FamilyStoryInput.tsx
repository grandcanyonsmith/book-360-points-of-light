'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FamilyStory } from '@/data/compassPoints';
import { Users, Heart, PenTool, Send, X } from 'lucide-react';

interface FamilyStoryInputProps {
  dayOfYear: number;
  onSubmit: (story: Omit<FamilyStory, 'id' | 'timestamp' | 'dayOfYear'>) => void;
  onClose: () => void;
}

const generationOptions = [
  { value: 'grandparent', label: 'Grandparent', icon: '👴', color: 'bg-amber-100 text-amber-800' },
  { value: 'parent', label: 'Parent', icon: '👨‍👩‍👧‍👦', color: 'bg-blue-100 text-blue-800' },
  { value: 'child', label: 'Child', icon: '👶', color: 'bg-green-100 text-green-800' },
  { value: 'grandchild', label: 'Grandchild', icon: '🧒', color: 'bg-purple-100 text-purple-800' },
  { value: 'other', label: 'Other', icon: '👤', color: 'bg-gray-100 text-gray-800' }
];

export default function FamilyStoryInput({ dayOfYear, onSubmit, onClose }: FamilyStoryInputProps) {
  const [authorName, setAuthorName] = useState('');
  const [authorGeneration, setAuthorGeneration] = useState<FamilyStory['authorGeneration']>('parent');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    setIsSubmitting(true);
    
    try {
      onSubmit({
        authorName: authorName.trim(),
        authorGeneration,
        content: content.trim()
      });
      
      // Reset form
      setAuthorName('');
      setContent('');
      onClose();
    } catch (error) {
      console.error('Error submitting story:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-spiritual-gold to-yellow-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <PenTool className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-serif">Share Your Story</h2>
                <p className="text-white/80">Day {dayOfYear} - Family Thoughts & Experiences</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spiritual-gold focus:border-transparent"
              placeholder="Enter your name..."
              required
            />
          </div>

          {/* Generation Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Your Generation
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {generationOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAuthorGeneration(option.value as FamilyStory['authorGeneration'])}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    authorGeneration === option.value
                      ? 'border-spiritual-gold bg-spiritual-gold/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-2xl">{option.icon}</span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Story Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Story, Thoughts, or Experience
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spiritual-gold focus:border-transparent resize-none"
              placeholder="Share your thoughts about today's scripture, a related experience, or how this lesson applies to your life..."
              required
            />
            <div className="mt-2 text-sm text-gray-500">
              {content.length}/500 characters
            </div>
          </div>

          {/* Inspiration Section */}
          <div className="bg-spiritual-peace rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <Heart className="w-5 h-5 text-spiritual-love mr-2" />
              Story Ideas
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• How does today's scripture apply to your life?</li>
              <li>• Share a related personal experience or memory</li>
              <li>• What lesson did you learn from this scripture?</li>
              <li>• How can your family apply this teaching?</li>
              <li>• What questions does this scripture raise for you?</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !authorName.trim() || !content.trim()}
              className="px-6 py-3 bg-spiritual-gold text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Sharing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Share Story</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
} 