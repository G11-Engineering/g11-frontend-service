import { NextResponse } from "next/server";
import { services } from "@/config/appConfig";

const BASE = services.category.baseUrl; 

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = url.searchParams.toString();

  const res = await fetch(`${BASE}/api/tags?${params}`, {
    headers: {
      Authorization: req.headers.get("authorization") || "",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${BASE}/api/tags`, {
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

