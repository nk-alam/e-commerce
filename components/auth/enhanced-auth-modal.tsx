'use client';

import { useState } from 'react';
import { Phone, Mail, ArrowRight, Loader2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from './auth-context';

interface EnhancedAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

export function EnhancedAuthModal({ isOpen, onClose, defaultTab = 'signin' }: EnhancedAuthModalProps) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [isSignup, setIsSignup] = useState(defaultTab === 'signup');
  const { signIn, verifyOTP, loading } = useAuth();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    
    await signIn(phone);
    setStep('otp');
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    
    if (isSignup) {
      setStep('profile');
    } else {
      await verifyOTP(otp);
      onClose();
      resetForm();
    }
  };

  const handleCompleteSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyOTP(otp);
    // In a real app, you'd also save the additional profile info
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setPhone('');
    setOtp('');
    setName('');
    setEmail('');
    setStep('phone');
    setIsSignup(false);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {step === 'phone' && (isSignup ? 'Create Account' : 'Welcome Back')}
            {step === 'otp' && 'Verify Your Phone'}
            {step === 'profile' && 'Complete Your Profile'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {step === 'phone' && (
            <Tabs value={isSignup ? 'signup' : 'signin'} onValueChange={(value) => setIsSignup(value === 'signup')} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4">
                <div className="text-center text-sm text-muted-foreground">
                  Enter your phone number to sign in to your account
                </div>
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-saffron hover:bg-saffron/90" disabled={loading}>
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <ArrowRight className="h-4 w-4 mr-2" />
                    )}
                    Send OTP
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <div className="text-center text-sm text-muted-foreground">
                  Create a new account to start shopping
                </div>
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-saffron hover:bg-saffron/90" disabled={loading}>
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <ArrowRight className="h-4 w-4 mr-2" />
                    )}
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                We've sent a 6-digit code to {phone}
              </div>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                  required
                />
              </div>
              <div className="text-center text-xs text-muted-foreground">
                For demo, use OTP: <strong>123456</strong>
              </div>
              <Button type="submit" className="w-full bg-saffron hover:bg-saffron/90" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Verify & Continue
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full" 
                onClick={() => setStep('phone')}
              >
                Change Phone Number
              </Button>
            </form>
          )}

          {step === 'profile' && (
            <form onSubmit={handleCompleteSignup} className="space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                Complete your profile to get started
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address (Optional)</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-saffron hover:bg-saffron/90" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Complete Registration
              </Button>
            </form>
          )}

          <div className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}