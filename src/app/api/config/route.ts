import { NextResponse } from 'next/server';
import { asgardeo } from '@/config/appConfig';

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ asgardeo });
}
