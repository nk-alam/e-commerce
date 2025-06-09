'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Eye, Download, Truck, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/components/auth/auth-context';

// Mock orders data
const mockOrders = [
  {
    id: '1',
    orderNumber: 'SP-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 599,
    items: [
      { name: 'Premium Mango Pickle', quantity: 2, price: 299 },
      { name: 'Garlic Ginger Pickle', quantity: 1, price: 199 }
    ],
    shippingAddress: '123 MG Road, Mumbai, Maharashtra 400001',
    trackingNumber: 'TRK123456789'
  },
  {
    id: '2',
    orderNumber: 'SP-2024-002',
    date: '2024-01-20',
    status: 'shipped',
    total: 449,
    items: [
      { name: 'Mixed Vegetable Pickle', quantity: 1, price: 249 },
      { name: 'Lime & Chili Pickle', quantity: 1, price: 179 }
    ],
    shippingAddress: '123 MG Road, Mumbai, Maharashtra 400001',
    trackingNumber: 'TRK987654321'
  },
  {
    id: '3',
    orderNumber: 'SP-2024-003',
    date: '2024-01-25',
    status: 'processing',
    total: 299,
    items: [
      { name: 'Premium Mango Pickle', quantity: 1, price: 299 }
    ],
    shippingAddress: '123 MG Road, Mumbai, Maharashtra 400001'
  }
];

export default function AccountOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <Package className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track and manage your orders
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-saffron/10 rounded-lg flex items-center justify-center">
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{order.shippingAddress.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-lg font-bold">₹{order.total}</div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/account/orders/${order.id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Order Items */}
                <div>
                  <h4 className="font-medium mb-2">Items ({order.items.length})</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span>₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tracking */}
                {order.trackingNumber && (
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Tracking: {order.trackingNumber}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Invoice
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'You haven\'t placed any orders yet'}
              </p>
              <Button asChild className="bg-saffron hover:bg-saffron/90">
                <Link href="/products">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}