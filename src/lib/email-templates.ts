/**
 * Generates a premium, responsive HTML email template for Client Core OTP verification.
 * Supports "forget-password" and generic OTP types with localized style/content.
 */
export function generateOtpEmailHtml(otp: string, type: string): string {
  const isForgetPassword = type === "forget-password";
  
  // Custom texts based on the action type
  const title = isForgetPassword ? "Reset your password" : "Verify your identity";
  const subtitle = isForgetPassword
    ? "Reset code for your account"
    : "One-Time Password (OTP) for sign-in";
  
  const introText = isForgetPassword
    ? "We received a request to reset your password. Use the following verification code to complete the process:"
    : "To complete your sign-in, please use the following one-time password (OTP) code:";
  
  const warningText = isForgetPassword
    ? "If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged."
    : "If you did not attempt to sign in to your account, you can safely ignore this email.";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>${title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        margin: 12px auto !important;
        border-radius: 12px !important;
      }
      .content {
        padding: 24px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; width: 100%; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <div style="background-color: #f8fafc; padding: 24px 0; width: 100%; table-layout: fixed;">
    <!-- Main Email Container -->
    <table class="container" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 560px; max-width: 100%; margin: 24px auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; border-collapse: separate; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); overflow: hidden;">
      
      <!-- Header Banner -->
      <tr>
        <td style="padding: 32px 32px 20px 32px; border-bottom: 1px solid #f1f5f9;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="left" style="vertical-align: middle;">
                <!-- Brand Identity -->
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="display: inline-table; vertical-align: middle;">
                  <tr>
                    <td style="width: 40px; height: 40px; background-color: #2563eb; border-radius: 10px; text-align: center; vertical-align: middle;" align="center">
                      <!-- Stylized Building logo placeholder matching Building2 motif -->
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="margin: 0 auto;">
                        <tr>
                          <td style="color: #ffffff; font-weight: bold; font-size: 20px; font-family: 'Segoe UI', sans-serif; line-height: 1;">C</td>
                        </tr>
                      </table>
                    </td>
                    <td style="padding-left: 12px; font-size: 20px; font-weight: 700; color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1; vertical-align: middle;">
                      Client Core
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Content Area -->
      <tr>
        <td class="content" style="padding: 40px 32px 32px 32px;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
            <!-- Header title -->
            <tr>
              <td style="padding-bottom: 8px;">
                <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #0f172a; line-height: 1.3;">
                  ${title}
                </h1>
              </td>
            </tr>
            <!-- Subtitle/Category -->
            <tr>
              <td style="padding-bottom: 24px;">
                <span style="font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">
                  ${subtitle}
                </span>
              </td>
            </tr>
            <!-- Explanation Text -->
            <tr>
              <td style="padding-bottom: 24px; font-size: 15px; color: #334155; line-height: 1.6;">
                ${introText}
              </td>
            </tr>
            <!-- OTP Display Card -->
            <tr>
              <td align="center" style="padding-bottom: 24px;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #eff6ff; border: 1px dashed #bfdbfe; border-radius: 12px; padding: 24px; text-align: center;">
                  <tr>
                    <td>
                      <!-- Code header label -->
                      <div style="font-size: 12px; font-weight: 600; color: #1e3a8a; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 12px;">Your Verification Code</div>
                      <!-- The Code itself -->
                      <div style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #2563eb; font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier, monospace; margin: 0; line-height: 1;">
                        ${otp}
                      </div>
                      <!-- Expiry notice inside the card -->
                      <div style="font-size: 13px; color: #1e40af; margin-top: 12px;">This code will expire in <strong style="font-weight: 600;">10 minutes</strong>.</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Security Warning -->
            <tr>
              <td style="padding-bottom: 32px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b; line-height: 1.6;">
                <p style="margin: 0 0 8px 0; font-weight: 600; color: #475569;">Security Notice</p>
                <p style="margin: 0 0 8px 0;">For your security, never share this code with anyone. Client Core staff will never ask for this code.</p>
                <p style="margin: 0;">${warningText}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer Section -->
      <tr>
        <td style="padding: 24px 32px 32px 32px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" align="center">
            <tr>
              <td align="center" style="font-size: 13px; color: #94a3b8; line-height: 1.5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <div style="font-weight: 600; color: #64748b; margin-bottom: 4px;">Client Core</div>
                <div style="margin-bottom: 16px;">Secure Workspace Portal</div>
                <div style="font-size: 11px;">
                  This is an automated security transmission. Replies to this email are not monitored.<br>
                  &copy; 2026 Client Core. All rights reserved.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      
    </table>
  </div>
</body>
</html>`;
}
