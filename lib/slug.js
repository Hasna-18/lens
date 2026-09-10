/**
 * Utility functions for generating and validating URL-friendly slugs
 */

export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Replace accented characters
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace non-alphanumeric chars with hyphen
    .replace(/[^a-z0-9\s-]/g, '')
    // Replace spaces, underscores and multiple hyphens with a single hyphen
    .replace(/[\s_-]+/g, '-')
    // Trim hyphens from ends
    .replace(/^-+|-+$/g, '')
    // Limit length to 100 chars
    .substring(0, 100);
}

/**
 * Ensures a slug is unique in a given table. If a duplicate exists, appends -1, -2, etc.
 * @param {import('pg').Pool} pool - pg pool
 * @param {'events' | 'news' | 'resources'} table - target table
 * @param {string} baseSlug - candidate slug
 * @param {number|string|null} currentId - id of record being updated (to exclude self)
 * @returns {Promise<string>} unique slug
 */
export async function generateUniqueSlug(pool, table, baseSlug, currentId = null) {
  let slug = slugify(baseSlug) || `${table}-${Date.now()}`;
  let query = `SELECT id FROM ${table} WHERE slug = $1`;
  const params = [slug];

  if (currentId) {
    query += ` AND id != $2`;
    params.push(currentId);
  }

  const res = await pool.query(query, params);
  if (res.rows.length === 0) {
    return slug;
  }

  // If collision exists, find next available suffix
  let counter = 1;
  let candidate = `${slug}-${counter}`;
  while (true) {
    const checkQuery = currentId
      ? `SELECT id FROM ${table} WHERE slug = $1 AND id != $2`
      : `SELECT id FROM ${table} WHERE slug = $1`;
    const checkParams = currentId ? [candidate, currentId] : [candidate];
    const checkRes = await pool.query(checkQuery, checkParams);
    if (checkRes.rows.length === 0) {
      return candidate;
    }
    counter++;
    candidate = `${slug}-${counter}`;
  }
}
