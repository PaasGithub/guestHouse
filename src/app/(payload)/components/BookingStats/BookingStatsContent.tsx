'use client';

import React from 'react';
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { BookingStatsType } from '@/app/types/dashboard';

const BookingStatsContent: React.FC<{ stats: BookingStatsType | null }> = ({ stats }) => {
  if (!stats) return null;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const COLORS = ['#8884d8', '#82ca9d'];

  const pieData = [
    { name: 'Accommodation', value: stats.bookingsByType.total.accommodation },
    { name: 'Event', value: stats.bookingsByType.total.event },
  ];

  const lineData = months.map((month, index) => ({
    month,
    accommodation: stats.bookingsByType.monthlyTrends.accommodation[index],
    event: stats.bookingsByType.monthlyTrends.event[index],
  }));

  const chartData = months.map((month, index) => ({
    name: month,
    revenue: stats.monthlyRevenue[index]
  }));

  return (
    <div className="booking-stats">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="p-4 rounded-lg shadow">
          <div className="mx-4">
            <h3 className="text-lg font-semibold mb-2">Booking Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={pieData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={100} 
                fill="#8884d8" 
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart for Monthly Booking Trends */}
        <div className="p-4 rounded-lg shadow">
          <div className="mx-4">
            <h3 className="text-lg font-semibold mb-2">Monthly Booking Trends</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="accommodation" stroke="#8884d8" name="Accommodation" />
              <Line type="monotone" dataKey="event" stroke="#82ca9d" name="Event" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart for Monthly Revenue */}
        <div className="p-4 rounded-lg shadow md:col-span-2">
          <div>
            <h3>Monthly Revenue</h3>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#271fc2" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BookingStatsContent;