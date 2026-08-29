'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function UkomBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: 'Hai! Saya Pembantu Maya Pintar UKOM IPGKTHO 🤖✨. Ada apa-apa yang boleh saya bantu mengenai liputan media, tempahan, atau brand kit kampus?'
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userPrompt = input.trim();
    if (!userPrompt || isLoading) return;

    // Tambah mesej pengguna ke senarai
    const userMessage = { id: Date.now().toString(), role: 'user', content: userPrompt };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi AI UKOM.');
      }

      // Mulakan mesej pembantu kosong untuk aliran (streaming)
      const botMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, { id: botMessageId, role: 'assistant', content: '' }]);
      setIsLoading(false);

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let botText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        botText += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId ? { ...msg, content: botText } : msg
          )
        );
      }
    } catch (err) {
      console.error('Chat Error:', err);
      // Fallback jawapan pintar setempat jika berlaku ralat rangkaian / API
      let fallbackText = "Untuk menempah liputan media, sila ke pautan /tempahan. Bagi muat turun logo rasmi, sila ke /brand-kit, atau semak status di /semak.";
      const lower = userPrompt.toLowerCase();
      if (lower.includes('tempah') || lower.includes('borang')) {
        fallbackText = "Untuk tempahan fotografi atau videografi, sila isi borang di menu /tempahan untuk menerima Tracking ID.";
      } else if (lower.includes('logo') || lower.includes('warna') || lower.includes('brand')) {
        fallbackText = "Logo rasmi IPGKTHO dan templat Canva boleh dimuat turun di halaman /brand-kit.";
      } else if (lower.includes('semak') || lower.includes('status')) {
        fallbackText = "Sila masukkan nombor Tracking ID anda di halaman /semak untuk melihat status kerja.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: fallbackText
        }
      ]);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Butang Timbul Terapung (Floating Trigger Button) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl hover:scale-110 transition-transform z-50 border-2 border-white animate-bounce cursor-pointer"
        aria-label="Buka Pembantu Maya UKOM"
      >
        {isOpen ? '✕' : '✨'}
      </button>

      {/* Kotak Tetingkap Chatbot */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[480px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-50 animate-fade-in">
          {/* Tajuk Atas (Header) */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-4 text-white flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/15 rounded-2xl flex items-center justify-center text-xl backdrop-blur-xs border border-white/10">
                🤖
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">UKOM AI Assistant</h3>
                <p className="text-[10px] text-emerald-300 flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Gemini 1.5 Flash Aktif
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 rounded bg-slate-800/80 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Ruang Mesej Berbual */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-2xl rounded-tr-xs shadow-sm font-medium'
                      : 'bg-white border border-gray-200 text-slate-800 rounded-2xl rounded-tl-xs shadow-xs'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Petunjuk AI Sedang Menjana Jawapan */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-xs shadow-xs flex gap-1.5 items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Kotak Input & Butang Hantar */}
          <div className="p-3 bg-white border-t border-gray-100">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanya apa-apa soalan..."
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800 font-medium transition"
                autoFocus
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-slate-900 text-white px-4 py-2.5 rounded-xl hover:bg-slate-800 disabled:opacity-40 transition cursor-pointer font-bold shadow-sm"
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}