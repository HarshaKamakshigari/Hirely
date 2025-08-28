// 'use client';
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import Cookies from 'js-cookie';

// export const AuthContext = createContext(undefined);

// export default function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [accessToken, setAccessToken] = useState(null);

//   useEffect(() => {
//     const storedUser = Cookies.get('user');
//     if (storedUser) setUser(JSON.parse(storedUser));
//     const storedToken = Cookies.get('accessToken');
//     if (storedToken) setAccessToken(storedToken);
//   }, []);

//   const logout = () => {
//     setUser(null);
//     setAccessToken(null);
//     Cookies.remove('user');
//     Cookies.remove('accessToken');
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);
'use client';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface User {
  username: string;
  userType: 'Admin' | 'HR' | 'Employee' | 'Candidate';
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    const storedToken = Cookies.get('accessToken');
    if (storedToken) setAccessToken(storedToken);
  }, []);

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    Cookies.remove('user');
    Cookies.remove('accessToken');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
