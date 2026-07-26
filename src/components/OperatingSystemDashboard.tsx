import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckSquare,
  Wallet,
  Users,
  ShoppingCart,
  Sparkles,
  Printer,
  Share2,
  MapPin,
  CloudSun,
  Plus,
  Trash2,
  Check,
  Edit2,
  Download,
  ExternalLink,
  MessageSquare,
  Copy,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Music,
  Disc,
  PhoneCall,
  UserCheck,
  Send
} from 'lucide-react';
import { EventPlan, BudgetItem, ChecklistTask, TimelineMilestone, GuestItem, ShoppingItem, PlaylistItem, VendorContact } from '../types';

interface OperatingSystemDashboardProps {
  plan: EventPlan;
  onUpdatePlan: (updatedPlan: EventPlan) => void;
  onOpenConcierge: () => void;
}

export const OperatingSystemDashboard: React.FC<OperatingSystemDashboardProps> = ({
  plan,
  onUpdatePlan,
  onOpenConcierge,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'budget' | 'tasks' | 'timeline' | 'guests' | 'shopping' | 'assets' | 'integrations'>('overview');
  const [copiedText, setCopiedText] = useState(false);

  // New item states
  const [newBudgetName, setNewBudgetName] = useState('');
  const [newBudgetCat, setNewBudgetCat] = useState('Decor & Florals');
  const [newBudgetCost, setNewBudgetCost] = useState(300);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCat, setNewTaskCat] = useState('General');
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneTime, setNewMilestoneTime] = useState('05:00 PM');

  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestCategory, setNewGuestCategory] = useState<'Family' | 'VIP' | 'Friends' | 'Colleagues'>('Friends');

  const [newShopItem, setNewShopItem] = useState('');
  const [newShopQty, setNewShopQty] = useState('1');

  // Playlist & Music state
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');
  const [newSongMilestone, setNewSongMilestone] = useState('Sangeet Family Dance');

  // Vendor contact state
  const [newVendorName, setNewVendorName] = useState('');
  const [newVendorService, setNewVendorService] = useState('Catering');
  const [newVendorPrice, setNewVendorPrice] = useState(2500);

  // Invitation theme selection
  const [cardTheme, setCardTheme] = useState<'pastel' | 'gold' | 'mehendi' | 'glass'>('pastel');

  // Calculations
  const allTasks = plan.checklist || [];
  const completedTasks = allTasks.filter((t) => t.completed).length;
  const progressPercent = allTasks.length ? Math.round((completedTasks / allTasks.length) * 100) : 0;

  // Budget calculations
  const totalBudget = plan.details.budget;
  let totalSpent = 0;
  plan.budgetCategories.forEach((cat) => {
    cat.items.forEach((item) => {
      totalSpent += item.actualCost || item.estimatedCost;
    });
  });
  const remainingBudget = totalBudget - totalSpent;

  // Guest calculations
  const guests = plan.guestList || [];
  const confirmedGuests = guests.filter((g) => g.rsvpStatus === 'confirmed').length;
  const pendingGuests = guests.filter((g) => g.rsvpStatus === 'pending').length;
  const totalGuestAttending = guests.reduce((acc, g) => acc + (g.rsvpStatus === 'confirmed' ? 1 + g.plusOneCount : 0), 0);

  // Countdown calculation
  const eventDate = new Date(plan.details.date);
  const now = new Date();
  const diffTime = Math.max(0, eventDate.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Toggle checklist
  const toggleTask = (taskId: string) => {
    const updatedChecklist = plan.checklist.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    onUpdatePlan({ ...plan, checklist: updatedChecklist });
  };

  // Add task
  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: ChecklistTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      category: newTaskCat,
      dueDate: '1 Week Before',
      priority: newTaskPriority,
      completed: false,
    };
    onUpdatePlan({ ...plan, checklist: [...plan.checklist, newTask] });
    setNewTaskTitle('');
  };

  // Delete task
  const deleteTask = (id: string) => {
    onUpdatePlan({ ...plan, checklist: plan.checklist.filter((t) => t.id !== id) });
  };

  // Add Budget Item
  const handleAddBudgetItem = () => {
    if (!newBudgetName.trim()) return;
    const newItem: BudgetItem = {
      id: `b-${Date.now()}`,
      name: newBudgetName,
      category: newBudgetCat,
      estimatedCost: newBudgetCost,
      actualCost: newBudgetCost,
      paid: false,
    };

    const updatedCategories = plan.budgetCategories.map((cat) => {
      if (cat.category === newBudgetCat) {
        return { ...cat, items: [...cat.items, newItem] };
      }
      return cat;
    });

    onUpdatePlan({ ...plan, budgetCategories: updatedCategories });
    setNewBudgetName('');
  };

  // Toggle Budget Item Paid
  const toggleBudgetPaid = (itemId: string) => {
    const updatedCategories = plan.budgetCategories.map((cat) => ({
      ...cat,
      items: cat.items.map((item) =>
        item.id === itemId ? { ...item, paid: !item.paid } : item
      ),
    }));
    onUpdatePlan({ ...plan, budgetCategories: updatedCategories });
  };

  // Add Milestone
  const handleAddMilestone = () => {
    if (!newMilestoneTitle.trim()) return;
    const newM: TimelineMilestone = {
      id: `m-${Date.now()}`,
      time: newMilestoneTime,
      title: newMilestoneTitle,
      description: 'Scheduled milestone activity',
      completed: false,
    };
    onUpdatePlan({ ...plan, timeline: [...plan.timeline, newM] });
    setNewMilestoneTitle('');
  };

  // Toggle Milestone
  const toggleMilestone = (id: string) => {
    const updatedTimeline = plan.timeline.map((m) =>
      m.id === id ? { ...m, completed: !m.completed } : m
    );
    onUpdatePlan({ ...plan, timeline: updatedTimeline });
  };

  // Add Guest
  const handleAddGuest = () => {
    if (!newGuestName.trim()) return;
    const newG: GuestItem = {
      id: `g-${Date.now()}`,
      name: newGuestName,
      category: newGuestCategory,
      rsvpStatus: 'pending',
      plusOneCount: 1,
      dietary: 'Standard',
    };
    onUpdatePlan({ ...plan, guestList: [...plan.guestList, newG] });
    setNewGuestName('');
  };

  // Toggle RSVP
  const cycleRSVP = (id: string) => {
    const statuses: ('confirmed' | 'pending' | 'declined')[] = ['confirmed', 'pending', 'declined'];
    const updatedGuests = plan.guestList.map((g) => {
      if (g.id === id) {
        const nextIdx = (statuses.indexOf(g.rsvpStatus) + 1) % statuses.length;
        return { ...g, rsvpStatus: statuses[nextIdx] };
      }
      return g;
    });
    onUpdatePlan({ ...plan, guestList: updatedGuests });
  };

  // Add Shopping Item
  const handleAddShopItem = () => {
    if (!newShopItem.trim()) return;
    const newShop: ShoppingItem = {
      id: `s-${Date.now()}`,
      name: newShopItem,
      category: 'General',
      quantity: newShopQty,
      estimatedCost: 50,
      status: 'pending',
      purchaseUrl: `https://www.google.com/search?q=${encodeURIComponent(newShopItem)}`,
    };
    onUpdatePlan({ ...plan, shoppingList: [...plan.shoppingList, newShop] });
    setNewShopItem('');
  };

  // Toggle Shopping Status
  const toggleShopStatus = (id: string) => {
    const updatedList = plan.shoppingList.map((item) =>
      item.id === id ? { ...item, status: (item.status === 'pending' ? 'bought' : 'pending') as 'pending' | 'bought' } : item
    );
    onUpdatePlan({ ...plan, shoppingList: updatedList });
  };

  // Add Playlist Track
  const handleAddSong = () => {
    if (!newSongTitle.trim()) return;
    const newTrack: PlaylistItem = {
      id: `pl-${Date.now()}`,
      songTitle: newSongTitle,
      artist: newSongArtist || 'Selected Artist',
      milestone: newSongMilestone,
      duration: '3:30',
    };
    const currentPlaylist = plan.recommendations?.playlist || [];
    const updatedRecs = { ...plan.recommendations, playlist: [...currentPlaylist, newTrack] };
    onUpdatePlan({ ...plan, recommendations: updatedRecs });
    setNewSongTitle('');
    setNewSongArtist('');
  };

  // Add Vendor Contact
  const handleAddVendor = () => {
    if (!newVendorName.trim()) return;
    const newV: VendorContact = {
      id: `vd-${Date.now()}`,
      serviceType: newVendorService,
      vendorName: newVendorName,
      contactPerson: 'Manager',
      status: 'Inquired',
      agreedPrice: newVendorPrice,
    };
    const currentVendors = plan.recommendations?.vendors || [];
    const updatedRecs = { ...plan.recommendations, vendors: [...currentVendors, newV] };
    onUpdatePlan({ ...plan, recommendations: updatedRecs });
    setNewVendorName('');
  };

  // Cycle Vendor Status
  const cycleVendorStatus = (id: string) => {
    const statuses: ('Booked' | 'Negotiating' | 'Deposit Paid' | 'Inquired')[] = ['Inquired', 'Negotiating', 'Deposit Paid', 'Booked'];
    const currentVendors = plan.recommendations?.vendors || [];
    const updatedVendors = currentVendors.map((v) => {
      if (v.id === id) {
        const nextIdx = (statuses.indexOf(v.status) + 1) % statuses.length;
        return { ...v, status: statuses[nextIdx] };
      }
      return v;
    });
    onUpdatePlan({ ...plan, recommendations: { ...plan.recommendations, vendors: updatedVendors } });
  };

  // Copy WhatsApp Text
  const copyWhatsAppText = () => {
    if (plan.invitation?.whatsappText) {
      navigator.clipboard.writeText(plan.invitation.whatsappText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    }
  };

  // Google Calendar URL Generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(plan.details.title);
    const details = encodeURIComponent(plan.overviewSummary || 'Celebration organized via Eventrix AI');
    const location = encodeURIComponent(plan.details.location);
    const dateFormatted = plan.details.date.replace(/-/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateFormatted}/${dateFormatted}`;
  };

  // WhatsApp Share Text
  const getWhatsAppShareText = () => {
    const text = `🌸 *${plan.details.title}* 🌸\n📅 Date: ${plan.details.date}\n📍 Location: ${plan.details.location}\n\n*Invitation Message:*\n${plan.invitation?.whatsappText || 'We look forward to celebrating with you!'}\n\nManage details on Eventrix AI Operating System!`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 mehendi-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="glass-card-dark rounded-3xl p-6 md:p-8 border border-white/80 shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 font-bold text-xs uppercase tracking-wider">
                  {plan.details.eventType}
                </span>
                <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-pink-500" />
                  {plan.details.location}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-serif mb-2">
                {plan.details.title}
              </h1>
              <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
                {plan.overviewSummary}
              </p>
            </div>

            {/* Quick Actions & Countdown */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white/90 p-3.5 rounded-2xl border border-pink-100 text-center shadow-xs">
                <span className="block text-xs font-semibold text-gray-500">Countdown</span>
                <span className="text-xl font-extrabold text-pink-600 font-serif">
                  {diffDays > 0 ? `${diffDays} Days` : 'Today! 🎉'}
                </span>
              </div>

              <div className="bg-white/90 p-3.5 rounded-2xl border border-pink-100 text-center shadow-xs">
                <span className="block text-xs font-semibold text-gray-500">Overall Progress</span>
                <span className="text-xl font-extrabold text-emerald-600 font-serif">
                  {progressPercent}%
                </span>
              </div>

              <button
                onClick={() => window.print()}
                className="px-4 py-3 rounded-2xl bg-gray-900 text-white font-bold text-xs hover:bg-gray-800 transition-all shadow-md flex items-center gap-2"
              >
                <Printer className="w-4 h-4 text-pink-300" />
                <span>Export PDF</span>
              </button>

              <button
                onClick={onOpenConcierge}
                className="px-4 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs hover:opacity-95 transition-all shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Concierge</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-gray-200/80">
          {[
            { id: 'overview', label: 'Progress & Overview', icon: Clock },
            { id: 'budget', label: 'Budget OS', icon: Wallet },
            { id: 'tasks', label: 'Task Checklist', icon: CheckSquare },
            { id: 'timeline', label: 'Event Schedule', icon: Calendar },
            { id: 'guests', label: 'Guest Manager', icon: Users },
            { id: 'shopping', label: 'Shopping List', icon: ShoppingCart },
            { id: 'assets', label: 'AI Assets & Invites', icon: Sparkles },
            { id: 'integrations', label: 'Calendar & Maps', icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm whitespace-nowrap flex items-center gap-2 transition-all ${
                  active
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:text-pink-600 border border-gray-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-pink-300' : 'text-pink-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Printable Area Wrapper for PDF Export */}
        <div className="printable-area space-y-8">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
              
              {/* Stat Card 1: Budget Summary */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Allocated Budget</span>
                  <Wallet className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-gray-900 font-serif">
                    ${totalBudget.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 flex justify-between">
                    <span>Spent: ${totalSpent.toLocaleString()}</span>
                    <span className={remainingBudget < 0 ? 'text-red-500 font-bold' : 'text-emerald-600 font-bold'}>
                      Rem: ${remainingBudget.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-pink-500 h-full"
                    style={{ width: `${Math.min(100, (totalSpent / totalBudget) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Stat Card 2: Tasks Done */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Task Completion</span>
                  <CheckSquare className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-gray-900 font-serif">
                    {completedTasks} / {allTasks.length}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {allTasks.length - completedTasks} remaining items on checklist
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              {/* Stat Card 3: Guest RSVP */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Guest Confirmation</span>
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-gray-900 font-serif">
                    {confirmedGuests} Confirmed
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {pendingGuests} pending • {totalGuestAttending} total headcount
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full"
                    style={{ width: `${guests.length ? (confirmedGuests / guests.length) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Weather Forecast Preview Widget */}
              <div className="md:col-span-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
                      <CloudSun className="w-4 h-4 text-amber-300" />
                      <span>AI Weather Prediction</span>
                    </div>
                    <h3 className="text-2xl font-bold font-serif">{plan.weatherPrediction.condition}</h3>
                    <p className="text-xs opacity-90 mt-1">
                      Target Location: {plan.weatherPrediction.location} ({plan.weatherPrediction.temperature})
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold font-serif">{plan.weatherPrediction.precipitationChance}</span>
                    <span className="block text-[11px] opacity-80">Rain Probability</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    <span className="font-bold block mb-0.5">Styling & Dress Tip</span>
                    <p className="opacity-90">{plan.weatherPrediction.clothingTip}</p>
                  </div>
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    <span className="font-bold block mb-0.5">Venue Advisory</span>
                    <p className="opacity-90">{plan.weatherPrediction.venueTip}</p>
                  </div>
                </div>
              </div>

              {/* Quick Venue Cards */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 font-serif mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-pink-500" />
                    <span>Venue Location</span>
                  </h3>
                  <p className="text-xs text-gray-600 mb-4">{plan.details.location}</p>
                </div>
                {plan.venueSuggestions?.[0] && (
                  <a
                    href={plan.venueSuggestions[0].mapQueryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 bg-pink-50 text-pink-700 font-bold text-xs rounded-xl hover:bg-pink-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>View Map & Venue Pin</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: BUDGET TRACKER */}
          {activeTab === 'budget' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 font-serif">Budget Operating System</h2>
                  <p className="text-xs text-gray-500">Track categories, update actual costs, and manage payments.</p>
                </div>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-pink-50 rounded-2xl text-center">
                    <span className="block text-[10px] font-bold text-pink-600 uppercase">Allocated</span>
                    <span className="text-lg font-bold text-gray-900">${totalBudget.toLocaleString()}</span>
                  </div>
                  <div className="px-4 py-2 bg-purple-50 rounded-2xl text-center">
                    <span className="block text-[10px] font-bold text-purple-600 uppercase">Actual Spent</span>
                    <span className="text-lg font-bold text-gray-900">${totalSpent.toLocaleString()}</span>
                  </div>
                  <div className="px-4 py-2 bg-emerald-50 rounded-2xl text-center">
                    <span className="block text-[10px] font-bold text-emerald-600 uppercase">Remaining</span>
                    <span className="text-lg font-bold text-emerald-700">${remainingBudget.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Add Expense Form */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  placeholder="Expense Item Name (e.g. Stage Mandap Flowers)"
                  value={newBudgetName}
                  onChange={(e) => setNewBudgetName(e.target.value)}
                  className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <select
                  value={newBudgetCat}
                  onChange={(e) => setNewBudgetCat(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
                >
                  <option value="Venue & Hospitality">Venue & Hospitality</option>
                  <option value="Catering & Beverages">Catering & Beverages</option>
                  <option value="Decor & Florals">Decor & Florals</option>
                  <option value="Entertainment & Photo">Entertainment & Photo</option>
                </select>
                <input
                  type="number"
                  placeholder="Cost ($)"
                  value={newBudgetCost}
                  onChange={(e) => setNewBudgetCost(Number(e.target.value))}
                  className="w-28 px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <button
                  onClick={handleAddBudgetItem}
                  className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Expense
                </button>
              </div>

              {/* Budget Categories Table */}
              <div className="space-y-6">
                {plan.budgetCategories.map((cat, idx) => (
                  <div key={idx} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                      <div>
                        <h3 className="font-bold text-gray-900 font-serif text-lg">{cat.category}</h3>
                        <span className="text-xs text-gray-500">
                          Target Allocation: ${cat.allocatedAmount?.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-gray-400 font-bold border-b border-gray-50 pb-2">
                            <th className="py-2">Item</th>
                            <th className="py-2">Estimated ($)</th>
                            <th className="py-2">Actual ($)</th>
                            <th className="py-2">Status</th>
                            <th className="py-2">Notes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {cat.items.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/50">
                              <td className="py-3 font-semibold text-gray-800">{item.name}</td>
                              <td className="py-3 text-gray-600">${item.estimatedCost}</td>
                              <td className="py-3 font-bold text-gray-900">${item.actualCost}</td>
                              <td className="py-3">
                                <button
                                  onClick={() => toggleBudgetPaid(item.id)}
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                    item.paid
                                      ? 'bg-emerald-100 text-emerald-700'
                                      : 'bg-amber-100 text-amber-700'
                                  }`}
                                >
                                  {item.paid ? 'Paid ✓' : 'Pending'}
                                </button>
                              </td>
                              <td className="py-3 text-gray-500 italic text-[11px]">{item.notes || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TASK CHECKLIST */}
          {activeTab === 'tasks' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 font-serif">Interactive Task Checklist</h2>
                  <p className="text-xs text-gray-500">
                    {completedTasks} of {allTasks.length} tasks completed ({progressPercent}%)
                  </p>
                </div>
                <div className="w-full md:w-64 bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              {/* Add Task */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  placeholder="Add new task (e.g. Confirm Sangeet choreography timing)"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as any)}
                  className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs bg-white"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 bg-pink-500 text-white rounded-xl text-xs font-bold hover:bg-pink-600 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Task
                </button>
              </div>

              {/* Task Items */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-3">
                {plan.checklist.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                      task.completed ? 'bg-emerald-50/50 border-emerald-100 opacity-80' : 'bg-white border-gray-100 hover:border-pink-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                          task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 bg-white'
                        }`}
                      >
                        {task.completed && <Check className="w-3.5 h-3.5" />}
                      </button>
                      <span className={`text-xs font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {task.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-gray-400 hidden sm:inline">{task.dueDate}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          task.priority === 'high'
                            ? 'bg-rose-100 text-rose-700'
                            : task.priority === 'medium'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {task.priority}
                      </span>
                      <button onClick={() => deleteTask(task.id)} className="text-gray-300 hover:text-red-500 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EVENT TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 font-serif">Event Schedule & Milestones</h2>
                  <p className="text-xs text-gray-500">Minute-by-minute itinerary tailored by AI.</p>
                </div>
              </div>

              {/* Add Milestone Form */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  placeholder="Time (e.g. 06:30 PM)"
                  value={newMilestoneTime}
                  onChange={(e) => setNewMilestoneTime(e.target.value)}
                  className="w-32 px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
                />
                <input
                  type="text"
                  placeholder="Milestone Title (e.g. Sangeet Grand Entry)"
                  value={newMilestoneTitle}
                  onChange={(e) => setNewMilestoneTitle(e.target.value)}
                  className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
                />
                <button
                  onClick={handleAddMilestone}
                  className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Milestone
                </button>
              </div>

              {/* Timeline List */}
              <div className="relative pl-6 space-y-6 border-l-2 border-pink-200 ml-4">
                {plan.timeline.map((m) => (
                  <div key={m.id} className="relative group">
                    {/* Dot */}
                    <div
                      onClick={() => toggleMilestone(m.id)}
                      className={`absolute -left-[31px] top-1.5 w-5 h-5 rounded-full border-2 cursor-pointer flex items-center justify-center text-white ${
                        m.completed ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-pink-400'
                      }`}
                    >
                      {m.completed && <Check className="w-3 h-3" />}
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-pink-700 font-bold text-xs">
                          {m.time}
                        </span>
                        {m.location && (
                          <span className="text-[11px] text-gray-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-pink-400" /> {m.location}
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm">{m.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GUEST MANAGER */}
          {activeTab === 'guests' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 font-serif">Guest Tracker</h2>
                  <p className="text-xs text-gray-500">
                    {confirmedGuests} Confirmed • {pendingGuests} Pending • Total Attending: {totalGuestAttending}
                  </p>
                </div>
              </div>

              {/* Add Guest Form */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  placeholder="Guest Full Name"
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
                />
                <select
                  value={newGuestCategory}
                  onChange={(e) => setNewGuestCategory(e.target.value as any)}
                  className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs bg-white"
                >
                  <option value="Family">Family</option>
                  <option value="VIP">VIP</option>
                  <option value="Friends">Friends</option>
                  <option value="Colleagues">Colleagues</option>
                </select>
                <button
                  onClick={handleAddGuest}
                  className="px-4 py-2 bg-pink-500 text-white rounded-xl text-xs font-bold hover:bg-pink-600 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Guest
                </button>
              </div>

              {/* Guest List Table */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-gray-400 font-bold border-b border-gray-50 pb-2">
                      <th className="py-2">Name</th>
                      <th className="py-2">Category</th>
                      <th className="py-2">RSVP Status</th>
                      <th className="py-2">Headcount</th>
                      <th className="py-2">Dietary Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {plan.guestList.map((guest) => (
                      <tr key={guest.id} className="hover:bg-gray-50/50">
                        <td className="py-3 font-semibold text-gray-900">{guest.name}</td>
                        <td className="py-3 text-gray-500">{guest.category}</td>
                        <td className="py-3">
                          <button
                            onClick={() => cycleRSVP(guest.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                              guest.rsvpStatus === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-700'
                                : guest.rsvpStatus === 'pending'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-rose-100 text-rose-700'
                            }`}
                          >
                            {guest.rsvpStatus} (click to change)
                          </button>
                        </td>
                        <td className="py-3 font-bold text-gray-800">1 + {guest.plusOneCount}</td>
                        <td className="py-3 text-gray-500 italic text-[11px]">{guest.dietary || 'None'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: SHOPPING TRACKER */}
          {activeTab === 'shopping' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 font-serif">Shopping Tracker</h2>
                <p className="text-xs text-gray-500">Essential items, props, return gifts & decor supplies.</p>
              </div>

              {/* Add Item Form */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  placeholder="Item Name (e.g. Organic Marigold Garlands)"
                  value={newShopItem}
                  onChange={(e) => setNewShopItem(e.target.value)}
                  className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
                />
                <input
                  type="text"
                  placeholder="Qty (e.g. 10 Packs)"
                  value={newShopQty}
                  onChange={(e) => setNewShopQty(e.target.value)}
                  className="w-32 px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
                />
                <button
                  onClick={handleAddShopItem}
                  className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Item
                </button>
              </div>

              {/* Shopping List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.shoppingList.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleShopStatus(item.id)}
                        className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                          item.status === 'bought' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'
                        }`}
                      >
                        {item.status === 'bought' && <Check className="w-3.5 h-3.5" />}
                      </button>
                      <div>
                        <h4 className={`text-xs font-bold ${item.status === 'bought' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-gray-500">Qty: {item.quantity}</span>
                      </div>
                    </div>

                    <a
                      href={item.purchaseUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-pink-50 text-pink-700 rounded-xl text-[11px] font-bold hover:bg-pink-100 transition-colors flex items-center gap-1"
                    >
                      <span>Find Online</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: AI ASSETS & INVITATION STUDIO */}
          {activeTab === 'assets' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Invitation Card Studio */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 font-serif">AI Digital Invitation Card Studio</h2>
                    <p className="text-xs text-gray-500">Custom theme styling, WhatsApp ready text, and formal invite cards.</p>
                  </div>

                  {/* Card Theme Switcher */}
                  <div className="flex items-center gap-2">
                    {[
                      { id: 'pastel', label: 'Pastel Floral' },
                      { id: 'gold', label: 'Royal Gold' },
                      { id: 'mehendi', label: 'Mehendi Lotus' },
                      { id: 'glass', label: 'Glass Modern' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setCardTheme(t.id as any)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          cardTheme === t.id
                            ? 'bg-gray-900 text-white shadow-xs'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rendered Invitation Card Preview */}
                <div
                  className={`p-8 md:p-12 rounded-3xl border text-center space-y-4 max-w-xl mx-auto shadow-2xl relative overflow-hidden transition-all ${
                    cardTheme === 'pastel'
                      ? 'bg-gradient-to-br from-pink-100 via-rose-50 to-amber-50 border-pink-200 text-gray-800'
                      : cardTheme === 'gold'
                      ? 'bg-gradient-to-br from-amber-900 via-stone-900 to-black border-amber-500/40 text-amber-100'
                      : cardTheme === 'mehendi'
                      ? 'bg-gradient-to-br from-emerald-900 via-teal-900 to-amber-950 border-amber-400 text-amber-50'
                      : 'glass-card border-white/80 text-gray-900'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full border border-current/20 mx-auto flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>

                  <span className="text-xs uppercase tracking-widest font-bold opacity-80 block">
                    {plan.invitation?.title || 'Celebration Invitation'}
                  </span>

                  <h3 className="text-3xl md:text-4xl font-extrabold font-serif">
                    {plan.details.title}
                  </h3>

                  <p className="text-xs font-medium italic opacity-90">
                    "{plan.invitation?.tagline}"
                  </p>

                  <div className="py-4 border-y border-current/20 space-y-1 text-xs font-semibold">
                    <div>📅 Date: {plan.invitation?.dateText || plan.details.date}</div>
                    <div>🕒 Time: {plan.invitation?.timeText || '4:00 PM Onwards'}</div>
                    <div>📍 Venue: {plan.invitation?.venueName || plan.details.location}</div>
                    <div>👗 Dress Code: {plan.invitation?.dressCode || 'Festive Pastel Traditional'}</div>
                  </div>

                  <p className="text-xs opacity-90 max-w-md mx-auto leading-relaxed">
                    {plan.invitation?.formalText}
                  </p>

                  <div className="text-[10px] uppercase font-bold tracking-wider opacity-70 pt-2">
                    Hosted with love by {plan.invitation?.hostNames || 'The Hosts'}
                  </div>
                </div>

                {/* WhatsApp Text Copy Box */}
                <div className="p-4 bg-pink-50/80 rounded-2xl border border-pink-100 max-w-xl mx-auto space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-pink-800 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-pink-600" />
                      <span>WhatsApp Ready Invite Text</span>
                    </span>
                    <button
                      onClick={copyWhatsAppText}
                      className="px-3 py-1 bg-white border border-pink-200 text-pink-700 text-xs font-bold rounded-lg hover:bg-pink-100 flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedText ? 'Copied! ✓' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-700 whitespace-pre-line bg-white/80 p-3 rounded-xl border border-pink-100 font-sans">
                    {plan.invitation?.whatsappText}
                  </p>
                </div>
              </div>

              {/* Decor & Theme Moodboard */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 font-serif">Decor & Moodboard Ideas</h2>
                  <p className="text-xs text-gray-500">AI recommendations for color swatches, lighting & stage setups.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {plan.recommendations?.decorIdeas?.map((decor, i) => (
                    <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all">
                      <img
                        src={decor.imageUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600'}
                        alt={decor.title}
                        className="w-full h-48 object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="p-4 space-y-2">
                        <h4 className="font-bold text-sm text-gray-900 font-serif">{decor.title}</h4>
                        <p className="text-xs text-gray-600">{decor.description}</p>
                        <div className="flex items-center gap-1.5 pt-2">
                          <span className="text-[10px] text-gray-400 font-bold mr-1">Palette:</span>
                          {decor.colorPalette?.map((c, idx) => (
                            <span key={idx} className="w-4 h-4 rounded-full border border-gray-200 shadow-xs" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Seating Arrangement Chart Visualizer */}
                {plan.recommendations?.seatingLayout && (
                  <div className="pt-4 border-t border-gray-100 space-y-4">
                    <h3 className="font-bold text-gray-900 font-serif text-lg">Seating Layout & Table Allocation</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {plan.recommendations.seatingLayout.map((seat, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-ivory border border-amber-200/60 text-center space-y-1">
                          <span className="text-xs font-bold text-amber-800 block">{seat.tableName}</span>
                          <span className="text-[11px] text-gray-500 block">Capacity: {seat.capacity} Guests</span>
                          <span className="text-[10px] font-semibold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full inline-block">
                            {seat.guestCategory}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Event Music & Sangeet Playlist Planner */}
                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-900 font-serif text-lg flex items-center gap-2">
                        <Music className="w-5 h-5 text-pink-500" /> Event Music & Sangeet Playlist Planner
                      </h3>
                      <p className="text-xs text-gray-500">Curate key songs for event milestones (Entries, Cake Cutting, Sangeet Beat Drop).</p>
                    </div>
                  </div>

                  {/* Add Track Form */}
                  <div className="p-3 bg-pink-50/50 rounded-2xl border border-pink-100 flex flex-wrap items-center gap-2">
                    <input
                      type="text"
                      placeholder="Song Title"
                      value={newSongTitle}
                      onChange={(e) => setNewSongTitle(e.target.value)}
                      className="flex-1 min-w-[150px] px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Artist Name"
                      value={newSongArtist}
                      onChange={(e) => setNewSongArtist(e.target.value)}
                      className="w-36 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs focus:outline-none"
                    />
                    <select
                      value={newSongMilestone}
                      onChange={(e) => setNewSongMilestone(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs focus:outline-none"
                    >
                      <option value="Grand Guest Arrival">Grand Guest Arrival</option>
                      <option value="Bride & Groom Entry">Bride & Groom Entry</option>
                      <option value="Mehendi Henna Session">Mehendi Henna Session</option>
                      <option value="Sangeet Family Dance">Sangeet Family Dance</option>
                      <option value="Dhol Beats Finale">Dhol Beats Finale</option>
                    </select>
                    <button
                      onClick={handleAddSong}
                      className="px-3.5 py-1.5 bg-pink-500 text-white rounded-xl text-xs font-bold hover:bg-pink-600 transition-all flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Track
                    </button>
                  </div>

                  {/* Playlist Tracks Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(plan.recommendations?.playlist || []).map((track) => (
                      <div key={track.id} className="p-3 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
                            <Disc className="w-4 h-4 animate-spin-slow" />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-gray-900">{track.songTitle}</h4>
                            <span className="text-[11px] text-gray-500 block">{track.artist}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold block">
                            {track.milestone}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">{track.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vendor Directory & Status Tracker */}
                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-900 font-serif text-lg flex items-center gap-2">
                        <PhoneCall className="w-5 h-5 text-pink-500" /> Vendor Briefs & Direct Contacts
                      </h3>
                      <p className="text-xs text-gray-500">Track vendor quotes, agreement status & deposit payments.</p>
                    </div>
                  </div>

                  {/* Add Vendor Form */}
                  <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-100 flex flex-wrap items-center gap-2">
                    <input
                      type="text"
                      placeholder="Vendor / Agency Name"
                      value={newVendorName}
                      onChange={(e) => setNewVendorName(e.target.value)}
                      className="flex-1 min-w-[160px] px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs"
                    />
                    <select
                      value={newVendorService}
                      onChange={(e) => setNewVendorService(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs"
                    >
                      <option value="Venue">Venue</option>
                      <option value="Catering">Catering</option>
                      <option value="Decor & Florals">Decor & Florals</option>
                      <option value="Photography">Photography</option>
                      <option value="DJ & Sound">DJ & Sound</option>
                      <option value="Henna Artists">Henna Artists</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Price ($)"
                      value={newVendorPrice}
                      onChange={(e) => setNewVendorPrice(Number(e.target.value))}
                      className="w-24 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs"
                    />
                    <button
                      onClick={handleAddVendor}
                      className="px-3.5 py-1.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Vendor
                    </button>
                  </div>

                  {/* Vendor Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(plan.recommendations?.vendors || []).map((vendor) => (
                      <div key={vendor.id} className="p-4 rounded-2xl bg-white border border-gray-100 shadow-xs space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 block">
                              {vendor.serviceType}
                            </span>
                            <h4 className="font-bold text-sm text-gray-900">{vendor.vendorName}</h4>
                            <span className="text-xs text-gray-500">Contact: {vendor.contactPerson}</span>
                          </div>
                          <button
                            onClick={() => cycleVendorStatus(vendor.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                              vendor.status === 'Booked'
                                ? 'bg-emerald-100 text-emerald-700'
                                : vendor.status === 'Deposit Paid'
                                ? 'bg-blue-100 text-blue-700'
                                : vendor.status === 'Negotiating'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {vendor.status} (change)
                          </button>
                        </div>
                        <div className="flex justify-between items-center text-xs pt-1 border-t border-gray-50">
                          <span className="font-bold text-gray-800">Agreed Price: ${vendor.agreedPrice}</span>
                          {vendor.notes && <span className="text-gray-400 italic text-[11px]">{vendor.notes}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 8: INTEGRATIONS */}
          {activeTab === 'integrations' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 font-serif">Integrations & Sharing</h2>
                <p className="text-xs text-gray-500">Sync with Google Calendar, view Google Maps pins, or share via WhatsApp.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Google Calendar Card */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 font-serif text-lg">Google Calendar Sync</h3>
                  <p className="text-xs text-gray-600">Add event reminders directly to your Google Calendar.</p>
                  <a
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-blue-500 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Add to Google Calendar</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* WhatsApp Share Card */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 font-serif text-lg">WhatsApp Sharing</h3>
                  <p className="text-xs text-gray-600">Share formatted event summary and invitation directly to WhatsApp groups.</p>
                  <a
                    href={getWhatsAppShareText()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Share to WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Google Maps Venue Card */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                  <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 font-serif text-lg">Google Maps Venue Pin</h3>
                  <p className="text-xs text-gray-600">Direct location navigation pin for {plan.details.location}.</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(plan.details.location)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-rose-500 text-white rounded-xl text-xs font-bold hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
