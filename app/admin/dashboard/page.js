'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({ events: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        if (data.success) {
          setStats({ events: data.count });
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Welcome, {session?.user?.name || 'Admin'}!</h2>
        <p className="text-gray-700">
          This is the admin panel for IEEE RUET SB. Use the sidebar to manage events and other content.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Events</h3>
          <p className="text-3xl font-bold mt-2">{stats.events}</p>
        </div>
        {/* Add more stats here */}
      </div>
    </div>
  );
}
