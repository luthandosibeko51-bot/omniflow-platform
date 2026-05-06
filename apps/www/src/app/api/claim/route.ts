import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { businessId } = await request.json();

    if (!businessId) {
      return NextResponse.json({ error: 'businessId is required' }, { status: 400 });
    }

    // 1. Update business status to CLAIMED
    const business = await prisma.business.update({
      where: { id: businessId },
      data: { status: 'CLAIMED' },
      include: { leads: true }
    });

    // 2. Log the event
    await prisma.campaignEvent.create({
      data: {
        businessId,
        eventType: 'website_claimed',
      }
    });

    // 3. (Optional) Trigger an internal notification for the admin
    console.log(`🎉 BUSINESS CLAIMED: ${business.name} has claimed their website!`);

    return NextResponse.json({ 
      success: true, 
      message: 'Website successfully claimed',
      businessName: business.name 
    });
  } catch (error: any) {
    console.error('[CLAIM] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
