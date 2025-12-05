import { NextResponse } from 'next/server';
import { asgardeo } from '@/config/appConfig';

export async function GET() {
  return NextResponse.json({ asgardeo });
}
