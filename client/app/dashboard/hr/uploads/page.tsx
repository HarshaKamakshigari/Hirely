'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@/context/AuthContext';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface UploadedFile {
  name: string;
  url: string;
  createdAt: string;
}

export default function HrUploadsPage() {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch uploaded files from the bucket
  const fetchUploads = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('Hirely') // Make sure bucket name matches
        .list('', { sortBy: { column: 'created_at', order: 'desc' } });

      if (error) throw error;

      const filesWithUrls: UploadedFile[] = data.map((item) => {
        const { publicUrl } = supabase.storage.from('Hirely').getPublicUrl(item.name).data;
        return {
          name: item.name,
          url: publicUrl,
          createdAt: item.created_at || '',
        };
      });

      setUploads(filesWithUrls);
    } catch (err) {
      console.error('Error fetching uploads:', err);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  // Upload file to Supabase
  const handleFileUpload = async () => {
    if (!file) return alert('Please select a file');
    if (!user) return alert('You must be logged in');

    try {
      setLoading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.username}_${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage.from('Hirely').upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (error) throw error;

      alert('File uploaded successfully!');
      setFile(null);
      fetchUploads(); // Refresh list
    } catch (err: any) {
      console.error('Upload error:', err.message);
      alert('Upload failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">HR Document Uploads</h1>

      {/* Upload Section */}
      <div className="bg-gray-800 p-4 rounded mb-6">
        <h2 className="text-xl mb-2">Upload Document</h2>
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
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {/* Uploaded Files */}
      <h2 className="text-2xl mb-4">Uploaded Documents</h2>
      {uploads.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {uploads.map((file) => (
            <li
              key={file.name}
              className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition"
            >
              <p className="text-lg font-semibold">{file.name}</p>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                View / Download
              </a>
              <p className="text-sm text-gray-500">
                Uploaded on:{' '}
                {file.createdAt ? new Date(file.createdAt).toLocaleString() : 'Unknown'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
