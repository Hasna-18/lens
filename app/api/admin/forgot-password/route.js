import { NextResponse } from 'next/server';
import { initiatePasswordReset } from '../../../../lib/betterAuth.js';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const identifier = body.email || body.username || body.identifier;

    if (!identifier || !identifier.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please enter your registered email address or username.' },
        { status: 400 }
      );
    }

    const resetData = await initiatePasswordReset(identifier);

    return NextResponse.json({
      success: true,
      message: `Password reset verification code generated for ${resetData.email}. Use the code below or the security token to reset your password.`,
      email: resetData.email,
      username: resetData.username,
      code: resetData.code,
      token: resetData.token,
      expiresAt: resetData.expiresAt
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Unable to process password reset request.' },
      { status: 400 }
    );
  }
}
