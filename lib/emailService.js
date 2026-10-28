import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Mask an email address for safe public/client display
 * e.g., 'administrator@keralauniversity.ac.in' -> 'ad*********r@keralauniversity.ac.in'
 */
export function maskEmail(email) {
  if (!email || typeof email !== 'string') return '';
  const parts = email.trim().split('@');
  if (parts.length !== 2) return email;

  const [local, domain] = parts;
  if (local.length <= 2) {
    return `${local[0] || '*'}***@${domain}`;
  }

  const firstChar = local[0];
  const lastChar = local[local.length - 1];
  const maskedMiddle = '*'.repeat(Math.min(local.length - 2, 6));

  return `${firstChar}${maskedMiddle}${lastChar}@${domain}`;
}

/**
 * Creates and caches the nodemailer transporter
 */
let transporter = null;

function getTransporter() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (host && user && pass) {
    if (!transporter) {
      transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    }
    return transporter;
  }

  return null;
}

/**
 * Sends a secure Password Reset OTP email to the registered recipient
 */
export async function sendPasswordResetOtpEmail({ to, name, code, expiresMinutes = 15 }) {
  if (!to) {
    throw new Error('Recipient email address is required.');
  }
  if (!code) {
    throw new Error('Verification code is required.');
  }

  const recipientName = name ? name.trim() : 'Administrator';
  const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER || 'LEnSE Security <noreply@keralauniversity.ac.in>';

  const subject = `[LEnSE Portal] Your Password Reset Verification Code: ${code}`;

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LEnSE Password Reset Verification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f7ff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f0f7ff; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="540" cellspacing="0" cellpadding="0" border="0" style="max-width: 540px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(15, 26, 58, 0.08); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f1a3a 0%, #009ab1 100%); padding: 32px 36px; text-align: center;">
              <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: 0.05em;">
                LEn<span style="font-style: italic; color: #60a5fa;">SE</span>
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: rgba(255, 255, 255, 0.85); font-weight: 600;">
                Centre for Learning Engineering &amp; Sustainability Education
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 36px 36px 28px 36px;">
              <div style="display: inline-block; padding: 4px 12px; background-color: #eff6ff; border-radius: 999px; border: 1px solid #bfdbfe; margin-bottom: 16px;">
                <span style="font-size: 11px; font-weight: 700; color: #009ab1; letter-spacing: 0.12em; text-transform: uppercase;">
                  Administrator Security
                </span>
              </div>

              <h2 style="margin: 0 0 14px 0; font-size: 20px; font-weight: 700; color: #0f1a3a; line-height: 1.3;">
                Password Reset Verification
              </h2>

              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #475569;">
                Hello <strong>${recipientName}</strong>,<br><br>
                We received a request to reset the administrator password for your account associated with <strong>${maskEmail(to)}</strong>.
              </p>

              <!-- OTP Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 24px 0; background: linear-gradient(135deg, #f8fafc 0%, #f0f7ff 100%); border: 1.5px dashed #009ab1; border-radius: 14px; text-align: center;">
                <tr>
                  <td style="padding: 24px 20px;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #64748b; margin-bottom: 8px;">
                      Your One-Time Verification Code (OTP)
                    </div>
                    <div style="font-size: 36px; font-family: 'Courier New', Courier, monospace; font-weight: 900; letter-spacing: 0.28em; color: #0f1a3a; text-indent: 0.28em;">
                      ${code}
                    </div>
                    <div style="margin-top: 10px; font-size: 12px; font-weight: 600; color: #dc2626;">
                      Expires in ${expiresMinutes} minutes
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 16px 0; font-size: 13px; line-height: 1.6; color: #64748b;">
                Enter this verification code on the administrator password reset screen to choose your new password.
              </p>

              <div style="margin: 24px 0 0 0; padding: 14px 16px; background-color: #fef2f2; border-left: 4px solid #ef4444; border-radius: 6px;">
                <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #991b1b; font-weight: 500;">
                  <strong>Important Security Notice:</strong> If you did not request a password reset, please disregard this email. Your password will remain unchanged and your account is secure. Never share this code with anyone.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 36px; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #94a3b8; font-weight: 500;">
                LEnSE Portal &bull; University of Kerala, Thiruvananthapuram
              </p>
              <p style="margin: 0; font-size: 10px; color: #cbd5e1;">
                This is an automated security transmission. Please do not reply directly to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const textBody = `
[LEnSE Portal] Password Reset Verification Code

Hello ${recipientName},

We received a request to reset your administrator password.

Your One-Time Verification Code (OTP) is:
${code}

This code is valid for ${expiresMinutes} minutes.

If you did not request this password reset, please ignore this email. Your account remains secure.

--
LEnSE Portal
University of Kerala, Thiruvananthapuram
  `.trim();

  const mailTransporter = getTransporter();

  if (mailTransporter) {
    try {
      const info = await mailTransporter.sendMail({
        from: fromAddress,
        to,
        subject,
        text: textBody,
        html: htmlBody
      });
      console.log(`[EMAIL SERVICE] OTP successfully delivered to ${to} (MessageId: ${info.messageId})`);
      return {
        delivered: true,
        provider: 'smtp',
        messageId: info.messageId
      };
    } catch (sendErr) {
      console.error(`[EMAIL SERVICE] SMTP send failed to ${to}:`, sendErr.message);
      // Fall through to simulate/log so admin isn't completely locked out during setup
      console.log(`[EMAIL SERVICE FALLBACK] OTP for ${to}: [${code}]`);
      return {
        delivered: false,
        provider: 'fallback',
        error: sendErr.message
      };
    }
  } else {
    // No SMTP configured in environment
    console.log(`----------------------------------------------------------------`);
    console.log(`[EMAIL SERVICE NOTICE] SMTP credentials not set in .env.`);
    console.log(`[EMAIL SERVICE] Password reset OTP generated for ${to}: [${code}]`);
    console.log(`[EMAIL SERVICE] To send real emails, set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in lens/.env`);
    console.log(`----------------------------------------------------------------`);
    return {
      delivered: false,
      provider: 'development-simulation',
      note: 'SMTP credentials not configured in environment.'
    };
  }
}

