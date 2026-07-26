import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EventWizardModal } from './components/EventWizardModal';
import { OperatingSystemDashboard } from './components/OperatingSystemDashboard';
import { AIConciergeDrawer } from './components/AIConciergeDrawer';
import { Footer } from './components/Footer';
import { EventPlan } from './types';
import { Sparkles, Bot } from 'lucide-react';

const INITIAL_DEMO_EVENT: EventPlan = {
  id: 'event-demo-1',
  createdAt: new Date().toISOString(),
  details: {
    title: "Aarav & Ananya's Royal Mehendi & Sangeet",
    eventType: 'Mehendi & Sangeet',
    date: '2026-09-20',
    budget: 25000,
    guestCount: 150,
    location: 'Miami Beach Palace & Royal Gardens, FL',
    theme: 'Royal Pastel Mehendi & Floral Elegance',
    specialNotes: 'Focus on floral mandap decor, acoustic dhol, and fusion vegan catering.',
  },
  overviewSummary: "A lavish, romantic Mehendi & Sangeet celebration with pastel floral decor, dhol performances, custom henna artists, and a gourmet royal fusion buffet.",
  budgetCategories: [
    {
      category: "Venue & Hospitality",
      allocatedAmount: 8500,
      items: [
        { id: "b1", name: "Royal Grand Banquet & Garden Lawn", category: "Venue & Hospitality", estimatedCost: 6500, actualCost: 6500, paid: true, notes: "Mandap lawn booked" },
        { id: "b2", name: "Guest Valet & Foyer Accommodations", category: "Venue & Hospitality", estimatedCost: 2000, actualCost: 1800, paid: true, notes: "Suites reserved" },
      ],
    },
    {
      category: "Catering & Beverages",
      allocatedAmount: 7500,
      items: [
        { id: "b3", name: "Gourmet Live Counter & Royal Buffet", category: "Catering & Beverages", estimatedCost: 5500, actualCost: 5500, paid: false, notes: "Indo-fusion menu" },
        { id: "b4", name: "Artisanal Mocktail Bar & Desserts", category: "Catering & Beverages", estimatedCost: 2000, actualCost: 1900, paid: true, notes: "Signature drinks" },
      ],
    },
    {
      category: "Decor & Florals",
      allocatedAmount: 5000,
      items: [
        { id: "b5", name: "Mehendi Mandap & Jasmine Stage Canopy", category: "Decor & Florals", estimatedCost: 3200, actualCost: 3200, paid: true, notes: "Marigold & Rose Drapes" },
        { id: "b6", name: "Fairylights & Ambient Lanterns", category: "Decor & Florals", estimatedCost: 1800, actualCost: 1800, paid: false, notes: "Golden hour glow" },
      ],
    },
    {
      category: "Entertainment & Photo",
      allocatedAmount: 4000,
      items: [
        { id: "b7", name: "Candid Cinematic Photography & Drone", category: "Entertainment & Photo", estimatedCost: 2500, actualCost: 2500, paid: false, notes: "Trailer edit included" },
        { id: "b8", name: "Sangeet Dhol & Acoustic DJ Night", category: "Entertainment & Photo", estimatedCost: 1500, actualCost: 1500, paid: true, notes: "Choreography setup" },
      ],
    },
  ],
  checklist: [
    { id: "t1", title: "Finalize venue contract & deposit", category: "Venue", dueDate: "4 Weeks Before", priority: "high", completed: true },
    { id: "t2", title: "Confirm floral mandap palette & stage design", category: "Decor", dueDate: "3 Weeks Before", priority: "high", completed: true },
    { id: "t3", title: "Send digital AI invitations to guest list", category: "Invites", dueDate: "3 Weeks Before", priority: "high", completed: true },
    { id: "t4", title: "Conduct catering tasting menu review", category: "Catering", dueDate: "2 Weeks Before", priority: "medium", completed: false },
    { id: "t5", title: "Finalize DJ playlist & Sangeet dance sequence", category: "Entertainment", dueDate: "1 Week Before", priority: "medium", completed: false },
    { id: "t6", title: "Prepare welcome hamper baskets & return favors", category: "Logistics", dueDate: "3 Days Before", priority: "low", completed: false },
  ],
  timeline: [
    { id: "m1", time: "03:00 PM", title: "Guest Arrival & Welcome Spritzers", description: "Fresh Jasmine garlands & signature lychee spritzers on arrival", location: "Welcome Foyer", completed: true },
    { id: "m2", time: "04:30 PM", title: "Mehendi Ceremony & Henna Session", description: "Custom henna artists for bride & guests with live acoustic folk music", location: "Garden Pavilion", completed: true },
    { id: "m3", time: "06:30 PM", title: "Golden Hour Photo Shoot", description: "Candid portraits with pastel marigold installations", location: "Lakeside Lawn", completed: false },
    { id: "m4", time: "07:30 PM", title: "Sangeet Family Dances & Dhol Beats", description: "Choreographed family performances & DJ beat drop", location: "Grand Stage", completed: false },
    { id: "m5", time: "09:00 PM", title: "Royal Gala Dinner & Toast Speeches", description: "Multi-course buffet with live jalebi counter and toast speeches", location: "Dining Canopy", completed: false },
  ],
  shoppingList: [
    { id: "s1", name: "Organic Henna / Mehendi Cones", category: "Ceremony", quantity: "30 Packs", estimatedCost: 90, status: "bought", purchaseUrl: "https://www.google.com/search?q=organic+henna+cones" },
    { id: "s2", name: "Brass Welcome Thali Sets", category: "Decor", quantity: "4 Sets", estimatedCost: 160, status: "pending", purchaseUrl: "https://www.google.com/search?q=brass+thali+set+wedding" },
    { id: "s3", name: "Pastel Satin Return Gift Bags", category: "Favors", quantity: "150 Bags", estimatedCost: 300, status: "pending", purchaseUrl: "https://www.google.com/search?q=pastel+gift+bags" },
    { id: "s4", name: "Floating Scented Lotus Candles", category: "Lighting", quantity: "60 Pieces", estimatedCost: 110, status: "bought", purchaseUrl: "https://www.google.com/search?q=floating+lotus+candles" },
  ],
  guestList: [
    { id: "g1", name: "Aarav & Ananya Sharma", category: "Family", rsvpStatus: "confirmed", plusOneCount: 2, dietary: "Vegetarian", phone: "+1 555-0192" },
    { id: "g2", name: "Priya & Rohan Mehta", category: "Friends", rsvpStatus: "confirmed", plusOneCount: 2, dietary: "No Nuts", phone: "+1 555-0183" },
    { id: "g3", name: "Vikram Sengupta", category: "VIP", rsvpStatus: "pending", plusOneCount: 1, dietary: "Vegan", phone: "+1 555-0174" },
    { id: "g4", name: "Sunita Kapoor", category: "Family", rsvpStatus: "confirmed", plusOneCount: 1, dietary: "None", phone: "+1 555-0165" },
    { id: "g5", name: "David & Sarah Miller", category: "Colleagues", rsvpStatus: "declined", plusOneCount: 0, dietary: "Gluten Free", phone: "+1 555-0156" },
  ],
  recommendations: {
    decorIdeas: [
      {
        title: "Pastel Marigold & Mirror Canopy",
        description: "Drapes of sage green chiffon paired with baby pink carnations and hanging brass lamps.",
        colorPalette: ["#FFDAB9", "#D1E8E2", "#E6E6FA", "#FFF0F5", "#D4AF37"],
        vibe: "Traditional Meets Modern Luxury",
        imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
      },
      {
        title: "Fairy-Lit Bohemian Courtyard",
        description: "Low velvet seating cushions, rattan lamps, and floating flower bowls with gentle incense.",
        colorPalette: ["#FFF0F5", "#E6E6FA", "#D4AF37", "#FFFFF0"],
        vibe: "Cozy Dreamy Romance",
        imageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=600",
      },
    ],
    catering: {
      cuisineStyle: "Royal Indo-Fusion & Mediterranean Tapas",
      menuHighlights: [
        "Truffle Mushroom Kebabs",
        "Artisanal Paneer Tikka Sliders",
        "Live Saffron Jalebi & Rabri Bar",
        "Sparkling Lychee Mint Spritzers",
      ],
      estimatedCostPerHead: 45,
    },
    entertainment: [
      { title: "Sangeet Dhol & Acoustic Ensemble", type: "Music & Live Band", description: "Traditional dhol beat drop followed by smooth acoustic wedding pop cover band." },
      { title: "Interactive Polaroid Memory Wall", type: "Activity", description: "Guests snap instant photos with handwritten blessing notes for the host album." },
    ],
    seatingLayout: [
      { tableName: "Table 1: Family Elders", capacity: 8, guestCategory: "Family", shape: "round" },
      { tableName: "Table 2: VIP & Dignitaries", capacity: 6, guestCategory: "VIP", shape: "rectangular" },
      { tableName: "Table 3: College & Close Friends", capacity: 10, guestCategory: "Friends", shape: "lounge" },
      { tableName: "Table 4: Colleagues & Work", capacity: 8, guestCategory: "Colleagues", shape: "round" },
    ],
    playlist: [
      { id: "pl1", songTitle: "Kabira (Acoustic Ensemble)", artist: "Tochi Raina & Rekha Bhardwaj", milestone: "Grand Guest Arrival", duration: "3:45" },
      { id: "pl2", songTitle: "Navrai Majhi & Din Shagna Da", artist: "Sunidhi Chauhan & Jasleen Royal", milestone: "Mehendi Bride Entry", duration: "4:12" },
      { id: "pl3", songTitle: "London Thumakda & Gallan Goodiyaan", artist: "Labh Janjua & Farhan Akhtar", milestone: "Sangeet Family Dance", duration: "5:00" },
      { id: "pl4", songTitle: "Gur Nalon Ishq Mitha (Dhol Beat Mix)", artist: "Yo Yo Honey Singh & Malkit Singh", milestone: "Dhol Night Finale", duration: "4:30" },
    ],
    vendors: [
      { id: "vd1", serviceType: "Venue & Hospitality", vendorName: "Miami Beach Palace Lawn", contactPerson: "Carlos Rivera", status: "Booked", agreedPrice: 6500, notes: "Outdoor lawn with power backup" },
      { id: "vd2", serviceType: "Decorator & Florals", vendorName: "Lotus & Marigold Florals", contactPerson: "Sunita Design Studio", status: "Deposit Paid", agreedPrice: 3200, notes: "Pastel canopy & drapes" },
      { id: "vd3", serviceType: "Catering", vendorName: "Royal Spice Gourmet Catering", contactPerson: "Chef Vikram", status: "Negotiating", agreedPrice: 5500, notes: "Vegan live counters requested" },
      { id: "vd4", serviceType: "Photography", vendorName: "Cinematic Memories Studio", contactPerson: "David Miller", status: "Deposit Paid", agreedPrice: 2500, notes: "4K Drone + Teaser reel" },
    ],
  },
  invitation: {
    styleName: "Pastel Floral & Gold Foil",
    title: "Celebration of Love & Happiness",
    hostNames: "The Sharma & Verma Families",
    dateText: "Sunday, 20th September 2026",
    timeText: "3:00 PM Onwards",
    venueName: "Miami Beach Palace & Royal Gardens",
    dressCode: "Pastel Traditional / Festive Chic",
    tagline: "Join us under the stars as we begin our new chapter.",
    formalText: "We cordially invite you to celebrate the joyous occasion of our Mehendi & Sangeet. Your presence and blessings will make our special day truly memorable.",
    whatsappText: "✨ *Save the Date!* ✨\nWe are overjoyed to invite you to our *Mehendi & Sangeet* on Sept 20, 2026 at Miami Beach Palace!\nRSVP & join the celebration! 🌸🥂",
    poeticText: "As flowers bloom and music plays, we gather together to cherish new days. Join us in joyous songs and laughter!",
  },
  weatherPrediction: {
    location: "Miami Beach, FL",
    date: "2026-09-20",
    temperature: "78°F / 25°C",
    condition: "Sunny & Pleasant",
    precipitationChance: "10%",
    clothingTip: "Light pastel silk fabrics for afternoon; light wrap for evening breeze.",
    venueTip: "Perfect conditions for outdoor garden lawn Mehendi & covered ballroom Sangeet!",
  },
  venueSuggestions: [
    {
      id: "v1",
      name: "Miami Beach Palace & Royal Gardens",
      rating: 4.9,
      address: "100 Ocean Drive, Miami Beach, FL",
      capacity: "100 - 500 Guests",
      priceRange: "$$$$",
      mapQueryUrl: "https://www.google.com/maps/search/?api=1&query=Miami+Beach+Palace+venue",
      imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600",
    },
  ],
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard'>('home');
  const [currentEvent, setCurrentEvent] = useState<EventPlan | null>(INITIAL_DEMO_EVENT);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [conciergeOpen, setConciergeOpen] = useState(false);

  const handlePlanGenerated = (plan: EventPlan) => {
    setCurrentEvent(plan);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FFFFF0] text-gray-800 flex flex-col font-sans">
      {/* Navigation */}
      <Navbar
        currentEvent={currentEvent}
        onOpenWizard={() => setWizardOpen(true)}
        onOpenDashboard={() => setActiveTab('dashboard')}
        activeTab={activeTab}
        setActiveTab={(tab) => setActiveTab(tab as any)}
      />

      {/* Main Content View */}
      <main className="flex-1">
        {activeTab === 'home' ? (
          <HeroSection
            onOpenWizard={() => setWizardOpen(true)}
            onExploreClick={() => setActiveTab('dashboard')}
          />
        ) : currentEvent ? (
          <OperatingSystemDashboard
            plan={currentEvent}
            onUpdatePlan={(updated) => setCurrentEvent(updated)}
            onOpenConcierge={() => setConciergeOpen(true)}
          />
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-bold font-serif">No Event Selected</h2>
            <button
              onClick={() => setWizardOpen(true)}
              className="mt-4 px-6 py-3 bg-pink-500 text-white font-bold rounded-full text-sm"
            >
              Create New Event Plan
            </button>
          </div>
        )}
      </main>

      {/* Floating AI Concierge Button */}
      <button
        onClick={() => setConciergeOpen(!conciergeOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2 group ring-4 ring-white/60"
        title="Open Eventrix AI Concierge"
      >
        <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline font-bold text-xs">AI Concierge</span>
      </button>

      {/* AI Event Creation Wizard Modal */}
      <EventWizardModal
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onPlanGenerated={handlePlanGenerated}
      />

      {/* AI Concierge Drawer */}
      <AIConciergeDrawer
        isOpen={conciergeOpen}
        onClose={() => setConciergeOpen(false)}
        currentEvent={currentEvent}
      />

      {/* Footer */}
      <Footer onOpenWizard={() => setWizardOpen(true)} />
    </div>
  );
}
