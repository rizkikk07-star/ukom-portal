import LiveTicker from '../components/LiveTicker';
import UkomBot from '../components/UkomBot';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Papan Hebahan Anti-Tenggelam */}
      <LiveTicker />
      
      {/* Bahagian Hero (Muka Depan Utama) */}
      <div className="bg-white border-b border-gray-200 relative overflow-hidden">
        {/* Latar belakang corak (pilihan) */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        
        <div className="max-w-6xl mx-auto px-6 py-24 text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-sm">
            🚀 Inisiatif Digital Siswa Guru IPGKTHO
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Pusat Komunikasi & Media <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">IPGKTHO</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Platform rasmi berpusat bagi pengurusan dokumentasi, penyiaran digital, dan repositori aset kreatif Institut Pendidikan Guru Kampus Tun Hussein Onn.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/tempahan" className="px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition transform hover:-translate-y-0.5">
              Tempah Liputan Media
            </Link>
            <Link href="/semak" className="px-8 py-3.5 bg-white text-slate-700 font-bold border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition transform hover:-translate-y-0.5">
              Semak Status Tempahan
            </Link>
          </div>
        </div>
      </div>

      {/* Ciri-Ciri Utama (Kad Menu) */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">Perkhidmatan & Modul Utama</h2>
          <p className="text-slate-500 mt-2">Akses pantas ke semua modul pengurusan media dan penglibatan krew IPGKTHO.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Kad 1 */}
          <Link href="/tempahan" className="group bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition duration-300 cursor-pointer block hover:-translate-y-1">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition shadow-xs">📸</div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Liputan Media Rasmi</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Sistem permohonan berpusat untuk perkhidmatan fotografi, videografi, dan siaran langsung program.</p>
          </Link>
          
          {/* Kad 2 */}
          <Link href="/brand-kit" className="group bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-purple-200 transition duration-300 cursor-pointer block hover:-translate-y-1">
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition shadow-xs">🎨</div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Hab Brand Kit & Aset</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Muat turun logo rasmi resolusi tinggi, garis panduan identiti korporat, dan templat persembahan Canva.</p>
          </Link>

          {/* Kad 3 */}
          <Link href="/arkib" className="group bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition duration-300 cursor-pointer block hover:-translate-y-1">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition shadow-xs">🗂️</div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Arkib Digital IPG</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Akses pangkalan data gambar program mengikut tahun, video montaj, dan sokongan bukti e-Fail MQA.</p>
          </Link>

          {/* Kad 4 - Gamifikasi & Leaderboard (Emas / Kuning Gempak) */}
          <Link href="/gamifikasi" className="group relative bg-gradient-to-b from-amber-50/80 via-white to-amber-50/50 p-7 rounded-3xl shadow-sm border border-amber-200/80 hover:shadow-2xl hover:shadow-amber-500/15 hover:border-amber-400 transition duration-300 cursor-pointer block hover:-translate-y-1.5 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-yellow-300/30 via-amber-200/20 to-transparent rounded-bl-full pointer-events-none"></div>
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-900 rounded-2xl flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition shadow-md shadow-amber-500/25">🏆</div>
            <div className="inline-block px-2.5 py-0.5 mb-2.5 text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 rounded-full border border-amber-200">
              AI Quest & XP
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-1.5">
              UKOM Quest & XP
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">Lapor tugasan krew, kumpul mata XP daripada Juri AI, dan bersaing dalam papan pendahulu krew!</p>
          </Link>
        </div>
      </div>

      {/* Pembantu Maya Chatbot UKOM */}
      <UkomBot />
    </div>
  );
}