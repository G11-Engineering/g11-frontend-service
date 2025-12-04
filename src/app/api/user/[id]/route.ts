// src/app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import { services } from "@/config/appConfig";

interface Params {
  params: { id: string };
}

// GET: fetch a user by ID
export async function GET(req: Request, { params }: Params) {
  const url = `${services.user.baseUrl}/api/users/${params.id}`;

  const res = await fetch(url, {
    headers: {
      Authorization: req.headers.get("authorization") || "",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

// PUT: update a user
export async function PUT(req: Request, { params }: Params) {
  const url = `${services.user.baseUrl}/api/users/${params.id}`;
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

// DELETE: delete a user
export async function DELETE(req: Request, { params }: Params) {
  const url = `${services.user.baseUrl}/api/users/${params.id}`;

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

