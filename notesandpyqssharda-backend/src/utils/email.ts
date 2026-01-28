import { transporter } from "../config/email.js";

const EMAIL_FROM =
  process.env.EMAIL_FROM || "Sharda Online Library <shuklanandalal@gmail.com>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "shuklanandalal@gmail.com";

// Clean, professional email wrapper aligned with Sharda Online Library branding
const emailWrapper = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sharda Online Library</title>
</head>
<body style="margin:0;padding:0;background-color:#F3F4F6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="640" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background-color:#ffffff;border-radius:12px;border:1px solid #E5E7EB;box-shadow:0 12px 30px rgba(15,23,42,0.06);">
          <!-- Header -->
          <tr>
            <td style="padding:24px 28px 20px 28px;border-bottom:1px solid #E5E7EB;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-size:18px;font-weight:700;color:#111827;">
                    Sharda Online Library
                  </td>
                  <td align="right" style="font-size:12px;color:#6B7280;">
                    Your academic resource hub
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:32px 28px 28px 28px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 28px 24px 28px;border-top:1px solid #E5E7EB;text-align:center;background-color:#F9FAFB;">
              <p style="margin:0 0 4px 0;font-size:12px;color:#6B7280;">
                © ${new Date().getFullYear()} Sharda Online Library. All rights reserved.
              </p>
              <p style="margin:4px 0 0 0;font-size:11px;color:#9CA3AF;">
                You are receiving this email because you use Sharda Online Library.
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

// Helper function to send email with Nodemailer
async function sendEmail(to: string, subject: string, html: string) {
  try {
    console.log(`📧 Attempting to send email to: ${to}`);
    console.log(`📧 Subject: ${subject}`);

    const mailData = {
      from: EMAIL_FROM,
      to,
      subject,
      html: emailWrapper(html),
    };

    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });

    console.log(`✅ Email sent successfully to: ${to}`);
    console.log(`📬 Message ID: ${(info as any).messageId}`);
    return info;
  } catch (error: any) {
    console.error(`❌ Failed to send email to: ${to}`);
    console.error(`❌ Error details:`, error.message);
    throw error;
  }
}

export async function sendOTPMail(email: string, otp: string) {
  const content = `
    <h2 style="margin:0 0 16px 0;font-size:22px;font-weight:600;color:#111827;">
      Verify your email address
    </h2>
    <p style="margin:0 0 24px 0;font-size:14px;line-height:1.7;color:#4B5563;">
      Use the verification code below to confirm your email for Sharda Online Library.
    </p>
    <div style="margin:0 0 24px 0;padding:18px 24px;border-radius:10px;border:1px solid #E5E7EB;background-color:#F9FAFB;text-align:center;">
      <span style="display:inline-block;font-family:'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:26px;font-weight:700;letter-spacing:10px;color:#4C1D95;">
        ${otp}
      </span>
    </div>
    <p style="margin:0 0 8px 0;font-size:13px;color:#6B7280;">
      This code will expire in <strong>10 minutes</strong>.
    </p>
    <p style="margin:0;font-size:12px;color:#9CA3AF;line-height:1.6;">
      If you did not request this, you can safely ignore this email.
    </p>
  `;

  return sendEmail(email, "Verify Your Email - Sharda Online Library", content);
}

export async function sendWelcomeMail(email: string, name: string) {
  const content = `
    <h2 style="margin:0 0 16px 0;font-size:22px;font-weight:600;color:#111827;">
      Welcome to Sharda Online Library, ${name}
    </h2>
    <p style="margin:0 0 20px 0;font-size:14px;line-height:1.7;color:#4B5563;">
      We're excited to have you on board. Sharda Online Library is built to make your exam preparation and coursework simpler, clearer, and more organized.
    </p>
    <div style="margin:0 0 20px 0;padding:18px 20px;border-radius:10px;background-color:#F9FAFB;border:1px solid #E5E7EB;">
      <p style="margin:0 0 10px 0;font-size:13px;font-weight:600;color:#111827;">
        With your account, you can:
      </p>
      <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.7;color:#4B5563;">
        <li>Browse structured notes for your subjects</li>
        <li>Practice from previous year question papers</li>
        <li>Quickly access syllabus information</li>
        <li>Stay organized throughout the semester</li>
      </ul>
    </div>
    <p style="margin:0;font-size:13px;color:#6B7280;">
      If you have any questions or suggestions, just reply to this email—we'd love to hear from you.
    </p>
  `;

  return sendEmail(email, "Welcome to Sharda Online Library", content);
}

