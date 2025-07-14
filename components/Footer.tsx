'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, BookOpen, Users, Mail, Github, ExternalLink, Calendar, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    explore: [
      { name: 'Interactive Compass', href: '#compass', icon: Star },
      { name: 'Daily Lessons', href: '#lessons', icon: Calendar },
      { name: 'Family Stories', href: '#stories', icon: Users },
      { name: 'About Project', href: '#about', icon: BookOpen },
    ],
    categories: [
      { name: 'Faith', href: '#faith' },
      { name: 'Hope', href: '#hope' },
      { name: 'Love', href: '#love' },
      { name: 'Service', href: '#service' },
    ],
    connect: [
      { name: 'Share Your Story', href: '#share', icon: Heart },
      { name: 'Contact Us', href: '#contact', icon: Mail },
      { name: 'GitHub', href: '#github', icon: Github },
      { name: 'Newsletter', href: '#newsletter', icon: Mail },
    ],
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <motion.div 
                className="flex items-center space-x-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-spiritual-gold to-spiritual-gold-dark rounded-full flex items-center justify-center shadow-glow">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-spiritual-gold/20"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-display">360 Points of Light</h3>
                  <p className="text-gray-400 text-sm">A Spiritual Compass</p>
                </div>
              </motion.div>
              
              <p className="text-gray-300 mb-6 leading-relaxed max-w-lg">
                A wholesome guide with 365 compass points to refocus our lives and turn back to Christ. 
                Each point represents a different aspect of our spiritual journey, providing lessons for posterity 
                and guidance for daily living.
              </p>
              
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-spiritual-gold/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-spiritual-gold/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                <div className="w-8 h-8 bg-spiritual-gold/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-spiritual-gold" />
                </div>
                <span>Explore</span>
              </h4>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="group flex items-center space-x-2 text-gray-300 hover:text-spiritual-gold transition-colors"
                    >
                      {link.icon && <link.icon className="w-4 h-4 opacity-50 group-hover:opacity-100" />}
                      <span className="link-underline">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                <div className="w-8 h-8 bg-spiritual-faith/20 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-spiritual-faith" />
                </div>
                <span>Categories</span>
              </h4>
              <ul className="space-y-3">
                {footerLinks.categories.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-spiritual-gold transition-colors link-underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>© {currentYear} 360 Points of Light. All rights reserved.</p>
              <p className="mt-1">Made with <Heart className="w-3 h-3 inline text-red-500" /> for spiritual growth</p>
            </div>
            
            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-300 hover:text-spiritual-gold transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm">Back to top</span>
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-spiritual-gold/20 transition-colors">
                <ArrowUp className="w-4 h-4" />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Decorative gradient line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-spiritual-gold via-spiritual-faith to-spiritual-gold" />
      </div>
    </footer>
  );
} 