import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TrackEvent {
  businessId: string;
  eventType: 'demo_link_clicked' | 'demo_scrolled' | 'claim_button_hovered' | 'form_submitted' | 'demo_viewed';
  metadata?: any;
}

export async function POST(request: NextRequest) {
  try {
    const body: TrackEvent = await request.json();

    if (!body.businessId || !body.eventType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Handle Lead Capture (from Contact Form)
    if (body.eventType === 'form_submitted' && body.metadata) {
      const { firstName, lastName, email, phone, businessName, industry } = body.metadata;
      
      // Create a new business and lead
      const business = await prisma.business.create({
        data: {
          name: businessName,
          industry: industry,
          status: 'PENDING_OUTREACH',
          leads: {
            create: {
              firstName,
              lastName,
              email,
              phone,
            }
          },
          events: {
            create: {
              eventType: 'form_submitted'
            }
          }
        }
      });

      return NextResponse.json({ success: true, businessId: business.id });
    }

    // 2. Handle generic tracking
    await prisma.campaignEvent.create({
      data: {
        businessId: body.businessId === 'contact-form' ? undefined : body.businessId,
        eventType: body.eventType,
      },
    });

    // 3. Update status if demo viewed
    if (body.eventType === 'demo_viewed' && body.businessId !== 'contact-form') {
      await prisma.business.update({
        where: { id: body.businessId },
        data: { status: 'DEMO_VIEWED' },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[TRACK] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
