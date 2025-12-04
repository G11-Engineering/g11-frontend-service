import { NextResponse } from "next/server";
import { services } from "@/config/appConfig";

export async function GET(req: Request) {
  const url = `${services.user.baseUrl}/api/users/profile`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PUT(req: Request) {
  const url = `${services.user.baseUrl}/api/users/profile`;
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

