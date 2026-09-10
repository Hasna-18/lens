import { NextResponse } from 'next/server';
import { getNewsById } from '../../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const idOrSlug = params.slug || params.id;
    if (!idOrSlug) {
      return NextResponse.json({ error: "Missing news ID or slug" }, { status: 400 });
    }

    const newsItem = await getNewsById(idOrSlug);
    
    if (!newsItem) {
      return NextResponse.json({ error: "News article not found" }, { status: 404 });
    }

    return NextResponse.json(newsItem);
  } catch (error) {
    console.error('Error fetching news by slug/ID:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch news article' }, { status: 500 });
  }
}
