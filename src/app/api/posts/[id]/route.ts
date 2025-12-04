import { NextResponse } from "next/server";

interface Params { params: { id: string } }

export async function GET(req: Request, { params }: Params) {
  // Forward relevant headers
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    headers["Authorization"] = authHeader;
  }

  const res = await fetch(`http://content-service:3002/api/posts/${params.id}`, {
    headers
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PUT(req: Request, { params }: Params) {
  // Forward relevant headers
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    headers["Authorization"] = authHeader;
  }

  const body = await req.json();

  const res = await fetch(`http://content-service:3002/api/posts/${params.id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(req: Request, { params }: Params) {
  // Forward relevant headers
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    headers["Authorization"] = authHeader;
  }

  const res = await fetch(`http://content-service:3002/api/posts/${params.id}`, {
    method: "DELETE",
    headers,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

