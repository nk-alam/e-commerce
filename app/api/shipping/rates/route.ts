import { NextRequest, NextResponse } from 'next/server';
import { mockShippingService } from '@/lib/shipping-integration';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pickup_pincode, delivery_pincode, weight, cod } = body;

    // Validate required fields
    if (!pickup_pincode || !delivery_pincode || !weight) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get shipping rates from mock service
    const rates = await mockShippingService.getShippingRates(
      pickup_pincode,
      delivery_pincode,
      weight,
      cod || false
    );

    return NextResponse.json({ rates });
  } catch (error) {
    console.error('Error getting shipping rates:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}