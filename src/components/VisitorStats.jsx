import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from '@tanstack/react-query';

// Mock function to fetch visitor stats
const fetchVisitorStats = async () => {
  // This should be replaced with a real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalVisitors: 1000,
        uniqueVisitors: 750,
        averageTimeOnSite: '2m 30s',
        bounceRate: '35%'
      });
    }, 1000);
  });
};

const VisitorStats = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['visitorStats'],
    queryFn: fetchVisitorStats,
  });

  if (isLoading) return <div>Loading stats...</div>;
  if (error) return <div>Error loading stats</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitor Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Total Visitors</p>
            <p className="text-2xl font-bold">{stats.totalVisitors}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Unique Visitors</p>
            <p className="text-2xl font-bold">{stats.uniqueVisitors}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Avg. Time on Site</p>
            <p className="text-2xl font-bold">{stats.averageTimeOnSite}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Bounce Rate</p>
            <p className="text-2xl font-bold">{stats.bounceRate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorStats;