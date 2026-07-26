export interface EventInput {
  title: string;
  eventType: string; // Wedding, Mehendi & Sangeet, Boutique Birthday, Corporate Gala, Graduation, Anniversary, Baby Shower, Custom
  date: string;
  budget: number;
  guestCount: number;
  location: string;
  theme: string;
  specialNotes?: string;
}

export interface BudgetItem {
  id: string;
  name: string;
  category: string;
  estimatedCost: number;
  actualCost: number;
  paid: boolean;
  notes?: string;
}

export interface BudgetCategory {
  category: string;
  allocatedAmount: number;
  items: BudgetItem[];
}

export interface ChecklistTask {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  notes?: string;
}

export interface TimelineMilestone {
  id: string;
  time: string;
  title: string;
  description: string;
  location?: string;
  completed: boolean;
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  estimatedCost: number;
  status: 'pending' | 'bought';
  purchaseUrl?: string;
}

export interface GuestItem {
  id: string;
  name: string;
  category: 'Family' | 'VIP' | 'Friends' | 'Colleagues' | 'Others';
  rsvpStatus: 'confirmed' | 'pending' | 'declined';
  plusOneCount: number;
  dietary?: string;
  phone?: string;
}

export interface DecorIdea {
  title: string;
  description: string;
  colorPalette: string[];
  vibe: string;
  imageUrl?: string;
}

export interface CateringOption {
  cuisineStyle: string;
  menuHighlights: string[];
  estimatedCostPerHead: number;
}

export interface EntertainmentIdea {
  title: string;
  type: string;
  description: string;
}

export interface SeatingTable {
  tableName: string;
  capacity: number;
  guestCategory: string;
  shape: 'round' | 'rectangular' | 'lounge';
}

export interface PlaylistItem {
  id: string;
  songTitle: string;
  artist: string;
  milestone: string; // e.g. Grand Entry, First Dance, Sangeet Blast, Cake Cutting
  duration: string;
}

export interface VendorContact {
  id: string;
  serviceType: string; // Caterer, Decorator, Photographer, DJ, Henna Artist
  vendorName: string;
  contactPerson: string;
  status: 'Booked' | 'Negotiating' | 'Deposit Paid' | 'Inquired';
  agreedPrice: number;
  notes?: string;
}

export interface EventRecommendations {
  decorIdeas: DecorIdea[];
  catering: CateringOption;
  entertainment: EntertainmentIdea[];
  seatingLayout: SeatingTable[];
  playlist?: PlaylistItem[];
  vendors?: VendorContact[];
}

export interface GeneratedInvitation {
  styleName: string;
  title: string;
  hostNames: string;
  dateText: string;
  timeText: string;
  venueName: string;
  dressCode: string;
  tagline: string;
  formalText: string;
  whatsappText: string;
  poeticText: string;
}

export interface WeatherPrediction {
  location: string;
  date: string;
  temperature: string;
  condition: string;
  precipitationChance: string;
  clothingTip: string;
  venueTip: string;
}

export interface VenueSuggestion {
  id: string;
  name: string;
  rating: number;
  address: string;
  capacity: string;
  priceRange: string;
  mapQueryUrl: string;
  imageUrl: string;
}

export interface EventPlan {
  id: string;
  createdAt: string;
  details: EventInput;
  overviewSummary: string;
  budgetCategories: BudgetCategory[];
  checklist: ChecklistTask[];
  timeline: TimelineMilestone[];
  shoppingList: ShoppingItem[];
  guestList: GuestItem[];
  recommendations: EventRecommendations;
  invitation: GeneratedInvitation;
  weatherPrediction: WeatherPrediction;
  venueSuggestions: VenueSuggestion[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
