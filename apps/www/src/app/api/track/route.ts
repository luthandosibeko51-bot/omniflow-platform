import { NextRequest, NextResponse } from 'next/server';

// In production, this will use the @omniflow/database Prisma client.
// For now, we log the event and return a success response.

interface TrackEvent {
  businessId: string;
  eventType: 'demo_link_clicked' | 'demo_scrolled' | 'claim_button_hovered' | 'form_submitted' | 'demo_viewed';
  metadata?: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    const body: TrackEvent = await request.json();

    if (!body.businessId || !body.eventType) {
      return NextResponse.json(
        { error: 'Missing required fields: businessId, eventType' },
        { status: 400 }
      );
    }

    // TODO: Replace with Prisma client in Phase 6
    // await prisma.campaignEvent.create({
    //   data: {
    //     businessId: body.businessId,
    //     eventType: body.eventType,
    //   },
    // });

    // TODO: If eventType is 'demo_viewed', update Business status
    // await prisma.business.update({
    //   where: { id: body.businessId },
    //   data: { status: 'DEMO_VIEWED' },
    // });

    console.log(`[TRACK] ${body.eventType} for business ${body.businessId}`);

    return NextResponse.json({ success: true, event: body.eventType });
  } catch (error) {
    console.error('[TRACK] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
