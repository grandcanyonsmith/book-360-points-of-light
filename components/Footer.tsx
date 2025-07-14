import React from 'react';
import { Star, Heart, BookOpen, Users, Mail, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-spiritual-gold to-yellow-600 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif">360 Points of Light</h3>
                <p className="text-gray-300 text-sm">A Spiritual Compass</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              A wholesome guide with 360 compass points to refocus our lives and turn back to Christ. 
              Each point represents a different aspect of our spiritual journey, providing lessons for posterity 
              and guidance for daily living.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-spiritual-gold transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-spiritual-gold transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-spiritual-gold" />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#compass" className="text-gray-300 hover:text-spiritual-gold transition-colors">
                  Interactive Compass
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-spiritual-gold transition-colors">
                  About the Project
                </a>
              </li>
              <li>
                <a href="#lessons" className="text-gray-300 hover:text-spiritual-gold transition-colors">
                  Daily Lessons
                </a>
              </li>
              <li>
                <a href="#community" className="text-gray-300 hover:text-spiritual-gold transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Spiritual Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Heart className="w-5 h-5 text-spiritual-gold" />
              <span>Categories</span>
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#faith" className="text-gray-300 hover:text-spiritual-gold transition-colors">
                  Faith & Belief
                </a>
              </li>
              <li>
                <a href="#hope" className="text-gray-300 hover:text-spiritual-gold transition-colors">
                  Hope & Trust
                </a>
              </li>
              <li>
                <a href="#love" className="text-gray-300 hover:text-spiritual-gold transition-colors">
                  Love & Charity
                </a>
              </li>
              <li>
                <a href="#service" className="text-gray-300 hover:text-spiritual-gold transition-colors">
                  Service & Giving
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} 360 Points of Light. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-spiritual-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-spiritual-gold transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-spiritual-gold transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Scripture Quote */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="text-center">
            <blockquote className="text-gray-300 italic text-lg font-serif">
              "Let your light so shine before men, that they may see your good works, 
              and glorify your Father which is in heaven." - Matthew 5:16
            </blockquote>
          </div>
        </div>
      </div>
    </footer>
  );
} 