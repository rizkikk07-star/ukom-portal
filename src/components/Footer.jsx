import { 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Youtube, 
  Instagram, 
  Heart, 
  ShieldCheck, 
  ExternalLink,
  Clock
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative Top Line */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-600 via-amber-400 to-sky-400"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Info UKOM */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-700 to-sky-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Camera className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-black text-white tracking-wide">UKOM IPGKTHO</h3>
                <p className="text-xs text-slate-400 font-medium">Unit Komunikasi Korporat</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Pusat sehenti penyelarasan liputan media, penerbitan kandungan digital, pengurusan identiti visual korporat, dan arkib dokumentasi rasmi Institut Pendidikan Guru Kampus Tun Hussein Onn.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="Facebook UKOM"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="YouTube Rasmi"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="Instagram UKOM"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Pautan Pantas */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Pautan Pantas</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="/" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-brand-500">›</span> Laman Utama
                </a>
              </li>
              <li>
                <a href="/tempahan" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-brand-500">›</span> Borang Tempahan Media
                </a>
              </li>
              <li>
                <a href="/semak" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-brand-500">›</span> Penjejak Status Tempahan
                </a>
              </li>
              <li>
                <a href="/brand-kit" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-brand-500">›</span> Hab Brand Kit & Logo
                </a>
              </li>
              <li>
                <a href="/arkib" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-brand-500">›</span> Galeri & Arkib Acara
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Waktu Operasi & Garis Panduan */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Operasi & Tempahan</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200">Waktu Urusan Rasmi:</p>
                  <p>Ahad – Rabu: 8:00 AM – 5:00 PM</p>
                  <p>Khamis: 8:00 AM – 3:30 PM</p>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] leading-relaxed">
                <span className="text-amber-400 font-bold">Peringatan:</span> Permohonan liputan media mestilah dihantar sekurang-kurangnya <span className="text-white font-semibold">3 hari bekerja</span> sebelum tarikh majlis/program.
              </div>
            </div>
          </div>

          {/* Column 4: Maklumat Perhubungan */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Hubungi Kami</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span>
                  Unit Komunikasi Korporat, Aras 2, Bangunan Pentadbiran, IPG Kampus Tun Hussein Onn, KM 7.5 Jalan Kluang, 83000 Batu Pahat, Johor.
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="tel:074567890" className="hover:text-emerald-300">07-456 7890 / Ext. 214</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href="mailto:ukom@ipgktho.edu.my" className="hover:text-sky-300">ukom@ipgktho.edu.my</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              &copy; {currentYear} Unit Komunikasi Korporat IPG Kampus Tun Hussein Onn. Hak Cipta Terpelihara.
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Kementerian Pendidikan Malaysia • Melahirkan Pendidik Berwibawa
          </p>
        </div>
      </div>
    </footer>
  );
}
