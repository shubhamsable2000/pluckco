'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AuthFormProps {
  type: 'signup' | 'signin';
  role: 'influencer' | 'business';
}

export function AuthForm({ type, role }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Mock authentication
      if (email && password) {
        // In a real app, you would validate credentials here
        localStorage.setItem('user', JSON.stringify({ email, role }));

        toast({
          title:
            type === 'signup' ? 'Account created' : 'Signed in successfully',
          description:
            type === 'signup' ? 'Welcome to Pluck!' : 'Welcome back!',
        });

        if (role === 'influencer') {
          router.push('/explore');
        } else {
          router.push('/dashboard');
        }
      } else {
        throw new Error('Please enter both email and password');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email" className="text-black">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white border-border text-black"
        />
      </div>
      <div>
        <Label htmlFor="password" className="text-black">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-white border-border text-black"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-black hover:bg-black/90 text-white"
      >
        {type === 'signup' ? 'Sign Up' : 'Sign In'}
      </Button>
    </form>
  );
}
