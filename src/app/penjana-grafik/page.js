'use client';
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import Link from 'next/link';

export default function PenjanaGrafik() {
  const [tab, setTab] = useState('frame'); // 'frame' atau 'backdrop'
  
  // State untuk Frame IG
  const [userImage, setUserImage] = useState(null);
  
  // State untuk Backdrop
  const [tajukMajlis, setTajukMajlis] = useState('MAJLIS JUNJUNGAN KASIH');
  const [subTajuk, setSubTajuk] = useState('Budi Menyapa, Jasa Selamanya');
  const [namaVIP, setNamaVIP] = useState('EN. MOHD AMINUDIN BIN ABU BAKAR');
  const [tarikh, setTarikh] = useState('15 JUN 2026');
  const [tempat, setTempat] = useState('DEWAN SERI BUDIMAN');

  const grafikRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(URL.createObjectURL(file));
    }
  };

  const muatTurunGambar = async () => {
    if (!grafikRef.current) return;
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(grafikRef.current, { scale: 2, useCORS: true });
      const image = canvas.toDataURL("image/png");
      
      const link = document.createElement('a');
      link.href = image;
      link.download = tab === 'frame' ? 'UKOM_IG_Story.png' : 'UKOM_Backdrop.png';
      link.click();
    } catch (err) {
      console.error(err);
      alert("Ralat semasa menyimpan gambar.");
    }
    setIsExporting(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 py-10 px-6 font-sans text-white">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-emerald-400 hover:underline text-sm font-semibold mb-6 inline-block">
          &larr; Kembali ke Laman Utama
        </Link>
        <h1 className="text-3xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
          Penjana Grafik Automatik UKOM
        </h1>

        {/* Tab Kawalan */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setTab('frame')}
            className={`px-6 py-3 font-bold rounded-xl transition cursor-pointer ${tab === 'frame' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            📱 Bina Frame IG Story
          </button>
          <button 
            onClick={() => setTab('backdrop')}
            className={`px-6 py-3 font-bold rounded-xl transition cursor-pointer ${tab === 'backdrop' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            🖥️ Bina Backdrop Skrin
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Ruang Input / Borang (Kiri) */}
          <div className="md:col-span-5 bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
            <h2 className="text-xl font-bold mb-6 border-b border-slate-700 pb-3">
              {tab === 'frame' ? 'Tetapan Gambar' : 'Butiran Majlis'}
            </h2>

            {tab === 'frame' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2">Muat Naik Gambar Anda</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-emerald-500 file:text-white file:font-semibold cursor-pointer" />
                </div>
                <p className="text-xs text-slate-500 mt-4">Nota: Pilih gambar potret untuk hasil terbaik (Nisbah 9:16).</p>
              </div>
            ) : (
              <div className="space-y-4 text-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tajuk Utama Majlis</label>
                  <input type="text" value={tajukMajlis} onChange={(e)=>setTajukMajlis(e.target.value)} className="w-full p-2.5 border border-slate-600 rounded-lg bg-slate-100 font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Sub-Tajuk / Tema</label>
                  <input type="text" value={subTajuk} onChange={(e)=>setSubTajuk(e.target.value)} className="w-full p-2.5 border border-slate-600 rounded-lg bg-slate-100 font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nama VIP / Perasmi</label>
                  <input type="text" value={namaVIP} onChange={(e)=>setNamaVIP(e.target.value)} className="w-full p-2.5 border border-slate-600 rounded-lg bg-slate-100 font-semibold" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tarikh</label>
                    <input type="text" value={tarikh} onChange={(e)=>setTarikh(e.target.value)} className="w-full p-2.5 border border-slate-600 rounded-lg bg-slate-100 font-semibold" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tempat</label>
                    <input type="text" value={tempat} onChange={(e)=>setTempat(e.target.value)} className="w-full p-2.5 border border-slate-600 rounded-lg bg-slate-100 font-semibold" />
                  </div>
                </div>
              </div>
            )}

            <button 
              onClick={muatTurunGambar}
              disabled={isExporting}
              className="w-full mt-8 py-3.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-black rounded-xl hover:scale-105 transition shadow-lg cursor-pointer disabled:opacity-50"
            >
              {isExporting ? 'Memproses Gambar...' : 'Muat Turun Gambar 📥'}
            </button>
          </div>

          {/* Ruang Pratonton / Preview (Kanan) */}
          <div className="md:col-span-7 flex justify-center items-center bg-slate-950 p-6 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            
            {tab === 'frame' ? (
              /* PREVIEW IG STORY (9:16) */
              <div ref={grafikRef} className="relative w-[300px] h-[533px] bg-slate-800 overflow-hidden shadow-2xl flex items-center justify-center rounded-lg">
                {userImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={userImage} alt="User" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <p className="text-slate-400 text-sm font-bold z-10 text-center px-4">Sila muat naik gambar di sebelah kiri</p>
                )}
                
                {/* Overlay Frame (Simulasi Border Emas) */}
                <div className="absolute inset-0 border-[16px] border-yellow-500/80 pointer-events-none z-20"></div>
                
                {/* Elemen Bawah */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent z-20 flex flex-col justify-end p-4">
                  <p className="text-white text-xs font-bold text-center tracking-wider">JPP IPGKTHO SESI 2026/2027</p>
                </div>
              </div>

            ) : (

              /* PREVIEW BACKDROP DEWAN (16:9) */
              <div ref={grafikRef} className="relative w-full aspect-video bg-gradient-to-br from-slate-900 via-zinc-900 to-black overflow-hidden shadow-2xl p-8 flex flex-col justify-center items-center text-center border-4 border-yellow-600/30 rounded-lg">
                {/* Hiasan Corak */}
                <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-yellow-500 rounded-tl-3xl opacity-50 m-4"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-yellow-500 rounded-br-3xl opacity-50 m-4"></div>

                <p className="text-yellow-400 font-serif tracking-[0.3em] text-xs sm:text-sm md:text-base font-bold uppercase mb-2">
                  Institut Pendidikan Guru Kampus Tun Hussein Onn
                </p>
                
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 to-yellow-600 font-serif mb-2 leading-tight">
                  {tajukMajlis}
                </h1>
                
                <p className="text-slate-300 text-sm sm:text-lg md:text-xl font-light italic mb-6">
                  "{subTajuk}"
                </p>

                <div className="w-full max-w-2xl bg-black/40 border border-yellow-600/30 p-3 sm:p-4 rounded-2xl backdrop-blur-sm relative z-10">
                  <p className="text-yellow-500 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-1">Dirasmikan Oleh:</p>
                  <p className="text-white font-bold text-sm sm:text-lg md:text-xl">{namaVIP}</p>
                </div>

                <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center gap-6 sm:gap-8 text-slate-400 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">🗓️ {tarikh}</span>
                  <span className="flex items-center gap-1.5">📍 {tempat}</span>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}