export async function requestForModeratorMail(email: string, name: string) {
  const content = `
    <h2 style="margin:0 0 16px 0;font-size:20px;font-weight:600;color:#111827;">
      New moderator application
    </h2>
    <p style="margin:0 0 20px 0;font-size:14px;line-height:1.7;color:#4B5563;">
      A new user has requested moderator access on Sharda Online Library. Review the details below and take action in the admin dashboard.
    </p>
    <table style="width:100%;border-collapse:collapse;margin:0 0 16px 0;font-size:13px;color:#111827;">
      <tr style="border-bottom:1px solid #E5E7EB;">
        <td style="padding:10px 0;color:#6B7280;width:40%;">Full name</td>
        <td style="padding:10px 0;text-align:right;font-weight:500;">${name}</td>
      </tr>
      <tr style="border-bottom:1px solid #E5E7EB;">
        <td style="padding:10px 0;color:#6B7280;">Email address</td>
        <td style="padding:10px 0;text-align:right;font-weight:500;">${email}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#6B7280;">Submitted on</td>
        <td style="padding:10px 0;text-align:right;font-weight:500;">${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
      </tr>
    </table>
    <p style="margin:12px 0 0 0;font-size:13px;color:#6B7280;">
      Open the moderation dashboard to approve or reject this request.
    </p>
  `;

  return sendEmail(
    process.env.ADMIN_EMAIL!,
    "New Moderator Application",
    content,
  );
}

export async function moderatorApprovalMail(email: string, name: string) {
  const content = `
    <h2 style="margin:0 0 16px 0;font-size:22px;font-weight:600;color:#111827;">
      Your moderator application has been approved
    </h2>
    <p style="margin:0 0 20px 0;font-size:14px;line-height:1.7;color:#4B5563;">
      Hi ${name},
      <br/>
      <br/>
      Thank you for wanting to contribute to Sharda Online Library. Your moderator request has been approved and your account now has moderator access.
    </p>
    <div style="margin:0 0 20px 0;padding:18px 20px;border-radius:10px;background-color:#F9FAFB;border:1px solid #E5E7EB;">
      <p style="margin:0 0 10px 0;font-size:13px;font-weight:600;color:#111827;">
        As a moderator, you will:
      </p>
      <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.7;color:#4B5563;">
        <li>Review and approve submitted notes, PYQs, and syllabus content</li>
        <li>Help maintain the accuracy and quality of study material</li>
        <li>Support students by keeping resources clean and well organized</li>
      </ul>
    </div>
    <p style="margin:0;font-size:13px;color:#6B7280;">
      You can manage content from your moderator dashboard. Thank you for helping us build a better learning experience.
    </p>
  `;

  return sendEmail(email, "Moderator Application Approved", content);
}

