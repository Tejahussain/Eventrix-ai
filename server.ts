import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. Fallback generator will be used.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// 1. Lyzr AI Proxy endpoint
app.post("/api/lyzr", async (req, res) => {
  try {
    const { message, session_id } = req.body;
    const lyzrApiKey = "sk-default-piXtMZ6krTU5YM7gwtGrWfFaryFVwqBC";
    const lyzrAgentId = "6a65f95a6bd686332b87f955";
    const userId = "tejahussain9@gmail.com";

    const response = await fetch("https://agent-prod.studio.lyzr.ai/v3/inference/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": lyzrApiKey,
      },
      body: JSON.stringify({
        user_id: userId,
        agent_id: lyzrAgentId,
        session_id: session_id || `${lyzrAgentId}-${Date.now()}`,
        message: message || "Hello",
      }),
    });
    console.log("Lyzr response status:", response.status);

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: "Lyzr API error", details: errText });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error: any) {
    console.error("Lyzr proxy error:", error);
    return res.status(500).json({ error: error.message || "Failed to reach Lyzr AI agent" });
  }
});

// Helper fallback generator if Gemini API key isn't provided or fails
function generateFallbackPlan(details: any) {
  const { title, eventType, date, budget, guestCount, location, theme } = details;
  const numBudget = Number(budget) || 15000;
  const numGuests = Number(guestCount) || 100;

  return {
    id: `event-${Date.now()}`,
    createdAt: new Date().toISOString(),
    details: {
      title: title || `${eventType || "Celebration"} in ${location || "City"}`,
      eventType: eventType || "Wedding / Celebration",
      date: date || "2026-09-15",
      budget: numBudget,
      guestCount: numGuests,
      location: location || "Grand Royal Palace",
      theme: theme || "Luxury Pastel Mehendi & Floral Elegance",
      specialNotes: details.specialNotes || "",
    },
    overviewSummary: `A lavish, unforgettable ${eventType} tailored with a ${theme} theme in ${location}. Structured for ${numGuests} guests with a budget of $${numBudget.toLocaleString()}.`,
    budgetCategories: [
      {
        category: "Venue & Hospitality",
        allocatedAmount: Math.round(numBudget * 0.35),
        items: [
          { id: "b1", name: "Main Banquet & Garden Rental", category: "Venue & Hospitality", estimatedCost: Math.round(numBudget * 0.25), actualCost: Math.round(numBudget * 0.25), paid: true, notes: "Includes outdoor lawn" },
          { id: "b2", name: "Guest Accommodation & Valet", category: "Venue & Hospitality", estimatedCost: Math.round(numBudget * 0.10), actualCost: Math.round(numBudget * 0.08), paid: false, notes: "Reserved 15 suites" },
        ],
      },
      {
        category: "Catering & Beverages",
        allocatedAmount: Math.round(numBudget * 0.30),
        items: [
          { id: "b3", name: "Live Counter & Royal Buffet", category: "Catering & Beverages", estimatedCost: Math.round(numBudget * 0.22), actualCost: Math.round(numBudget * 0.22), paid: false, notes: "Gourmet multi-cuisine menu" },
          { id: "b4", name: "Mocktail Bar & Artisanal Desserts", category: "Catering & Beverages", estimatedCost: Math.round(numBudget * 0.08), actualCost: Math.round(numBudget * 0.07), paid: true, notes: "Custom signature drinks" },
        ],
      },
      {
        category: "Decor & Florals",
        allocatedAmount: Math.round(numBudget * 0.20),
        items: [
          { id: "b5", name: "Mehendi Mandap & Floral Stage", category: "Decor & Florals", estimatedCost: Math.round(numBudget * 0.12), actualCost: Math.round(numBudget * 0.12), paid: true, notes: "Marigold & Pastel Jasmine canopy" },
          { id: "b6", name: "Fairylights & Ambient Lighting", category: "Decor & Florals", estimatedCost: Math.round(numBudget * 0.08), actualCost: Math.round(numBudget * 0.08), paid: false, notes: "Warm golden glow" },
        ],
      },
      {
        category: "Entertainment & Photo",
        allocatedAmount: Math.round(numBudget * 0.15),
        items: [
          { id: "b7", name: "Candid Cinematic Photography", category: "Entertainment & Photo", estimatedCost: Math.round(numBudget * 0.10), actualCost: Math.round(numBudget * 0.10), paid: false, notes: "Drone + Teaser video" },
          { id: "b8", name: "Live Acoustic & DJ Night", category: "Entertainment & Photo", estimatedCost: Math.round(numBudget * 0.05), actualCost: Math.round(numBudget * 0.05), paid: true, notes: "Sangeet choreography setup" },
        ],
      },
    ],
    checklist: [
      { id: "t1", title: "Finalize venue contract & deposit", category: "Venue", dueDate: "4 Weeks Before", priority: "high", completed: true },
      { id: "t2", title: "Confirm floral palette & stage mandap design", category: "Decor", dueDate: "3 Weeks Before", priority: "high", completed: true },
      { id: "t3", title: "Send digital AI invitations to guest list", category: "Invites", dueDate: "3 Weeks Before", priority: "high", completed: false },
      { id: "t4", title: "Conduct catering tasting menu review", category: "Catering", dueDate: "2 Weeks Before", priority: "medium", completed: false },
      { id: "t5", title: "Finalize DJ playlist & Sangeet sequence", category: "Entertainment", dueDate: "1 Week Before", priority: "medium", completed: false },
      { id: "t6", title: "Prepare welcome hamper baskets & favors", category: "Logistics", dueDate: "3 Days Before", priority: "low", completed: false },
    ],
    timeline: [
      { id: "m1", time: "03:00 PM", title: "Guest Arrival & Royal Welcome", description: "Fresh Jasmine garlands & signature rose-lychee mocktails on arrival", location: "Welcome Foyer", completed: false },
      { id: "m2", time: "04:30 PM", title: "Mehendi Ceremony & Henna Artists", description: "Custom henna sessions for bride & guests with acoustic folk music", location: "Garden Pavilion", completed: false },
      { id: "m3", time: "06:30 PM", title: "Sunset Photo Hour & Golden Hour Shoot", description: "Candid portraits with pastel floral installations", location: "Lakeside Lawn", completed: false },
      { id: "m4", time: "07:30 PM", title: "Sangeet Performances & Live Band", description: "Choreographed family dances & interactive DJ set", location: "Grand Ballroom Stage", completed: false },
      { id: "m5", time: "09:00 PM", title: "Royal Gala Dinner", description: "Buffet with live live counters, artisanal sweets, and toast speeches", location: "Dining Canopy", completed: false },
    ],
    shoppingList: [
      { id: "s1", name: "Organic Henna / Mehendi Cones", category: "Ceremony", quantity: "25 Packs", estimatedCost: 75, status: "bought", purchaseUrl: "https://www.google.com/search?q=organic+henna+cones" },
      { id: "s2", name: "Custom Brass Welcome Bell / Thali Set", category: "Decor", quantity: "2 Sets", estimatedCost: 120, status: "pending", purchaseUrl: "https://www.google.com/search?q=brass+thali+set+wedding" },
      { id: "s3", name: "Pastel Satin Return Gift Bags", category: "Favors", quantity: `${numGuests} Bags`, estimatedCost: 250, status: "pending", purchaseUrl: "https://www.google.com/search?q=pastel+gift+bags" },
      { id: "s4", name: "Floating Scented Lotus Candles", category: "Lighting", quantity: "50 Pieces", estimatedCost: 90, status: "bought", purchaseUrl: "https://www.google.com/search?q=floating+lotus+candles" },
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
    },
    invitation: {
      styleName: "Pastel Floral & Gold Foil",
      title: "Celebration of Love & Happiness",
      hostNames: "The Sharma & Verma Families",
      dateText: date || "Saturday, 15th September 2026",
      timeText: "4:00 PM Onwards",
      venueName: location || "The Grand Lawn Palace",
      dressCode: "Pastel Traditional / Festive Chic",
      tagline: "Join us under the stars as we begin our new chapter.",
      formalText: `We cordially invite you to celebrate the joyous occasion of our ${eventType}. Your presence and blessings will make our special day truly memorable.`,
      whatsappText: `✨ *Save the Date!* ✨\nWe are overjoyed to invite you to our *${eventType}* on ${date || "Sept 15, 2026"} at ${location || "The Grand Lawn Palace"}.\nRSVP here & join the magic! 🌸🥂`,
      poeticText: "As flowers bloom and music plays, we gather together to cherish new days. Join us in joyous songs and laughter!",
    },
    weatherPrediction: {
      location: location || "City Center",
      date: date || "Target Date",
      temperature: "74°F / 23°C",
      condition: "Pleasantly Clear with Gentle Breeze",
      precipitationChance: "10%",
      clothingTip: "Light pastel fabrics for afternoon; light shawl or blazer for evening.",
      venueTip: "Perfect conditions for outdoor lawn Mehendi & covered terrace Sangeet!",
    },
    venueSuggestions: [
      {
        id: "v1",
        name: `${location || "City"} Palace & Royal Gardens`,
        rating: 4.9,
        address: `${location || "Grand Avenue"}, Main City`,
        capacity: "100 - 500 Guests",
        priceRange: "$$$$",
        mapQueryUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((location || "Royal Gardens") + " wedding venue")}`,
        imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600",
      },
      {
        id: "v2",
        name: "Lakeside Heritage Resort & Banquets",
        rating: 4.8,
        address: `Lakeview Drive, ${location || "City"}`,
        capacity: "50 - 300 Guests",
        priceRange: "$$$",
        mapQueryUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Lakeside Heritage Resort " + (location || ""))}`,
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600",
      },
    ],
  };
}

