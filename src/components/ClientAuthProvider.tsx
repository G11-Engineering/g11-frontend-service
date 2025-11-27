'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { asgardeoConfig } from '@/config/asgardeo';

// Dynamically import AuthProvider to avoid SSR issues
const AuthProvider = dynamic(
    () => import('@asgardeo/auth-react').then((mod) => ({ default: mod.AuthProvider })),
    { ssr: false }
);

interface ClientAuthProviderProps {
    children: React.ReactNode;
}

export default function ClientAuthProvider({ children }: ClientAuthProviderProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || typeof window === 'undefined') {
        return <div>Loading...</div>;
    }

    return (
        <AuthProvider config={asgardeoConfig}>
            {children}
        </AuthProvider>
    );
}