import { NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(req) {
  try {
    const { prompt, width = 1280, height = 720 } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt diperlukan' }, { status: 400 });
    }

    const enhancedPrompt = `${prompt}, high quality 8k photorealistic event stage background texture, no text, clean center stage, volumetric lighting, luxury award night theme`;
    const seed = Math.floor(Math.random() * 1000000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=${width}&height=${height}&seed=${seed}&nologo=true`;

    const imageRes = await fetch(imageUrl);
    if (!imageRes.ok) {
      throw new Error('Gagal memuat turun imej daripada enjin AI.');
    }

    const arrayBuffer = await imageRes.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = imageRes.headers.get('content-type') || 'image/jpeg';
    const dataUrl = `data:${mimeType};base64,${base64}`;

    return NextResponse.json({ dataUrl });
  } catch (error) {
    console.error('Jana Background AI Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}