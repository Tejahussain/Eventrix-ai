import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, RefreshCw, MessageSquare } from 'lucide-react';
import { ChatMessage, EventPlan } from '../types';

interface AIConciergeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentEvent: EventPlan | null;
}

export const AIConciergeDrawer: React.FC<AIConciergeDrawerProps> = ({
  isOpen,
  onClose,
  currentEvent,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello! I am your Eventrix AI Concierge. I am monitoring every detail of your "${currentEvent?.details?.title || 'Celebration'}". How can I assist you today? Ask me for toast speech drafts, budget optimization, menu suggestions, or timeline tweaks!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          eventContext: currentEvent,
        }),
      });

      const data = await res.json();
      const aiReply: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || "I am ready to help you adjust your budget or schedule!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackReply: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: "I am here to assist! For best results during your event, make sure all catering tastings are confirmed 2 weeks in advance and microphone soundchecks are done before guests arrive.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-pink-100 flex flex-col animate-slideInRight">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm font-serif">Eventrix AI Concierge</h3>
            <p className="text-[11px] opacity-90">Live Assistant for {currentEvent?.details?.title || 'Celebration'}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-3 py-2 bg-pink-50/60 border-b border-pink-100/60 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
        <button
          onClick={() => {
            setInput("Draft a heartfelt 2-minute toast speech for this celebration.");
          }}
          className="px-2.5 py-1 rounded-full bg-white border border-pink-200 text-pink-700 font-medium whitespace-nowrap hover:bg-pink-100 transition-all"
        >
          Draft Toast Speech 🎤
        </button>
        <button
          onClick={() => {
            setInput("Give me 3 budget-saving tips for our venue and decor.");
          }}
          className="px-2.5 py-1 rounded-full bg-white border border-pink-200 text-pink-700 font-medium whitespace-nowrap hover:bg-pink-100 transition-all"
        >
          Save Budget 💰
        </button>
        <button
          onClick={() => {
            setInput("What is the ideal music playlist order for Sangeet?");
          }}
          className="px-2.5 py-1 rounded-full bg-white border border-pink-200 text-pink-700 font-medium whitespace-nowrap hover:bg-pink-100 transition-all"
        >
          Sangeet Playlist 🎶
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-ivory/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                msg.sender === 'user' ? 'bg-gray-800 text-white' : 'bg-pink-500 text-white shadow-xs'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-gray-900 text-white rounded-tr-none'
                  : 'bg-white border border-pink-100 text-gray-800 rounded-tl-none font-medium'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>
              <span className={`block text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-gray-400' : 'text-gray-400'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-pink-600 font-semibold animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Eventrix AI is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI anything about your event..."
          className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="w-9 h-9 rounded-full bg-pink-500 text-white flex items-center justify-center disabled:opacity-50 hover:bg-pink-600 transition-all shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
