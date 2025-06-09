'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Home, Briefcase, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/components/auth/auth-context';
import { toast } from 'sonner';

export default function AccountAddresses() {
  const { user, addAddress, updateAddress, deleteAddress } = useAuth();
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: 'home' as 'home' | 'work' | 'other',
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    isDefault: false
  });

  const resetForm = () => {
    setFormData({
      type: 'home',
      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      isDefault: false
    });
  };

  const handleSave = async () => {
    try {
      if (editingAddress) {
        await updateAddress(editingAddress, formData);
        setEditingAddress(null);
      } else {
        await addAddress(formData);
        setIsAddingAddress(false);
      }
      resetForm();
    } catch (error) {
      toast.error('Failed to save address');
    }
  };

  const handleEdit = (address: any) => {
    setFormData({
      type: address.type,
      name: address.name,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || '',
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      isDefault: address.isDefault
    });
    setEditingAddress(address.id);
  };

  const handleDelete = async (addressId: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteAddress(addressId);
      } catch (error) {
        toast.error('Failed to delete address');
      }
    }
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home': return <Home className="w-4 h-4" />;
      case 'work': return <Briefcase className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Addresses</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your shipping addresses
          </p>
        </div>
        <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
          <DialogTrigger asChild>
            <Button className="bg-saffron hover:bg-saffron/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <AddressForm
              formData={formData}
              setFormData={setFormData}
              onSave={handleSave}
              onCancel={() => {
                setIsAddingAddress(false);
                resetForm();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Addresses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user?.addresses?.map((address) => (
          <Card key={address.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getAddressIcon(address.type)}
                  <CardTitle className="text-lg capitalize">{address.type}</CardTitle>
                  {address.isDefault && (
                    <Badge variant="secondary">Default</Badge>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(address)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(address.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="font-medium">{address.name}</div>
                <div className="text-sm text-muted-foreground">
                  {address.addressLine1}<br />
                  {address.addressLine2 && <>{address.addressLine2}<br /></>}
                  {address.city}, {address.state} {address.postalCode}<br />
                  {address.country}
                </div>
                <div className="text-sm text-muted-foreground">
                  Phone: {address.phone}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {(!user?.addresses || user.addresses.length === 0) && (
          <Card className="col-span-full">
            <CardContent className="p-12 text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No addresses found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Add your first shipping address to get started
              </p>
              <Button 
                onClick={() => setIsAddingAddress(true)}
                className="bg-saffron hover:bg-saffron/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Address
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Address Dialog */}
      <Dialog open={!!editingAddress} onOpenChange={() => setEditingAddress(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
          </DialogHeader>
          <AddressForm
            formData={formData}
            setFormData={setFormData}
            onSave={handleSave}
            onCancel={() => {
              setEditingAddress(null);
              resetForm();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AddressForm({ formData, setFormData, onSave, onCancel }: any) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Address Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home">Home</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressLine1">Address Line 1</Label>
          <Input
            id="addressLine1"
            value={formData.addressLine1}
            onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
          <Input
            id="addressLine2"
            value={formData.addressLine2}
            onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="India">India</SelectItem>
              <SelectItem value="USA">United States</SelectItem>
              <SelectItem value="UK">United Kingdom</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isDefault"
          checked={formData.isDefault}
          onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
        />
        <Label htmlFor="isDefault">Set as default address</Label>
      </div>

      <div className="flex space-x-4 pt-4">
        <Button onClick={onSave} className="flex-1 bg-saffron hover:bg-saffron/90">
          Save Address
        </Button>
        <Button onClick={onCancel} variant="outline" className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
}