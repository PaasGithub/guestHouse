'use client';

import { useState, useEffect } from "react";

const DashboardStats: React.FC = () => {
    const [stats, setStats] = useState({
      totalBookings: 0,
      upcomingBookings: 0,
      todayCheckIns: 0,
    });
  
    useEffect(() => {
      const fetchStats = async () => {
        try {
          const response = await fetch('/api/dashboard-stats');
          const data = await response.json();
          setStats(data);
        } catch (error) {
          console.error('Error fetching stats:', error);
        }
      };
  
      fetchStats();
    }, []);
  
    return (
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p>{stats.totalBookings}</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming Bookings</h3>
          <p>{stats.upcomingBookings}</p>
        </div>
        <div className="stat-card">
          <h3>Today's Check-ins</h3>
          <p>{stats.todayCheckIns}</p>
        </div>
      </div>
    );
  };

export default DashboardStats;