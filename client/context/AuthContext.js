'use client';
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext(undefined);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    const storedToken = Cookies.get('accessToken');
    if (storedToken) setAccessToken(storedToken);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
