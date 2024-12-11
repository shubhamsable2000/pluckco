'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserRole(user.role || null);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <nav className="bg-gradient-to-b from-[#1f1d24] to-[#2e1f5b]  shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white bg-clip-text">
          Pluck
        </Link>
        <div className="space-x-4 flex items-center">
          {userRole === 'influencer' && (
            <Link href="/explore" passHref>
              <Button variant={pathname === '/explore' ? 'default' : 'ghost'}>
                Explore
              </Button>
            </Link>
          )}
          {userRole === 'influencer' && (
            <Link href="/my-bookings" passHref>
              <Button
                variant={pathname === '/my-bookings' ? 'default' : 'ghost'}
              >
                My Bookings
              </Button>
            </Link>
          )}
          <Link href="/profile" passHref>
            <Button variant={pathname === '/profile' ? 'default' : 'ghost'}>
              Profile
            </Button>
          </Link>
          {/* Notifications component placeholder */}
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
