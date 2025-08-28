'use client'

import { useState } from 'react'
import api from '../../lib/api'
import { useRouter } from 'next/navigation'
import DOMPurify from 'dompurify'

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('Candidate')

  // Simple frontend validation
  const isValidInput = (input: string) => {
    const clean = DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] })
    const forbidden = /(SELECT|INSERT|UPDATE|DELETE|DROP|;|--)/i
    return clean === input && !forbidden.test(input)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (![username, name, email, password].every(isValidInput)) {
      alert('Invalid input detected.')
      return
    }

    try {
      await api.post('auth/register', { username, name, password, userType, email })
      alert('Registration successful. Please check your email for verification link.')
      router.push('/login')
    } catch (err: any) {
      alert(err.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-64">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <select
  value={userType}
  onChange={(e) => setUserType(e.target.value)}
  className="border p-2 rounded bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="Candidate">Candidate</option>
  <option value="Employee">Employee</option>
  <option value="HR">HR</option>
  <option value="Admin">Admin</option>
</select>
        <button type="submit" className="bg-green-500 text-white py-2 rounded">
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
