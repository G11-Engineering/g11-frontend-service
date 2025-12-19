import { NextResponse } from "next/server";
import { services } from "@/config/appConfig";

interface Params { params: { id: string } }

export async function POST(req: Request, { params }: Params) {
  const url = `${services.comment.baseUrl}/api/comments/${params.id}/moderate`;
  const body = await req.json();

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

