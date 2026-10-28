import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { loginAdminUser } from '../../../../lib/betterAuth.js';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password, rememberMe = true } = body;

    const identifier = username || body.email || body.identifier;
    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: 'Please enter both username/email and password.' },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get('user-agent') || '';
    const forwardedFor = request.headers.get('x-forwarded-for') || '';
    const ipAddress = forwardedFor.split(',')[0].trim() || '127.0.0.1';

    const loginResult = await loginAdminUser({
      identifier,
      password,
      userAgent,
      ipAddress,
      rememberMe: Boolean(rememberMe)
    });

    const cookieStore = cookies();
    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7; // 30 days or 7 days

    cookieStore.set('admin_session', loginResult.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge,
    });

    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      user: loginResult.user
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Invalid username or password.' },
      { status: 401 }
    );
  }
}
