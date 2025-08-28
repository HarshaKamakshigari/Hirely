'use client';

import { useState, useEffect } from 'react';
import DashboardNav from '../../../../components/DashboardNav';
import { useAuth } from '../../../../context/AuthContext';
import api from '@/lib/api';

interface Job {
  _id: string;
  title: string;
  description: string;
  location?: string;
  salary?: string;
  requirements?: string;
}

export default function CandidateJobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs'); // calls frontend API /api/jobs
      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle job apply
  const handleApply = async (jobId: string) => {
    if (!user) return alert('You must be logged in to apply.');

    try {
      const res = await api.post('/jobs/apply', { jobId, userId: user.id });
      if (res.status === 200) {
        alert('Application submitted successfully!');
      } else {
        alert(res.data.error || 'Failed to apply for job');
      }
    } catch (err: any) {
      console.error('Error applying for job:', err);
      alert(err.response?.data?.error || 'Error applying for job');
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <DashboardNav />
      <main className="p-6">
        <h2 className="text-3xl font-bold mb-4">Available Jobs</h2>

        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li
                key={job._id}
                className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition duration-200"
              >
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p>{job.description}</p>
                <p className="text-sm text-gray-400">
                  Location: {job.location || 'Remote'} | Salary: {job.salary || 'Not disclosed'}
                </p>
                <p className="text-sm text-gray-400">Requirements: {job.requirements || '-'}</p>
                <button
                  onClick={() => handleApply(job._id)}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Apply
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
