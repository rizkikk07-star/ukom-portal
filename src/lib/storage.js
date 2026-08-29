import { supabase } from './supabase';

const STORAGE_KEY = 'ukom_portal_tempahan_db_v1';

export const isSupabaseActive = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  return Boolean(
    supabase &&
    url &&
    !url.includes('letak_url') &&
    url.startsWith('http')
  );
};

// Initial Demo Records for Instant Testing
export const INITIAL_DEMO_RECORDS = [
  {
    id: 'UKOM-2026-8812',
    applicant_name: 'Dr. Mohd Faizal bin Harun',
    department: 'Jabatan Sains & Matematik',
    phone: '019-7654321',
    email: 'faizal.harun@ipgktho.edu.my',
    event_title: 'Majlis Perasmian STEM Carnival & Inovasi Digital IPGKTHO 2026',
    event_date: '2026-09-15',
    event_time: '08:30',
    event_location: 'Dewan Seri Tanjung, IPGKTHO',
    service_types: ['Fotografi', 'Video / Montaj', 'Hebahan Media Sosial'],
    notes: 'Mohon jurugambar tiba 30 minit awal bagi sesi ketibaan Pengarah dan Tetamu Kehormat.',
    status: 'Diluluskan',
    assigned_officer: 'En. Khairul Nizam (Juruteknik Media UKOM)',
    media_link: 'https://drive.google.com/drive/folders/demo-stem-2026',
    created_at: '2026-08-25T10:00:00Z',
    status_history: [
      { step: 'Diterima', timestamp: '2026-08-25 10:00 AM', completed: true, note: 'Borang permohonan berjaya didaftarkan ke sistem.' },
      { step: 'Dalam Semakan', timestamp: '2026-08-26 09:30 AM', completed: true, note: 'Disemak oleh Ketua Unit Komunikasi Korporat.' },
      { step: 'Diluluskan', timestamp: '2026-08-27 02:15 PM', completed: true, note: 'Tugasan diagihkan kepada En. Khairul Nizam.' },
      { step: 'Selesai & Arkib', timestamp: 'Menunggu Hari Program', completed: false, note: 'Dokumentasi penuh akan dimuat naik selepas majlis.' }
    ]
  },
  {
    id: 'UKOM-2026-9041',
    applicant_name: 'Puan Siti Noraini binti Ahmad',
    department: 'Unit Hal Ehwal Pelajar (HEP)',
    phone: '012-3456789',
    email: 'noraini.ahmad@ipgktho.edu.my',
    event_title: 'Sukan Antara Opsyen (SUKOP) 2026',
    event_date: '2026-09-20',
    event_time: '14:00',
    event_location: 'Kompleks Sukan IPGKTHO',
    service_types: ['Fotografi', 'Siaran Langsung'],
    notes: 'Perlukan liputan acara penutup dan penyampaian hadiah.',
    status: 'Dalam Semakan',
    assigned_officer: 'Dalam Proses Agihan',
    media_link: '',
    created_at: '2026-08-28T14:30:00Z',
    status_history: [
      { step: 'Diterima', timestamp: '2026-08-28 02:30 PM', completed: true, note: 'Borang permohonan berjaya didaftarkan.' },
      { step: 'Dalam Semakan', timestamp: '2026-08-29 09:00 AM', completed: true, note: 'Sedang disemak mengikut jadual tugas jurukamera.' },
      { step: 'Diluluskan', timestamp: '-', completed: false, note: 'Menunggu kelulusan jadual liputan.' },
      { step: 'Selesai & Arkib', timestamp: '-', completed: false, note: '-' }
    ]
  }
];

// Helper to get local records
export function getLocalRecords() {
  if (typeof window === 'undefined') return INITIAL_DEMO_RECORDS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_RECORDS));
      return INITIAL_DEMO_RECORDS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading localStorage:', e);
    return INITIAL_DEMO_RECORDS;
  }
}

