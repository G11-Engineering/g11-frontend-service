import { NextResponse } from 'next/server';
import { services } from '@/config/appConfig';

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  const url = `${services.category.baseUrl}/api/categories/${params.id}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}


export async function PUT(req: Request, { params }: Params) {
  const url = `${services.category.baseUrl}/api/categories/${params.id}`;
  const body = await req.json();

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(req: Request, { params }: Params) {
  const url = `${services.category.baseUrl}/api/categories/${params.id}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
