import { NextResponse } from "next/server";
import { services } from "@/config/appConfig";

export async function POST(req: Request) {
  try {
    console.log('[Asgardeo Login API] Request received');
    
    const body = await req.json();
    console.log('[Asgardeo Login API] Body received, has idToken:', !!body.idToken);
    console.log('[Asgardeo Login API] ID Token preview:', body.idToken?.substring(0, 50) + '...');

    const url = `${services.user.baseUrl}/api/auth/asgardeo/login`;
    console.log('[Asgardeo Login API] Forwarding to backend:', url);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.get("authorization") || "",
      },
      body: JSON.stringify(body),
    });

    console.log('[Asgardeo Login API] Backend response status:', res.status);
    
    const contentType = res.headers.get('content-type');
    console.log('[Asgardeo Login API] Backend content-type:', contentType);

    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      console.error('[Asgardeo Login API] Backend returned non-JSON:', text.substring(0, 200));
      return NextResponse.json(
        { error: { message: 'Backend returned non-JSON response' } },
        { status: 502 }
      );
    }

    const data = await res.json();
    console.log('[Asgardeo Login API] Backend response:', {
      hasToken: !!data.token,
      hasUser: !!data.user,
      hasError: !!data.error,
    });

    if (!res.ok) {
      console.error('[Asgardeo Login API] Backend error:', data);
    } else {
      console.log('[Asgardeo Login API] ✅ Success');
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    console.error('[Asgardeo Login API] ❌ Error:', error);
    console.error('[Asgardeo Login API] Error stack:', error.stack);
    return NextResponse.json(
      { error: { message: error.message || 'Internal server error' } },
      { status: 500 }
    );
  }
}

