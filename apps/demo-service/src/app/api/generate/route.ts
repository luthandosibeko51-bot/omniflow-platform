import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const { businessId } = await req.json();

    if (!businessId) {
      return NextResponse.json({ error: 'businessId is required' }, { status: 400 });
    }

    // 1. Fetch business details
    const business = await prisma.business.findUnique({
      where: { id: businessId },
    });

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    // 2. Generate copy using AI
    const prompt = `Generate a professional website content for a business named "${business.name}" in the "${business.industry}" industry.
    Return ONLY a JSON object with the following structure:
    {
      "hero": {
        "title": "string",
        "subtitle": "string",
        "cta": "string"
      },
      "features": [
        { "title": "string", "description": "string" }
      ],
      "about": "string",
      "testimonials": [
        { "quote": "string", "author": "string" }
      ]
    }`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a professional web copywriter.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
    });

    const generatedJson = completion.choices[0].message.content;

    if (!generatedJson) {
        throw new Error("Failed to generate content");
    }

    // 3. Upsert DemoSite record
    const demoSite = await prisma.demoSite.upsert({
      where: { businessId },
      update: {
        generatedCopy: generatedJson,
        templateId: 'default-v1',
      },
      create: {
        businessId,
        generatedCopy: generatedJson,
        templateId: 'default-v1',
      },
    });

    return NextResponse.json({ success: true, demoSiteId: demoSite.id });
  } catch (error: any) {
    console.error('Generation Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
