import { NextResponse } from 'next/server';

export async function GET() {
  // These are read at RUNTIME on the server
  const config = {
    asgardeo: {
      clientId: process.env.ASGARDEO_CLIENT_ID || process.env.NEXT_PUBLIC_ASGARDEO_CLIENT_ID || '',
      baseUrl: process.env.ASGARDEO_BASE_URL || process.env.NEXT_PUBLIC_ASGARDEO_BASE_URL || '',
      redirectUrl: process.env.ASGARDEO_REDIRECT_URL || process.env.NEXT_PUBLIC_ASGARDEO_REDIRECT_URL || '',
      scope: (process.env.ASGARDEO_SCOPE || process.env.NEXT_PUBLIC_ASGARDEO_SCOPE || 'openid profile email groups').split(' '),
    },
  };

  return NextResponse.json(config);
}
