'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Save, 
  Upload, 
  Globe, 
  Mail, 
  CreditCard, 
  Truck, 
  Shield,
  Bell,
  Users,
  Store
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Settings saved successfully');
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your store configuration and preferences
          </p>
        </div>
        <Button onClick={handleSave} disabled={loading} className="bg-saffron hover:bg-saffron/90">
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Store className="w-5 h-5" />
                  <span>Store Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input id="storeName" defaultValue="Shahi Pickle" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeDescription">Description</Label>
                  <Textarea 
                    id="storeDescription" 
                    defaultValue="Premium organic pickles from Malda, West Bengal"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Contact Email</Label>
                  <Input id="storeEmail" type="email" defaultValue="hello@shahipickle.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Phone Number</Label>
                  <Input id="storePhone" defaultValue="+91 98765 43210" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Regional Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="INR">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="GBP">British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="Asia/Kolkata">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="bn">Bengali</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoTranslate">Auto-translate content</Label>
                  <Switch id="autoTranslate" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payments">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Gateways</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Razorpay</h3>
                        <p className="text-sm text-gray-600">Accept cards, UPI, net banking</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="razorpayKey">API Key</Label>
                      <Input id="razorpayKey" placeholder="rzp_test_..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="razorpaySecret">API Secret</Label>
                      <Input id="razorpaySecret" type="password" placeholder="••••••••" />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">COD</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Cash on Delivery</h3>
                        <p className="text-sm text-gray-600">Accept cash payments on delivery</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="codLimit">Maximum COD Amount</Label>
                    <Input id="codLimit" type="number" defaultValue="5000" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gstRate">GST Rate (%)</Label>
                  <Input id="gstRate" type="number" defaultValue="18" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input id="gstNumber" placeholder="Enter GST number" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="includeTax">Include tax in product prices</Label>
                  <Switch id="includeTax" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Shipping Settings */}
        <TabsContent value="shipping">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5" />
                  <span>Shipping Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="freeShippingThreshold">Free Shipping Threshold</Label>
                  <Input id="freeShippingThreshold" type="number" defaultValue="999" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="standardShipping">Standard Shipping Rate</Label>
                  <Input id="standardShipping" type="number" defaultValue="99" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expressShipping">Express Shipping Rate</Label>
                  <Input id="expressShipping" type="number" defaultValue="199" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="processingTime">Processing Time (days)</Label>
                  <Input id="processingTime" type="number" defaultValue="2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ShipRocket Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shiprocketEmail">ShipRocket Email</Label>
                  <Input id="shiprocketEmail" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shiprocketPassword">ShipRocket Password</Label>
                  <Input id="shiprocketPassword" type="password" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoShipping">Auto-create shipping labels</Label>
                  <Switch id="autoShipping" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Email Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>New Order Notifications</Label>
                    <p className="text-sm text-gray-600">Get notified when new orders are placed</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Low Stock Alerts</Label>
                    <p className="text-sm text-gray-600">Get notified when products are low in stock</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Customer Reviews</Label>
                    <p className="text-sm text-gray-600">Get notified when customers leave reviews</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-gray-600">Receive weekly sales and analytics reports</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Email Templates</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orderConfirmation">Order Confirmation Template</Label>
                  <Textarea 
                    id="orderConfirmation" 
                    placeholder="Customize your order confirmation email..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shippingNotification">Shipping Notification Template</Label>
                  <Textarea 
                    id="shippingNotification" 
                    placeholder="Customize your shipping notification email..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Admin Users</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Current Admin Users</h3>
                  <Button className="bg-saffron hover:bg-saffron/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Admin
                  </Button>
                </div>
                
                <div className="border rounded-lg divide-y">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-saffron/10 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-saffron">A</span>
                      </div>
                      <div>
                        <p className="font-semibold">Admin User</p>
                        <p className="text-sm text-gray-600">admin@shahipickle.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>Super Admin</Badge>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Security Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Add an extra layer of security to admin accounts</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-gray-600">Automatically log out inactive admin users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="60" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backup & Recovery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Automatic Backups</Label>
                    <p className="text-sm text-gray-600">Automatically backup your data daily</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupRetention">Backup Retention (days)</Label>
                  <Input id="backupRetention" type="number" defaultValue="30" />
                </div>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Create Manual Backup
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}