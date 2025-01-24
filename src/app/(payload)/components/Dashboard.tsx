'use client'

import type { AdminViewProps } from 'payload'
import { Gutter } from '@payloadcms/ui'
import React from 'react'
import BookingAdminView from './BookingToggleButton'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import DashboardStatsSkeleton from './DashboardStats/DashboardStatsSkeleton'
import DashboardStats from './DashboardStats/DashboardStats'
import BookingStatsGraphSkeleton from './BookingStats/BookingStatsGraphSkeleton'
import BookingStats from './BookingStats/BookingStatsGraph'
import BookingAdminViewSkeleton from './BookingAdminView/BookingAdminViewSkeleton'

// Error Fallback Component
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert" className="bg-red-100 p-4 rounded">
      <p>Something went wrong:</p>
      <pre className="text-red-600">{error.message}</pre>
    </div>
  );
}

const CustomDashboard: React.FC<AdminViewProps> = ({}) => {
  return (
    <div className="dashboard">
      <Gutter>
        <h1 className="my-4">Welcome</h1>
        <div className="dashboardGrid">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<DashboardStatsSkeleton />}>
              <DashboardStats />
            </Suspense>
          </ErrorBoundary>

          <div className="calendar-section">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<BookingAdminViewSkeleton />}>
                <BookingAdminView />
              </Suspense>
            </ErrorBoundary>
          </div>

          <div className="mb-8">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<BookingStatsGraphSkeleton />}>
                <BookingStats />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </Gutter>
    </div>
  );
};

export default CustomDashboard;