// Helper to save local record
export function saveLocalRecord(record) {
  if (typeof window === 'undefined') return;
  try {
    const current = getLocalRecords();
    const updated = [record, ...current.filter(r => r.id !== record.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error writing to localStorage:', e);
  }
}

// Generate Unique Tracking ID (e.g. UKOM-2026-4829)
export function generateTrackingId() {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `UKOM-${year}-${randomNum}`;
}

// Create new media reservation
export async function createBooking(data) {
  const trackingId = generateTrackingId();
  const now = new Date().toISOString();
  
  const record = {
    id: trackingId,
    applicant_name: data.applicant_name,
    department: data.department,
    phone: data.phone,
    email: data.email,
    event_title: data.event_title,
    event_date: data.event_date,
    event_time: data.event_time,
    event_location: data.event_location,
    service_types: data.service_types || [],
    notes: data.notes || '',
    status: 'Diterima',
    assigned_officer: 'Pegawai Bertugas Akan Ditetapkan',
    media_link: '',
    created_at: now,
    status_history: [
      { step: 'Diterima', timestamp: new Date().toLocaleString('ms-MY'), completed: true, note: 'Borang permohonan berjaya didaftarkan ke sistem UKOM.' },
      { step: 'Dalam Semakan', timestamp: 'Dalam Proses', completed: false, note: 'Menunggu semakan ketersediaan peralatan & jurugambar.' },
      { step: 'Diluluskan', timestamp: '-', completed: false, note: 'Penetapan jurufoto/video bertugas.' },
      { step: 'Selesai & Arkib', timestamp: '-', completed: false, note: 'Muat naik fail dokumentasi.' }
    ]
  };

  // 1. Try Supabase if configured
  if (isSupabaseActive() && supabase) {
    try {
      const { error } = await supabase.from('bookings').insert([
        {
          id: record.id,
          applicant_name: record.applicant_name,
          department: record.department,
          phone: record.phone,
          email: record.email,
          event_title: record.event_title,
          event_date: record.event_date,
          event_time: record.event_time,
          event_location: record.event_location,
          service_types: record.service_types,
          notes: record.notes,
          status: record.status,
          assigned_officer: record.assigned_officer,
          created_at: record.created_at
        }
      ]);
      if (error) {
        console.warn('Supabase insert warning, fallback to local storage:', error.message);
      }
    } catch (err) {
      console.warn('Supabase exception, falling back to local storage:', err);
    }
  }

  // Always save locally for offline-first resilience
  saveLocalRecord(record);
  return record;
}

// Find reservation by Tracking ID
export async function getBookingById(trackingId) {
  const cleanId = trackingId?.trim().toUpperCase();
  if (!cleanId) return null;

  // 1. Try Supabase if configured
  if (isSupabaseActive() && supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', cleanId)
        .single();
        
      if (!error && data) {
        return {
          ...data,
          status_history: data.status_history || [
            { step: 'Diterima', timestamp: new Date(data.created_at).toLocaleDateString('ms-MY'), completed: true, note: 'Permohonan didaftarkan.' },
            { step: 'Dalam Semakan', timestamp: data.status !== 'Diterima' ? 'Selesai' : 'Dalam Proses', completed: data.status !== 'Diterima', note: 'Semakan pentadbir UKOM.' },
            { step: 'Diluluskan', timestamp: data.status === 'Diluluskan' || data.status === 'Selesai' ? 'Lulus' : '-', completed: data.status === 'Diluluskan' || data.status === 'Selesai', note: data.assigned_officer || 'Pegawai ditugaskan.' },
            { step: 'Selesai & Arkib', timestamp: data.status === 'Selesai' ? 'Selesai' : '-', completed: data.status === 'Selesai', note: data.media_link ? 'Pautan media tersedia.' : '-' }
          ]
        };
      }
    } catch (err) {
      console.warn('Supabase query error, fallback to local:', err);
    }
  }

  // Fallback to local storage
  const localList = getLocalRecords();
  const found = localList.find(item => item.id.toUpperCase() === cleanId);
  return found || null;
}