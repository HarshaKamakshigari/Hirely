'use client';
import { useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  userType: 'Admin' | 'HR' | 'Employee' | 'Candidate';
  // add other user properties as needed
};

type AuthContextType = {
  user: User | null;
  // add other context properties as needed
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  // add other default values as needed
});

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    switch (user.userType) {
      case 'Admin':
        router.push('/dashboard/admin');
        break;
      case 'HR':
        router.push('/dashboard/hr');
        break;
      case 'Employee':
        router.push('/dashboard/employee');
        break;
      case 'Candidate':
        router.push('/dashboard/candidate');
        break;
    }
  }, [user, router]);

  return <div>Redirecting to your dashboard...</div>;
}
