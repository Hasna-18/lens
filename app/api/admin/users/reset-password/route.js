import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateAdminSession, superAdminResetPassword } from '../../../../../lib/betterAuth.js';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('admin_session');

    if (!sessionCookie?.value) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Active administrator session required.' },
        { status: 401 }
      );
    }

    const sessionData = await validateAdminSession(sessionCookie.value);
    if (!sessionData?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Session expired or invalid.' },
        { status: 401 }
      );
    }

    if (sessionData.user.role !== 'superadmin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden: Only a Super Administrator has permission to reset administrator passwords.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userId, newPassword, confirmPassword } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Target user ID is required.' },
        { status: 400 }
      );
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'Passwords do not match. Please verify both fields.' },
        { status: 400 }
      );
    }

    const result = await superAdminResetPassword({
      targetUserId: userId,
      newPassword,
      actorUserId: sessionData.user.id
    });

    return NextResponse.json({
      success: true,
      message: result.message
    });

  } catch (error) {
    console.error('Super Admin Reset Password Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to reset password.' },
      { status: 500 }
    );
  }
}

