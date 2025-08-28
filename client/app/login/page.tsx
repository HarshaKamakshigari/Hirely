// 'use client'

// import { useState, useContext } from 'react'
// import { AuthContext } from '../../context/AuthContext'
// import api from '../../lib/api'
// import { useRouter } from 'next/navigation'

// export default function LoginPage() {
//   const router = useRouter()
//   const auth = useContext(AuthContext)
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')

//   if (!auth) return null
//   const { setUser, setAccessToken } = auth

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const res = await api.post('/auth/login', { username, password })
//       const { accessToken, expiresAt, userType } = res.data

//       // alert(userType)

//       // setAccessToken(accessToke)
//       // Cookies.set('accessToken', accessToken, { expires: 1 }) // optional, for client use

//       // Optionally decode JWT to get role
//       const payload = JSON.parse(atob(accessToken.split('.')[1]))
//       setUser({ id: payload.id, userType: payload.userType })

//       switch (userType) {
//         case 'Candidate':
//           router.push('/dashboard')
//         case 'Admin':
//           router.push('admin/dashboard')
//         default:
//         //redirect somewhere! do not forget me 😭
//       }
//       router.push('/dashboard')
//     } catch (err: any) {
//       alert(err.response?.data?.error || 'Login failed')
//     }
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleLogin} className="flex flex-col gap-3 w-64">
//         <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2" required />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2" required />
//         <button type="submit" className="bg-blue-500 text-white py-2">
//           Login
//         </button>
//       </form>
//       <p className="mt-4">
//         Don't have an account?{' '}
//         <a href="/register" className="text-blue-500">
//           Register
//         </a>
//       </p>
//     </div>
//   )
// }


// 'use client';

// import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import api from '../../lib/api';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//   const router = useRouter();
//   const { setUser, setAccessToken } = useAuth();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await api.post('/auth/login', { username, password });

//       const { accessToken, userType, id } = res.data;

//       // Save to context
//       setUser({ id, userType });
//       setAccessToken(accessToken);

//       // Redirect based on role
//       switch (userType) {
//         case 'Candidate':
//           router.push('/dashboard/candidate');
//           break;
//         case 'Admin':
//           router.push('/dashboard/admin');
//           break;
//         case 'HR':
//           router.push('/dashboard/hr');
//           break;
//         case 'Employee':
//           router.push('/dashboard/employee');
//           break;
//         default:
//           router.push('/dashboard');
//       }
//     } catch (err: any) {
//       alert(err.response?.data?.error || 'Login failed');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleLogin} className="flex flex-col gap-3 w-64">
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="border p-2"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2"
//           required
//         />
//         <button type="submit" className="bg-blue-500 text-white py-2">
//           Login
//         </button>
//       </form>
//       <p className="mt-4">
//         Don't have an account?{' '}
//         <a href="/register" className="text-blue-500">
//           Register
//         </a>
//       </p>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setAccessToken } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Hardcoded safe regex: letters, numbers, underscore, dash only, 3-30 chars
  const safeInputRegex = /^[a-zA-Z0-9_-]{3,30}$/;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!safeInputRegex.test(username) || !safeInputRegex.test(password)) {
      return alert(
        'Invalid input! Only letters, numbers, underscore (_) and dash (-) allowed. Length: 3-30 characters.'
      );
    }

    try {
      const res = await api.post('/auth/login', { username, password });

      const { accessToken, userType, id } = res.data;

      // Save to context
      setUser({ id, userType });
      setAccessToken(accessToken);

      // Redirect based on role
      switch (userType) {
        case 'Candidate':
          router.push('/dashboard/candidate');
          break;
        case 'Admin':
          router.push('/dashboard/admin');
          break;
        case 'HR':
          router.push('/dashboard/hr');
          break;
        case 'Employee':
          router.push('/dashboard/employee');
          break;
        default:
          router.push('/dashboard');
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-64">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2"
          required
          maxLength={30}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
          required
          maxLength={30}
        />
        <button type="submit" className="bg-blue-500 text-white py-2">
          Login
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-500">
          Register
        </a>
      </p>
    </div>
  );
}
