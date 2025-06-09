'use client';

import { useState } from 'react';
import { MapPin, Truck, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PincodeCheckerProps {
  productId: string;
}

export function PincodeChecker({ productId }: PincodeCheckerProps) {
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<any>(null);
  const [error, setError] = useState('');

  const checkDelivery = async () => {
    if (!pincode || pincode.length !== 6) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call to check delivery
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock delivery data based on pincode
      const mockDeliveryData = {
        available: true,
        estimatedDays: Math.floor(Math.random() * 5) + 2, // 2-7 days
        shippingCost: pincode.startsWith('4') ? 0 : 99, // Free for Mumbai (400xxx)
        expressAvailable: pincode.startsWith('4') || pincode.startsWith('1'), // Mumbai, Delhi
        codAvailable: true,
        serviceName: 'Standard Delivery'
      };

      // Some pincodes might not be serviceable
      if (pincode.startsWith('9')) {
        mockDeliveryData.available = false;
      }

      setDeliveryInfo(mockDeliveryData);
    } catch (error) {
      setError('Failed to check delivery. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDeliveryDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="border-2 border-dashed border-gray-200 hover:border-saffron transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <MapPin className="w-4 h-4 text-saffron" />
          <span className="font-medium">Check Delivery</span>
        </div>

        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Enter pincode"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, '').slice(0, 6));
              setError('');
              setDeliveryInfo(null);
            }}
            maxLength={6}
            className="flex-1"
          />
          <Button 
            onClick={checkDelivery}
            disabled={loading || pincode.length !== 6}
            className="bg-saffron hover:bg-saffron/90"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Check'
            )}
          </Button>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {deliveryInfo && (
          <div className="space-y-3">
            {deliveryInfo.available ? (
              <>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Delivery Available</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-medium">{deliveryInfo.estimatedDays} days</div>
                      <div className="text-muted-foreground">by {getDeliveryDate(deliveryInfo.estimatedDays)}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="font-medium">
                        {deliveryInfo.shippingCost === 0 ? 'Free' : `₹${deliveryInfo.shippingCost}`}
                      </div>
                      <div className="text-muted-foreground">Shipping</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {deliveryInfo.expressAvailable && (
                    <Badge variant="outline" className="text-xs border-blue-500 text-blue-600">
                      Express Available
                    </Badge>
                  )}
                  {deliveryInfo.codAvailable && (
                    <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                      Cash on Delivery
                    </Badge>
                  )}
                  {deliveryInfo.shippingCost === 0 && (
                    <Badge variant="outline" className="text-xs border-saffron text-saffron">
                      Free Shipping
                    </Badge>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <div>
                  <div className="font-medium">Not Serviceable</div>
                  <div className="text-sm text-muted-foreground">
                    We don't deliver to this pincode yet
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-3 text-xs text-muted-foreground">
          * Delivery times may vary based on product availability and location
        </div>
      </CardContent>
    </Card>
  );
}