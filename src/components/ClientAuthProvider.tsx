'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

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
    const [config, setConfig] = useState<any>(null);

    useEffect(() => {
        setMounted(true);
        
        // Fetch runtime configuration from the API
        fetch('/api/config')
            .then(res => res.json())
            .then(data => {
                console.log('Runtime config loaded:', data);
                
                const asgardeoConfig = {
                    signInRedirectURL: data.asgardeo.redirectUrl,
                    signOutRedirectURL: data.asgardeo.redirectUrl,
                    clientID: data.asgardeo.clientId,
                    baseUrl: data.asgardeo.baseUrl,
                    scope: data.asgardeo.scope,
                    resourceServerURLs: [],
                    enablePKCE: true,
                };
                
                setConfig(asgardeoConfig);
            })
            .catch(err => {
                console.error('Failed to load runtime config:', err);
            });
    }, []);

    if (!mounted || typeof window === 'undefined' || !config) {
        return <div>Loading...</div>;
    }

    return (
        <AuthProvider config={config}>
            {children}
        </AuthProvider>
    );
}
