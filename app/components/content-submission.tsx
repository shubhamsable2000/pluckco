'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

import { supabase } from '@/lib/supabase';

interface ContentSubmissionProps {
  campaignId: string;
}

export function ContentSubmission({ campaignId }: ContentSubmissionProps) {
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('submissions')
        .insert({ campaign_id: campaignId, link, description });

      if (error) throw error;

      toast({
        title: 'Content submitted',
        description: 'Your content has been submitted for approval.',
      });

      setLink('');
      setDescription('');
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
        <Label htmlFor="link">Content Link</Label>
        <Input
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Submit Content</Button>
    </form>
  );
}
