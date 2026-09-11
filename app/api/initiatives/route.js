import { NextResponse } from 'next/server';
import { getInitiatives, addInitiative } from '@/lib/db';

export async function GET() {
  try {
    const initiatives = await getInitiatives();
    return NextResponse.json(initiatives, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
      }
    });
  } catch (error) {
    console.error('API Error fetching initiatives:', error);
    return NextResponse.json(
      { error: 'Failed to fetch initiatives' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    if (!data.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }
    const newInitiative = await addInitiative(data);
    return NextResponse.json(newInitiative, { status: 201 });
  } catch (error) {
    console.error('API Error creating initiative:', error);
    return NextResponse.json(
      { error: 'Failed to create initiative' },
      { status: 500 }
    );
  }
}
