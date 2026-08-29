'use client';

import { useState } from 'react';
import { 
  Images, 
  Search, 
  Calendar, 
  User, 
  Download, 
  ExternalLink, 
  Film, 
  Camera, 
  X, 
  Sparkles,
  Layers,
  Eye
} from 'lucide-react';

const ARCHIVE_ITEMS = [
  {
    id: 'arkib-01',
    title: 'Majlis Konvokesyen Institut Pendidikan Guru KPM 2026',
    category: 'Majlis Rasmi',
    date: '20 Ogos 2026',
    photographer: 'En. Khairul Nizam & Jurufoto UKOM',
    photoCount: 184,
    hasVideo: true,
    coverColor: 'from-slate-900 via-brand-950 to-slate-900',
    accentBadge: 'Acara Utama',
    driveLink: 'https://drive.google.com/drive/folders/sample-konvo-2026',
    summary: 'Liputan penuh sesi penyampaian ijazah dan diploma perguruan kepada graduan IPGKTHO disempurnakan oleh Ketua Pengarah Pendidikan Malaysia.'
  },
  {
    id: 'arkib-02',
    title: 'Seminar Kebangsaan Pedagogi Digital & AI Dalam Pendidikan Guru',
    category: 'Akademik & Seminar',
    date: '12 Ogos 2026',
    photographer: 'Puan Hafizah & Skuad Media',
    photoCount: 96,
    hasVideo: true,
    coverColor: 'from-brand-950 via-sky-950 to-slate-900',
    accentBadge: 'Seminar',
    driveLink: 'https://drive.google.com/drive/folders/sample-seminar-ai',
    summary: 'Pembentangan kertas kerja inovasi digital oleh pensyarah dan guru pelatih seluruh Malaysia di Auditorium IPGKTHO.'
  },
  {
    id: 'arkib-03',
    title: 'Kejohanan Sukan Antara Opsyen (SUKOP) 2026',
    category: 'Sukan & Kokurikulum',
    date: '02 Ogos 2026',
    photographer: 'En. Khairul Nizam',
    photoCount: 240,
    hasVideo: false,
    coverColor: 'from-emerald-950 via-teal-950 to-slate-900',
    accentBadge: 'Sukan',
    driveLink: 'https://drive.google.com/drive/folders/sample-sukop-2026',
    summary: 'Aktiviti tahunan sukan padang dan balapan melibatkan semua opsyen pengajian di Kompleks Sukan IPGKTHO.'
  },
  {
    id: 'arkib-04',
    title: 'Bengkel Pemantapan Penerbitan Media Sosial & Montaj Video',
    category: 'Bengkel & Kursus',
    date: '24 Julai 2026',
    photographer: 'Skuad UKOM',
    photoCount: 65,
    hasVideo: true,
    coverColor: 'from-purple-950 via-indigo-950 to-slate-900',
    accentBadge: 'Latihan',
    driveLink: 'https://drive.google.com/drive/folders/sample-bengkel-media',
    summary: 'Kursus praktikal penggunaan kamera mirrorless dan aplikasi penyuntingan CapCut/Premiere untuk wakil kelab pelajar.'
  },
  {
    id: 'arkib-05',
    title: 'Malam Citra Seni Warisan & Kebudayaan IPGKTHO',
    category: 'Kebudayaan',
    date: '10 Julai 2026',
    photographer: 'En. Khairul Nizam & Cik Farhana',
    photoCount: 152,
    hasVideo: true,
    coverColor: 'from-amber-950 via-red-950 to-slate-900',
    accentBadge: 'Kebudayaan',
    driveLink: 'https://drive.google.com/drive/folders/sample-malam-seni',
    summary: 'Persembahan teater, tarian tradisional Johor, dan persembahan orkestra gamelan guru pelatih sempena Hari Guru.'
  },
  {
    id: 'arkib-06',
    title: 'Sambutan Hari Raya Aidilfitri & Ramah Mesra Warga Kampus',
    category: 'Majlis Rasmi',
    date: '28 Mei 2026',
    photographer: 'Jurufoto UKOM',
    photoCount: 110,
    hasVideo: false,
    coverColor: 'from-emerald-900 via-slate-900 to-teal-950',
    accentBadge: 'Sambutan',
    driveLink: 'https://drive.google.com/drive/folders/sample-raya-ipgktho',
    summary: 'Jamuan raya tahunan warga pensyarah, staf sokongan, dan siswa pendidik bertempat di Dewan Seri Tanjung.'
  }
];

const CATEGORIES = [
  'Semua Kategori',
  'Majlis Rasmi',
  'Akademik & Seminar',
  'Sukan & Kokurikulum',
  'Bengkel & Kursus',
  'Kebudayaan'
];

export default function ArkibPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const filteredItems = ARCHIVE_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'Semua Kategori' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.photographer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-black tracking-widest text-brand-700 uppercase bg-brand-50 px-3.5 py-1 rounded-full border border-brand-200">
          Galeri & Dokumentasi Rasmi
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Arkib Liputan Media & Dokumentasi Program
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
          Koleksi foto dan video rasmi aktiviti kampus yang telah dirakam oleh Unit Komunikasi Korporat. Anda boleh melihat ringkasan atau memuat turun album penuh beresolusi tinggi.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari nama acara, topik, atau jurugambar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Albums */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Cover Card Banner */}
              <div className={`h-44 bg-gradient-to-br ${item.coverColor} text-white p-5 flex flex-col justify-between relative overflow-hidden`}>
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-white/15 backdrop-blur-md">
                    {item.category}
                  </span>
                  {item.hasVideo && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/80 text-white">
                      <Film className="w-3 h-3" />
                      Video
                    </span>
                  )}
                </div>

                <div className="relative z-10">
                  <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  <p className="text-xs font-bold text-slate-200 mt-1 line-clamp-1">
                    {item.photoCount} Keping Foto Beresolusi Tinggi
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-2.5">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-700 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {item.summary}
                </p>
                <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-brand-600" />
                  <span>Jurugambar: {item.photographer}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedAlbum(item)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Lihat Butiran</span>
              </button>

              <a
                href={item.driveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 py-2 px-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-xs transition-colors"
                title="Buka Folder Google Drive"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Muat Turun</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <Images className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700 text-base">Tiada album arkib dijumpai</h3>
          <p className="text-xs text-slate-400 mt-1">Cuba cari dengan kata kunci yang lain atau pilih kategori Semua.</p>
        </div>
      )}

      {/* Album Detail Modal */}
      {selectedAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden">
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-brand-700 uppercase px-2 py-0.5 rounded bg-brand-50 border border-brand-200 inline-block mb-1">
                  {selectedAlbum.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {selectedAlbum.title}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedAlbum.date}</span>
                  <span>•</span>
                  <span>{selectedAlbum.photoCount} Foto</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedAlbum(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>{selectedAlbum.summary}</p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] space-y-1">
                <p><span className="font-bold text-slate-800">Jurugambar / Petugas:</span> {selectedAlbum.photographer}</p>
                <p><span className="font-bold text-slate-800">Format Fail:</span> JPG Resolusi Tinggi (300 DPI) & Video MP4 1080p</p>
                <p><span className="font-bold text-slate-800">Hak Milik:</span> Unit Komunikasi Korporat, IPG Kampus Tun Hussein Onn</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedAlbum(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Tutup
              </button>
              <a
                href={selectedAlbum.driveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Buka Google Drive Album</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
