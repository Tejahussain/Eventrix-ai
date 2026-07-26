import React from 'react';
import { Sparkles, Plus, Calendar, Menu, X, ArrowRight } from 'lucide-react';
import { EventPlan } from '../types';

interface NavbarProps {
  currentEvent: EventPlan | null;
  onOpenWizard: () => void;
  onOpenDashboard: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentEvent,
  onOpenWizard,
  onOpenDashboard,
  activeTab,
  setActiveTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 px-4 md:px-8 py-3 bg-[#FFFFF0]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-4 md:px-8 py-3 rounded-full border border-white/60 shadow-md">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActiveTab('home')}
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-400 via-rose-300 to-amber-200 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900 font-serif">Eventrix</span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
              AI OS
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors hover:text-pink-600 ${activeTab === 'home' ? 'text-pink-600 border-b-2 border-pink-400 font-bold' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('services');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else setActiveTab('home');
            }}
            className="hover:text-pink-600 transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('features');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-pink-600 transition-colors"
          >
            AI Features
          </button>

          {currentEvent && (
            <button
              onClick={onOpenDashboard}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 text-pink-700 font-bold text-xs border border-pink-200 hover:bg-pink-100 transition-all ${
                activeTab === 'dashboard' ? 'ring-2 ring-pink-400' : ''
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentEvent.details.title}</span>
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {currentEvent ? (
            <button
              onClick={onOpenDashboard}
              className="px-5 py-2 rounded-full font-semibold text-sm text-gray-800 bg-white border border-gray-200 hover:bg-gray-50 shadow-sm transition-all hidden sm:flex items-center gap-2"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-4 h-4 text-pink-500" />
            </button>
          ) : null}

          <button
            onClick={onOpenWizard}
            className="px-5 py-2.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 shadow-lg shadow-pink-100 hover:shadow-pink-200 hover:opacity-95 transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{currentEvent ? 'New Event' : 'Create My Event'}</span>
          </button>

          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 glass-card rounded-2xl flex flex-col gap-3 text-sm font-semibold text-gray-700 animate-fadeIn">
          <button
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 hover:text-pink-600"
          >
            Home
          </button>
          <button
            onClick={() => {
              onOpenWizard();
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 text-pink-600 font-bold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Event Plan
          </button>
          {currentEvent && (
            <button
              onClick={() => {
                onOpenDashboard();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-purple-600 font-bold flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Open Event Dashboard
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
