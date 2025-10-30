import React, { useState } from 'react';
import { Cpu, User, Heart, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

interface NavbarProps {
  onShowFavorites?: () => void;
  onShowComparison?: () => void;
}

export default function Navbar({ onShowFavorites, onShowComparison }: NavbarProps) {
  const { user, profile, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="relative">
                <Cpu className="w-8 h-8 text-blue-600 transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                AI Tools Library
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  {onShowFavorites && (
                    <button
                      onClick={onShowFavorites}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span>Favorites</span>
                    </button>
                  )}
                  {onShowComparison && (
                    <button
                      onClick={onShowComparison}
                      className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Compare Tools
                    </button>
                  )}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {profile?.full_name || 'User'}
                      </span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                      title="Sign out"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg font-medium"
                  >
                    Register
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-3">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {profile?.full_name || 'User'}
                    </span>
                  </div>
                  {onShowFavorites && (
                    <button
                      onClick={() => {
                        onShowFavorites();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span>Favorites</span>
                    </button>
                  )}
                  {onShowComparison && (
                    <button
                      onClick={() => {
                        onShowComparison();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Compare Tools
                    </button>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign out</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="w-full px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md font-medium"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSwitchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        />
      )}
    </>
  );
}
