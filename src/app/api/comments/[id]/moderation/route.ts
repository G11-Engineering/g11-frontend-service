import { NextResponse } from "next/server";
import { services } from "@/config/appConfig";

interface Params { params: { id: string } }

export async function GET(req: Request, { params }: Params) {
  const url = `${services.comment.baseUrl}/api/comments/${params.id}/moderation`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

