'use client';

import { useState } from 'react';
import { Plus, CreditCard, Trash2, Edit, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock payment methods
const mockPaymentMethods = [
  {
    id: '1',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true
  },
  {
    id: '2',
    type: 'card',
    last4: '5555',
    brand: 'Mastercard',
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false
  }
];

export default function AccountPaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    name: '',
    isDefault: false
  });

  const handleAddCard = () => {
    // In a real app, this would integrate with a payment processor
    const newCard = {
      id: Date.now().toString(),
      type: 'card',
      last4: formData.cardNumber.slice(-4),
      brand: 'Visa', // Would be detected from card number
      expiryMonth: parseInt(formData.expiryMonth),
      expiryYear: parseInt(formData.expiryYear),
      isDefault: formData.isDefault
    };

    setPaymentMethods(prev => [...prev, newCard]);
    setIsAddingCard(false);
    setFormData({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      name: '',
      isDefault: false
    });
  };

  const handleDeleteCard = (cardId: string) => {
    if (confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods(prev => prev.filter(card => card.id !== cardId));
    }
  };

  const getCardIcon = (brand: string) => {
    // In a real app, you'd use actual card brand icons
    return <CreditCard className="w-6 h-6" />;
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payment Methods</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your saved payment methods
          </p>
        </div>
        <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
          <DialogTrigger asChild>
            <Button className="bg-saffron hover:bg-saffron/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Card
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Card</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryMonth">Expiry Month</Label>
                  <Select value={formData.expiryMonth} onValueChange={(value) => setFormData({ ...formData, expiryMonth: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                          {(i + 1).toString().padStart(2, '0')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryYear">Expiry Year</Label>
                  <Select value={formData.expiryYear} onValueChange={(value) => setFormData({ ...formData, expiryYear: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem key={i} value={(new Date().getFullYear() + i).toString()}>
                          {new Date().getFullYear() + i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  maxLength={4}
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                />
                <Label htmlFor="isDefault">Set as default payment method</Label>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button onClick={handleAddCard} className="flex-1 bg-saffron hover:bg-saffron/90">
                  Add Card
                </Button>
                <Button onClick={() => setIsAddingCard(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Payment Methods List */}
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <Card key={method.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getCardIcon(method.brand)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{method.brand} •••• {method.last4}</span>
                      {method.isDefault && (
                        <Badge variant="secondary">Default</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                    </div>
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
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Set as Default
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeleteCard(method.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}

        {paymentMethods.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No payment methods</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Add a payment method to make checkout faster
              </p>
              <Button 
                onClick={() => setIsAddingCard(true)}
                className="bg-saffron hover:bg-saffron/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Card
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Security Notice */}
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">🔒</span>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Your payment information is secure
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-200">
                We use industry-standard encryption to protect your payment details. 
                Your card information is never stored on our servers and is processed 
                securely through our payment partners.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}