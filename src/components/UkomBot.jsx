'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function UkomBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hai! Saya Bot UKOM 🤖. Ada apa-apa yang boleh saya bantu berkenaan pengurusan media IPGKTHO?", isBot: true }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll ke mesej terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Logik Otak Chatbot (Rule-Based Responses)
  const generateBotResponse = (userText) => {
    const text = userText.toLowerCase();
    
    if (text.includes("tempah") || text.includes("borang") || text.includes("nak minta") || text.includes("liputan")) {
      return "Untuk menempah liputan media (gambar/video/PA Sistem), sila klik butang 'Tempah Liputan Media' di halaman utama, atau layari pautan /tempahan. Anda akan menerima Tracking ID selepas mengisi borang.";
    } 
    else if (text.includes("logo") || text.includes("brand kit") || text.includes("warna") || text.includes("download")) {
      return "Anda boleh memuat turun logo rasmi IPGKTHO (resolusi tinggi & transparent) dan templat pembentangan di halaman 'Hab Brand Kit & Aset' (/brand-kit).";
    }
    else if (text.includes("semak") || text.includes("status") || text.includes("siap ke belum")) {
      return "Untuk menyemak status suntingan atau liputan, pastikan anda ada Tracking ID (contoh: UKOM-2026-XXXX). Masukkan ID tersebut di halaman 'Semak Status Tempahan' (/semak).";
    }
    else if (text.includes("siapa") || text.includes("krew") || text.includes("ahli")) {
      return "UKOM (Unit Komunikasi dan Media) dikendalikan sepenuhnya oleh siswa guru IPGKTHO yang berbakat dalam fotografi, videografi, dan penyiaran.";
    }
    else if (text.includes("terima kasih") || text.includes("tq")) {
      return "Sama-sama! Kami di UKOM sedia membantu untuk menaikkan imej IPGKTHO. Malaysia Madani!";
    }
    else {
      return "Maaf, saya bot ringkas yang sedang belajar. 😅 Sila gunakan pautan menu utama untuk maklumat lanjut, atau hubungi ketua UKOM secara terus untuk pertanyaan spesifik.";
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Tambah mesej pengguna
    const newMessages = [...messages, { text: inputText, isBot: false }];
    setMessages(newMessages);
    const userMessage = inputText;
    setInputText("");

    // Bot membalas selepas 1 saat (supaya nampak natural)
    setTimeout(() => {
      const botReply = generateBotResponse(userMessage);
      setMessages(prev => [...prev, { text: botReply, isBot: true }]);
    }, 1000);
  };

  return (
    <>
      {/* Butang Timbul (Floating Button) untuk buka Chatbot */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl hover:bg-blue-700 hover:scale-110 transition-transform z-50 border-2 border-white cursor-pointer"
        aria-label="Buka Chatbot UKOM"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Kotak Chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 h-[450px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-50 animate-fade-in">
          
          {/* Header */}
          <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <h3 className="font-bold text-sm">Pembantu Maya UKOM</h3>
                <p className="text-[10px] text-emerald-400">Sentiasa Aktif</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 rounded bg-slate-800"
            >
              ✕
            </button>
          </div>

          {/* Ruang Mesej */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isBot ? 'bg-white border border-gray-200 text-slate-700 rounded-tl-none shadow-xs' : 'bg-blue-600 text-white rounded-tr-none shadow-xs'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Ruang Menaip */}
          <div className="p-3 bg-white border-t border-gray-100">
            <form onSubmit={handleSend} className="flex gap-2">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Tanya sesuatu..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700">
                ➤
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}