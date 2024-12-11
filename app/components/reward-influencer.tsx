'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface RewardInfluencerProps {
  submissionId: string;
  influencerId: string;
}

export function RewardInfluencer({
  submissionId,
  influencerId,
}: RewardInfluencerProps) {
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
          amount: parseFloat(amount) * 100,
          submissionId,
        }),
      });

      const session = await response.json();

      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) throw error;
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
    // };

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
  };
}
