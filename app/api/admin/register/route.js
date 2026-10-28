import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { superAdminCreateUser, loginAdminUser, validateAdminSession } from '../../../../lib/betterAuth.js';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, username, password, confirmPassword, adminSecret, superAdminKey, role = 'admin' } = body;

    if (!name || !email || !username || !password) {
      return NextResponse.json(
        { success: false, error: 'All fields (name, email, username, password) are required.' },
        { status: 400 }
      );
    }

    if (confirmPassword && password !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'Passwords do not match. Please verify and re-enter.' },
        { status: 400 }
      );
    }

    // Check if requester is an active Super Admin session
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('admin_session');
    let actorUserId = null;
    let isSuperAdminSession = false;

    if (sessionCookie?.value) {
      const sessionData = await validateAdminSession(sessionCookie.value);
      if (sessionData?.user?.role === 'superadmin') {
        actorUserId = sessionData.user.id;
        isSuperAdminSession = true;
      }
    }

    const providedSecret = adminSecret || superAdminKey;

    // 1. Create user through Super Admin security check
    const newUser = await superAdminCreateUser({
      name,
      email,
      username,
      password,
      role: role === 'superadmin' ? 'superadmin' : 'admin',
      actorUserId,
      adminSecret: providedSecret
    });

    // If a Super Admin is generating the account from inside their session, do NOT replace the Super Admin's cookie!
    if (isSuperAdminSession) {
      return NextResponse.json({
        success: true,
        message: `Administrator @${newUser.username} (${newUser.name}) successfully generated and saved to the database.`,
        user: newUser
      }, { status: 201 });
    }

    // If generated with adminSecret from the registration page, establish session for the new admin
    const userAgent = request.headers.get('user-agent') || '';
    const forwardedFor = request.headers.get('x-forwarded-for') || '';
    const ipAddress = forwardedFor.split(',')[0].trim() || '127.0.0.1';

    const loginResult = await loginAdminUser({
      identifier: newUser.username,
      password,
      userAgent,
      ipAddress,
      rememberMe: true
    });

    cookieStore.set('admin_session', loginResult.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return NextResponse.json({
      success: true,
      message: 'Administrator registration verified by Super Admin authorization! Welcome to LEnSE.',
      user: loginResult.user
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    const status = error.message?.includes('Permission denied') ? 403 : 400;
    return NextResponse.json(
      { success: false, error: error.message || 'Registration failed. Please check your details.' },
      { status }
    );
  }
}
