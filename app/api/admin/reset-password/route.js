import { NextResponse } from 'next/server';
import { completePasswordReset } from '../../../../lib/betterAuth.js';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { token, code, tokenOrCode, newPassword, confirmPassword } = body;

    const resetIdentifier = tokenOrCode || token || code;

    if (!resetIdentifier || !resetIdentifier.trim()) {
      return NextResponse.json(
        { success: false, error: 'Reset code or security token is required.' },
        { status: 400 }
      );
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'Passwords do not match. Please try again.' },
        { status: 400 }
      );
    }

    const result = await completePasswordReset({
      tokenOrCode: resetIdentifier.trim(),
      newPassword
    });

    return NextResponse.json({
      success: true,
      message: result.message || 'Your password has been reset successfully. You can now log in.'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Password reset failed. Invalid or expired token.' },
      { status: 400 }
    );
  }
}
