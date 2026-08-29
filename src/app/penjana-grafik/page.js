'use client';
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import Link from 'next/link';

export default function PenjanaGrafik() {
  const [tab, setTab] = useState('backdrop'); // 'frame' atau 'backdrop'
  
  // State untuk Data Majlis
  const [tajukMajlis, setTajukMajlis] = useState('MAJLIS JUNJUNGAN KASIH');
  const [subTajuk, setSubTajuk] = useState('Budi Menyapa, Jasa Selamanya');
  const [namaVIP, setNamaVIP] = useState('EN. MOHD AMINUDIN BIN ABU BAKAR');
  const [tarikh, setTarikh] = useState('15 JUN 2026');
  const [tempat, setTempat] = useState('DEWAN SERI BUDIMAN');
  const [userImage, setUserImage] = useState(null);

  // State untuk AI Background
  const [aiPrompt, setAiPrompt] = useState('Luxurious dark red velvet background with intricate 3D gold floral borders, elegant royal event backdrop, empty center, 8k resolution');
  const [aiBackground, setAiBackground] = useState(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const grafikRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setUserImage(URL.createObjectURL(file));
  };

  const janaBackgroundAI = () => {
    if (!aiPrompt) return;
    setIsGeneratingAI(true);
    setAiBackground(null); // Reset gambar lama

    // Kita gunakan enjin AI terbuka (Pollinations) untuk jana gambar terus dari URL secara percuma
    const width = tab === 'backdrop' ? 1920 : 1080;
    const height = tab === 'backdrop' ? 1080 : 1920;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(aiPrompt)}?width=${width}&height=${height}&nologo=true`;
    
    // Muatkan gambar di belakang tabir sebelum tunjuk ke skrin
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
    img.onload = () => {
      setAiBackground(imageUrl);
      setIsGeneratingAI(false);
    };
    img.onerror = () => {
      // Fallback jika direct load gagal
      setAiBackground(imageUrl);
      setIsGeneratingAI(false);
    };
  };

  const muatTurunGambar = async () => {
    if (!grafikRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(grafikRef.current, { scale: 2, useCORS: true, allowTaint: true });
      const link = document.createElement('a');
      link.href = canvas.toDataURL("image/png");
      link.download = tab === 'frame' ? 'UKOM_IG_Story.png' : 'UKOM_Backdrop.png';
      link.click();
    } catch (err) {
      console.error(err);
      alert("Ralat menyimpan gambar.");
    }
    setIsExporting(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 py-10 px-6 font-sans text-white">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-emerald-400 hover:underline text-sm font-semibold mb-6 inline-block">
          &larr; Kembali ke Laman Utama
        </Link>
        <h1 className="text-3xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
          Penjana Grafik Pintar UKOM (Kuasakan AI) 🪄
        </h1>

        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setTab('backdrop')} 
            className={`px-6 py-3 font-bold rounded-xl transition cursor-pointer ${tab === 'backdrop' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            🖥️ Bina Backdrop
          </button>
          <button 
            onClick={() => setTab('frame')} 
            className={`px-6 py-3 font-bold rounded-xl transition cursor-pointer ${tab === 'frame' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            📱 Bina Frame IG
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Ruang Kawalan (Kiri) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Bahagian AI Background */}
            <div className="bg-slate-800 p-6 rounded-3xl border border-purple-500/30 shadow-lg shadow-purple-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10 text-6xl">✨</div>
              <h2 className="text-lg font-bold mb-4 text-purple-300 flex items-center gap-2">
                Jana Background AI
              </h2>
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400">Arahan AI (English lebih baik)</label>
                <textarea 
                  value={aiPrompt} 
                  onChange={(e)=>setAiPrompt(e.target.value)} 
                  rows="3"
                  className="w-full p-3 bg-slate-900 border border-purple-500/50 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm text-purple-100"
                ></textarea>
                <button 
                  onClick={janaBackgroundAI} disabled={isGeneratingAI}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:scale-[1.02] transition cursor-pointer disabled:opacity-50 shadow-md shadow-purple-600/30"
                >
                  {isGeneratingAI ? 'AI Sedang Melukis... 🎨' : 'Jana Background Sekarang ✨'}
                </button>
              </div>
            </div>

            {/* Bahagian Teks & Gambar Rasmi */}
            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
              <h2 className="text-lg font-bold mb-4 border-b border-slate-700 pb-2">Butiran Rasmi</h2>
              
              {tab === 'frame' ? (
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2">Muat Naik Gambar Subjek</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-emerald-500 file:text-white cursor-pointer" />
                </div>
              ) : (
                <div className="space-y-3">
                  <input type="text" placeholder="Tajuk Majlis" value={tajukMajlis} onChange={(e)=>setTajukMajlis(e.target.value)} className="w-full p-2.5 border border-slate-600 rounded-lg bg-slate-700 focus:ring-2 focus:ring-blue-500 text-white font-semibold" />
                  <input type="text" placeholder="Sub-Tajuk" value={subTajuk} onChange={(e)=>setSubTajuk(e.target.value)} className="w-full p-2.5 border border-slate-600 rounded-lg bg-slate-700 focus:ring-2 focus:ring-blue-500 text-white font-semibold" />
                  <input type="text" placeholder="Nama VIP" value={namaVIP} onChange={(e)=>setNamaVIP(e.target.value)} className="w-full p-2.5 border border-slate-600 rounded-lg bg-slate-700 focus:ring-2 focus:ring-blue-500 text-white font-semibold" />
                  <div className="flex gap-2">
                    <input type="text" placeholder="Tarikh" value={tarikh} onChange={(e)=>setTarikh(e.target.value)} className="w-1/2 p-2.5 border border-slate-600 rounded-lg bg-slate-700 text-white font-semibold" />
                    <input type="text" placeholder="Tempat" value={tempat} onChange={(e)=>setTempat(e.target.value)} className="w-1/2 p-2.5 border border-slate-600 rounded-lg bg-slate-700 text-white font-semibold" />
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={muatTurunGambar} disabled={isExporting || isGeneratingAI}
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-black rounded-2xl hover:scale-105 transition shadow-xl cursor-pointer disabled:opacity-50"
            >
              {isExporting ? 'Memproses...' : 'Muat Turun Grafik Rasmi 📥'}
            </button>
          </div>

          {/* Ruang Pratonton / Preview (Kanan) */}
          <div className="lg:col-span-7 flex justify-center items-center bg-slate-950 p-6 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            
            {tab === 'backdrop' ? (
              /* PREVIEW BACKDROP DEWAN (16:9) */
              <div 
                ref={grafikRef} 
                className="relative w-full aspect-video bg-slate-900 overflow-hidden shadow-2xl flex flex-col justify-center items-center text-center bg-cover bg-center rounded-xl border border-slate-700/50"
                style={{ backgroundImage: aiBackground ? `url(${aiBackground})` : 'none' }}
              >
                {!aiBackground && (
                  <p className="absolute inset-0 flex items-center justify-center text-slate-600 font-bold text-lg md:text-xl italic px-4">
                    Latar Belakang AI Akan Muncul Di Sini
                  </p>
                )}

                {/* Glassmorphism Overlay supaya teks jelas atas gambar AI */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

                <div className="relative z-10 w-full p-6 md:p-8 flex flex-col items-center">
                  <p className="text-yellow-400 drop-shadow-md font-serif tracking-[0.3em] text-[10px] sm:text-xs md:text-sm font-bold uppercase mb-2 md:mb-3">
                    Institut Pendidikan Guru Kampus Tun Hussein Onn
                  </p>
                  
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] font-serif mb-2 leading-tight">
                    {tajukMajlis}
                  </h1>
                  
                  <p className="text-yellow-100 drop-shadow-md text-sm sm:text-lg md:text-2xl font-light italic mb-6 md:mb-8">
                    "{subTajuk}"
                  </p>

                  <div className="w-full max-w-xl bg-black/60 border-t border-b border-yellow-500/50 py-2.5 sm:py-3 rounded-lg backdrop-blur-md mb-6 md:mb-8">
                    <p className="text-yellow-500 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-1">Dirasmikan Oleh:</p>
                    <p className="text-white font-bold text-sm sm:text-lg md:text-xl drop-shadow-md">{namaVIP}</p>
                  </div>

                  <div className="flex gap-6 sm:gap-8 text-white drop-shadow-md text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-2">🗓️ {tarikh}</span>
                    <span className="flex items-center gap-2">📍 {tempat}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* PREVIEW IG STORY (9:16) */
              <div 
                ref={grafikRef} 
                className="relative w-[300px] h-[533px] bg-slate-800 overflow-hidden shadow-2xl flex items-center justify-center bg-cover bg-center rounded-2xl border border-slate-700/50"
                style={{ backgroundImage: aiBackground ? `url(${aiBackground})` : 'none' }}
              >
                {!aiBackground && (
                  <p className="absolute inset-0 flex items-center justify-center text-slate-600 font-bold text-sm italic text-center p-4">
                    Jana AI Background Dahulu
                  </p>
                )}

                {/* Subjek Gambar Pengguna */}
                <div className="absolute inset-0 z-10 p-4 pb-24">
                   <div className="w-full h-full border-4 border-yellow-500/80 rounded-2xl overflow-hidden shadow-inner bg-slate-200 flex items-center justify-center">
                    {userImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={userImage} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <p className="text-slate-500 text-xs font-bold text-center px-2">Muat naik gambar subjek (kiri)</p>
                    )}
                   </div>
                </div>

                {/* Overlay Bawah - Glassmorphism */}
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent z-20 flex flex-col justify-end p-6">
                  <h3 className="text-yellow-400 font-black text-lg drop-shadow-md leading-none">{tajukMajlis}</h3>
                  <p className="text-white text-[10px] font-bold mt-1 tracking-wider">JPP IPGKTHO SESI 2026/2027</p>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}