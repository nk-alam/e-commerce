'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  Download,
  MoreHorizontal,
  Users,
  Mail,
  Phone,
  MapPin,
  ShoppingBag
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface Customer {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  order_count?: number;
  total_spent?: number;
  last_order_date?: string;
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      // Get customers with order statistics
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        toast.error('Failed to load customers');
        return;
      }

      // Get order statistics for each customer
      const customersWithStats = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { data: orders } = await supabase
            .from('orders')
            .select('total_amount, created_at')
            .eq('user_id', profile.id)
            .eq('payment_status', 'paid');

          const orderCount = orders?.length || 0;
          const totalSpent = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
          const lastOrderDate = orders?.[0]?.created_at;

          return {
            ...profile,
            order_count: orderCount,
            total_spent: totalSpent,
            last_order_date: lastOrderDate
          };
        })
      );

      setCustomers(customersWithStats);
    } catch (error) {
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.full_name?.toLowerCase().includes(searchLower) ||
      customer.email?.toLowerCase().includes(searchLower) ||
      customer.phone?.includes(searchTerm)
    );
  });

  const getCustomerType = (orderCount: number, totalSpent: number) => {
    if (orderCount >= 10 || totalSpent >= 5000) return { label: 'VIP', color: 'bg-purple-100 text-purple-800' };
    if (orderCount >= 5 || totalSpent >= 2000) return { label: 'Regular', color: 'bg-blue-100 text-blue-800' };
    if (orderCount >= 1) return { label: 'Customer', color: 'bg-green-100 text-green-800' };
    return { label: 'New', color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your customer relationships
          </p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Customers
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Customers
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {customers.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Customers
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {customers.filter(c => (c.order_count || 0) > 0).length}
                </p>
              </div>
              <ShoppingBag className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  VIP Customers
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {customers.filter(c => {
                    const type = getCustomerType(c.order_count || 0, c.total_spent || 0);
                    return type.label === 'VIP';
                  }).length}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  New This Month
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {customers.filter(c => {
                    const createdDate = new Date(c.created_at);
                    const now = new Date();
                    return createdDate.getMonth() === now.getMonth() && 
                           createdDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customers table */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
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
              {filteredCustomers.map((customer) => {
                const customerType = getCustomerType(customer.order_count || 0, customer.total_spent || 0);
                
                return (
                  <div key={customer.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={customer.avatar_url || ''} />
                          <AvatarFallback>
                            {customer.full_name?.charAt(0) || customer.email?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-semibold">
                              {customer.full_name || 'Unnamed Customer'}
                            </p>
                            <Badge className={customerType.color}>
                              {customerType.label}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {customer.email && (
                              <div className="flex items-center space-x-1">
                                <Mail className="w-3 h-3" />
                                <span>{customer.email}</span>
                              </div>
                            )}
                            {customer.phone && (
                              <div className="flex items-center space-x-1">
                                <Phone className="w-3 h-3" />
                                <span>{customer.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold">₹{(customer.total_spent || 0).toLocaleString()}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {customer.order_count || 0} orders
                          </p>
                        </div>
                        
                        <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                          <p>Joined: {new Date(customer.created_at).toLocaleDateString()}</p>
                          {customer.last_order_date && (
                            <p>Last order: {new Date(customer.last_order_date).toLocaleDateString()}</p>
                          )}
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Users className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              View Orders
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredCustomers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No customers found</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}