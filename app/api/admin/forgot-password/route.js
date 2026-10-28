import { NextResponse } from 'next/server';
import { initiatePasswordReset } from '../../../../lib/betterAuth.js';
import { sendPasswordResetOtpEmail, maskEmail } from '../../../../lib/emailService.js';

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

    // 1. Generate code and save securely to database
    const resetData = await initiatePasswordReset(identifier.trim());

    // 2. Dispatch OTP via email to the administrator's registered email
    const emailResult = await sendPasswordResetOtpEmail({
      to: resetData.email,
      name: resetData.name,
      code: resetData.code,
      expiresMinutes: 15
    });

    const masked = maskEmail(resetData.email);

    // 3. Respond with confirmation - STRICTLY NEVER EXPOSING OTP/CODE/TOKEN
    return NextResponse.json({
      success: true,
      message: `A 6-digit verification code has been sent to your registered email (${masked}). Please check your inbox.`,
      maskedEmail: masked,
      username: resetData.username,
      emailDelivered: emailResult.delivered
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Unable to process password reset request.' },
      { status: 400 }
    );
  }
}
