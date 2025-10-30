import React from 'react';
import { X, Heart } from 'lucide-react';
import { AITool } from '../lib/supabase';
import AIToolCard from './AIToolCard';

interface FavoritesPanelProps {
  favoriteTools: AITool[];
  onClose: () => void;
  onToggleFavorite: (toolId: string) => void;
  onTryNow: (tool: AITool) => void;
}

export default function FavoritesPanel({
  favoriteTools,
  onClose,
  onToggleFavorite,
  onTryNow,
}: FavoritesPanelProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-white fill-current" />
            <h2 className="text-xl font-bold text-white">Your Favorites</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {favoriteTools.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">No favorites yet</h3>
              <p className="text-gray-600 text-center max-w-md">
                Start exploring AI tools and click the heart icon to save your favorites here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteTools.map((tool) => (
                <AIToolCard
                  key={tool.id}
                  tool={tool}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                  onTryNow={onTryNow}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
