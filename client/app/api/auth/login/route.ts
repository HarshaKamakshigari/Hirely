import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Replace with your backend URL
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000/api/auth/login';

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include', // send cookies if needed
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}