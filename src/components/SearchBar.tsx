import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search AI tools by name or category..."
        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all text-gray-900 placeholder-gray-400"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
