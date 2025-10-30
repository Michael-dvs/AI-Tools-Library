import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onSelectCategory('All')}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          selectedCategory === 'All'
            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
