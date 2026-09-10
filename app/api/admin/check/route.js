import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get('admin_session');

    if (session && session.value && session.value.startsWith('authenticated_')) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      return NextResponse.json({
        authenticated: true,
        user: { username }
      });
    }

    return NextResponse.json(
      { authenticated: false, error: 'Unauthorized' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Failed to verify session' },
      { status: 500 }
    );
  }
}
