import { NextResponse } from 'next/server';
import { services } from '@/config/appConfig';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = `${services.content.baseUrl}/api/posts?${searchParams.toString()}`;

    const res = await fetch(url, {
      headers: {
        Authorization: req.headers.get("authorization") || "",
      },
    });
    const data = await res.json();
    
    return NextResponse.json(data);

  } catch (err) {
    console.error("Error in /api/posts route:", err);

    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${services.content.baseUrl}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
