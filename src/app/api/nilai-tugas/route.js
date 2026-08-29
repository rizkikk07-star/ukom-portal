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

    // Arahkan Gemini untuk menilai tugas dan pulangkan markah
    const { text } = await generateText({
      model: google('gemini-3.6-flash'),
      system: `Anda adalah AI Juri Gamifikasi untuk UKOM IPGKTHO.
      Tugas anda adalah membaca laporan kerja dari krew dan memberikan mata ganjaran (XP) berdasarkan kesukaran:
      - Tugas mudah (Ambil gambar biasa, angkat barang): 10 - 30 XP
      - Tugas sederhana (Sunting gambar, setel PA sistem): 40 - 70 XP
      - Tugas berat (Sunting video montaj, urus live streaming): 80 - 150 XP
      
      Balas HANYA dalam format JSON yang sah seperti ini:
      {"xp": <jumlah_xp_angka>, "ulasan": "<mesej_pujian_dan_motivasi_dalam_BM>"}`,
      prompt: `Krew bernama ${nama} melaporkan tugas ini: "${laporanTugas}". Nilai sekarang.`,
    });

    // Tukar teks jawapan AI kepada objek JSON sebenar
    const cleanedText = text.replace(/```json|```/g, '').trim();
    const resultJson = JSON.parse(cleanedText);
    return NextResponse.json(resultJson);
  } catch (e) {
    console.error('Nilai Tugas AI Error:', e);
    return NextResponse.json({ 
      xp: 50, 
      ulasan: "Wah, kerja yang mantap dan komited! Teruskan usaha cemerlang anda bersama UKOM IPGKTHO." 
    });
  }
}