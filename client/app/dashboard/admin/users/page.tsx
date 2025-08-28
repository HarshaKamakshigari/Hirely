'use client'
import DashboardNav from '../../../../components/DashboardNav'
import { useAuth } from '../../../../context/AuthContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

interface User {
  _id: string
  username: string
  name: string
  email: string
  userType: 'Admin' | 'HR' | 'Employee' | 'Candidate'
}

export default function ManageUsersPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState<User>({
    _id: '',
    username: '',
    name: '',
    email: '',
    userType: 'Candidate',
  })

  // Redirect if not admin
  useEffect(() => {
    if (users) {
      console.log(users)
    }
    if (!user) router.push('/login')
  }, [user, router])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const res = await fetch('/users', {
        //   method: 'GET',
        // })

        const res = await api.get('users/all')
        console.log(res)
        // const data = await res.json()
        console.log('data is here', res)
        setUsers(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    if (user?.userType === 'Admin') fetchUsers()
  }, [user])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setUsers(users.filter((u) => u._id !== id))
      } else {
        alert('Delete failed')
      }
    } catch (err) {
      console.error(err)
      alert('Delete failed')
    }
  }

  const handleAddUser = async () => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      if (res.ok) {
        const added = await res.json()
        setUsers([...users, added])
        setNewUser({ _id: '', username: '', name: '', email: '', userType: 'Candidate' })
      } else {
        alert('Add user failed')
      }
    } catch (err) {
      console.error(err)
      alert('Add user failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <DashboardNav />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

        {/* Add User */}
        <div className="mb-6 p-4 bg-gray-800 rounded">
          <h2 className="text-xl font-semibold mb-3">Add New User</h2>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="p-2 rounded bg-gray-700 text-gray-100 border border-gray-600"
            />
            <input
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="p-2 rounded bg-gray-700 text-gray-100 border border-gray-600"
            />
            <input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="p-2 rounded bg-gray-700 text-gray-100 border border-gray-600"
            />
            <select value={newUser.userType} onChange={(e) => setNewUser({ ...newUser, userType: e.target.value as any })} className="p-2 rounded bg-gray-700 text-gray-100 border border-gray-600">
              <option value="Candidate">Candidate</option>
              <option value="Employee">Employee</option>
              <option value="HR">HR</option>
              <option value="Admin">Admin</option>
            </select>
            <button onClick={handleAddUser} className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded transition">
              Add User
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-400">Username</th>
                <th className="px-4 py-2 text-left text-gray-400">Name</th>
                <th className="px-4 py-2 text-left text-gray-400">Email</th>
                <th className="px-4 py-2 text-left text-gray-400">Role</th>
                <th className="px-4 py-2 text-left text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {users.map((u) => {
                return (
                  <div key={u._id}>
                    <tr className="hover:bg-gray-800">
                      <td className="px-4 py-2">{u.username}</td>
                      <td className="px-4 py-2">{u.name}</td>
                      <td className="px-4 py-2">{u.email}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            u.userType === 'Admin'
                              ? 'bg-red-600 text-white'
                              : u.userType === 'HR'
                              ? 'bg-blue-600 text-white'
                              : u.userType === 'Employee'
                              ? 'bg-green-600 text-white'
                              : 'bg-yellow-600 text-black'
                          }`}
                        >
                          {u.userType}
                        </span>
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button onClick={() => handleDelete(u._id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </div>
                )
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <button onClick={logout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition">
            Logout
          </button>
        </div>
      </main>
    </div>
  )
}