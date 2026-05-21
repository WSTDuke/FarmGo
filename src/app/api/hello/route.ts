import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Hello from FarmGo API (mock)",
    timestamp: new Date().toISOString(),
  });
}
