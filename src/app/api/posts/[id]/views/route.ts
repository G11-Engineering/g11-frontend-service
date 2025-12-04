import { NextResponse } from 'next/server';
import { services } from '@/config/appConfig';

interface Params { params: { id: string } }

export async function GET(req: Request, { params }: Params) {
  try {
    const url = `${services.content.baseUrl}/api/posts/${params.id}/views/`;

    const res = await fetch(url);
    const data = await res.json();
    
    return NextResponse.json(data);

  } catch (err) {
    console.error("Error in /api/posts/${params.id}/views/ route:", err);

    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, { params }: Params) {
  const url = `${services.content.baseUrl}/api/posts/${params.id}/views/`;

  // Forward relevant headers
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    headers["Authorization"] = authHeader;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
  });
  const data = await res.json();
    
  return NextResponse.json(data);
}

