'use client';
import { useState, useEffect } from 'react';
import { BookingStatsType } from '@/app/types/dashboard';
import DashboardStatsSkeleton from './DashboardStatsSkeleton';
import DashboardStatsContent from './DashboardStatsContent';

function useFetchStats(): BookingStatsType | null {
 const [stats, setStats] = useState<BookingStatsType | null>(null);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
   const fetchStats = async () => {
     try {
       const response = await fetch('/api/dashboard-stats');
       const data = await response.json();
       setStats(data);
     } catch (error) {
       console.error('Error fetching stats:', error);
     } finally {
       setIsLoading(false);
     }
   };

   fetchStats();
 }, []);

 return isLoading ? null : stats;
}

const DashboardStats: React.FC = () => {
 const stats = useFetchStats();

 if (stats === null) return <DashboardStatsSkeleton />;
 return <DashboardStatsContent stats={stats} />;
};

export default DashboardStats;