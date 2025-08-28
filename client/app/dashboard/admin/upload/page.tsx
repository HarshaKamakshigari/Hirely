'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Application {
  _id: string;
  jobTitle: string;
  resumeUrl: string;
  status: string;
  createdAt: string;
}

export default function CandidateApplicationsPage() {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) fetchApplications();
  }, [user]);

  // Fetch user's applications
  const fetchApplications = async () => {
    try {
      const res = await api.get('/applications'); // your backend API
      setApplications(res.data || []);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  // Handle file upload to Supabase
  const handleFileUpload = async () => {
    if (!file) return alert('Please select a file');
    if (!user) return alert('You must be logged in');

    try {
      setLoading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.username}_${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('resumes')
        .upload(fileName, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      const resumeUrl = publicUrlData?.publicUrl;

      // Save application with resume URL
      await api.post('/applications', {
        resumeUrl,
      });

      alert('Application submitted successfully!');
      fetchApplications();
      setFile(null);
    } catch (err: any) {
      console.error('Upload error:', err.message);
      alert('Upload failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Your Applications</h1>

      {/* Upload Section */}
      <div className="bg-gray-800 p-4 rounded mb-6">
        <h2 className="text-xl mb-2">Upload Resume & Apply</h2>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="mb-4 block"
        />
        <button
          onClick={handleFileUpload}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
        >
          {loading ? 'Uploading...' : 'Upload & Apply'}
        </button>
      </div>

      {/* Applications List */}
      <h2 className="text-2xl mb-4">Submitted Applications</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li
              key={app._id}
              className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition"
            >
              <p className="text-lg font-semibold">{app.jobTitle}</p>
              <a
                href={app.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                View Resume
              </a>
              <p className="text-sm text-gray-400">Status: {app.status}</p>
              <p className="text-sm text-gray-500">
                Applied on: {new Date(app.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
