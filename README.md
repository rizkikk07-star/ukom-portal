# 🏛️ UKOM Portal - IPG Kampus Tun Hussein Onn

Portal Rasmi Unit Komunikasi Korporat (UKOM) Institut Pendidikan Guru Kampus Tun Hussein Onn (IPGKTHO / KPM).

---

## 🌟 Ciri-Ciri Utama

1. **Laman Utama Korporat (`/`)**:
   - Hero berimpak tinggi dengan paparan perkhidmatan teras, kaunter statistik interaktif, dan carian pantas nombor tracking.
   - Papan Hebahan Anti-Tenggelam (`LiveTicker`) dengan kawalan jeda dan modal hebahan lengkap.

2. **Borang Tempahan Media & Jana Tracking ID (`/tempahan`)**:
   - Borang pintar permohonan liputan media (Fotografi, Video/Montaj, Rekaan Grafik, Siaran Langsung, Hebahan Media Sosial).
   - Penjana automatik nombor penjejak unik (`UKOM-YYYY-XXXX`).
   - Slip tempahan rasmi yang boleh dicetak / disimpan sebagai PDF dan dikongsi terus ke WhatsApp pegawai UKOM.

3. **Penjejak Status Permohonan (`/semak`)**:
   - Semakan status masa nyata dengan carta alir (*Timeline Step Progress Tracker*):
     - *Diterima* ➜ *Dalam Semakan* ➜ *Diluluskan & Ditugaskan* ➜ *Selesai & Fail Tersedia*.
   - Maklumat pegawai/juruteknik media yang ditugaskan berserta pautan muat turun fail liputan resolusi tinggi (Google Drive).

4. **Hab Brand Kit & Aset Rasmi (`/brand-kit`)**:
   - Pusat muat turun logo rasmi berkualiti tinggi dalam format vektor SVG dan latarbelakang telus (PNG) bagi IPGKTHO, UKOM, dan KPM.
   - Palet warna korporat rasmi (Hex, RGB, CMYK) dengan fungsi *1-Click Copy*.
   - Garis panduan tipografi rasmi & pautan templat Canva / Slaid PowerPoint.

5. **Arkib Dokumentasi & Galeri Media (`/arkib`)**:
   - Galeri foto dan video beresolusi tinggi mengikut kategori (Majlis Rasmi, Akademik, Sukan, Bengkel, Kebudayaan).
   - Carian interaktif, penapis kategori, dan modal butiran album.

6. **Pangkalan Data Supabase + Offline-First Local Storage**:
   - Sokongan penuh pangkalan data Supabase awan.
   - Dilengkapi sistem simpanan setempat (*LocalStorage fallback*) automatik agar portal boleh diuji dan digunakan terus tanpa perlu memasukkan kunci API serta-merta.

---

## 🚀 Cara Menjalankan Projek

### 1. Pemasangan & Menjalankan Pelayan Pembangunan
Pastikan anda berada dalam direktori `ukom-portal`:

```bash
cd C:\Users\USER\.gemini\antigravity\scratch\ukom-portal
npm run dev
```

Buka pelayar web anda di: **`http://localhost:3000`**

### 2. Membina Versi Pengeluaran (Production Build)
```bash
npm run build
npm run start
```

---

## 🗄️ Konfigurasi Supabase (Pilihan)

Jika anda ingin menghubungkan portal ini ke pangkalan data awan Supabase:

1. Buat projek baru di [Supabase](https://supabase.com).
2. Salin fail `.env.example` kepada `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
3. Buka **SQL Editor** di papan pemuka Supabase dan jalankan keseluruhan skrip dalam fail `supabase_schema.sql`.

---

## 📁 Struktur Direktori

```
ukom-portal/
├── public/
│   ├── assets/
│   │   ├── logos/           # Logo IPGKTHO, UKOM, KPM (SVG/PNG telus)
│   │   └── templates/       # Templat Canva, Slaid, Brand Kit
├── src/
│   ├── app/
│   │   ├── layout.js        # Root Layout dengan Navbar, Footer & LiveTicker
│   │   ├── globals.css      # Konfigurasi Tailwind & gaya tema
│   │   ├── page.js          # Homepage (Hero, Live Ticker, Quick Links)
│   │   ├── tempahan/        # Halaman Borang Tempahan Media + Tracking Generator
│   │   ├── semak/           # Halaman Penjejak Status Tempahan
│   │   ├── brand-kit/       # Hab Muat Turun Aset Rasmi Kampus
│   │   └── arkib/           # Galeri & Dokumentasi Program
│   ├── components/
│   │   ├── Navbar.jsx       # Menu Navigasi Utama
│   │   ├── Footer.jsx       # Hak Cipta & Pautan Media Sosial
│   │   ├── LiveTicker.jsx   # Papan Hebahan Anti-Tenggelam
│   │   └── TrackingForm.jsx # Borang Tempahan Media Interaktif & Slip Cetak
│   └── lib/
│       ├── supabase.js      # Konfigurasi Pangkalan Data Supabase
│       └── storage.js       # Fallback Storage Manager (Local Storage + Supabase)
├── supabase_schema.sql      # Skrip Setup Jadual SQL Supabase
├── .env.example             # Contoh Pembolehubah Persekitaran
├── package.json
└── tailwind.config.js
```

---

Disediakan untuk **Unit Komunikasi Korporat, IPG Kampus Tun Hussein Onn, Batu Pahat, Johor**.
