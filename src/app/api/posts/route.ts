import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = `http://content-service:3002/api/posts?${searchParams.toString()}`;

    const res = await fetch(url);
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

