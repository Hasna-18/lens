import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateAdminSession } from '../../../../lib/betterAuth.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('admin_session');

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(
        { authenticated: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const sessionData = await validateAdminSession(sessionCookie.value);

    if (sessionData && sessionData.user) {
      return NextResponse.json({
        authenticated: true,
        user: sessionData.user
      });
    }

    return NextResponse.json(
      { authenticated: false, error: 'Session expired or invalid' },
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
