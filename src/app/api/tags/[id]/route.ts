import { NextResponse } from "next/server";
import { services } from "@/config/appConfig";

const BASE = services.category.baseUrl; 

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${BASE}/api/tags/${params.id}`, {
    headers: { Authorization: req.headers.get("authorization") || "" },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const res = await fetch(`${BASE}/api/tags/${params.id}`, {
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${BASE}/api/tags/${params.id}`, {
    method: "DELETE",
    headers: {
      Authorization: req.headers.get("authorization") || "",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