export async function moderatorRejectionMail(email: string, name: string) {
  const content = `
    <h2 style="margin: 0 0 24px 0; color: #000000; font-size: 24px; font-weight: 600;">
      Moderator Application Update
    </h2>
    <p style="margin: 0 0 24px 0; color: #333333; font-size: 16px; line-height: 1.6;">
      Hello ${name},
    </p>
    <p style="margin: 0 0 24px 0; color: #333333; font-size: 15px; line-height: 1.6;">
      Thank you for your interest in becoming a moderator at Sharda Online Library. We truly appreciate the time and effort you put into your application.
    </p>
    <p style="margin: 0 0 32px 0; color: #333333; font-size: 15px; line-height: 1.6;">
      After careful consideration, we regret to inform you that we are unable to approve your moderator application at this time. This decision does not reflect on your value as a community member.
    </p>
    <div style="border-left: 3px solid #FF9F66; background-color: #F2F4F8; padding: 20px; margin: 0 0 32px 0;">
      <p style="margin: 0 0 8px 0; color: #000000; font-size: 14px; font-weight: 600;">
        What's Next?
      </p>
      <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.6;">
        You're welcome to reapply in the future. We encourage you to continue contributing to our community, and feel free to reach out if you have any questions.
      </p>
    </div>
    <p style="margin: 0; color: #666666; font-size: 14px;">
      Best Regards,<br>
      The Sharda Online Library Team
    </p>
  `;

  return sendEmail(email, "Update on Your Moderator Application", content);
}

export async function contentApprovalMail(
  email: string,
  name: string,
  contentType: string,
) {
  const content = `
    <h2 style="margin:0 0 16px 0;font-size:22px;font-weight:600;color:#111827;">
      Your ${contentType.toLowerCase()} is now live
    </h2>
    <p style="margin:0 0 24px 0;font-size:14px;line-height:1.7;color:#4B5563;">
      Hi ${name}, your ${contentType.toLowerCase()} has been reviewed and approved. It is now available to students on Sharda Online Library.
    </p>
    <div style="margin:0 0 24px 0;padding:14px 18px;border-radius:999px;display:inline-block;background-color:#ECFDF5;border:1px solid #A7F3D0;font-size:12px;font-weight:600;color:#065F46;">
      PUBLISHED · VISIBLE TO STUDENTS
    </div>
    <p style="margin:24px 0 0 0;font-size:13px;color:#6B7280;line-height:1.7;">
      Thank you for contributing to the library. High‑quality content like yours makes it easier for other students to prepare with clarity and confidence.
    </p>
  `;

  return sendEmail(email, `${contentType} Approved - Now Live!`, content);
}

export async function contentRejectionMail(
  email: string,
  name: string,
  contentType: string,
  reason: string,
) {
  const content = `
    <h2 style="margin: 0 0 24px 0; color: #000000; font-size: 24px; font-weight: 600;">
      Content Submission Update
    </h2>
    <p style="margin: 0 0 24px 0; color: #333333; font-size: 16px; line-height: 1.6;">
      Hello ${name},
    </p>
    <p style="margin: 0 0 24px 0; color: #333333; font-size: 15px; line-height: 1.6;">
      Thank you for your ${contentType} submission to Sharda Online Library. We appreciate your effort and contribution.
    </p>
    <p style="margin: 0 0 32px 0; color: #333333; font-size: 15px; line-height: 1.6;">
      After careful review by our moderation team, we're unable to approve your submission at this time.
    </p>
    <div style="border: 2px solid #000000; background-color: #F2F4F8; padding: 20px; margin: 0 0 32px 0;">
      <p style="margin: 0 0 12px 0; color: #000000; font-size: 14px; font-weight: 600;">
        Reason for Rejection:
      </p>
      <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.6;">
        ${reason}
      </p>
    </div>
    <div style="border-left: 3px solid #C084FC; background-color: #F2F4F8; padding: 20px; margin: 0 0 32px 0;">
      <p style="margin: 0 0 8px 0; color: #000000; font-size: 14px; font-weight: 600;">
        Next Steps
      </p>
      <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.6;">
        You're welcome to revise and resubmit your content after addressing the feedback above. We're here to help if you have any questions!
      </p>
    </div>
    <p style="margin: 0; color: #666666; font-size: 14px;">
      Thank you for understanding,<br>
      The Sharda Online Library Moderation Team
    </p>
  `;

  return sendEmail(
    email,
    `${contentType} Submission - Revision Needed`,
    content,
  );
}
