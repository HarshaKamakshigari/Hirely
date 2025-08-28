'use client';
import DashboardNav from '../../../components/DashboardNav';
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function CandidateDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs'); // ✅ Fetch all jobs
        setJobs(res.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <DashboardNav />
      <main className="p-6">
        <h2 className="text-3xl font-bold mb-4 text-white">Candidate Dashboard</h2>
        <p className="mb-6">Welcome, {user?.username}!</p>

        <section>
          <h3 className="text-2xl font-semibold mb-3">Available Jobs</h3>
          {loading ? (
            <p>Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p>No jobs available.</p>
          ) : (
            <ul className="space-y-3">
              {jobs.map((job) => (
                <li
                  key={job._id}
                  className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition duration-200"
                >
                  <h4 className="text-lg font-bold">{job.title}</h4>
                  <p className="text-gray-400">{job.location || 'Location not specified'}</p>
                  <p className="text-gray-300">{job.salary ? `$${job.salary}` : 'Salary not disclosed'}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
