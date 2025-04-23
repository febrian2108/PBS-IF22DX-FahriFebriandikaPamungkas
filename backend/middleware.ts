import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware running for:', request.nextUrl.pathname);

  // Membuat response untuk permintaan berikutnya
  const response = NextResponse.next();

  // Menambahkan header CORS
  response.headers.set('Access-Control-Allow-Origin', '*'); // Memungkinkan akses dari semua origin
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Metode yang diizinkan
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Header yang diizinkan

  // Menangani permintaan OPTIONS (preflight request)
  if (request.method === 'OPTIONS') {
    // Mengembalikan 204 No Content untuk OPTIONS request
    return new NextResponse(null, { status: 204 });
  }

  return response;
}

// Konfigurasi untuk middleware agar berjalan di semua path
export const config = {
  matcher: ['/*'], // Pastikan ini menangani semua path
};
