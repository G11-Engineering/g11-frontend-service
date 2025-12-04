import { NextResponse } from 'next/server';
import { services } from '@/config/appConfig';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = `${services.category.baseUrl}/api/categories?${searchParams.toString()}`;
  //const url = `http://category-service:3004/api/categories?${searchParams.toString()}`;

  const res = await fetch(url, {
    headers: {
      Authorization: req.headers.get("authorization") || "",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(req: Request) {
  const body = await req.json();

  const url = `${services.category.baseUrl}/api/categories`;

  const res = await fetch(url, {
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

