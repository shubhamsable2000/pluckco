'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface RewardInfluencerProps {
  submissionId: string;
  influencerId: string;
}

export function RewardInfluencer({ submissionId }: RewardInfluencerProps) {
  const [amount, setAmount] = useState('');
  const { toast } = useToast();

  const handleReward = async () => {
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount) * 100, // Assuming you still need to handle the amount in cents for backend processing
          submissionId,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment session creation failed');
      }

      // Handle the successful reward logic here, e.g., updating the UI or confirming the payment
      toast({
        title: 'Success',
        description: 'Reward has been successfully processed!',
        variant: 'default',
      });
    } catch {
      // Typecast error to `any` or `Error`
      toast({
        title: 'Error',
        // Now TypeScript knows `error` has a `message`
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="amount">Reward Amount ($)</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <Button onClick={handleReward}>Send Reward</Button>
    </div>
  );
}
