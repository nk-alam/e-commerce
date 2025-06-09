import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, receipt, notes } = body;

    // Validate required fields
    if (!amount || !currency || !receipt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real implementation, you would call Razorpay API here
    // For demo purposes, we'll create a mock order
    const orderId = `order_${crypto.randomBytes(16).toString('hex')}`;
    
    const order = {
      id: orderId,
      entity: 'order',
      amount: amount * 100, // Razorpay expects amount in paise
      amount_paid: 0,
      amount_due: amount * 100,
      currency,
      receipt,
      offer_id: null,
      status: 'created',
      attempts: 0,
      notes: notes || {},
      created_at: Math.floor(Date.now() / 1000),
    };

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating payment order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}