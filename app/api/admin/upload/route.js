import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { uploadToCloudinary } from '../../../../lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get('admin_session');

    if (!session || !session.value || !session.value.startsWith('authenticated_')) {
      return NextResponse.json({ error: 'Unauthorized: Admin login required' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const categoryRaw = formData.get('category') || 'general';

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Maximum file upload limit: 25MB
    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds maximum allowed 25MB limit' }, { status: 400 });
    }

    // Sanitize category (e.g. events, news, resources, speakers)
    const category = String(categoryRaw).toLowerCase().replace(/[^a-z0-9_-]/g, '') || 'general';
    const originalName = file.name || 'upload.jpg';

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload directly to Cloudinary
    const result = await uploadToCloudinary({
      file: buffer,
      filename: originalName,
      category,
      mimeType: file.type || ''
    });

    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
      filename: originalName,
      category,
      size: result.size,
      format: result.format,
      resourceType: result.resourceType
    });
  } catch (error) {
    console.error('Cloudinary upload failed in API route:', error);
    return NextResponse.json(
      { error: 'Cloudinary upload failed: ' + (error.message || 'Unknown error') },
      { status: 500 }
    );
  }
}
