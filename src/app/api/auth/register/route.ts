import { NextResponse } from "next/server";
import { services } from "@/config/appConfig";

export async function POST(req: Request) {
  const body = await req.json();
  const url = `${services.user.baseUrl}/api/auth/register`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

