import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
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
    const originalName = file.name || 'upload.pdf';
    const isDoc =
      originalName.toLowerCase().endsWith('.pdf') ||
      originalName.toLowerCase().endsWith('.docx') ||
      originalName.toLowerCase().endsWith('.doc') ||
      originalName.toLowerCase().endsWith('.zip') ||
      (file.type && (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('zip'))) ||
      category === 'resources';

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // For PDF/Documents or Resources, save locally to public/admin/resources for direct 200 OK access
    if (isDoc) {
      const ext = originalName.includes('.') ? originalName.substring(originalName.lastIndexOf('.')).toLowerCase() : '.pdf';
      const cleanBase = originalName
        .replace(/\.[^/.]+$/, '')
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '-')
        .substring(0, 40) || 'document';
      const uniqueFilename = `${cleanBase}_${Date.now()}${ext}`;

      const uploadDir = path.join(process.cwd(), 'public', 'admin', 'resources');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, uniqueFilename);
      fs.writeFileSync(filePath, buffer);

      const localUrl = `/admin/resources/${uniqueFilename}`;

      return NextResponse.json({
        success: true,
        url: localUrl,
        publicId: uniqueFilename,
        filename: originalName,
        category,
        size: buffer.length,
        format: ext.replace('.', ''),
        resourceType: 'raw'
      });
    }

    // For images, upload directly to Cloudinary
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
    console.error('Upload failed in API route:', error);
    return NextResponse.json(
      { error: 'Upload failed: ' + (error.message || 'Unknown error') },
      { status: 500 }
    );
  }
}

