'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { signIn, signOut, useSession } from 'next-auth/react';
import { authApi } from '@/services/authApi';

interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  asgardeoSignIn: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isEditor: boolean;
  isAuthor: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const syncUser = async () => {
      if (status === 'loading') return;

      if (status === 'authenticated' && session) {
        try {
          // @ts-ignore
          const accessToken = session.accessToken;
          
          if (accessToken) {
            // Store the local JWT token
            if (typeof window !== 'undefined') {
              localStorage.setItem('token', accessToken);
            }

            // Construct user from session
            const sessionUser: User = {
              id: session.user.id || '',
              email: session.user.email || '',
              username: session.user.username || '',
              firstName: session.user.given_name || '',
              lastName: session.user.family_name || '',
              role: session.user.role || 'user',
            };

            if (sessionUser) {
              // Store the user
              if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(sessionUser));
              }
              setUser(sessionUser);
            }
          }
        } catch (error) {
          console.error('Failed to sync user:', error);
          // Clear local storage on error
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
          setUser(null);
        }
      } else {
        // Clear local storage if not authenticated
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        setUser(null);
      }
      setLoading(false);
    };

    syncUser();
  }, [session, status]);

  const handleAsgardeoSignIn = async () => {
    try {
      await signIn('asgardeo');
    } catch (error) {
      console.error('Sign in failed:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to sign in',
        color: 'red',
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      setUser(null);
      router.push('/');
      notifications.show({
        title: 'Success',
        message: 'Logged out successfully',
        color: 'blue',
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isAuthenticated = status === 'authenticated';
  const isAdmin = user?.role === 'admin';
  const isEditor = ['admin', 'editor'].includes(user?.role || '');
  const isAuthor = ['admin', 'editor', 'author'].includes(user?.role || '');

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: status === 'loading' || loading,
        asgardeoSignIn: handleAsgardeoSignIn,
        logout: handleLogout,
        isAuthenticated,
        isAdmin,
        isEditor,
        isAuthor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
