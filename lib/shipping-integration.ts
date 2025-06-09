// ShipRocket Integration
export interface ShipRocketConfig {
  email: string;
  password: string;
  baseUrl: string;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  address_2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface ShippingOrder {
  order_id: string;
  order_date: string;
  pickup_location: string;
  billing_customer_name: string;
  billing_last_name: string;
  billing_address: string;
  billing_address_2?: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  billing_email: string;
  billing_phone: string;
  shipping_is_billing: boolean;
  shipping_customer_name?: string;
  shipping_last_name?: string;
  shipping_address?: string;
  shipping_address_2?: string;
  shipping_city?: string;
  shipping_pincode?: string;
  shipping_state?: string;
  shipping_country?: string;
  shipping_email?: string;
  shipping_phone?: string;
  order_items: ShippingOrderItem[];
  payment_method: string;
  shipping_charges: number;
  giftwrap_charges: number;
  transaction_charges: number;
  total_discount: number;
  sub_total: number;
  length: number;
  breadth: number;
  height: number;
  weight: number;
}

export interface ShippingOrderItem {
  name: string;
  sku: string;
  units: number;
  selling_price: number;
  discount?: number;
  tax?: number;
  hsn?: number;
}

export interface ShippingRate {
  courier_company_id: number;
  courier_name: string;
  freight_charge: number;
  cod_charge: number;
  other_charges: number;
  total_charge: number;
  etd: string;
}

export interface TrackingInfo {
  tracking_data: {
    track_status: number;
    shipment_status: string;
    shipment_track: Array<{
      date: string;
      status: string;
      activity: string;
      location: string;
    }>;
  };
}

export class ShipRocketService {
  private config: ShipRocketConfig;
  private token: string | null = null;

  constructor(config: ShipRocketConfig) {
    this.config = config;
  }

  async authenticate(): Promise<string> {
    try {
      const response = await fetch(`${this.config.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.config.email,
          password: this.config.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      this.token = data.token;
      return this.token;
    } catch (error) {
      console.error('ShipRocket authentication error:', error);
      throw error;
    }
  }

  async getShippingRates(
    pickup_pincode: string,
    delivery_pincode: string,
    weight: number,
    cod: boolean = false
  ): Promise<ShippingRate[]> {
    if (!this.token) {
      await this.authenticate();
    }

    try {
      const response = await fetch(
        `${this.config.baseUrl}/courier/serviceability/?pickup_postcode=${pickup_pincode}&delivery_postcode=${delivery_pincode}&weight=${weight}&cod=${cod ? 1 : 0}`,
        {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get shipping rates');
      }

      const data = await response.json();
      return data.data.available_courier_companies || [];
    } catch (error) {
      console.error('Error getting shipping rates:', error);
      throw error;
    }
  }

  async createOrder(orderData: ShippingOrder): Promise<any> {
    if (!this.token) {
      await this.authenticate();
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/orders/create/adhoc`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create shipping order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating shipping order:', error);
      throw error;
    }
  }

  async generateAWB(shipment_id: number, courier_id: number): Promise<any> {
    if (!this.token) {
      await this.authenticate();
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/courier/assign/awb`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shipment_id,
          courier_id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate AWB');
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating AWB:', error);
      throw error;
    }
  }

  async trackShipment(awb: string): Promise<TrackingInfo> {
    if (!this.token) {
      await this.authenticate();
    }

    try {
      const response = await fetch(
        `${this.config.baseUrl}/courier/track/awb/${awb}`,
        {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to track shipment');
      }

      return await response.json();
    } catch (error) {
      console.error('Error tracking shipment:', error);
      throw error;
    }
  }

  async cancelOrder(order_id: string): Promise<any> {
    if (!this.token) {
      await this.authenticate();
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/orders/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: [order_id],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error canceling order:', error);
      throw error;
    }
  }
}

// Mock shipping service for demo
export const mockShippingService = {
  async getShippingRates(
    pickup_pincode: string,
    delivery_pincode: string,
    weight: number,
    cod: boolean = false
  ): Promise<ShippingRate[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const baseRate = weight * 50;
    const distance = Math.abs(parseInt(pickup_pincode.slice(0, 3)) - parseInt(delivery_pincode.slice(0, 3)));
    const distanceMultiplier = 1 + (distance / 100);

    return [
      {
        courier_company_id: 1,
        courier_name: 'Delhivery',
        freight_charge: Math.round(baseRate * distanceMultiplier),
        cod_charge: cod ? 25 : 0,
        other_charges: 10,
        total_charge: Math.round(baseRate * distanceMultiplier) + (cod ? 25 : 0) + 10,
        etd: '3-5 days',
      },
      {
        courier_company_id: 2,
        courier_name: 'Blue Dart',
        freight_charge: Math.round(baseRate * distanceMultiplier * 1.2),
        cod_charge: cod ? 30 : 0,
        other_charges: 15,
        total_charge: Math.round(baseRate * distanceMultiplier * 1.2) + (cod ? 30 : 0) + 15,
        etd: '2-3 days',
      },
      {
        courier_company_id: 3,
        courier_name: 'DTDC',
        freight_charge: Math.round(baseRate * distanceMultiplier * 0.9),
        cod_charge: cod ? 20 : 0,
        other_charges: 8,
        total_charge: Math.round(baseRate * distanceMultiplier * 0.9) + (cod ? 20 : 0) + 8,
        etd: '4-6 days',
      },
    ];
  },

  async trackShipment(awb: string): Promise<TrackingInfo> {
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      tracking_data: {
        track_status: 1,
        shipment_status: 'In Transit',
        shipment_track: [
          {
            date: '2024-01-15 10:30:00',
            status: 'Picked Up',
            activity: 'Package picked up from seller',
            location: 'Malda, West Bengal',
          },
          {
            date: '2024-01-15 18:45:00',
            status: 'In Transit',
            activity: 'Package in transit to destination city',
            location: 'Kolkata Hub',
          },
          {
            date: '2024-01-16 09:15:00',
            status: 'Out for Delivery',
            activity: 'Package out for delivery',
            location: 'Mumbai, Maharashtra',
          },
        ],
      },
    };
  },
};

// Shipping utilities
export const calculateShippingCost = (
  weight: number,
  distance: number,
  express: boolean = false
): number => {
  const baseRate = 50;
  const weightMultiplier = Math.ceil(weight / 0.5); // Round up to nearest 0.5kg
  const distanceMultiplier = 1 + (distance / 1000);
  const expressMultiplier = express ? 1.5 : 1;

  return Math.round(baseRate * weightMultiplier * distanceMultiplier * expressMultiplier);
};

export const getEstimatedDeliveryDate = (
  pickup_pincode: string,
  delivery_pincode: string,
  express: boolean = false
): Date => {
  const distance = Math.abs(
    parseInt(pickup_pincode.slice(0, 3)) - parseInt(delivery_pincode.slice(0, 3))
  );
  
  let days = 3; // Base delivery time
  
  if (distance > 500) days += 2;
  if (distance > 1000) days += 1;
  if (express) days = Math.max(1, days - 2);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + days);
  
  return deliveryDate;
};