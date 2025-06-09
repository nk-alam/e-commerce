'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ShoppingCart, User, Search, Menu, Sun, Moon, Heart, LogOut, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useCart } from '@/components/cart/cart-context';
import { useAuth } from '@/components/auth/auth-context';
import { EnhancedAuthModal } from '@/components/auth/enhanced-auth-modal';

const navigation = [
  {
    name: 'Products',
    href: '/products',
    subItems: [
      { name: 'Mango Pickles', href: '/products?category=Mango+Pickles', description: 'Traditional aam ka achaar varieties' },
      { name: 'Vegetable Pickles', href: '/products?category=Vegetable+Pickles', description: 'Mixed and single vegetable pickles' },
      { name: 'Health Pickles', href: '/products?category=Health+Pickles', description: 'Immunity boosting combinations' },
      { name: 'Citrus Pickles', href: '/products?category=Citrus+Pickles', description: 'Tangy lime and lemon varieties' },
      { name: 'Custom Orders', href: '/products/custom', description: 'Build your own pickle recipe' },
    ]
  },
  { name: 'Our Story', href: '/story' },
  { name: 'Recipes', href: '/recipes' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { state: cartState, toggleCart } = useCart();
  const { user, signOut, isAuthenticated } = useAuth();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  const handleAuthAction = () => {
    if (isAuthenticated) {
      return;
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b transition-all duration-500',
          isScrolled
            ? 'glass-electric backdrop-blur-xl shadow-2xl border-electric-orange/20'
            : 'bg-white/95 backdrop-blur-sm border-gray-200/50'
        )}
      >
        {/* Enhanced Top promotional bar */}
        <div className="bg-gradient-electric text-white text-center py-3 text-sm font-medium relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4 animate-bounce" />
              <span>✨ Free shipping on orders above ₹999 | Fresh pickles made to order | 100% Organic ✨</span>
              <Sparkles className="w-4 h-4 animate-bounce" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="hover-glow-electric">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 glass-electric border-electric-orange/20">
                <div className="grid gap-6 py-6">
                  {navigation.map((item) => (
                    <div key={item.name} className="space-y-3">
                      <Link
                        href={item.href}
                        className="block text-xl font-semibold text-foreground hover:text-electric-orange transition-colors"
                      >
                        {item.name}
                      </Link>
                      {item.subItems && (
                        <div className="pl-4 space-y-2">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {/* Enhanced Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-electric rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-electric transition-all duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-xl font-display">S</span>
              </div>
              <div>
                <div className="font-display font-bold text-2xl bg-gradient-electric bg-clip-text text-transparent">
                  Shahi Pickle
                </div>
                <div className="text-xs text-muted-foreground -mt-1 font-medium">
                  Authentic • Organic • Handmade
                </div>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.subItems ? (
                      <>
                        <NavigationMenuTrigger className="text-lg font-semibold hover:text-electric-orange transition-colors">
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[600px] gap-4 p-6 glass-electric border border-electric-orange/20">
                            {item.subItems.map((subItem) => (
                              <NavigationMenuLink key={subItem.name} asChild>
                                <Link
                                  href={subItem.href}
                                  className="block select-none space-y-2 rounded-xl p-4 leading-none no-underline outline-none transition-colors hover:bg-electric-orange/10 hover:text-electric-orange focus:bg-electric-orange/10 focus:text-electric-orange"
                                >
                                  <div className="text-lg font-semibold leading-none">
                                    {subItem.name}
                                  </div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {subItem.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="group inline-flex h-12 w-max items-center justify-center rounded-xl bg-background px-6 py-3 text-lg font-semibold transition-colors hover:bg-electric-orange/10 hover:text-electric-orange focus:bg-electric-orange/10 focus:text-electric-orange focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      >
                        {item.name}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Enhanced Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search pickles, recipes..."
                  className="pl-12 h-12 glass-electric border-electric-orange/30 focus:border-electric-orange text-lg"
                  onFocus={() => setSearchOpen(true)}
                  onBlur={() => setSearchOpen(false)}
                />
              </div>
            </div>

            {/* Enhanced Actions */}
            <div className="flex items-center space-x-3">
              {/* Theme toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="hidden sm:flex h-12 w-12 hover-glow-electric"
              >
                {theme === 'light' ? (
                  <Moon className="h-6 w-6" />
                ) : (
                  <Sun className="h-6 w-6" />
                )}
              </Button>

              {/* Search (mobile) */}
              <Button variant="ghost" size="icon" className="md:hidden h-12 w-12 hover-glow-electric">
                <Search className="h-6 w-6" />
              </Button>

              {/* Enhanced Wishlist */}
              <Button variant="ghost" size="icon" className="relative h-12 w-12 hover-glow-purple" asChild>
                <Link href="/account/wishlist">
                  <Heart className="h-6 w-6" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 text-xs flex items-center justify-center bg-gradient-fire animate-pulse"
                  >
                    3
                  </Badge>
                </Link>
              </Button>

              {/* Enhanced Cart */}
              <Button variant="ghost" size="icon" className="relative h-12 w-12 hover-glow-electric" onClick={toggleCart}>
                <ShoppingCart className="h-6 w-6" />
                {cartState.itemCount > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 text-xs flex items-center justify-center bg-gradient-electric hover:bg-gradient-fire animate-glow"
                  >
                    {cartState.itemCount}
                  </Badge>
                )}
              </Button>

              {/* Enhanced User account */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-12 w-12 rounded-full hover-glow-cosmic">
                      <Avatar className="h-12 w-12 border-2 border-electric-orange/30">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-gradient-electric text-white font-bold">
                          {user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 glass-electric border-electric-orange/20" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-2">
                        <p className="text-lg font-semibold leading-none">{user?.name}</p>
                        <p className="text-sm leading-none text-muted-foreground">
                          {user?.email || user?.phone}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="text-base">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/orders" className="text-base">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/addresses" className="text-base">Addresses</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/wishlist" className="text-base">Wishlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/settings" className="text-base">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="text-base text-crimson-red">
                      <LogOut className="mr-3 h-5 w-5" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleAuthAction}
                  className="h-12 w-12 hover-glow-electric"
                >
                  <User className="h-6 w-6" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <EnhancedAuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </>
  );
}