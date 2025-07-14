'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FamilyStory } from '@/data/compassPoints';
import { formatDistanceToNow } from 'date-fns';
import { Heart, User, Clock, Quote } from 'lucide-react';

interface FamilyStoryDisplayProps {
  stories: FamilyStory[];
  dayOfYear: number;
}

const generationStyles = {
  grandparent: {
    icon: '👴',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-800',
    badgeColor: 'bg-amber-100 text-amber-800'
  },
  parent: {
    icon: '👨‍👩‍👧‍👦',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    badgeColor: 'bg-blue-100 text-blue-800'
  },
  child: {
    icon: '👶',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    badgeColor: 'bg-green-100 text-green-800'
  },
  grandchild: {
    icon: '🧒',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800',
    badgeColor: 'bg-purple-100 text-purple-800'
  },
  other: {
    icon: '👤',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-800',
    badgeColor: 'bg-gray-100 text-gray-800'
  }
};

export default function FamilyStoryDisplay({ stories, dayOfYear }: FamilyStoryDisplayProps) {
  if (stories.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-spiritual-peace rounded-full flex items-center justify-center mx-auto mb-4">
          <Quote className="w-8 h-8 text-spiritual-gold" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Family Stories Yet</h3>
        <p className="text-gray-600">
          Be the first to share your thoughts about today's scripture and lesson!
        </p>
      </div>
    );
  }

  // Sort stories by timestamp, most recent first
  const sortedStories = [...stories].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Heart className="w-5 h-5 text-spiritual-love mr-2" />
          Family Stories ({stories.length})
        </h3>
        <div className="text-sm text-gray-500">
          Day {dayOfYear}
        </div>
      </div>

      <div className="space-y-4">
        {sortedStories.map((story, index) => {
          const style = generationStyles[story.authorGeneration];
          
          return (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${style.bgColor} ${style.borderColor} border-2 rounded-xl p-6 relative overflow-hidden`}
            >
              {/* Decorative Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <div className="text-6xl transform rotate-12 translate-x-8 -translate-y-4">
                  {style.icon}
                </div>
              </div>

              {/* Story Header */}
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{style.icon}</span>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${style.textColor}`}>
                      {story.authorName}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.badgeColor}`}>
                        {story.authorGeneration.charAt(0).toUpperCase() + story.authorGeneration.slice(1)}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDistanceToNow(new Date(story.timestamp), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="relative z-10">
                <div className="bg-white/60 rounded-lg p-4 border border-white/40">
                  <Quote className="w-5 h-5 text-gray-400 mb-2" />
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {story.content}
                  </p>
                </div>
              </div>

              {/* Story Footer */}
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500 relative z-10">
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>Shared with love</span>
                </div>
                <div>
                  {new Date(story.timestamp).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Generation Summary */}
      <div className="mt-6 p-4 bg-spiritual-peace rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">Voices from Our Family</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(
            stories.reduce((acc, story) => {
              acc[story.authorGeneration] = (acc[story.authorGeneration] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)
          ).map(([generation, count]) => {
            const style = generationStyles[generation as keyof typeof generationStyles];
            return (
              <div
                key={generation}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full ${style.badgeColor}`}
              >
                <span className="text-sm">{style.icon}</span>
                <span className="text-sm font-medium">
                  {generation.charAt(0).toUpperCase() + generation.slice(1)}s: {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 