'use client';

import { useState } from 'react';
import { Bell, Shield, Globe, Mail, Phone, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/components/auth/auth-context';
import { toast } from 'sonner';

export default function AccountSettings() {
  const { user, signOut } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: true,
      push: false,
      marketing: false
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false
    },
    preferences: {
      language: 'en',
      currency: 'INR',
      spiceLevel: 'Medium'
    }
  });

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Handle account deletion
      toast.success('Account deletion request submitted');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account preferences and privacy settings
        </p>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive order updates and important information</p>
            </div>
            <Switch
              checked={settings.notifications.email}
              onCheckedChange={(checked) => 
                setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, email: checked }
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive order updates via text message</p>
            </div>
            <Switch
              checked={settings.notifications.sms}
              onCheckedChange={(checked) => 
                setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, sms: checked }
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
            </div>
            <Switch
              checked={settings.notifications.push}
              onCheckedChange={(checked) => 
                setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, push: checked }
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Marketing Communications</Label>
              <p className="text-sm text-muted-foreground">Receive promotional offers and newsletters</p>
            </div>
            <Switch
              checked={settings.notifications.marketing}
              onCheckedChange={(checked) => 
                setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, marketing: checked }
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Privacy</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Profile Visibility</Label>
              <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
            </div>
            <Switch
              checked={settings.privacy.profileVisible}
              onCheckedChange={(checked) => 
                setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, profileVisible: checked }
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Show Email Address</Label>
              <p className="text-sm text-muted-foreground">Display your email in public profile</p>
            </div>
            <Switch
              checked={settings.privacy.showEmail}
              onCheckedChange={(checked) => 
                setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, showEmail: checked }
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Show Phone Number</Label>
              <p className="text-sm text-muted-foreground">Display your phone number in public profile</p>
            </div>
            <Switch
              checked={settings.privacy.showPhone}
              onCheckedChange={(checked) => 
                setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, showPhone: checked }
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                value={settings.preferences.language}
                onValueChange={(value) => 
                  setSettings(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, language: value }
                  }))
                }
              >
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

            <div className="space-y-2">
              <Label>Currency</Label>
              <Select
                value={settings.preferences.currency}
                onValueChange={(value) => 
                  setSettings(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, currency: value }
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Preferred Spice Level</Label>
              <Select
                value={settings.preferences.spiceLevel}
                onValueChange={(value) => 
                  setSettings(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, spiceLevel: value }
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mild">Mild</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hot">Hot</SelectItem>
                  <SelectItem value="Extra Hot">Extra Hot</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Change Password</Label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button variant="outline">Update</Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Two-Factor Authentication</Label>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              <Button variant="outline" size="sm">Enable 2FA</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-between">
        <Button onClick={handleSaveSettings} className="bg-saffron hover:bg-saffron/90">
          Save Settings
        </Button>
      </div>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-red-600">Delete Account</Label>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}