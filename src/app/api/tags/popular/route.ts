import { NextResponse } from "next/server";
import { services } from "@/config/appConfig";

const BASE = services.category.baseUrl; 

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = url.searchParams.toString();

  const res = await fetch(`${BASE}/api/tags/popular?${params}`, {
    headers: { Authorization: req.headers.get("authorization") || "" },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

