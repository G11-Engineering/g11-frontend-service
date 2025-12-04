import { NextResponse } from "next/server";
import { services } from "@/config/appConfig";

export async function POST(req: Request) {
  const url = `${services.user.baseUrl}/api/auth/logout`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

