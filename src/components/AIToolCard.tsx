import React, { useState, useEffect } from 'react';
import { Star, Heart, Sparkles } from 'lucide-react';
import { AITool } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface AIToolCardProps {
  tool: AITool;
  isFavorite: boolean;
  onToggleFavorite: (toolId: string) => void;
  onTryNow: (tool: AITool) => void;
}

export default function AIToolCard({ tool, isFavorite, onToggleFavorite, onTryNow }: AIToolCardProps) {
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Chatbot': 'bg-blue-100 text-blue-700',
      'Image Generator': 'bg-green-100 text-green-700',
      'Code Assistant': 'bg-orange-100 text-orange-700',
      'Content Writer': 'bg-cyan-100 text-cyan-700',
      'Video Generator': 'bg-pink-100 text-pink-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 overflow-hidden group hover:shadow-xl relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

      {tool.is_new && (
        <div className="absolute top-3 right-3 z-10">
          <span className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-medium rounded-full shadow-lg">
            <Sparkles className="w-3 h-3" />
            <span>New</span>
          </span>
        </div>
      )}

      <div className="p-6 relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              {tool.logo_url ? (
                <img src={tool.logo_url} alt={`${tool.name} logo`} className="w-full h-full object-contain rounded-xl" />
              ) : (
                <span className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {tool.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${getCategoryColor(tool.category)}`}>
                {tool.category}
              </span>
            </div>
          </div>

          {user && (
            <button
              onClick={() => onToggleFavorite(tool.id)}
              className={`p-2 rounded-lg transition-all ${
                isFavorite
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-red-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {tool.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-900">
              {tool.rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500">
              ({tool.total_ratings.toLocaleString()})
            </span>
          </div>

          <button
            onClick={() => onTryNow(tool)}
            className={`px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium transition-all shadow-sm hover:shadow-md transform hover:scale-105 ${
              isHovered ? 'opacity-100' : 'opacity-90'
            }`}
          >
            Try Now
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
}
