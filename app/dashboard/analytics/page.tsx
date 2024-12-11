'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    try {
      const userResponse = await fetch('/api/user');
      const user = await userResponse.json();
      if (!user) return;

      const campaignResponse = await fetch(
        `/api/campaigns?businessId=${user.id}`
      );
      const campaignCount = await campaignResponse.json();

      const submissionResponse = await fetch(
        `/api/submissions?businessId=${user.id}`
      );
      const submissionCount = await submissionResponse.json();

      const rewardsResponse = await fetch(`/api/rewards?businessId=${user.id}`);
      const rewards = await rewardsResponse.json();
      const totalRewards = rewards
        ? rewards.reduce(
            (sum: number, reward: { amount: number }) => sum + reward.amount,
            0
          )
        : 0;

      setAnalytics({
        totalCampaigns: campaignCount || 0,
        totalSubmissions: submissionCount || 0,
        totalRewards: totalRewards,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
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
