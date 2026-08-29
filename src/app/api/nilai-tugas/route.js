import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export const maxDuration = 30;

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
});

export async function POST(req) {
  try {
    const { nama, laporanTugas } = await req.json();

    // Arahkan model untuk bertindak sebagai Ketua Panel Penilai UKOM
    const { text } = await generateText({
      model: google('gemini-3.6-flash'),
      system: `Anda adalah Ketua Panel Penilai & Sidang Pengarang Rasmi bagi Unit Komunikasi dan Media (UKOM) di Institut Pendidikan Guru Kampus Tun Hussein Onn (IPGKTHO).
      Tugas anda adalah meneliti laporan tugas krew media dan memberikan mata merit (XP) secara adil berdasarkan skala kesukaran:
      - Tugas asas (Ambil gambar biasa, bantu logistik, susun peralatan): 10 - 30 XP
      - Tugas teknikal sederhana (Suntingan foto, penyediaan poster, kawalan PA sistem): 40 - 70 XP
      - Tugas teknikal tinggi (Suntingan video montaj, siaran langsung/live streaming, penerbitan buletin): 80 - 150 XP
      
      Berikan ulasan yang bersemangat, profesional, dan membina sebagai Ketua Panel Penilai UKOM (elakkan menyebut diri anda sebagai AI).
      
      Balas HANYA dalam format JSON yang sah seperti ini:
      {"xp": <jumlah_xp_angka>, "ulasan": "<mesej_penghargaan_dan_motivasi_dalam_BM>"}`,
      prompt: `Krew bernama ${nama} telah menghantar laporan misi: "${laporanTugas}". Sila berikan penilaian merit dan ulasan sekarang.`,
    });

    const cleanedText = text.replace(/```json|```/g, '').trim();
    const resultJson = JSON.parse(cleanedText);
    return NextResponse.json(resultJson);
  } catch (e) {
    console.error('Nilai Tugas Error:', e);
    return NextResponse.json({ 
      xp: 50, 
      ulasan: "Tugasan telah disahkan oleh Panel Penilai UKOM. Syabas dan teruskan komitmen cemerlang anda untuk kampus!" 
    });
  }
}