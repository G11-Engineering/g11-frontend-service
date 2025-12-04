import { NextResponse } from "next/server";
import { services } from "@/config/appConfig";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization");
  const body = await req.json();

  const url = `${services.user.baseUrl}/api/auth/asgardeo/login`;

  const res = await fetch(url, {
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

