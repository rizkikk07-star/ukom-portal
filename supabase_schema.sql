-- Skrip Jadual Supabase untuk Portal UKOM IPGKTHO
-- Jalankan skrip ini dalam Supabase SQL Editor:

-- 1. JADUAL TEMPAHAN MEDIA
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

ALTER TABLE public.tempahan_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Insert tempahan_media" ON public.tempahan_media FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read tempahan_media" ON public.tempahan_media FOR SELECT USING (true);
CREATE POLICY "Public Update tempahan_media" ON public.tempahan_media FOR UPDATE USING (true) WITH CHECK (true);

-- 2. JADUAL LEADERBOARD GAMIFIKASI KREW
CREATE TABLE IF NOT EXISTS public.krew_leaderboard (
    id BIGSERIAL PRIMARY KEY,
    nama_krew VARCHAR(255) UNIQUE NOT NULL,
    xp_terkumpul INTEGER DEFAULT 0,
    tugasan_diselesaikan INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.krew_leaderboard ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Insert krew_leaderboard" ON public.krew_leaderboard FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read krew_leaderboard" ON public.krew_leaderboard FOR SELECT USING (true);
CREATE POLICY "Public Update krew_leaderboard" ON public.krew_leaderboard FOR UPDATE USING (true) WITH CHECK (true);