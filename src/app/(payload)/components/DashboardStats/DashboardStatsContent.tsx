'use client';

import React from 'react';
import type { BookingStatsType } from '@/app/types/dashboard';

const DashboardStatsContent: React.FC<{ stats: BookingStatsType | null }> = ({ stats }) => {
  if (!stats) return null;

  const currentMonth = new Date().getMonth();
  const currentMonthRevenue = stats.monthlyRevenue[currentMonth];
  const currentMonthAccommodations = stats.bookingsByType.monthlyTrends.accommodation[currentMonth];
  const currentMonthEvents = stats.bookingsByType.monthlyTrends.event[currentMonth];

  return (
    <div>
      <div className="flex gap-4 text-black">
        <div className="bg-blue-100 p-4 rounded-lg shadow-md flex-1">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold">${currentMonthRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-purple-300 p-4 rounded-lg shadow-md flex-1">
          <h3 className="text-lg font-semibold">Total Accommodations Booked</h3>
          <p className="text-2xl font-bold">{currentMonthAccommodations}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md flex-1">
          <h3 className="text-lg font-semibold">Total Events Booked</h3>
          <p className="text-2xl font-bold">{currentMonthEvents}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatsContent;
