import crypto from 'crypto';

/**
 * Cloudinary Upload Helper using native Node.js fetch and crypto
 * Supports images and raw documents (PDF, DOCX, ZIP, etc.)
 */

function getCloudinaryCredentials() {
  const url = process.env.CLOUDINARY_URL;
  if (!url) {
    throw new Error('CLOUDINARY_URL environment variable is not configured.');
  }

  try {
    const parsed = new URL(url);
    const cloudName = parsed.hostname;
    const apiKey = parsed.username;
    const apiSecret = parsed.password;

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error('Invalid CLOUDINARY_URL format. Expected cloudinary://<api_key>:<api_secret>@<cloud_name>');
    }

    return { cloudName, apiKey, apiSecret };
  } catch (err) {
    throw new Error(`Failed to parse CLOUDINARY_URL: ${err.message}`);
  }
}

/**
 * Uploads a file buffer or base64 string to Cloudinary.
 *
 * @param {Object} options
 * @param {Buffer|Uint8Array|string} options.file - Buffer, Uint8Array, or base64 data string
 * @param {string} options.filename - Original filename
 * @param {string} [options.category='general'] - Subfolder under universe/ (e.g. events, news, resources, speakers)
 * @param {string} [options.mimeType=''] - File MIME type
 * @returns {Promise<{ success: boolean, url: string, publicId: string, format: string, size: number }>}
 */
export async function uploadToCloudinary({ file, filename = 'upload.jpg', category = 'general', mimeType = '' }) {
  const { cloudName, apiKey, apiSecret } = getCloudinaryCredentials();

  // Normalize category
  const cleanCategory = String(category).toLowerCase().replace(/[^a-z0-9_-]/g, '') || 'general';
  const folder = `universe/${cleanCategory}`;

  // Sanitize filename & public_id
  const originalExt = filename.includes('.') ? filename.substring(filename.lastIndexOf('.')).toLowerCase() : '';
  const cleanBase = filename.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9_-]/g, '-').substring(0, 40) || 'file';
  const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  // Determine resource type:
  // For raw documents like PDF, preserve extension in public_id
  const isPdfOrDoc =
    mimeType.includes('pdf') ||
    mimeType.includes('document') ||
    mimeType.includes('zip') ||
    originalExt === '.pdf' ||
    originalExt === '.docx' ||
    originalExt === '.doc' ||
    originalExt === '.zip';

  const resourceType = isPdfOrDoc ? 'raw' : 'image';
  const publicId = isPdfOrDoc ? `${cleanBase}_${uniqueId}${originalExt}` : `${cleanBase}_${uniqueId}`;

  const timestamp = Math.round(new Date().getTime() / 1000);

  // Parameters to sign (alphabetically sorted): folder, public_id, timestamp
  const paramsToSign = {
    folder: folder,
    public_id: publicId,
    timestamp: timestamp
  };

  const sortedKeys = Object.keys(paramsToSign).sort();
  const signString = sortedKeys.map(k => `${k}=${paramsToSign[k]}`).join('&') + apiSecret;
  const signature = crypto.createHash('sha1').update(signString).digest('hex');

  // Build FormData
  const formData = new FormData();

  if (typeof file === 'string' && file.startsWith('data:')) {
    formData.append('file', file);
  } else {
    const blob = new Blob([file], { type: mimeType || (isPdfOrDoc ? 'application/pdf' : 'image/jpeg') });
    formData.append('file', blob, filename);
  }

  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('folder', folder);
  formData.append('public_id', publicId);
  formData.append('signature', signature);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const res = await fetch(endpoint, {
    method: 'POST',
    body: formData
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    const errMsg = data.error?.message || `Cloudinary upload failed with HTTP status ${res.status}`;
    console.error('Cloudinary API error:', errMsg);
    throw new Error(errMsg);
  }

  return {
    success: true,
    url: data.secure_url,
    publicId: data.public_id,
    format: data.format || originalExt.replace('.', ''),
    size: data.bytes || (Buffer.isBuffer(file) ? file.length : 0),
    resourceType: data.resource_type
  };
}
