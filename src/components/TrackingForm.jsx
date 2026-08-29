'use client';
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function TrackingForm() {
  const [formData, setFormData] = useState({
    namaProgram: '',
    penganjur: '',
    tarikh: '',
    jenisLiputan: 'Fotografi & Videografi',
  });

  const [trackingId, setTrackingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Penjanaan ID Unik
    const generatedId = `UKOM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Hantar data ke pangkalan data Supabase
    const { data, error } = await supabase
      .from('tempahan_media')
      .insert([
        { 
          tracking_id: generatedId, 
          nama_program: formData.namaProgram,
          penganjur: formData.penganjur,
          tarikh: formData.tarikh,
          jenis_liputan: formData.jenisLiputan
        }
      ]);

    if (error) {
      console.error('Error inserting data:', error);
      setError('Berlaku ralat semasa menghantar tempahan. Sila cuba lagi.');
    } else {
      setTrackingId(generatedId);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100 my-10">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Permohonan Liputan Media UKOM</h2>
      <p className="text-sm text-gray-500 mb-6">Sila isi butiran program untuk mendapatkan ID Penjejak (Tracking ID).</p>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold mb-4">
          {error}
        </div>
      )}

      {trackingId ? (
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center">
          <span className="text-emerald-600 font-semibold text-sm">Permohonan Berjaya Disimpan di Pangkalan Data!</span>
          <h3 className="text-3xl font-extrabold text-emerald-800 my-2">{trackingId}</h3>
          <p className="text-xs text-emerald-700">Simpan ID ini untuk menyemak status krew dan tugasan media anda di portal UKOM.</p>
          <button 
            onClick={() => setTrackingId(null)} 
            className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition"
          >
            Buat Tempahan Baharu
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nama Program / Acara</label>
            <input 
              type="text" 
              required 
              placeholder="Contoh: Majlis Perasmian Pesta Sukan Kampus"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              onChange={(e) => setFormData({...formData, namaProgram: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Unit / Jabatan / Anjuran</label>
              <input 
                type="text" 
                required 
                placeholder="Contoh: JPP / Jabatan STEM"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                onChange={(e) => setFormData({...formData, penganjur: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tarikh Program</label>
              <input 
                type="date" 
                required 
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                onChange={(e) => setFormData({...formData, tarikh: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Jenis Perkhidmatan Dibutuhkan</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              onChange={(e) => setFormData({...formData, jenisLiputan: e.target.value})}
            >
              <option>Fotografi & Videografi</option>
              <option>Pengendalian Live Streaming</option>
              <option>Sistem Siar Raya (PA System)</option>
              <option>Dokumentasi Dron Udara</option>
              <option>Penerbitan Poster & Montaj</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 text-white font-bold text-sm rounded-lg transition shadow-lg ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30'}`}
          >
            {loading ? 'Sedang Menghantar...' : 'Hantar & Jana Tracking ID'}
          </button>
        </form>
      )}
    </div>
  );
}