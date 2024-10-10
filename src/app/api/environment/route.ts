import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { getEnv } from "@/utils/common"

export async function GET() {
  const host = headers().get("host") || ""
  const environment = getEnv(host)
  return NextResponse.json({ environment })
}
