// import { NextRequest, NextResponse } from 'next/server';
// import axios from 'axios';

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { jobId, userId } = body;

//     if (!jobId || !userId) {
//       return NextResponse.json(
//         { error: 'jobId and userId are required' },
//         { status: 400 }
//       );
//     }

//     // Call your backend API
//     const backendUrl = process.env.BACKEND_URL + '/jobs/apply';

//     const response = await axios.post(backendUrl, { jobId, userId });

//     return NextResponse.json(response.data, { status: response.status });
//   } catch (err: any) {
//     console.error('Error in frontend API route /jobs/apply:', err.message);
//     return NextResponse.json(
//       { error: err.response?.data?.error || 'Internal server error' },
//       { status: err.response?.status || 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

    const res = await axios.post(`${backendUrl}/jobs/apply`, body, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (err: any) {
    console.error('Error in frontend apply route:', err.response?.data || err.message);
    return NextResponse.json(
      { error: err.response?.data?.error || 'Failed to apply for job' },
      { status: err.response?.status || 500 }
    );
  }
}
