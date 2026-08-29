import React from 'react';

export default function LiveTicker() {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white flex items-center px-4 py-3 shadow-md relative z-10 w-full">
      <div className="flex-shrink-0 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse mr-3 sm:mr-4 shadow-sm shadow-red-500/50">
        Terkini
      </div>
      <div className="overflow-hidden w-full relative">
        <p className="text-xs sm:text-sm font-medium truncate">
          <span className="text-yellow-400 font-bold mr-2">[MEMO UKOM]</span> 
          Selamat Datang ke Portal Rasmi Unit Komunikasi & Media IPGKTHO. Sistem Tempahan Media sedang dalam fasa ujian (Beta).
        </p>
      </div>
    </div>
  );
}