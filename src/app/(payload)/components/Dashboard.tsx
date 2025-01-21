import type { AdminViewProps } from 'payload'

import { Gutter } from '@payloadcms/ui'
import React from 'react'
import BookingAdminView from './BookingToggleButton'
import DashboardStats from './DashboardStats'

const CustomDashboard: React.FC<AdminViewProps> = ({
  initPageResult,
  params,
  searchParams,
}) => {
  return (
 
      <Gutter>
       <h1>Admin Dashboard</h1>
        <p>Welcome to the dashboard! You can add widgets or stats here.</p>
        <div className="calendar-section">
            <BookingAdminView />
        </div>
        {/* Example of aggregated data */}
        <div>
          <h2>Stats</h2>
          <ul>
            <li>Total Accommodations: 10</li>
            <li>Total Bookings: 45</li>
            <li>Pending Bookings: 5</li>
          </ul>
        </div>

        <div>
            <DashboardStats/>
        </div>
        
      </Gutter>
 
  )
}

export default CustomDashboard;