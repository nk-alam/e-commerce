'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  avatar?: string;
  addresses?: Address[];
  preferences?: {
    currency: string;
    spiceLevel: string;
    notifications: boolean;
  };
}

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (phone: string) => Promise<void>;
  signOut: () => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Enhanced mock user data with more complete profile
const mockUser: User = {
  id: 'user-1',
  email: 'priya.sharma@example.com',
  phone: '+91 98765 43210',
  name: 'Priya Sharma',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
  addresses: [
    {
      id: 'addr-1',
      type: 'home',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      addressLine1: '123 MG Road',
      addressLine2: 'Near City Mall',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001',
      country: 'India',
      isDefault: true
    },
    {
      id: 'addr-2',
      type: 'work',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      addressLine1: '456 Business Park',
      addressLine2: 'Tower A, 5th Floor',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400070',
      country: 'India',
      isDefault: false
    }
  ],
  preferences: {
    currency: 'INR',
    spiceLevel: 'Medium',
    notifications: true
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('shahi-pickle-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save user to localStorage whenever it changes
    if (user) {
      localStorage.setItem('shahi-pickle-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('shahi-pickle-user');
    }
  }, [user]);

  const signIn = async (phone: string) => {
    setLoading(true);
    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPendingPhone(phone);
      toast.success('OTP sent to your phone!');
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otp: string) => {
    setLoading(true);
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp === '123456') {
        // For demo, use mock user data
        setUser({ ...mockUser, phone: pendingPhone || mockUser.phone });
        setPendingPhone(null);
        toast.success('Welcome to Shahi Pickle!');
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    setPendingPhone(null);
    toast.success('Signed out successfully');
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser({ ...user, ...data });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (address: Omit<Address, 'id'>) => {
    if (!user) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newAddress = { ...address, id: `addr-${Date.now()}` };
      
      // If this is set as default, make others non-default
      let updatedAddresses = [...(user.addresses || [])];
      if (newAddress.isDefault) {
        updatedAddresses = updatedAddresses.map(addr => ({ ...addr, isDefault: false }));
      }
      
      updatedAddresses.push(newAddress);
      setUser({ ...user, addresses: updatedAddresses });
      toast.success('Address added successfully');
    } catch (error) {
      toast.error('Failed to add address');
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (id: string, addressData: Partial<Address>) => {
    if (!user) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      let updatedAddresses = user.addresses?.map(addr => 
        addr.id === id ? { ...addr, ...addressData } : addr
      ) || [];
      
      // If this address is being set as default, make others non-default
      if (addressData.isDefault) {
        updatedAddresses = updatedAddresses.map(addr => 
          addr.id === id ? addr : { ...addr, isDefault: false }
        );
      }
      
      setUser({ ...user, addresses: updatedAddresses });
      toast.success('Address updated successfully');
    } catch (error) {
      toast.error('Failed to update address');
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id: string) => {
    if (!user) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const updatedAddresses = user.addresses?.filter(addr => addr.id !== id) || [];
      setUser({ ...user, addresses: updatedAddresses });
      toast.success('Address deleted successfully');
    } catch (error) {
      toast.error('Failed to delete address');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signIn, 
      signOut, 
      verifyOTP, 
      updateProfile,
      addAddress,
      updateAddress,
      deleteAddress,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}