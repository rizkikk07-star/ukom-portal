import LiveTicker from '../components/LiveTicker';
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
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kad 1 */}
          <Link href="/tempahan" className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition duration-300 cursor-pointer block">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition">📸</div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Liputan Media Rasmi</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Sistem permohonan berpusat untuk perkhidmatan fotografi, videografi, dan siaran langsung program.</p>
          </Link>
          
          {/* Kad 2 */}
          <Link href="/brand-kit" className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-purple-100 transition duration-300 cursor-pointer block">
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition">🎨</div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Hab Brand Kit & Aset</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Muat turun logo rasmi resolusi tinggi, garis panduan identiti korporat, dan templat persembahan Canva.</p>
          </Link>

          {/* Kad 3 */}
          <Link href="/arkib" className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-emerald-100 transition duration-300 cursor-pointer block">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition">🗂️</div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Arkib Digital IPG</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Akses pangkalan data gambar program mengikut tahun, video montaj, dan sokongan bukti e-Fail MQA.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}