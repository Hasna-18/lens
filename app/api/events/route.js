import { NextResponse } from 'next/server';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../../../lib/db';
import { slugify } from '../../../lib/slug';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const events = await getEvents();
    return NextResponse.json(events, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.warn('DB offline or unreachable, returning empty list:', error.message);
    return NextResponse.json([], { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      }
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body.title || !String(body.title).trim()) {
      return NextResponse.json({ error: 'Event title is required' }, { status: 400 });
    }

    const d = new Date();
    const defaultDay = String(d.getDate());
    const defaultMonth = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const defaultYear = String(d.getFullYear());

    const sanitizedPayload = {
      title: String(body.title).trim(),
      slug: body.slug ? slugify(body.slug) : slugify(body.title),
      subtitle: body.subtitle || '',
      dateDay: String(body.dateDay || defaultDay).trim(),
      dateMonth: String(body.dateMonth || defaultMonth).toUpperCase().trim(),
      dateYear: String(body.dateYear || defaultYear).trim(),
      category: String(body.category || 'CONFERENCE').toUpperCase().trim(),
      imageUrl: body.imageUrl && String(body.imageUrl).trim() ? String(body.imageUrl).trim() : '/events/e1.png',
      filterType: body.filterType || 'Conferences',
      details: body.details || {}
    };

    const newEvent = await addEvent(sanitizedPayload);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error adding event:', error);
    return NextResponse.json({ error: error.message || 'Failed to add event to database' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const targetId = body.id || body.slug;
    if (!targetId) {
      return NextResponse.json({ error: 'Event ID or slug is required for update' }, { status: 400 });
    }

    const sanitizedPayload = {
      ...body,
      title: body.title ? String(body.title).trim() : undefined,
      slug: body.slug ? slugify(body.slug) : (body.title ? slugify(body.title) : undefined),
      subtitle: body.subtitle !== undefined ? body.subtitle : '',
      dateDay: body.dateDay ? String(body.dateDay).trim() : undefined,
      dateMonth: body.dateMonth ? String(body.dateMonth).toUpperCase().trim() : undefined,
      dateYear: body.dateYear ? String(body.dateYear).trim() : undefined,
      category: body.category ? String(body.category).toUpperCase().trim() : undefined,
      imageUrl: body.imageUrl && String(body.imageUrl).trim() ? String(body.imageUrl).trim() : '/events/e1.png',
      filterType: body.filterType || 'Conferences',
      details: body.details || {}
    };

    const updated = await updateEvent(targetId, sanitizedPayload);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ error: error.message || 'Failed to update event in database' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id') || searchParams.get('slug');

    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body.id || body.slug;
    }

    if (!id) {
      return NextResponse.json({ error: 'Event ID or slug is required' }, { status: 400 });
    }

    const res = await deleteEvent(id);
    return NextResponse.json(res);
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete event from database' }, { status: 500 });
  }
}
