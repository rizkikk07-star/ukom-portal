'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Camera, 
  Search, 
  Download, 
  Images, 
  Home, 
  Menu, 
  X, 
  Sparkles,
  PhoneCall,
  ExternalLink,
  Trophy
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Utama', href: '/', icon: Home },
    { name: 'Tempahan Media', href: '/tempahan', icon: Camera },
    { name: 'Semak Status', href: '/semak', icon: Search },
    { name: 'Brand Kit', href: '/brand-kit', icon: Download },
    { name: 'Arkib & Galeri', href: '/arkib', icon: Images },
    { name: 'UKOM Quest 🏆', href: '/gamifikasi', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              PORTAL RASMI
            </span>
            <span className="hidden sm:inline text-slate-400">
              Unit Komunikasi Korporat • IPG Kampus Tun Hussein Onn, Batu Pahat
            </span>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <a 
              href="https://ipgktho.moe.edu.my" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <span>Portal Induk IPGKTHO</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">|</span>
            <a 
              href="https://wa.me/60197654321?text=Salam%20UKOM%20IPGKTHO,%20saya%20ingin%20bertanya" 
              target="_blank" 
              rel="noreferrer" 
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Bantuan WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-200' 
            : 'bg-white py-3.5 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Title */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-900 via-blue-700 to-sky-600 p-0.5 shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900/90 rounded-[10px] flex items-center justify-center text-white">
                <Camera className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900">UKOM</span>
                <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-black uppercase">
                  IPGKTHO
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 tracking-wide uppercase leading-none">
                Unit Komunikasi Korporat
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                      : link.name.includes('🏆')
                      ? 'text-amber-700 bg-amber-50 hover:bg-amber-100 font-bold border border-amber-200'
                      : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : link.name.includes('🏆') ? 'text-amber-500' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="/tempahan"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-600/20 hover:shadow-lg transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Tempah Liputan</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Buka Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fade-in">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : link.name.includes('🏆')
                      ? 'bg-amber-50 text-amber-800 font-bold border border-amber-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : link.name.includes('🏆') ? 'text-amber-500' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </a>
              );
            })}
            <div className="pt-2">
              <a
                href="/tempahan"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-blue-600 text-white font-bold text-sm shadow-md"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Borang Tempahan Media</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}