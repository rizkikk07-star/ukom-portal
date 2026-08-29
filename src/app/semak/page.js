'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

export default function SemakStatus() {
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Guna fungsi SELECT dari Supabase untuk cari Tracking ID
    const { data, error } = await supabase
      .from('tempahan_media')
      .select('*')
      .eq('tracking_id', searchId.trim().toUpperCase())
      .single();

    if (error || !data) {
      setResult("not_found");
    } else {
      setResult({
        id: data.tracking_id,
        program: data.nama_program,
        status: data.status || 'Sedang Disemak',
        krew: data.krew_bertugas || 'Akan Ditetapkan',
        peratusan: data.peratusan_siap || data.peratusan || '25%'
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline text-sm font-semibold mb-6 inline-block">
          &larr; Kembali ke Laman Utama
        </Link>
        
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Penjejak Status Media</h2>
          <p className="text-slate-500 mb-8">Masukkan Tracking ID anda untuk menyemak status liputan media atau suntingan video.</p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-10">
            <input 
              type="text" 
              placeholder="Contoh: UKOM-2026-XXXX" 
              className="flex-1 p-4 border border-gray-300 rounded-xl uppercase focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono font-semibold"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              required
            />
            <button type="submit" disabled={loading} className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition disabled:opacity-50">
              {loading ? 'Mencari...' : 'Semak'}
            </button>
          </form>

          {/* Keputusan Carian */}
          {result === "not_found" && (
            <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-center font-medium animate-fade-in">
              Tracking ID tidak dijumpai. Sila pastikan format betul (UKOM-2026-XXXX) dan permohonan telah dihantar.
            </div>
          )}

          {result && result !== "not_found" && (
            <div className="border border-gray-200 rounded-2xl p-6 bg-slate-50 animate-fade-in">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Tracking ID</p>
                  <p className="text-xl font-black text-slate-800 font-mono">{result.id}</p>
                </div>
                <div className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200">
                  {result.status}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Nama Program</p>
                  <p className="font-semibold text-slate-700">{result.program}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Krew Bertugas</p>
                  <p className="font-semibold text-slate-700">{result.krew}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-gray-500">Proses Kerja</span>
                  <span className="text-blue-600">{result.peratusan} Siap</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: result.peratusan }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}