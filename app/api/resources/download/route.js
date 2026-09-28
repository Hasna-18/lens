import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getResources } from '../../../../lib/db';

export const dynamic = 'force-dynamic';

function generateOfficialPdf(title, category, date, desc, customBadge) {
  const safeTitle = (title || 'Academic Resource').replace(/[()\\]/g, '');
  const safeCat = (category || 'Academic Publication').replace(/[()\\]/g, '');
  const safeDate = (date || '2025').replace(/[()\\]/g, '');
  const safeBadge = (customBadge || 'LEnSE').replace(/[()\\]/g, '');
  const safeDesc = (desc || 'Official academic document publication published by Centre for Learning Engineering and Sustainability Education (LEnSE), University of Kerala.').replace(/[()\\]/g, '');

  const descLines = [];
  const words = safeDesc.split(' ');
  let curLine = '';
  for (const w of words) {
    if ((curLine + ' ' + w).length > 70) {
      descLines.push(curLine.trim());
      curLine = w;
    } else {
      curLine += ' ' + w;
    }
  }
  if (curLine) descLines.push(curLine.trim());

  let streamContent = `BT\n` +
    `/F1 22 Tf\n` +
    `50 780 Td\n` +
    `(LEnSE - University of Kerala) Tj\n` +
    `/F2 12 Tf\n` +
    `0 -24 Td\n` +
    `(Centre for Learning Engineering & Sustainability Education) Tj\n` +
    `/F1 15 Tf\n` +
    `0 -45 Td\n` +
    `(${safeTitle.substring(0, 65)}) Tj\n`;

  if (safeTitle.length > 65) {
    streamContent += `/F1 15 Tf\n0 -20 Td\n(${safeTitle.substring(65, 130)}) Tj\n`;
  }

  streamContent += `/F2 11 Tf\n` +
    `0 -28 Td\n` +
    `([${safeBadge}] Category: ${safeCat}   |   Publication Date: ${safeDate}) Tj\n` +
    `/F2 11 Tf\n` +
    `0 -35 Td\n` +
    `(DOCUMENT OVERVIEW & ABSTRACT:) Tj\n` +
    `/F2 10 Tf\n` +
    `0 -20 Td\n`;

  for (const line of descLines.slice(0, 6)) {
    streamContent += `(${line}) Tj\n0 -16 Td\n`;
  }

  streamContent += `0 -25 Td\n` +
    `/F1 11 Tf\n` +
    `(Key Highlights & Academic Significance:) Tj\n` +
    `/F2 10 Tf\n` +
    `0 -18 Td\n` +
    `(- Rigorously peer-reviewed curriculum benchmarks for STEM education) Tj\n` +
    `0 -16 Td\n` +
    `(- Open-access knowledge framework published under CC-BY 4.0 license) Tj\n` +
    `0 -16 Td\n` +
    `(- Faculty mentorship and experiential learning resources) Tj\n` +
    `0 -40 Td\n` +
    `/F2 9 Tf\n` +
    `(University of Kerala, Kariavattom Campus, Thiruvananthapuram - 695581, Kerala, India) Tj\n` +
    `0 -14 Td\n` +
    `(Website: https://lense.keralauniversity.ac.in   |   Email: lenseedu24@gmail.com) Tj\n` +
    `ET\n`;

  const streamBuffer = Buffer.from(streamContent);
  const streamLength = streamBuffer.length;

  const pdfTemplate =
    `%PDF-1.4\n` +
    `1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n` +
    `2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n` +
    `3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 595.28 841.89]/Contents 4 0 R/Resources<</Font<</F1 5 0 R/F2 6 0 R>>>>>>endobj\n` +
    `4 0 obj<</Length ${streamLength}>>stream\n` +
    streamContent +
    `endstream\n` +
    `endobj\n` +
    `5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica-Bold>>endobj\n` +
    `6 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\n` +
    `xref\n` +
    `0 7\n` +
    `0000000000 65535 f \n` +
    `0000000009 00000 n \n` +
    `0000000058 00000 n \n` +
    `0000000115 00000 n \n` +
    `0000000244 00000 n \n` +
    `0000000750 00000 n \n` +
    `0000000822 00000 n \n` +
    `trailer<</Size 7/Root 1 0 R>>\n` +
    `startxref\n` +
    `890\n` +
    `%%EOF`;

  return Buffer.from(pdfTemplate);
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const customUrl = searchParams.get('url');
    const mode = searchParams.get('mode') === 'download' ? 'download' : 'preview';

    let resource = null;
    let rawUrl = customUrl || '';

    // If ID or slug is supplied, find resource from database
    if (id || slug) {
      try {
        const allResources = await getResources();
        if (Array.isArray(allResources)) {
          resource = allResources.find(
            (r) => String(r.id) === String(id) || r.slug === slug
          );
        }
      } catch (dbErr) {
        console.warn('Could not query DB for resource download:', dbErr);
      }
    }

    if (resource && !rawUrl) {
      rawUrl = resource.downloadUrl || resource.download_url || '';
    }

    if (!rawUrl || rawUrl === '#' || rawUrl.trim() === '') {
      return NextResponse.json(
        { error: 'No PDF document has been uploaded for this resource.' },
        { status: 404 }
      );
    }

    const title = resource?.title || 'academic-resource';
    const cleanFilename = title
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 50) + '.pdf';

    const disposition = mode === 'download'
      ? `attachment; filename="${cleanFilename}"`
      : `inline; filename="${cleanFilename}"`;

    // 1. Check if rawUrl points to a local file in public/
    if (rawUrl.startsWith('/') || rawUrl.startsWith('public/')) {
      const relativePath = rawUrl.replace(/^\//, '');
      const localFilePath = path.join(process.cwd(), 'public', relativePath.replace(/^public\//, ''));

      if (fs.existsSync(localFilePath)) {
        const fileBuffer = fs.readFileSync(localFilePath);
        const isDocx = cleanFilename.endsWith('.docx') || rawUrl.endsWith('.docx');
        const isZip = cleanFilename.endsWith('.zip') || rawUrl.endsWith('.zip');
        const contentType = isDocx
          ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          : isZip
          ? 'application/zip'
          : 'application/pdf';

        return new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            'Content-Type': contentType,
            'Content-Disposition': disposition,
            'Content-Length': fileBuffer.length.toString(),
            'Cache-Control': 'public, max-age=3600'
          }
        });
      }
    }

    // 2. Check if rawUrl is an external/Cloudinary URL
    if (rawUrl.startsWith('http')) {
      try {
        const remoteRes = await fetch(rawUrl);
        if (remoteRes.ok) {
          const contentType = remoteRes.headers.get('content-type') || 'application/pdf';
          const arrayBuffer = await remoteRes.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          return new NextResponse(buffer, {
            status: 200,
            headers: {
              'Content-Type': contentType.includes('pdf') ? 'application/pdf' : contentType,
              'Content-Disposition': disposition,
              'Content-Length': buffer.length.toString(),
              'Cache-Control': 'public, max-age=3600'
            }
          });
        }
      } catch (remoteErr) {
        console.warn('Could not fetch remote URL:', remoteErr);
      }
    }

    return NextResponse.json(
      { error: 'The requested PDF file could not be found or is not available.' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Resource download error:', error);
    return NextResponse.json({ error: 'Failed to process resource download' }, { status: 500 });
  }
}
