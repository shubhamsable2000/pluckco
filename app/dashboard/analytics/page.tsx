'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState({
    totalCampaigns: 0,
    totalSubmissions: 0,
    totalRewards: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { count: campaignCount } = await supabase
      .from('campaigns')
      .select('*', { count: 'exact' })
      .eq('business_id', user.id);

    const { count: submissionCount } = await supabase
      .from('submissions')
      .select('*', { count: 'exact' })
      .eq('business_id', user.id);

    const { data: rewards } = await supabase
      .from('rewards')
      .select('amount')
      .eq('business_id', user.id);
    const totalRewards = rewards
      ? rewards.reduce((sum: number, reward: { amount: number }) => sum + reward.amount, 0)
      : 0;

    setAnalytics({
      totalCampaigns: campaignCount || 0,
      totalSubmissions: submissionCount || 0,
      totalRewards: totalRewards,
    });
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{analytics.totalCampaigns}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{analytics.totalSubmissions}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              ${analytics.totalRewards.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
