import { NextResponse } from 'next/server';
import { addEnquiry, getEnquiries, deleteEnquiry, markEnquiryAsRead } from '@/lib/db';

export async function GET() {
  try {
    const enquiries = await getEnquiries();
    return NextResponse.json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const newEnquiry = await addEnquiry({
      name: data.name,
      email: data.email,
      organization: data.organization,
      subject: data.subject,
      message: data.message
    });

    return NextResponse.json(newEnquiry, { status: 201 });
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    if (data.action === 'mark_read' && data.id) {
      const updated = await markEnquiryAsRead(data.id);
      return NextResponse.json(updated);
    }
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update enquiry" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    await deleteEnquiry(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete enquiry" }, { status: 500 });
  }
}
