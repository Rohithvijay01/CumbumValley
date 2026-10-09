import React, { useState, useRef, useEffect } from 'react';
import aiService from '../../../services/api';
import ExtensionResponseCard from './ExtensionResponseCard';
import { MessageSquare, Send, Mic, Sparkles, User, Bot, Loader2 } from 'lucide-react';
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

  useEffect(() => {
    if (currentDistrict) setDistrict(currentDistrict);
  }, [currentDistrict]);

  useEffect(() => {
    if (currentCrop) setCrop(currentCrop);
  }, [currentCrop]);

  const quickChips = [
    "Why are my cardamom leaves turning yellow?",
    "Will it rain in Kumily this week?",
    "When should I harvest pepper?",
    "What fertilizer should I use for tea?",
    "How to control cardamom thrips?",
    "What is the market auction price for cardamom?",
    "What government subsidies are available for farmers?"
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
      const res = await aiService.post('/ai/chat', {
        message: textToSend,
        district,
        crop
      });

      const botMessage = {
        sender: 'bot',
        text: res.data.data.reply,
        advice: res.data.data.extensionOfficerAdvice
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
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col h-[700px] overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-lg">
            🌿
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center">
              CumbumValley Extension Officer AI
              <span className="ml-2 w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">Serving {district} & Western Ghats Farmers</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <select 
            value={district} 
            onChange={(e) => setDistrict(e.target.value)} 
            className="bg-slate-900 border border-slate-700 text-slate-200 rounded-xl text-xs px-3 py-1.5 font-semibold focus:ring-1 focus:ring-emerald-500"
          >
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
      <div className="flex-1 p-5 overflow-y-auto space-y-6 bg-slate-50/70 dark:bg-slate-950/80">
        {messages.map((msg, idx) => (
          <div key={idx} className={`w-full flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'user' ? (
              /* User Question Bubble */
              <div className="max-w-[85%] sm:max-w-[70%] bg-emerald-600 dark:bg-emerald-600 text-white rounded-2xl rounded-tr-none p-4 shadow-lg border border-emerald-500/50">
                <div className="flex items-center space-x-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-200 mb-1">
                  <User size={13} />
                  <span>Your Question</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold leading-relaxed">{msg.text}</p>
              </div>
            ) : (
              /* Extension Officer Bot Answer */
              <div className="w-full max-w-[95%] sm:max-w-[90%] bg-white dark:bg-slate-900 p-5 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
                <div className="flex items-center space-x-2 text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  <Bot size={16} />
                  <span>Extension Officer Reply</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed">
                  {msg.text}
                </p>

                {msg.advice && <ExtensionResponseCard advice={msg.advice} />}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-center space-x-2 shadow-md">
              <Loader2 size={18} className="animate-spin text-emerald-500" />
              <span className="font-semibold">Officer is formulating agronomic advice...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Action Chips */}
      <div className="p-3 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2 overflow-x-auto text-[11px]">
        <Sparkles size={16} className="text-emerald-500 flex-shrink-0 ml-1" />
        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex-shrink-0 mr-1">Quick Queries:</span>
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="flex-shrink-0 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 px-3.5 py-1.5 rounded-full font-bold transition-all shadow-2xs cursor-pointer"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3.5 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
        <button
          type="button"
          onClick={handleVoiceToggle}
          className={`p-3 rounded-xl border transition-colors cursor-pointer ${isListening ? 'bg-red-50 text-red-600 border-red-300 animate-pulse' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-200'}`}
          title="Voice Input"
        >
          <Mic size={18} />
        </button>

        <input
          type="text"
          placeholder="Ask extension officer about crops, pests, prices or weather..."
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          className="flex-1 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <button
          type="submit"
          disabled={!inputMsg.trim() || loading}
          className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-slate-950 font-black p-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default AIChat;
