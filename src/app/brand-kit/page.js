import React from 'react';
import Link from 'next/link';

export default function BrandKit() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline text-sm font-semibold mb-6 inline-block">
          &larr; Kembali ke Laman Utama
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Hab Brand Kit IPGKTHO</h1>
          <p className="text-lg text-slate-600">Pusat sumber rasmi untuk memuat turun logo, templat pembentangan, dan garis panduan identiti korporat. Pastikan kualiti visual IPGKTHO sentiasa terpelihara.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kad Logo IPG */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <div className="bg-gray-50 h-36 rounded-xl mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 p-4 relative overflow-hidden group">
                <img 
                  src="/assets/logos/logo-ipgktho.svg" 
                  alt="Logo Rasmi IPGKTHO" 
                  className="max-h-24 max-w-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Logo Rasmi IPGKTHO</h3>
              <p className="text-sm text-slate-500 mb-6">Logo beresolusi tinggi dengan latar belakang lutsinar (Transparent Background). Sesuai untuk poster dan surat rasmi.</p>
            </div>
            <div className="flex gap-2">
              <a 
                href="/assets/logos/logo-ipgktho.svg" 
                download="Logo-IPGKTHO.png" 
                className="flex-1 bg-blue-50 text-blue-700 font-bold py-2.5 rounded-lg text-sm border border-blue-200 hover:bg-blue-100 transition text-center"
              >
                Muat Turun PNG
              </a>
              <a 
                href="/assets/logos/logo-ipgktho.svg" 
                download="Logo-IPGKTHO.svg" 
                className="flex-1 bg-purple-50 text-purple-700 font-bold py-2.5 rounded-lg text-sm border border-purple-200 hover:bg-purple-100 transition text-center"
              >
                Muat Turun SVG
              </a>
            </div>
          </div>

          {/* Kad Templat Canva */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 h-36 rounded-xl mb-4 flex flex-col items-center justify-center text-white shadow-inner">
                <span className="font-extrabold text-xl tracking-wide">Templat Slaid Rasmi</span>
                <span className="text-xs text-blue-100 font-medium mt-1">Edisi Korporat IPGKTHO</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Templat Canva & Slaid</h3>
              <p className="text-sm text-slate-500 mb-6">Templat pembentangan standard untuk kegunaan pensyarah dan tugasan pembentangan (PB) siswa guru.</p>
            </div>
            <a 
              href="https://www.canva.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg text-sm hover:bg-slate-800 transition text-center block"
            >
              Buka di Canva
            </a>
          </div>
          
          {/* Kad Tipografi & Warna */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 md:col-span-2">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Kod Warna Korporat (Hex Codes)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#1e3a8a] border shadow-inner flex-shrink-0"></div>
                <div><p className="text-xs font-bold text-gray-500">Biru IPG</p><p className="text-sm font-mono font-bold text-slate-800">#1e3a8a</p></div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#facc15] border shadow-inner flex-shrink-0"></div>
                <div><p className="text-xs font-bold text-gray-500">Kuning Emas</p><p className="text-sm font-mono font-bold text-slate-800">#facc15</p></div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#dc2626] border shadow-inner flex-shrink-0"></div>
                <div><p className="text-xs font-bold text-gray-500">Merah Cendekia</p><p className="text-sm font-mono font-bold text-slate-800">#dc2626</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}