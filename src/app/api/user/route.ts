import { NextResponse } from "next/server";
import { services } from "@/config/appConfig";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const queryString = url.searchParams.toString();

  const backendUrl = `${services.user.baseUrl}/api/users${
    queryString ? `?${queryString}` : ""
  }`;

  const res = await fetch(backendUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

