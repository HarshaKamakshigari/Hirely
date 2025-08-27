'use client'

import { useState } from 'react'
import api from '../../lib/api'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('Candidate')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('auth/register', { username, name, password, userType, email })
      alert('Registration successful. Please check your email for verification link.')
      router.push('/login')
    } catch (err: any) {
      alert(err.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-64">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2" required />
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2" required />
        <select value={userType} onChange={(e) => setUserType(e.target.value)} className="border p-2">
          <option value="Candidate">Candidate</option>
          <option value="Employee">Employee</option>
        </select>
        <button type="submit" className="bg-green-500 text-white py-2">
          Register
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{' '}
        <a href="/login" className="text-blue-500">
          Login
        </a>
      </p>
    </div>
  )
}