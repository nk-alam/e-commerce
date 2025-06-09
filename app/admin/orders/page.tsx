'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Eye, 
  Search, 
  Filter, 
  Download,
  MoreHorizontal,
  Package,
  Truck,
  CheckCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { adminFunctions } from '@/lib/supabase-admin';
import { toast } from 'sonner';

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
    phone: string;
  };
  order_items?: Array<{
    product_name: string;
    quantity: number;
    unit_price: number;
  }>;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    loadOrders();
  }, [currentPage, statusFilter]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const { data, error, count } = await adminFunctions.getAllOrders(currentPage, itemsPerPage);
      
      if (error) {
        toast.error('Failed to load orders');
        return;
      }

      let filteredData = data || [];
      
      if (statusFilter !== 'all') {
        filteredData = filteredData.filter(order => order.status === statusFilter);
      }

      if (searchTerm) {
        filteredData = filteredData.filter(order => 
          order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setOrders(filteredData);
      setTotalCount(count || 0);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await adminFunctions.updateOrderStatus(orderId, newStatus);
      
      if (error) {
        toast.error('Failed to update order status');
        return;
      }

      toast.success('Order status updated successfully');
      loadOrders();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Orders</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track all customer orders
          </p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search orders, customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={loadOrders}>
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders ({totalCount})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-saffron/10 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-saffron" />
                      </div>
                      <div>
                        <p className="font-semibold">{order.order_number}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.profiles?.full_name || 'Guest Customer'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold">₹{order.total_amount}</p>
                        <div className="flex space-x-2 mt-1">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <Badge className={getPaymentStatusColor(order.payment_status)}>
                            {order.payment_status}
                          </Badge>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {order.status === 'confirmed' && (
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'processing')}>
                              <Package className="w-4 h-4 mr-2" />
                              Mark as Processing
                            </DropdownMenuItem>
                          )}
                          {order.status === 'processing' && (
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'shipped')}>
                              <Truck className="w-4 h-4 mr-2" />
                              Mark as Shipped
                            </DropdownMenuItem>
                          )}
                          {order.status === 'shipped' && (
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'delivered')}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark as Delivered
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Order items preview */}
                  {order.order_items && order.order_items.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex flex-wrap gap-2">
                        {order.order_items.slice(0, 3).map((item, index) => (
                          <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {item.quantity}x {item.product_name}
                          </span>
                        ))}
                        {order.order_items.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{order.order_items.length - 3} more items
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {orders.length === 0 && (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No orders found</p>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-saffron hover:bg-saffron/90" : ""}
                  >
                    {page}
                  </Button>
                );
              })}
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}