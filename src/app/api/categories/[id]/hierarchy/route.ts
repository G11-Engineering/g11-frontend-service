import { NextResponse } from 'next/server';
import { services } from '@/config/appConfig';

export async function GET(req: Request, { params }: Params) {
  const url = `${services.category.baseUrl}/api/categories?${params.id}/hierarchy`;

  const res = await fetch(url, {
    headers: {
      Authorization: req.headers.get("authorization") || "",
    },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const url = `${services.category.baseUrl}/api/categories?${params.id}/hierarchy`;

  const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.get("authorization") || "",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
