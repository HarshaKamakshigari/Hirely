'use client';
import DashboardNav from '../../../components/DashboardNav';
import { useAuth } from '../../../context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <DashboardNav />

      <main className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p className="mb-6">Welcome, {user?.username}!</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* View Users */}
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
            <p>View, add, or remove users and assign roles.</p>
          </div>

          {/* Manage Jobs */}
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Post Jobs</h2>
            <p>Create or manage job postings for the company.</p>
          </div>

          {/* Applications */}
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">View Applications</h2>
            <p>Check all candidate applications and statuses.</p>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}
