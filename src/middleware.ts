import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(_: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*'
}
