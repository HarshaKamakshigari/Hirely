'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [requirements, setRequirements] = useState('')

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      // const res = await fetch('/api/jobs');
      const res = await api.get('/jobs') // change this to get
      const data = await res.data
      setJobs(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching jobs:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  // Handle Job Post
  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // const res = await fetch('/api/jobs/post', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ title, description, location, salary, requirements }),
      // });
      const res = await api.post('/jobs/post', {
        title,
        description,
        location,
        salary,
        requirements,
      })
      const data = await res.data
      if (res.data) {
        alert('Job posted successfully!')
        setTitle('')
        setDescription('')
        setLocation('')
        setSalary('')
        setRequirements('')
        fetchJobs() // Refresh list
      } else {
        const errData = await res.data
        alert(errData.error || 'Failed to post job')
      }
    } catch (err) {
      console.error('Error posting job:', err)
      alert('Error posting job')
    }
  }

  // Handle Job Remove
  const handleRemoveJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return

    try {
      const res = await fetch('/jobs/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: id }),
      })

      if (res.ok) {
        alert('Job removed successfully!')
        fetchJobs()
      } else {
        const errData = await res.json()
        alert(errData.error || 'Failed to remove job')
      }
    } catch (err) {
      console.error('Error removing job:', err)
      alert('Error removing job')
    }
  }

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Manage Jobs (Admin)</h1>

      {/* Job Post Form */}
      <form onSubmit={handlePostJob} className="bg-gray-800 p-4 rounded mb-6">
        <h2 className="text-xl mb-4">Post a New Job</h2>
        <div className="grid gap-3">
          <input type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 rounded bg-gray-700 text-white" required />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-2 rounded bg-gray-700 text-white" required />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="p-2 rounded bg-gray-700 text-white" />
          <input type="text" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} className="p-2 rounded bg-gray-700 text-white" />
          <input type="text" placeholder="Requirements (comma separated)" value={requirements} onChange={(e) => setRequirements(e.target.value)} className="p-2 rounded bg-gray-700 text-white" />
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 rounded">
            Post Job
          </button>
        </div>
      </form>

      {/* Jobs List */}
      <div className="bg-gray-800 p-4 rounded">
        <h2 className="text-xl mb-4">All Jobs</h2>
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-2">Title</th>
                <th className="p-2">Location</th>
                <th className="p-2">Salary</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="border-b border-gray-700">
                  <td className="p-2">{job.title}</td>
                  <td className="p-2">{job.location || '-'}</td>
                  <td className="p-2">{job.salary || '-'}</td>
                  <td className="p-2">
                    <button onClick={() => handleRemoveJob(job._id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}