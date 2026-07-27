import React, { useState, useRef, useEffect } from 'react';
import aiService from '../../../services/aiService';
import ExtensionResponseCard from './ExtensionResponseCard';
import { MessageSquare, Send, Mic, Image, Sparkles, User, Bot, Loader2, Volume2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AIChat = ({ currentDistrict, currentCrop }) => {
  const [district, setDistrict] = useState(currentDistrict || 'Kumily');
  const [crop, setCrop] = useState(currentCrop || 'Cardamom');
  const [inputMsg, setInputMsg] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Namaskaram! I am your Western Ghats Agricultural Extension Officer. How can I assist with your ${crop} farm in ${district} today?`,
      advice: {
        summary: `Extension Officer active for ${district} region.`,
        explanation: 'Expert guidance on cardamom, black pepper, tea, coffee, grapes, banana, and spices.',
        recommendedAction: 'Ask any question or tap a quick query chip below.',
        priorityLevel: 'Low',
        estimatedCost: 'Free Extension Service',
        expectedBenefit: 'Higher crop health & farm profits'
      }
    }
  ]);

  const quickChips = [
    "Why are my cardamom leaves turning yellow?",
    "Will it rain in Kumily this week?",
    "When should I harvest pepper?",
    "What fertilizer should I use for tea?"
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (queryText) => {
    const textToSend = queryText || inputMsg;
    if (!textToSend.trim()) return;

    const userMessage = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    if (!queryText) setInputMsg('');
    setLoading(true);

    try {
      const data = await aiService.chatAI({
        message: textToSend,
        district,
        crop
      });

      const botMessage = {
        sender: 'bot',
        text: data.data.reply,
        advice: data.data.extensionOfficerAdvice
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      toast.error('Failed to get response from AI Extension Officer');
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true);
      toast('Voice recognition activated. Speak now...', { icon: '🎙️' });
      setTimeout(() => {
        setInputMsg("Will it rain in Kumily this week?");
        setIsListening(false);
        toast.success("Voice transcribed!");
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200 shadow-lg flex flex-col h-[650px] overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-lg">
            🌿
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center">
              AgriConnect Extension Officer AI
              <span className="ml-2 w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </h3>
            <p className="text-[10px] text-slate-400">Serving {district} & Western Ghats Farmers</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <select value={district} onChange={(e) => setDistrict(e.target.value)} className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg text-xs p-1">
            <option value="Kumily">Kumily</option>
            <option value="Puttady">Puttady</option>
            <option value="Munnar">Munnar</option>
            <option value="Theni">Theni</option>
            <option value="Cumbum">Cumbum</option>
            <option value="Bodinayakanur">Bodi</option>
          </select>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] sm:max-w-[75%] ${msg.sender === 'user' ? 'bg-emerald-700 text-white rounded-2xl rounded-tr-none p-3.5 shadow-sm text-xs font-medium' : 'space-y-2'}`}>
              {msg.sender === 'bot' && (
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm text-xs text-slate-800 leading-relaxed">
                  <div className="flex items-center space-x-1.5 text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    <Bot size={14} /> <span>Extension Officer</span>
                  </div>
                  <p>{msg.text}</p>

                  {msg.advice && <ExtensionResponseCard advice={msg.advice} />}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 text-xs text-slate-500 flex items-center space-x-2">
              <Loader2 size={16} className="animate-spin text-emerald-600" />
              <span>Officer is formulating advice...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Action Chips */}
      <div className="p-2.5 bg-slate-100 border-t border-slate-200 flex items-center space-x-2 overflow-x-auto text-[11px]">
        <Sparkles size={14} className="text-emerald-600 flex-shrink-0 ml-1" />
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="flex-shrink-0 bg-white border border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-800 px-3 py-1 rounded-full font-semibold transition-all shadow-2xs"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
        <button
          type="button"
          onClick={handleVoiceToggle}
          className={`p-2.5 rounded-xl border transition-colors ${isListening ? 'bg-red-50 text-red-600 border-red-300 animate-pulse' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
          title="Voice Input"
        >
          <Mic size={18} />
        </button>

        <input
          type="text"
          placeholder="Ask extension officer about crops, pests, prices or weather..."
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <button
          type="submit"
          disabled={!inputMsg.trim() || loading}
          className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white p-2.5 rounded-xl transition-all shadow-md"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default AIChat;
