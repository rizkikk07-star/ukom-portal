'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function AdminDashboard() {
  const [tempahan, setTempahan] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data dari Supabase bila halaman dibuka
  const fetchTempahan = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tempahan_media')
      .select('*')
      .order('created_at', { ascending: false }); // Susun yang terbaru di atas
    
    if (data) setTempahan(data);
    if (error) console.error('Error fetching tempahan:', error);
    setLoading(false);
  };

  useEffect(() => {
    fetchTempahan();
  }, []);

  // Fungsi untuk simpan kemaskini ke database
  const handleUpdate = async (id, statusBaru, krewBaru, peratusanBaru) => {
    const { error } = await supabase
      .from('tempahan_media')
      .update({ 
        status: statusBaru, 
        krew_bertugas: krewBaru, 
        peratusan_siap: peratusanBaru 
      })
      .eq('id', id);

    if (error) {
      alert('Ralat kemaskini! Sila semak konsol.');
      console.error(error);
    } else {
      alert('Mantap! Status berjaya dikemaskini.');
      fetchTempahan(); // Muat semula senarai
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800">Ruang Kerja Krew UKOM</h1>
            <p className="text-slate-500">Uruskan tempahan, tetapkan krew, dan kemaskini status kemajuan di sini.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchTempahan}
              className="px-4 py-2 bg-white text-slate-700 text-sm font-bold rounded-lg border border-slate-300 hover:bg-slate-50 transition shadow-sm"
            >
              🔄 Segarkan
            </button>
            <Link href="/" className="px-5 py-2 bg-slate-800 text-white text-sm font-bold rounded-lg hover:bg-slate-700 transition">
              Lihat Muka Depan
            </Link>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-slate-500 font-bold my-20">Sedang memuat turun data tempahan...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {tempahan.map((item) => (
              <KadAdmin 
                key={item.id} 
                item={item} 
                onUpdate={handleUpdate} 
              />
            ))}
            
            {tempahan.length === 0 && (
              <div className="text-center bg-white p-10 rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-gray-500 font-semibold">Belum ada sebarang tempahan baru setakat ini.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Komponen Kad untuk setiap baris tempahan
function KadAdmin({ item, onUpdate }) {
  const [status, setStatus] = useState(item.status || 'Sedang Disemak');
  const [krew, setKrew] = useState(item.krew_bertugas || 'Akan Ditetapkan');
  const [peratusan, setPeratusan] = useState(item.peratusan_siap || item.peratusan || '25%');

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-6 items-start md:items-center">
      {/* Maklumat Asas */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-black px-2 py-1 rounded tracking-widest font-mono">{item.tracking_id}</span>
          <span className="text-xs text-gray-400 font-semibold">{item.tarikh}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-800 leading-tight mb-1">{item.nama_program}</h3>
        <p className="text-sm text-slate-500 font-medium">{item.penganjur} • {item.jenis_liputan}</p>
      </div>

      {/* Kawalan Kemaskini */}
      <div className="w-full md:w-auto bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row gap-3">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Krew Bertugas</label>
          <input 
            type="text" 
            value={krew} 
            onChange={(e) => setKrew(e.target.value)}
            className="w-full sm:w-36 p-2 border border-gray-300 rounded text-sm font-semibold bg-white"
            placeholder="Nama Krew"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Status Semasa</label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="w-full sm:w-44 p-2 border border-gray-300 rounded text-sm font-semibold bg-white"
          >
            <option>Sedang Disemak</option>
            <option>Krew Ditugaskan</option>
            <option>Sedang Disunting</option>
            <option>Selesai & Lulus</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">% Siap</label>
          <select 
            value={peratusan} 
            onChange={(e) => setPeratusan(e.target.value)}
            className="w-full sm:w-24 p-2 border border-gray-300 rounded text-sm font-semibold bg-white"
          >
            <option>0%</option>
            <option>25%</option>
            <option>50%</option>
            <option>75%</option>
            <option>100%</option>
          </select>
        </div>
        <div className="flex items-end">
          <button 
            onClick={() => onUpdate(item.id, status, krew, peratusan)}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-600 text-white font-bold text-sm rounded hover:bg-emerald-700 shadow-md transition"
          >
            Kemaskini
          </button>
        </div>
      </div>
    </div>
  );
}