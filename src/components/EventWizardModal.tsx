import React, { useState } from 'react';
import { X, Sparkles, Calendar, DollarSign, Users, MapPin, Palette, FileText, ArrowRight, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EventInput, EventPlan } from '../types';

interface EventWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanGenerated: (plan: EventPlan) => void;
}

const EVENT_TYPES = [
  { id: 'Mehendi & Sangeet', name: 'Mehendi & Sangeet', icon: '🌸' },
  { id: 'Grand Wedding', name: 'Grand Wedding', icon: '💍' },
  { id: 'Boutique Birthday', name: 'Boutique Birthday', icon: '🎂' },
  { id: 'Corporate Gala', name: 'Corporate Gala', icon: '🍸' },
  { id: 'Anniversary Celebration', name: 'Anniversary', icon: '✨' },
  { id: 'Baby Shower', name: 'Baby Shower', icon: '👶' },
  { id: 'Graduation Formal', name: 'Graduation / Formal', icon: '🎓' },
  { id: 'Custom Party', name: 'Custom Party', icon: '🎉' },
];

const THEMES = [
  { name: 'Royal Pastel Mehendi', colors: ['#FFDAB9', '#FFF0F5', '#D1E8E2', '#D4AF37'], desc: 'Baby Pink, Sage Green & Gold accents' },
  { name: 'Fairy Light Garden', colors: ['#FFFFF0', '#E6E6FA', '#D4AF37', '#93C5FD'], desc: 'Ivory, Lavender & Sparkling Gold' },
  { name: 'Bohemian Floral Chic', colors: ['#FDE68A', '#FCA5A5', '#D1FAE5', '#FEF3C7'], desc: 'Warm Peach, Rose, Mint & Terracotta' },
  { name: 'Modern Glass Minimalist', colors: ['#F3F4F6', '#E5E7EB', '#374151', '#D4AF37'], desc: 'Sleek Monochrome & Metallic Gold' },
];

export const EventWizardModal: React.FC<EventWizardModalProps> = ({
  isOpen,
  onClose,
  onPlanGenerated,
}) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStepText, setLoadingStepText] = useState('Consulting AI Event OS...');

  const [formData, setFormData] = useState<EventInput>({
    title: '',
    eventType: 'Mehendi & Sangeet',
    date: '2026-09-20',
    budget: 15000,
    guestCount: 120,
    location: 'Miami Beach Palace, FL',
    theme: 'Royal Pastel Mehendi',
    specialNotes: 'Focus on floral mandap decor, acoustic live dhol, and vegan catering options.',
  });

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setLoadingStepText('Connecting to AI Event Engine...');

    const steps = [
      'Structuring budget allocation for Venue, Decor & Food...',
      'Drafting minute-by-minute timeline & milestones...',
      'Building guest RSVP checklist & shopping list...',
      'Generating custom invitation texts & decor moodboard...',
      'Fetching weather prediction & venue map suggestions...',
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setLoadingStepText(steps[i]);
        i++;
      }
    }, 900);

    try {
      const res = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      clearInterval(interval);
      const planData: EventPlan = await res.json();

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFDAB9', '#FFF0F5', '#D1E8E2', '#D4AF37'],
        });
      } catch (e) {
        // Ignore if canvas-confetti canvas unavailable
      }

      setIsGenerating(false);
      onPlanGenerated(planData);
      onClose();
    } catch (err) {
      clearInterval(interval);
      console.error('Generation failed:', err);
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-pink-50 via-peach-50 to-amber-50 border-b border-pink-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-pink-400 to-amber-300 rounded-xl flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-serif">Eventrix AI Event OS</h2>
              <p className="text-xs text-gray-500">Step {step} of 3 • Craft your tailored celebration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-white/80 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {isGenerating ? (
            <div className="py-16 text-center space-y-6">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-pink-200 border-t-pink-500 animate-spin" />
                <div className="absolute inset-2 rounded-full bg-pink-50 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-pink-500 animate-bounce" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 font-serif">Generating Your Event Operating System</h3>
                <p className="text-sm text-pink-600 font-medium mt-2 animate-pulse">{loadingStepText}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Step 1: Event Type & Title */}
              {step === 1 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Event Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Aarav & Ananya's Royal Mehendi & Sangeet"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">Select Event Category</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {EVENT_TYPES.map((type) => {
                        const selected = formData.eventType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, eventType: type.id })}
                            className={`p-3 rounded-2xl border text-left flex flex-col items-center justify-center gap-1 transition-all ${
                              selected
                                ? 'bg-pink-50 border-pink-400 text-pink-700 shadow-sm font-bold'
                                : 'bg-white border-gray-100 text-gray-700 hover:border-pink-200'
                            }`}
                          >
                            <span className="text-2xl">{type.icon}</span>
                            <span className="text-xs text-center">{type.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Date, Location, Budget, Guests */}
              {step === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-pink-500" /> Date of Event
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-pink-500" /> City / Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Miami Beach, FL or Mumbai"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-pink-500" /> Total Budget ($)
                      </label>
                      <input
                        type="number"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                        step={500}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-pink-500" /> Estimated Guest Count
                      </label>
                      <input
                        type="number"
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                        step={10}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm font-semibold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Theme & Special Notes */}
              {step === 3 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-1">
                      <Palette className="w-4 h-4 text-pink-500" /> Select Celebration Theme & Palette
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {THEMES.map((theme) => {
                        const selected = formData.theme === theme.name;
                        return (
                          <div
                            key={theme.name}
                            onClick={() => setFormData({ ...formData, theme: theme.name })}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                              selected ? 'bg-pink-50/80 border-pink-400 ring-2 ring-pink-200' : 'bg-white border-gray-100 hover:border-pink-200'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-bold text-xs text-gray-900">{theme.name}</span>
                              {selected && <Check className="w-4 h-4 text-pink-600" />}
                            </div>
                            <div className="flex gap-1.5 mb-1.5">
                              {theme.colors.map((c, idx) => (
                                <span key={idx} className="w-4 h-4 rounded-full border border-gray-200 shadow-xs" style={{ backgroundColor: c }} />
                              ))}
                            </div>
                            <p className="text-[11px] text-gray-500">{theme.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1 flex items-center gap-1">
                      <FileText className="w-4 h-4 text-pink-500" /> Special Requests & Notes
                    </label>
                    <textarea
                      value={formData.specialNotes}
                      onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                      rows={3}
                      placeholder="e.g. Live dhol performers, organic marigold garlands, vegan food options..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Buttons */}
        {!isGenerating && (
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-200/60 transition-all"
              >
                Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-pink-500 hover:bg-pink-600 transition-all flex items-center gap-2 shadow-md"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                className="px-8 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Generate Complete AI Plan</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
