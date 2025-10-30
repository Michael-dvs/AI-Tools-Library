import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, Plus } from 'lucide-react';
import { AITool, supabase } from '../lib/supabase';

interface ComparisonPanelProps {
  selectedTools: AITool[];
  onRemoveTool: (toolId: string) => void;
  onAddTool: (tool: AITool) => void;
  onClose: () => void;
}

export default function ComparisonPanel({ selectedTools, onRemoveTool, onAddTool, onClose }: ComparisonPanelProps) {
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showToolSelector, setShowToolSelector] = useState(false);
  const [allTools, setAllTools] = useState<AITool[]>([]);
  const [searchTool, setSearchTool] = useState('');

  useEffect(() => {
    fetchAllTools();
  }, []);

  const fetchAllTools = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setAllTools(data || []);
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  const handleCompare = async () => {
    if (!prompt.trim() || selectedTools.length === 0) return;

    setLoading(true);
    const mockResults: Record<string, string> = {};

    await new Promise((resolve) => setTimeout(resolve, 1500));

    selectedTools.forEach((tool) => {
      mockResults[tool.id] = `This is a simulated response from ${tool.name}. In a production environment, this would connect to the actual API of ${tool.name} and return real results based on your prompt: "${prompt}"`;
    });

    setResults(mockResults);
    setLoading(false);
  };

  const handleAddTool = (tool: AITool) => {
    onAddTool(tool);
    setShowToolSelector(false);
    setSearchTool('');
  };

  const availableTools = allTools.filter(
    (tool) =>
      !selectedTools.some((selected) => selected.id === tool.id) &&
      (tool.name.toLowerCase().includes(searchTool.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchTool.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Compare AI Tools</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selected Tools ({selectedTools.length})
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedTools.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No tools selected. Click "Try Now" on any tool to add it to the comparison.
                </p>
              ) : (
                <>
                  {selectedTools.map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200"
                    >
                      <span className="text-sm font-medium text-gray-700">{tool.name}</span>
                      <button
                        onClick={() => onRemoveTool(tool.id)}
                        className="p-1 hover:bg-white/50 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setShowToolSelector(true)}
                    className="flex items-center space-x-1 px-3 py-2 bg-white border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
                  >
                    <Plus className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-blue-600">Add Tool</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {showToolSelector && (
            <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">Select a Tool to Add</h3>
                <button
                  onClick={() => {
                    setShowToolSelector(false);
                    setSearchTool('');
                  }}
                  className="p-1 text-gray-500 hover:text-gray-700 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <input
                type="text"
                value={searchTool}
                onChange={(e) => setSearchTool(e.target.value)}
                placeholder="Search tools..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
              />
              <div className="max-h-60 overflow-y-auto space-y-2">
                {availableTools.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    {searchTool ? 'No tools found' : 'All tools are already selected'}
                  </p>
                ) : (
                  availableTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleAddTool(tool)}
                      className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition-all group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg font-bold bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            {tool.name.charAt(0)}
                          </span>
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-gray-900">{tool.name}</p>
                          <p className="text-xs text-gray-500">{tool.category}</p>
                        </div>
                      </div>
                      <Plus className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Your Prompt
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., 'Write a short poem about AI' or 'Explain quantum computing'"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={selectedTools.length === 0}
              />
              <button
                onClick={handleCompare}
                disabled={!prompt.trim() || selectedTools.length === 0 || loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>{loading ? 'Comparing...' : 'Compare'}</span>
              </button>
            </div>
          </div>

          {Object.keys(results).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {tool.name.charAt(0)}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900">{tool.name}</h4>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                        {results[tool.id] || 'No result yet'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-gray-600 font-medium">Comparing results...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
