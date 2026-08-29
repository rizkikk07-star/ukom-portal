-- Skrip Jadual Supabase untuk Borang Tempahan Media UKOM IPGKTHO
-- Jalankan skrip ini dalam Supabase SQL Editor:

CREATE TABLE IF NOT EXISTS public.tempahan_media (
    id BIGSERIAL PRIMARY KEY,
    tracking_id VARCHAR(50) UNIQUE NOT NULL,
    nama_program TEXT NOT NULL,
    penganjur VARCHAR(255) NOT NULL,
    tarikh DATE NOT NULL,
    jenis_liputan VARCHAR(255) NOT NULL,
    status VARCHAR(100) DEFAULT 'Sedang Disemak',
    krew_bertugas VARCHAR(255) DEFAULT 'Akan Ditetapkan',
    peratusan_siap VARCHAR(10) DEFAULT '25%',
    peratusan VARCHAR(10) DEFAULT '25%',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.tempahan_media ENABLE ROW LEVEL SECURITY;

-- 1. Benarkan sesiapa sahaja memasukkan data permohonan baru
CREATE POLICY "Public Insert tempahan_media" ON public.tempahan_media
    FOR INSERT WITH CHECK (true);

-- 2. Benarkan sesiapa sahaja membaca status berdasarkan tracking_id & senarai admin
CREATE POLICY "Public Read tempahan_media" ON public.tempahan_media
    FOR SELECT USING (true);

-- 3. Benarkan fungsi kemaskini status, krew dan peratusan di Papan Pemuka Admin
CREATE POLICY "Public Update tempahan_media" ON public.tempahan_media
    FOR UPDATE USING (true) WITH CHECK (true);