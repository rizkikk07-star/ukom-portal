import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UkomBot from '../components/UkomBot';

export const metadata = {
  title: 'Pusat Komunikasi & Media IPGKTHO | UKOM',
  description: 'Platform rasmi berpusat bagi pengurusan dokumentasi, penyiaran digital, dan repositori aset kreatif Institut Pendidikan Guru Kampus Tun Hussein Onn.',
  keywords: 'UKOM, IPGKTHO, IPG Kampus Tun Hussein Onn, KPM, Tempahan Media, Brand Kit IPG, Galeri IPGKTHO, Batu Pahat',
  authors: [{ name: 'Unit Komunikasi Korporat IPGKTHO' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="ms" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <UkomBot />
        <Footer />
      </body>
    </html>
  );
}