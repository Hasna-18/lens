const MONTH_NAMES = {
  jan: 1, january: 1,
  feb: 2, february: 2,
  mar: 3, march: 3,
  apr: 4, april: 4,
  may: 5,
  jun: 6, june: 6,
  jul: 7, july: 7,
  aug: 8, august: 8,
  sep: 9, september: 9, sept: 9,
  oct: 10, october: 10,
  nov: 11, november: 11,
  dec: 12, december: 12
};

/**
 * Extracts a numeric timestamp or comparative date value for an event
 */
export function parseEventTimestamp(event) {
  if (!event) return 0;

  // 1. Try explicit year
  const rawYear = String(event.dateYear || event.date_year || event.year || '').replace(/[^\d]/g, '');
  let year = parseInt(rawYear, 10);

  // If year not in year field, look in day/month strings for a 4-digit year (e.g. 2025, 2026)
  if (!year || isNaN(year) || year < 1900) {
    const rawAll = `${event.dateDay || ''} ${event.dateMonth || ''} ${event.dateYear || ''}`;
    const matchYear = rawAll.match(/\b(20\d\d)\b/);
    if (matchYear) year = parseInt(matchYear[1], 10);
  }

  // 2. Try month
  const rawMonth = String(event.dateMonth || event.date_month || event.month || '').trim().toLowerCase();
  let month = MONTH_NAMES[rawMonth] || 0;
  if (!month) {
    for (const [mName, mNum] of Object.entries(MONTH_NAMES)) {
      if (rawMonth.includes(mName)) {
        month = mNum;
        break;
      }
    }
  }
  // Check day string if month wasn't in month field (e.g. dateDay: 'APR-MAY')
  const rawDay = String(event.dateDay || event.date_day || event.day || '').trim().toLowerCase();
  if (!month) {
    for (const [mName, mNum] of Object.entries(MONTH_NAMES)) {
      if (rawDay.includes(mName)) {
        month = mNum;
        break;
      }
    }
  }

  // 3. Try day number
  const matchDay = rawDay.match(/\b([1-9]|[12]\d|3[01])\b/);
  const day = matchDay ? parseInt(matchDay[1], 10) : 1;

  if (year && year >= 1900) {
    const validMonth = month > 0 ? month - 1 : 0;
    return new Date(year, validMonth, day).getTime();
  }

  // 4. Try created_at timestamp
  if (event.created_at || event.createdAt) {
    const t = new Date(event.created_at || event.createdAt).getTime();
    if (!isNaN(t)) return t;
  }

  return 0;
}

/**
 * Sort events so that the latest event is always first (at index 0 / top of the list)
 */
export function sortEventsLatestFirst(events) {
  if (!Array.isArray(events)) return [];
  return [...events].sort((a, b) => {
    const timeA = parseEventTimestamp(a);
    const timeB = parseEventTimestamp(b);
    if (timeA !== timeB && timeA > 0 && timeB > 0) {
      return timeB - timeA; // Latest event date first
    }
    const idA = Number(a.id) || 0;
    const idB = Number(b.id) || 0;
    return idB - idA; // Highest ID / latest created first
  });
}
