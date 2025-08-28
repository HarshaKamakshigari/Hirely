import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  // Adjust the backend URL as needed
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000/api/users/all';

  try {
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
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