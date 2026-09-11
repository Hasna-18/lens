import { NextResponse } from 'next/server';
import { getInitiativeById, updateInitiative, deleteInitiative } from '@/lib/db';

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const item = await getInitiativeById(id);
    if (!item) {
      return NextResponse.json({ error: 'Initiative not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error('API Error fetching single initiative:', error);
    return NextResponse.json({ error: 'Failed to fetch initiative' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const data = await req.json();
    const updated = await updateInitiative(id, data);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('API Error updating initiative:', error);
    return NextResponse.json({ error: 'Failed to update initiative' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const result = await deleteInitiative(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error deleting initiative:', error);
    return NextResponse.json({ error: 'Failed to delete initiative' }, { status: 500 });
  }
}
