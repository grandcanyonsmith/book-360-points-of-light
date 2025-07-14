'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Liahona3D from '@/components/Liahona3D';
import LessonCard from '@/components/LessonCard';
import Footer from '@/components/Footer';
import { allCompassPoints, CompassPoint, getTodaysPoint, getPointByDate } from '@/data/compassPoints';
import { Star, Heart, BookOpen, Target, Users, Lightbulb, ArrowRight, Calendar, ChevronLeft, ChevronRight, Sparkles, Clock, TrendingUp } from 'lucide-react';
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
      description: "Each day represents a unique spiritual lesson to guide your journey back to Christ.",
      color: "from-yellow-400 to-yellow-600"
    },
    {
      icon: Heart,
      title: "Wholesome Lessons",
      description: "Carefully crafted teachings focused on faith, hope, love, and spiritual growth.",
      color: "from-red-400 to-red-600"
    },
    {
      icon: BookOpen,
      title: "Scripture-Based",
      description: "Every lesson is grounded in biblical principles and sacred texts.",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Users,
      title: "Family Stories",
      description: "Each day allows families to share stories and thoughts across generations.",
      color: "from-purple-400 to-purple-600"
    }
  ];

  const categories = [
    { name: 'Faith', count: 31, color: 'from-yellow-400 to-yellow-600', icon: Star },
    { name: 'Hope', count: 31, color: 'from-blue-400 to-blue-600', icon: Sparkles },
    { name: 'Love', count: 28, color: 'from-red-400 to-red-600', icon: Heart },
    { name: 'Repentance', count: 30, color: 'from-purple-400 to-purple-600', icon: TrendingUp },
    { name: 'Service', count: 31, color: 'from-green-400 to-green-600', icon: Users },
    { name: 'Gratitude', count: 61, color: 'from-orange-400 to-orange-600', icon: Heart },
    { name: 'Forgiveness', count: 31, color: 'from-pink-400 to-pink-600', icon: Heart },
    { name: 'Patience', count: 31, color: 'from-indigo-400 to-indigo-600', icon: Clock },
    { name: 'Humility', count: 30, color: 'from-gray-400 to-gray-600', icon: BookOpen },
    { name: 'Courage', count: 31, color: 'from-teal-400 to-teal-600', icon: Target }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial-center from-spiritual-gold/10 via-transparent to-transparent animate-pulse-slow" />
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 bg-spiritual-faith/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 bg-spiritual-love/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, -50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 25, repeat: Infinity }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero icon */}
            <motion.div 
              className="flex justify-center mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <div className="relative w-24 h-24 lg:w-32 lg:h-32">
                <div className="absolute inset-0 bg-gradient-to-br from-spiritual-gold to-spiritual-gold-dark rounded-full shadow-2xl animate-glow" />
                <div className="relative w-full h-full bg-gradient-to-br from-spiritual-gold via-spiritual-gold-light to-spiritual-gold-dark rounded-full flex items-center justify-center shadow-glow-lg">
                  <Star className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                </div>
              </div>
            </motion.div>
            
            {/* Main title */}
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 font-display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              360 Points of
              <span className="block mt-2 gradient-text">Light</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              A spiritual compass with 365 wholesome lessons to guide your journey back to Christ. 
              Each day represents a different aspect of our spiritual growth and provides wisdom for posterity.
            </motion.p>
            
            {/* Today's Lesson Preview */}
            {todaysPoint && (
              <motion.div 
                className="glass-card rounded-2xl p-8 max-w-2xl mx-auto mb-10 shadow-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-center mb-4 gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-spiritual-gold to-spiritual-gold-dark rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Today's Spiritual Lesson</h3>
                </div>
                <h4 className="text-2xl font-bold text-spiritual-faith mb-3 font-display">{todaysPoint.title}</h4>
                <p className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-2">
                  <span>{todaysPoint.dateString}</span>
                  <span className="text-spiritual-gold">•</span>
                  <span>Day {todaysPoint.dayOfYear} of 365</span>
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">{todaysPoint.lesson.substring(0, 150)}...</p>
                <motion.button
                  onClick={() => handlePointClick(todaysPoint)}
                  className="spiritual-button text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Read Full Lesson</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.button>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="spiritual-button text-lg"
                onClick={() => document.getElementById('liahona')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Explore the Liahona
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 font-medium"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-spiritual-gold/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-spiritual-gold rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-spiritual-peace/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display">
              Why 365 Days?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Just as each day brings new opportunities for growth, 
              our spiritual journey requires daily guidance and family connection throughout the year.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-spiritual-faith/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Liahona Section */}
      <section id="liahona" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-spiritual-peace/30 to-white" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-block mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-spiritual-gold to-spiritual-gold-dark rounded-full flex items-center justify-center shadow-glow mx-auto">
                <Target className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display">
              Sacred Liahona - Family Advent Calendar
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Each day of the year has its own spiritual lesson. Click on any point to explore the lesson 
              and share your family's thoughts and stories about that day's scripture.
            </p>

            {/* Enhanced Date Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <motion.button
                onClick={goToPreviousDay}
                className="flex items-center space-x-2 px-6 py-3 bg-white shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-spiritual-faith transition-colors" />
                <span className="font-medium text-gray-700">Previous Day</span>
              </motion.button>
              
              <div className="flex items-center space-x-3 px-8 py-3 bg-gradient-to-r from-spiritual-gold to-spiritual-gold-dark text-white rounded-xl shadow-lg">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold text-lg">{format(currentDate, 'MMMM d, yyyy')}</span>
              </div>
              
              <motion.button
                onClick={goToNextDay}
                className="flex items-center space-x-2 px-6 py-3 bg-white shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-medium text-gray-700">Next Day</span>
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-spiritual-faith transition-colors" />
              </motion.button>
              
              <motion.button
                onClick={goToToday}
                className="px-6 py-3 bg-gradient-to-r from-spiritual-faith to-spiritual-faith-dark text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Today
                </span>
              </motion.button>
            </div>

            {/* Current Day Info */}
            {currentPoint && (
              <motion.div 
                className="glass-card rounded-2xl p-6 max-w-lg mx-auto mb-10 shadow-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={currentPoint.dayOfYear}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-spiritual-faith to-spiritual-faith-dark rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{currentPoint.dayOfYear}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{currentPoint.title}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-3">{currentPoint.dateString}</p>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{currentPoint.lesson.substring(0, 120)}...</p>
                <motion.button
                  onClick={() => handlePointClick(currentPoint)}
                  className="spiritual-button text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Full Lesson & Family Stories
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <Liahona3D 
                points={allCompassPoints} 
                onPointClick={handlePointClick} 
                selectedDay={selectedDay}
              />
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-spiritual-gold/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-spiritual-faith/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-spiritual-light/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display">
              Spiritual Categories
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
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
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
              >
                <div className="glass-card p-6 rounded-2xl text-center hover:shadow-2xl transition-all duration-500 border border-white/50">
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold gradient-text">{category.count}</span>
                    <span className="text-sm text-gray-500">lessons</span>
                  </div>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-spiritual-peace/20 via-white to-spiritual-light/20" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <BookOpen className="w-16 h-16 text-spiritual-faith mx-auto" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 font-display">
              About This Project
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-8 rounded-2xl shadow-lg"
              >
                The 365 Points of Light project was created as a spiritual Liahona to help guide 
                individuals and families back to Christ. Each of the 365 days represents a unique 
                lesson, principle, or practice that can strengthen our faith and draw us closer to God.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-8 rounded-2xl shadow-lg"
              >
                These lessons are designed to be wholesome, uplifting, and practical for daily living. 
                They are meant to be shared with posterity - our children, grandchildren, and future 
                generations who will benefit from these spiritual teachings.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-8 rounded-2xl shadow-lg"
              >
                Whether you're just beginning your spiritual journey or have been walking with Christ 
                for many years, these 365 daily lessons provide guidance, encouragement, and wisdom for every 
                step of the way, with space for your family to share their own stories and insights.
              </motion.p>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-spiritual-gold/10 rounded-full blur-2xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-32 h-32 bg-spiritual-faith/10 rounded-full blur-2xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-spiritual-faith via-spiritual-wisdom to-spiritual-faith-dark" />
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-16 h-16 mx-auto" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Begin Your Spiritual Journey Today
            </h2>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Explore the Liahona, discover daily lessons, and strengthen your relationship with Christ through family stories.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-spiritual-faith px-10 py-5 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl"
              onClick={() => document.getElementById('liahona')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="flex items-center gap-3">
                Start Exploring
                <ArrowRight className="w-5 h-5" />
              </span>
            </motion.button>
          </motion.div>
        </div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
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