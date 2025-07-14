'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Liahona3D from '@/components/Liahona3D';
import LessonCard from '@/components/LessonCard';
import Footer from '@/components/Footer';
import { allCompassPoints, CompassPoint, getTodaysPoint, getPointByDate } from '@/data/compassPoints';
import { Star, Heart, BookOpen, Target, Users, Lightbulb, ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, subDays } from 'date-fns';

export default function Home() {
  const [selectedPoint, setSelectedPoint] = useState<CompassPoint | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);

  const handlePointClick = (point: CompassPoint) => {
    setSelectedPoint(point);
    setSelectedDay(point.dayOfYear);
  };

  const handleCloseLesson = () => {
    setSelectedPoint(null);
    setSelectedDay(undefined);
  };

  const handleDateChange = (newDate: Date) => {
    setCurrentDate(newDate);
    const point = getPointByDate(newDate);
    if (point) {
      setSelectedDay(point.dayOfYear);
    }
  };

  const goToPreviousDay = () => {
    const prevDate = subDays(currentDate, 1);
    handleDateChange(prevDate);
  };

  const goToNextDay = () => {
    const nextDate = addDays(currentDate, 1);
    handleDateChange(nextDate);
  };

  const goToToday = () => {
    const today = new Date();
    handleDateChange(today);
  };

  const currentPoint = getPointByDate(currentDate);
  const todaysPoint = getTodaysPoint();

  const features = [
          {
        icon: Target,
        title: "365 Daily Lessons",
        description: "Each day represents a unique spiritual lesson to guide your journey back to Christ."
      },
    {
      icon: Heart,
      title: "Wholesome Lessons",
      description: "Carefully crafted teachings focused on faith, hope, love, and spiritual growth."
    },
    {
      icon: BookOpen,
      title: "Scripture-Based",
      description: "Every lesson is grounded in biblical principles and sacred texts."
    },
    {
      icon: Users,
              title: "Family Stories",
        description: "Each day allows families to share stories and thoughts across generations."
    }
  ];

  const categories = [
    { name: 'Faith', count: 31, color: 'bg-yellow-500' },
    { name: 'Hope', count: 31, color: 'bg-blue-500' },
    { name: 'Love', count: 28, color: 'bg-red-500' },
    { name: 'Repentance', count: 30, color: 'bg-purple-500' },
    { name: 'Service', count: 31, color: 'bg-green-500' },
    { name: 'Gratitude', count: 61, color: 'bg-orange-500' },
    { name: 'Forgiveness', count: 31, color: 'bg-pink-500' },
    { name: 'Patience', count: 31, color: 'bg-indigo-500' },
    { name: 'Humility', count: 30, color: 'bg-gray-500' },
    { name: 'Courage', count: 31, color: 'bg-teal-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-spiritual-light via-white to-spiritual-peace">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-spiritual-gold/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-spiritual-gold to-yellow-600 rounded-full flex items-center justify-center shadow-2xl">
                <Star className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 font-serif">
              360 Points of Light
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              A spiritual compass with 365 wholesome lessons to guide your journey back to Christ. 
              Each day represents a different aspect of our spiritual growth and provides wisdom for posterity.
            </p>
            
            {/* Today's Lesson Preview */}
            {todaysPoint && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto mb-8 shadow-lg">
                <div className="flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5 text-spiritual-gold mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Today's Lesson</h3>
                </div>
                <h4 className="text-xl font-bold text-spiritual-faith mb-2">{todaysPoint.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{todaysPoint.dateString} - Day {todaysPoint.dayOfYear}</p>
                <p className="text-gray-700 leading-relaxed">{todaysPoint.lesson.substring(0, 150)}...</p>
                <button
                  onClick={() => handlePointClick(todaysPoint)}
                  className="mt-4 text-spiritual-gold hover:text-yellow-600 font-medium text-sm"
                >
                  Read Full Lesson →
                </button>
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="spiritual-button text-lg px-8 py-4"
              onClick={() => document.getElementById('liahona')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore the Liahona
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-serif">
              Why 365 Days?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Just as each day brings new opportunities for growth, 
              our spiritual journey requires daily guidance and family connection throughout the year.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-spiritual-faith to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Liahona Section */}
      <section id="liahona" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-serif">
              Sacred Liahona - Family Advent Calendar
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Each day of the year has its own spiritual lesson. Click on any point to explore the lesson 
              and share your family's thoughts and stories about that day's scripture.
            </p>

            {/* Date Navigation */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <button
                onClick={goToPreviousDay}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Day</span>
              </button>
              
              <div className="flex items-center space-x-2 px-6 py-2 bg-spiritual-gold text-white rounded-lg">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{format(currentDate, 'MMMM d, yyyy')}</span>
              </div>
              
              <button
                onClick={goToNextDay}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <span>Next Day</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={goToToday}
                className="px-4 py-2 bg-spiritual-faith text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Today
              </button>
            </div>

            {/* Current Day Info */}
            {currentPoint && (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto mb-8 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{currentPoint.title}</h3>
                <p className="text-sm text-gray-600 mb-3">Day {currentPoint.dayOfYear} - {currentPoint.dateString}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{currentPoint.lesson.substring(0, 120)}...</p>
                <button
                  onClick={() => handlePointClick(currentPoint)}
                  className="mt-3 text-spiritual-gold hover:text-yellow-600 font-medium text-sm"
                >
                  View Full Lesson & Family Stories →
                </button>
              </div>
            )}
          </motion.div>

          <Liahona3D 
            points={allCompassPoints} 
            onPointClick={handlePointClick} 
            selectedDay={selectedDay}
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-serif">
              Spiritual Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our lessons are organized into ten spiritual categories, distributed throughout the year
              to help you grow in different aspects of your faith.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-bold text-sm">{category.count}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 font-serif">
              About This Project
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed space-y-6">
              <p>
                              The 365 Points of Light project was created as a spiritual Liahona to help guide 
              individuals and families back to Christ. Each of the 365 days represents a unique 
              lesson, principle, or practice that can strengthen our faith and draw us closer to God.
              </p>
              <p>
                These lessons are designed to be wholesome, uplifting, and practical for daily living. 
                They are meant to be shared with posterity - our children, grandchildren, and future 
                generations who will benefit from these spiritual teachings.
              </p>
              <p>
                Whether you're just beginning your spiritual journey or have been walking with Christ 
                for many years, these 365 daily lessons provide guidance, encouragement, and wisdom for every 
                step of the way, with space for your family to share their own stories and insights.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-spiritual-faith to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
              Begin Your Spiritual Journey Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Explore the Liahona, discover daily lessons, and strengthen your relationship with Christ through family stories.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-spiritual-faith px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              onClick={() => document.getElementById('liahona')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Exploring
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Lesson Card Modal */}
      <AnimatePresence>
        {selectedPoint && (
          <LessonCard point={selectedPoint} onClose={handleCloseLesson} />
        )}
      </AnimatePresence>
    </div>
  );
} 