'use client';

import { ThemeProvider } from 'next-themes';
import { CartProvider } from '@/components/cart/cart-context';
import { AuthProvider } from '@/components/auth/auth-context';
import { CartSidebar } from '@/components/cart/cart-sidebar';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem 
      disableTransitionOnChange
    >
      <AuthProvider>
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}