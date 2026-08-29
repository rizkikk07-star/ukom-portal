'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function Gamifikasi() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [nama, setNama] = useState('');
  const [laporan, setLaporan] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('krew_leaderboard')
        .select('*')
        .order('xp_terkumpul', { ascending: false });
      if (data) setLeaderboard(data);
      if (error) console.error('Error fetching leaderboard:', error);
    } catch (e) {
      console.error('Fetch error:', e);
    }
  };

  useEffect(() => { 
    fetchLeaderboard(); 
  }, []);

  const handleClaimXP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAiResponse(null);

    try {
      // 1. Hantar kepada AI Google untuk dinilai
      const res = await fetch('/api/nilai-tugas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, laporanTugas: laporan }),
      });
      const aiData = await res.json();
      const dapatXP = aiData.xp || 30;

      // 2. Semak jika krew sudah wujud di pangkalan data
      let { data: krewSediaAda } = await supabase
        .from('krew_leaderboard')
        .select('*')
        .eq('nama_krew', nama.trim())
        .single();

      let xpBaru = dapatXP;
      let tugasBaru = 1;

      if (krewSediaAda) {
        xpBaru += (krewSediaAda.xp_terkumpul || 0);
        tugasBaru += (krewSediaAda.tugasan_diselesaikan || 0);
        // Update data
        await supabase
          .from('krew_leaderboard')
          .update({ xp_terkumpul: xpBaru, tugasan_diselesaikan: tugasBaru })
          .eq('nama_krew', nama.trim());
      } else {
        // Insert krew baru
        await supabase
          .from('krew_leaderboard')
          .insert([{ nama_krew: nama.trim(), xp_terkumpul: xpBaru, tugasan_diselesaikan: 1 }]);
      }

      setAiResponse({ xp: dapatXP, mesej: aiData.ulasan, totalXp: xpBaru });
      setLaporan('');
      fetchLeaderboard();
    } catch (error) {
      console.error('Claim XP error:', error);
      alert("Ralat memproses tuntutan XP.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-emerald-400 hover:underline text-sm font-semibold mb-6 inline-block">
          &larr; Kembali ke Laman Utama
        </Link>
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
          UKOM Quest & Leaderboard 🏆
        </h1>
        <p className="text-slate-400 mb-10">Lapor tugasan media anda, biarkan Juri AI menilai, dan kumpul XP untuk tebus anugerah kelak!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Lapor Tugas */}
          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">✍️ Lapor Misi (Claim XP)</h2>
            <form onSubmit={handleClaimXP} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nama Krew</label>
                <input 
                  type="text" 
                  required 
                  value={nama} 
                  onChange={(e)=>setNama(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-white font-medium"
                  placeholder="Cth: Khairul Hafzan"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Apa yang anda selesaikan?</label>
                <textarea 
                  required 
                  value={laporan} 
                  onChange={(e)=>setLaporan(e.target.value)} 
                  rows="3"
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-white font-medium"
                  placeholder="Cth: Saya ambil gambar dan buat video recap guna CapCut untuk program perkhemahan..."
                ></textarea>
              </div>
              <button 
                disabled={loading} 
                type="submit" 
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 font-bold rounded-xl hover:scale-[1.02] transition disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                {loading ? 'AI Sedang Menilai...' : 'Hantar kepada AI Juri 🚀'}
              </button>
            </form>

            {/* AI Result Box */}
            {aiResponse && (
              <div className="mt-6 p-5 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl border border-purple-500/30 animate-fade-in shadow-xl">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-purple-300 font-bold text-sm">Penilaian Google AI:</span>
                  <span className="bg-yellow-400 text-yellow-900 font-black px-3 py-1 rounded-full text-xs shadow-sm">
                    + {aiResponse.xp} XP
                  </span>
                </div>
                <p className="text-white text-sm italic leading-relaxed">"{aiResponse.mesej}"</p>
              </div>
            )}
          </div>

          {/* Leaderboard Table */}
          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl flex flex-col">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🔥 Papan Pendahulu</h2>
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[420px] pr-1">
              {leaderboard.map((krew, index) => (
                <div key={krew.id || index} className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-700/50 hover:border-emerald-500/50 transition">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${index === 0 ? 'bg-yellow-400 text-yellow-900' : index === 1 ? 'bg-slate-300 text-slate-800' : index === 2 ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-white">{krew.nama_krew}</p>
                      <p className="text-xs text-slate-400">{krew.tugasan_diselesaikan} Misi Selesai</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-emerald-400 text-lg">{krew.xp_terkumpul}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">XP</p>
                  </div>
                </div>
              ))}

              {leaderboard.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  <p className="text-3xl mb-2">🎮</p>
                  <p className="font-medium text-sm">Belum ada rekod krew. Jadi orang pertama yang claim XP!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}