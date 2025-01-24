'use client';
import { useState, useEffect } from 'react';
import { BookingStatsType } from '@/app/types/dashboard';
import BookingStatsGraphSkeleton from './BookingStatsGraphSkeleton';
import BookingStatsContent from './BookingStatsContent';

function useFetchBookingStats(): BookingStatsType | null {
  const [stats, setStats] = useState<BookingStatsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard-stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching booking stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return isLoading ? null : stats;
}

const BookingStats: React.FC = () => {
  const stats = useFetchBookingStats();

  if (stats === null) return <BookingStatsGraphSkeleton />;
  return <BookingStatsContent stats={stats} />;
};

export default BookingStats;