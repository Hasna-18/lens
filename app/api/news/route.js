import { NextResponse } from 'next/server';
import { getNews, addNews, updateNews, deleteNews } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getNews();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const data = await addNews(body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const targetId = body.id || body.slug;
    if (!targetId) throw new Error("ID or slug is required");
    const data = await updateNews(targetId, body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || searchParams.get('slug');
    if (!id) throw new Error("ID or slug is required");
    const data = await deleteNews(id);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
