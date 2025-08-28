'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function DashboardNav() {
  const { user, logout } = useAuth();

  if (!user) return null; // hide nav if not logged in

  // Role-specific links
  let links: { name: string; href: string }[] = [];

  switch (user.userType) {
    case 'Admin':
      links = [
        { name: 'Dashboard', href: '/dashboard/admin' },
        { name: 'Manage Users', href: '/dashboard/admin/users' },
        { name: 'Post Jobs', href: '/dashboard/admin/jobs' },
        { name: 'Applications', href: '/dashboard/admin/applications' },
      ];
      break;
    case 'HR':
      links = [
        { name: 'Dashboard', href: '/dashboard/hr' },
        { name: 'Post Jobs', href: '/dashboard/hr/jobs' },
        { name: 'Upload Docs', href: '/dashboard/hr/uploads' },
      ];
      break;
    case 'Employee':
      links = [
        { name: 'Dashboard', href: '/dashboard/employee' },
        { name: 'My Documents', href: '/dashboard/employee/docs' },
        { name: 'Applied Jobs', href: '/dashboard/employee/jobs' },
      ];
      break;
    case 'Candidate':
      links = [
        { name: 'Dashboard', href: '/dashboard/candidate' },
        { name: 'Browse Jobs', href: '/dashboard/candidate/jobs' },
        { name: 'My Applications', href: '/dashboard/candidate/applications' },
      ];
      break;
  }

  return (
    <nav className="bg-gray-900 text-gray-100 p-4 flex justify-between items-center shadow-md">
      <div className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-blue-400 transition-colors duration-200"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm md:text-base">Hello, {user.username}</span>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
