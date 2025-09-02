'use client';

import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import ShoppingCart from '@/components/cart/ShoppingCart';
import { useAuth } from '@/contexts/AuthContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayoutContent({ children }: AppLayoutProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header user={user} />
      <Navigation />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
      <ShoppingCart />
    </div>
  );
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <AppLayoutContent>
          {children}
        </AppLayoutContent>
      </CartProvider>
    </AuthProvider>
  );
}