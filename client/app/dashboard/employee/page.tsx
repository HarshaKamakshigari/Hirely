'use client';
import { useAuth } from '../../../context/AuthContext';

export default function EmployeeDashboard() {
  const { user, logout } = useAuth();
  return (
    <div>
      <h2>Employee Dashboard</h2>
      <p>Welcome, {user?.username}</p>
      <button onClick={logout}>Logout</button>
      <div>
        <h3>Your Documents</h3>
        <ul>
          <li>Resume</li>
          <li>Offer Letter</li>
          <li>Contracts</li>
        </ul>
      </div>
    </div>
  );
}
