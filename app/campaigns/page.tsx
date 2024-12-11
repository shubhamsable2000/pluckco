'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

interface User {
  email: string;
  // add other user properties as needed
}

export default function CampaignsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(localUser);

    if (!localUser) {
      router.push('/');
    }
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto py-16 px-4">
          <div className="flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
          Campaigns
        </h1>
        <div className="text-muted-foreground">
          <p>Email: {user?.email}</p>
          {/* Add campaign content here */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
