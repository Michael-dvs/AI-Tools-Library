import React from 'react';
import { Cpu, Mail, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Cpu className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                AI Tools Library
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Discover, explore, and compare the best AI tools and models.
              Make informed decisions for your AI-powered projects.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Submit a Tool
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@aitoolslibrary.com"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>contact@aitoolslibrary.com</span>
                </a>
              </li>
              <li className="flex space-x-3 pt-2">
                <a
                  href="#"
                  className="p-2 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © 2025 AI Tools Library. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