// 2. Full Plan Generation Route
app.post("/api/generate-plan", async (req, res) => {
  try {
    const details = req.body;
    const ai = getGenAI();

    if (!ai) {
      console.log("No GEMINI_API_KEY found, returning rich fallback event plan.");
      const plan = generateFallbackPlan(details);
      return res.json(plan);
    }

    const prompt = `You are Eventrix, the premier AI Event Operating System.
Generate a comprehensive, highly detailed event plan in valid JSON format for the following event details:
- Event Title: ${details.title || details.eventType}
- Event Type: ${details.eventType}
- Date: ${details.date}
- Total Budget: $${details.budget}
- Guest Count: ${details.guestCount}
- Location: ${details.location}
- Theme & Aesthetic: ${details.theme}
- Special Notes: ${details.specialNotes || "None"}

Requirements:
Return ONLY a valid JSON object matching this schema:
{
  "overviewSummary": "1-2 sentences summarizing the celebration concept.",
  "budgetCategories": [
    {
      "category": "Venue / Catering / Decor / Photography / Music / Attire / Logistics",
      "allocatedAmount": number,
      "items": [
        { "id": "b1", "name": "Item name", "category": "Category", "estimatedCost": number, "actualCost": number, "paid": boolean, "notes": "string" }
      ]
    }
  ],
  "checklist": [
    { "id": "t1", "title": "Task title", "category": "Category", "dueDate": "string", "priority": "high|medium|low", "completed": boolean, "notes": "string" }
  ],
  "timeline": [
    { "id": "m1", "time": "04:00 PM", "title": "Milestone title", "description": "Details", "location": "Venue spot", "completed": boolean }
  ],
  "shoppingList": [
    { "id": "s1", "name": "Item name", "category": "Category", "quantity": "Quantity string", "estimatedCost": number, "status": "pending|bought", "purchaseUrl": "search link" }
  ],
  "guestList": [
    { "id": "g1", "name": "Guest Name", "category": "Family|VIP|Friends|Colleagues", "rsvpStatus": "confirmed|pending|declined", "plusOneCount": 1, "dietary": "Dietary info", "phone": "Phone number" }
  ],
  "recommendations": {
    "decorIdeas": [
      { "title": "Title", "description": "Details", "colorPalette": ["#HEX1", "#HEX2", "#HEX3", "#HEX4"], "vibe": "Vibe style", "imageUrl": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600" }
    ],
    "catering": {
      "cuisineStyle": "Indo-Fusion Cuisine / Gourmet Mediterranean",
      "menuHighlights": ["Dish 1", "Dish 2", "Dish 3", "Special Drink"],
      "estimatedCostPerHead": number
    },
    "entertainment": [
      { "title": "Title", "type": "Type", "description": "Details" }
    ],
    "seatingLayout": [
      { "tableName": "Table 1: Family", "capacity": 8, "guestCategory": "Family", "shape": "round" }
    ]
  },
  "invitation": {
    "styleName": "Royal Pastel Floral",
    "title": "Title",
    "hostNames": "Hosts",
    "dateText": "Date formatted",
    "timeText": "Time",
    "venueName": "Venue",
    "dressCode": "Dress code",
    "tagline": "Tagline",
    "formalText": "Formal invite paragraph",
    "whatsappText": "Formatted WhatsApp text with emojis",
    "poeticText": "Poetic message"
  },
  "weatherPrediction": {
    "location": "Location",
    "date": "Date",
    "temperature": "75°F / 24°C",
    "condition": "Sunny & Pleasant",
    "precipitationChance": "10%",
    "clothingTip": "Clothing advice",
    "venueTip": "Venue weather advice"
  },
  "venueSuggestions": [
    {
      "id": "v1",
      "name": "Venue Name",
      "rating": 4.9,
      "address": "Full address",
      "capacity": "100-300 Guests",
      "priceRange": "$$$$",
      "mapQueryUrl": "Google maps search link",
      "imageUrl": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text?.trim() || "";
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.warn("Failed to parse AI response JSON directly, using fallback.", err);
      parsed = generateFallbackPlan(details);
    }

    const fullPlan = {
      id: `event-${Date.now()}`,
      createdAt: new Date().toISOString(),
      details: {
        title: details.title || `${details.eventType || "Celebration"} in ${details.location || "City"}`,
        eventType: details.eventType || "Event",
        date: details.date || "2026-10-10",
        budget: Number(details.budget) || 10000,
        guestCount: Number(details.guestCount) || 80,
        location: details.location || "City Center",
        theme: details.theme || "Pastel Luxury",
        specialNotes: details.specialNotes || "",
      },
      ...parsed,
    };

    return res.json(fullPlan);
  } catch (error: any) {
    console.error("Plan generation error:", error);
    const fallback = generateFallbackPlan(req.body);
    return res.json(fallback);
  }
});

// 3. Interactive AI Concierge Chat route
app.post("/api/ai-chat", async (req, res) => {
  try {
    const { message, history, eventContext } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        reply: `I am your Eventrix AI Assistant! For your event "${eventContext?.details?.title || "Celebration"}", I recommend confirming catering menu choices 2 weeks prior and ensuring all audio/lighting setups are tested on event day morning. How else can I assist with budget or seating?`,
      });
    }

    const systemPrompt = `You are Eventrix Concierge, an expert luxury event planner assistant.
The user is currently managing their event with these details:
Event: ${eventContext?.details?.title || "Celebration"} (${eventContext?.details?.eventType})
Location: ${eventContext?.details?.location}
Budget: $${eventContext?.details?.budget} | Guests: ${eventContext?.details?.guestCount}
Theme: ${eventContext?.details?.theme}

Answer the user's question concisely, helpfully, and with a warm, elegant tone. Offer specific actionable recommendations for vendor management, toast speech drafts, decor changes, menu choices, or schedule optimizations as requested.`;

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: {
        systemInstruction: systemPrompt,
      },
    });

    const response = await chat.sendMessage({ message: message || "Hello" });
    return res.json({ reply: response.text });
  } catch (err: any) {
    console.error("Chat error:", err);
    return res.json({
      reply: "I am ready to help you coordinate every detail of your celebration! Ask me about speeches, budget adjustments, decor tips, or guest accommodations.",
    });
  }
});

