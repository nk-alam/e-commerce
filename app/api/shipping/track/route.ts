import { NextRequest, NextResponse } from 'next/server';
import { mockShippingService } from '@/lib/shipping-integration';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const awb = searchParams.get('awb');

    if (!awb) {
      return NextResponse.json(
        { error: 'AWB number is required' },
        { status: 400 }
      );
    }

    // Get tracking info from mock service
    const trackingInfo = await mockShippingService.trackShipment(awb);

    return NextResponse.json(trackingInfo);
  } catch (error) {
    console.error('Error tracking shipment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}