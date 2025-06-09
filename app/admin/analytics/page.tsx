'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package 
} from 'lucide-react';
import { adminFunctions } from '@/lib/supabase-admin';

const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444'];

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('30');
  const [salesData, setSalesData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    conversionRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      const [salesResult, dashboardStats] = await Promise.all([
        adminFunctions.getSalesAnalytics(parseInt(timeRange)),
        adminFunctions.getDashboardStats()
      ]);

      // Process sales data for charts
      if (salesResult.data) {
        const processedData = processSalesData(salesResult.data);
        setSalesData(processedData);
      }

      // Calculate additional stats
      const averageOrderValue = dashboardStats.totalOrders > 0 
        ? dashboardStats.totalRevenue / dashboardStats.totalOrders 
        : 0;

      setStats({
        totalRevenue: dashboardStats.totalRevenue,
        totalOrders: dashboardStats.totalOrders,
        averageOrderValue,
        conversionRate: 3.2 // Mock data - would calculate from actual visitor data
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const processSalesData = (rawData: any[]) => {
    const dailyData: { [key: string]: { date: string; revenue: number; orders: number } } = {};

    rawData.forEach(order => {
      const date = new Date(order.created_at).toISOString().split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = { date, revenue: 0, orders: 0 };
      }
      dailyData[date].revenue += order.total_amount;
      dailyData[date].orders += 1;
    });

    return Object.values(dailyData).sort((a, b) => a.date.localeCompare(b.date));
  };

  // Mock data for category breakdown
  const categoryData = [
    { name: 'Mango Pickles', value: 35, color: COLORS[0] },
    { name: 'Vegetable Pickles', value: 25, color: COLORS[1] },
    { name: 'Health Pickles', value: 20, color: COLORS[2] },
    { name: 'Citrus Pickles', value: 15, color: COLORS[3] },
    { name: 'Seasonal', value: 5, color: COLORS[4] }
  ];

  // Mock data for top products
  const topProducts = [
    { name: 'Premium Mango Pickle', sales: 156, revenue: 46644 },
    { name: 'Mixed Vegetable Pickle', sales: 134, revenue: 33366 },
    { name: 'Garlic Ginger Pickle', sales: 89, revenue: 17711 },
    { name: 'Lime & Chili Pickle', sales: 76, revenue: 13604 },
    { name: 'Traditional Cauliflower', sales: 67, revenue: 15343 }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your business performance and insights
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  ₹{stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+12.5%</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalOrders}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+8.2%</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Avg Order Value
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  ₹{stats.averageOrderValue.toFixed(0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-500">-2.1%</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Conversion Rate
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.conversionRate}%
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+0.5%</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Orders Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-saffron/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-saffron">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}