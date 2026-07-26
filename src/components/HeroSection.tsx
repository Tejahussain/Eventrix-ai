import React from 'react';
import boutiqueBirthdayImg from '../assets/images/boutique_birthday_1785073397215.jpg';
import {
  Wand2,
  ArrowRight,
  CheckCircle2,
  Heart,
  Cake,
  Building2,
  GraduationCap,
  Wallet,
  Clock,
  Mail,
  Palette,
  ShoppingCart,
  Sparkles,
  Users,
  MapPin,
  CalendarDays
} from 'lucide-react';

interface HeroSectionProps {
  onOpenWizard: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenWizard, onExploreClick }) => {
  return (
    <div className="relative overflow-hidden mehendi-pattern">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-pink-600 font-bold text-xs md:text-sm mb-6 border border-pink-100 shadow-sm animate-pulse">
              <Wand2 className="w-4 h-4 text-pink-500" />
              <span>Next-Gen Celebration Operating System</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6 font-serif">
              Plan your perfect <span className="gradient-text">celebration</span> with AI
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Meet your luxury AI celebration operating system. From dream Mehendi & Sangeet ceremonies to boutique birthdays and galas, we generate complete plans, budgets, schedules, and live trackers effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onOpenWizard}
                className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group"
              >
                <span>Create My Event Plan</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-pink-300" />
              </button>

              <button
                onClick={onExploreClick}
                className="px-8 py-4 bg-white/90 backdrop-blur-md text-gray-800 rounded-full font-bold text-lg hover:bg-white border border-gray-200 transition-all shadow-md flex items-center justify-center gap-3"
              >
                <span>Explore AI Dashboard</span>
              </button>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-3">
                <img src="https://i.pravatar.cc/100?u=1" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="User" referrerPolicy="no-referrer" />
                <img src="https://i.pravatar.cc/100?u=2" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="User" referrerPolicy="no-referrer" />
                <img src="https://i.pravatar.cc/100?u=3" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="User" referrerPolicy="no-referrer" />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center text-xs font-bold text-gray-700 shadow-sm">
                  +2k
                </div>
              </div>
              <p className="text-sm text-gray-600 font-medium">Joined by 2,000+ happy hosts this week</p>
            </div>
          </div>

          {/* Right Hero Image Collage */}
          <div className="relative">
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="rounded-3xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
                    alt="Wedding Mandap"
                    className="w-full h-64 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800"
                    alt="Party Decor"
                    className="w-full h-72 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800"
                    alt="Luxury Celebration"
                    className="w-full h-72 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800"
                    alt="Floral Aesthetic"
                    className="w-full h-64 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Floating Glass UI Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-card p-5 rounded-2xl w-64 shadow-2xl border border-white/80 animate-float">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-semibold">RSVP Confirmation</div>
                    <div className="text-sm font-bold text-gray-800">142 / 150 Confirmed</div>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full w-[94%]" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Services Showcase */}
      <section id="services" className="py-20 px-4 md:px-8 bg-white/60 border-y border-pink-100/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              Designed for every <span className="italic text-pink-500">milestone</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Whether it's a grand Mehendi union or a boutique birthday, Eventrix tailors every detail with precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Wedding / Mehendi */}
            <div 
              onClick={onOpenWizard}
              className="group relative overflow-hidden rounded-[2rem] aspect-[4/5] cursor-pointer shadow-xl border border-white/50"
            >
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Weddings"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-3">
                  <Heart className="w-5 h-5 text-pink-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 font-serif">Grand Weddings</h3>
                <p className="text-white/80 text-xs">Mehendi, Sangeet, Mandap & Royal Reception.</p>
              </div>
            </div>

            {/* Birthdays */}
            <div 
              onClick={onOpenWizard}
              className="group relative overflow-hidden rounded-[2rem] aspect-[4/5] cursor-pointer shadow-xl border border-white/50"
            >
              <img
                src={boutiqueBirthdayImg}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Birthdays"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-3">
                  <Cake className="w-5 h-5 text-amber-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 font-serif">Boutique Birthdays</h3>
                <p className="text-white/80 text-xs">Thematic decor, custom cakes & entertainment.</p>
              </div>
            </div>

            {/* Corporate */}
            <div 
              onClick={onOpenWizard}
              className="group relative overflow-hidden rounded-[2rem] aspect-[4/5] cursor-pointer shadow-xl border border-white/50"
            >
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Corporate"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-3">
                  <Building2 className="w-5 h-5 text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 font-serif">Corporate Galas</h3>
                <p className="text-white/80 text-xs">Professional, polished, and memorable summits.</p>
              </div>
            </div>

            {/* Campus / Graduation */}
            <div 
              onClick={onOpenWizard}
              className="group relative overflow-hidden rounded-[2rem] aspect-[4/5] cursor-pointer shadow-xl border border-white/50"
            >
              <img
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="College"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-3">
                  <GraduationCap className="w-5 h-5 text-emerald-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 font-serif">Campus & Formals</h3>
                <p className="text-white/80 text-xs">Festivals, graduations, and alumni reunions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Grid */}
      <section id="features" className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-pink-600 font-bold uppercase tracking-widest text-xs mb-2 block">
              Magical Operating Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif">
              Complete AI Event Management Suite
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500 mb-6">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">Budget Operating System</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Smart category breakdowns (Venue, Catering, Decor, Photo), expense tracking, paid status tags, and real-time remaining budget calculations.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">Minute-by-Minute Timeline</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Chronological event milestones generated by AI to keep your Mehendi, ceremony, and reception running flawlessly.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">AI Invitations & Cards</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Generate printable and digital invitation cards, formal invitation letters, poetic verses, and one-click WhatsApp ready invite texts.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">Decor & Moodboard Generator</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Curated color palettes (Pastel Pink, Sage Green, Lavender, Ivory), stage mandap concepts, and interactive seating chart layouts.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 mb-6">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">Shopping & Guest Trackers</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Complete itemized shopping list with direct search links and RSVP guest manager with dietary requirements.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">Weather & Map Integrations</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Weather prediction forecasts for your event date, Google Maps venue suggestions, Google Calendar sync, and PDF schedule export.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
