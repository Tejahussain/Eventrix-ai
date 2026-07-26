import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onOpenWizard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWizard }) => {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 px-4 md:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
        <div className="col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-tr from-pink-400 to-amber-300 rounded-lg flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 font-serif">Eventrix</span>
          </div>
          <p className="text-gray-500 text-xs max-w-xs mb-6 leading-relaxed">
            The luxury AI standard for celebration planning. We help you turn moments into unforgettable memories, effortlessly.
          </p>
          <button
            onClick={onOpenWizard}
            className="px-5 py-2.5 bg-gray-900 text-white rounded-full text-xs font-bold hover:bg-gray-800 transition-all shadow-md"
          >
            Create New Event Plan
          </button>
        </div>

        <div>
          <h5 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-4">Product</h5>
          <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
            <li><a href="#features" className="hover:text-pink-600">AI Features</a></li>
            <li><a href="#services" className="hover:text-pink-600">Event Services</a></li>
            <li><a href="#dashboard" className="hover:text-pink-600">Operating System</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-4">Integrations</h5>
          <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
            <li><span className="text-gray-600">Google Maps</span></li>
            <li><span className="text-gray-600">Google Calendar</span></li>
            <li><span className="text-gray-600">WhatsApp Sharing</span></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-4">Legal</h5>
          <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
            <li><span className="hover:text-pink-600 cursor-pointer">Privacy Policy</span></li>
            <li><span className="hover:text-pink-600 cursor-pointer">Terms of Service</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
        <p>© 2026 Eventrix AI. Crafted with love for every celebration.</p>
        <div className="flex items-center gap-1">
          <span>Designed with</span>
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline" />
          <span>for grand celebrations</span>
        </div>
      </div>
    </footer>
  );
};
