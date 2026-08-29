import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const formattedMessages = (messages || []).map(m => ({
      role: m.role || (m.isBot ? 'assistant' : 'user'),
      content: m.content || m.text || ''
    }));

    const result = await streamText({
      model: google('gemini-3.6-flash'),
      system: `Anda adalah Pembantu Maya Pintar untuk Unit Komunikasi dan Media (UKOM) di Institut Pendidikan Guru Kampus Tun Hussein Onn (IPGKTHO). 
      Gunakan Bahasa Melayu yang mesra, profesional, dan sedikit santai (boleh guna emoji). 
      Panduan Utama Anda:
      1. Jika ditanya cara tempah liputan media / fotografi / videografi / PA sistem, arahkan pengguna untuk klik butang 'Tempah Liputan Media' di halaman utama atau layari pautan /tempahan.
      2. Jika pengguna mahu muat turun logo rasmi, templat, atau brand kit, arahkan mereka ke pautan /brand-kit.
      3. Jika pengguna mahu semak status tempahan, minta mereka gunakan Tracking ID di pautan /semak.
      4. UKOM diuruskan oleh siswa guru IPGKTHO. Jawab soalan lain berkaitan aktiviti dan media kampus dengan sopan dan tepat.`,
      messages: formattedMessages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('API Chat Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}