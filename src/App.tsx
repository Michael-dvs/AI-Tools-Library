import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { supabase, AITool } from './lib/supabase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import AIToolCard from './components/AIToolCard';
import ComparisonPanel from './components/ComparisonPanel';
import FavoritesPanel from './components/FavoritesPanel';
import { Sparkles, TrendingUp } from 'lucide-react';

function AppContent() {
  const { user } = useAuth();
  const [tools, setTools] = useState<AITool[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [comparisonTools, setComparisonTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTools();
  }, []);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites(new Set());
    }
  }, [user]);

  const fetchTools = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;

      setTools(data || []);

      const uniqueCategories = Array.from(
        new Set((data || []).map((tool) => tool.category))
      );
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('tool_id')
        .eq('user_id', user.id);

      if (error) throw error;

      setFavorites(new Set((data || []).map((fav) => fav.tool_id)));
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const toggleFavorite = async (toolId: string) => {
    if (!user) return;

    try {
      if (favorites.has(toolId)) {
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('tool_id', toolId);

        setFavorites((prev) => {
          const newSet = new Set(prev);
          newSet.delete(toolId);
          return newSet;
        });
      } else {
        await supabase.from('favorites').insert([
          {
            user_id: user.id,
            tool_id: toolId,
          },
        ]);

        setFavorites((prev) => new Set(prev).add(toolId));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleTryNow = (tool: AITool) => {
    const isAlreadySelected = comparisonTools.some((t) => t.id === tool.id);

    if (!isAlreadySelected) {
      setComparisonTools((prev) => [...prev, tool]);
    }

    setShowComparison(true);
  };

  const addComparisonTool = (tool: AITool) => {
    const isAlreadySelected = comparisonTools.some((t) => t.id === tool.id);

    if (!isAlreadySelected) {
      setComparisonTools((prev) => [...prev, tool]);
    }
  };

  const removeComparisonTool = (toolId: string) => {
    setComparisonTools((prev) => prev.filter((t) => t.id !== toolId));
  };

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredTools = filteredTools.filter((tool) => tool.is_featured);
  const newTools = filteredTools.filter((tool) => tool.is_new);
  const popularTools = filteredTools.filter((tool) => tool.total_ratings > 10000); // filter untuk popular tool (total ragings harus lebih dari 10.000)

  const favoriteTools = tools.filter((tool) => favorites.has(tool.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      <Navbar
        onShowFavorites={() => setShowFavorites(true)}
        onShowComparison={() => setShowComparison(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover the Best{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              AI Tools
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore, compare, and test cutting-edge artificial intelligence models
            all in one place
          </p>
        </div>

        <div className="mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="mb-12">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {popularTools.length > 0 && selectedCategory === 'All' && !searchQuery && (
              <section className="mb-16">
                <div className="flex items-center space-x-2 mb-6">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Popular Tools</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularTools.map((tool) => (
                    <AIToolCard
                      key={tool.id}
                      tool={tool}
                      isFavorite={favorites.has(tool.id)}
                      onToggleFavorite={toggleFavorite}
                      onTryNow={handleTryNow}
                    />
                  ))}
                </div>
              </section>
            )}

            {newTools.length > 0 && selectedCategory === 'All' && !searchQuery && (
              <section className="mb-16">
                <div className="flex items-center space-x-2 mb-6">
                  <Sparkles className="w-6 h-6 text-cyan-600" />
                  <h2 className="text-2xl font-bold text-gray-900">New Releases</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newTools.map((tool) => (
                    <AIToolCard
                      key={tool.id}
                      tool={tool}
                      isFavorite={favorites.has(tool.id)}
                      onToggleFavorite={toggleFavorite}
                      onTryNow={handleTryNow}
                    />
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {searchQuery || selectedCategory !== 'All' ? 'Search Results' : 'All AI Tools'}
              </h2>
              {filteredTools.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-600 text-lg">
                    No tools found matching your criteria.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.map((tool) => (
                    <AIToolCard
                      key={tool.id}
                      tool={tool}
                      isFavorite={favorites.has(tool.id)}
                      onToggleFavorite={toggleFavorite}
                      onTryNow={handleTryNow}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />

      {showComparison && (
        <ComparisonPanel
          selectedTools={comparisonTools}
          onRemoveTool={removeComparisonTool}
          onAddTool={addComparisonTool}
          onClose={() => setShowComparison(false)}
        />
      )}

      {showFavorites && (
        <FavoritesPanel
          favoriteTools={favoriteTools}
          onClose={() => setShowFavorites(false)}
          onToggleFavorite={toggleFavorite}
          onTryNow={handleTryNow}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