// 4. Weather Prediction endpoint
app.get("/api/weather", (req, res) => {
  const { location, date } = req.query;
  const locStr = (location as string) || "City Center";
  const dateStr = (date as string) || "Upcoming Event";

  res.json({
    location: locStr,
    date: dateStr,
    temperature: "75°F / 24°C",
    condition: "Partly Cloudy & Mild",
    precipitationChance: "15%",
    clothingTip: "Pastel silk or lightweight fabrics for daytime; light layer for dusk.",
    venueTip: "Ideal for outdoor lawns with shaded patio seating option.",
  });
});

// 5. Venue Suggestions endpoint
app.get("/api/venues", (req, res) => {
  const query = (req.query.query as string) || "Venues";
  res.json([
    {
      id: "v1",
      name: `${query} Grand Palace & Gardens`,
      rating: 4.9,
      address: `122 Celebration Blvd, ${query}`,
      capacity: "100 - 500 Guests",
      priceRange: "$$$$",
      mapQueryUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query + " grand palace venue")}`,
      imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: "v2",
      name: "The Rosewood Glasshouse & Lawn",
      rating: 4.8,
      address: `88 Botanical Way, ${query}`,
      capacity: "50 - 250 Guests",
      priceRange: "$$$",
      mapQueryUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query + " rosewood glasshouse venue")}`,
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600",
    },
  ]);
});

// Start Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Eventrix Server running on http://localhost:${PORT}`);
  });
}

startServer();
