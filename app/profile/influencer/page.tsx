'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';

export default function InfluencerProfile() {
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    instagram: '',
    facebook: '',
  });
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/signin');
      return;
    }

    // In a real app, you would fetch the profile from an API
    const mockProfile = {
      name: 'John Doe',
      bio: 'Food enthusiast and social media influencer',
      instagram: '@johndoe',
      facebook: 'johndoe',
    };
    setProfile(mockProfile);
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Updated profile:', profile);

    toast({
      title: 'Profile updated',
      description: 'Your profile has been successfully updated.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-16 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Influencer Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                  className="bg-muted border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="bio" className="text-foreground">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  required
                  className="bg-muted border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="instagram" className="text-foreground">
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  name="instagram"
                  value={profile.instagram}
                  onChange={handleChange}
                  className="bg-muted border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="facebook" className="text-foreground">
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  name="facebook"
                  value={profile.facebook}
                  onChange={handleChange}
                  className="bg-muted border-border text-foreground"
                />
              </div>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
