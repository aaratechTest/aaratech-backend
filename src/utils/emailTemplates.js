function baseTemplate(content) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb;">
      <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 32px 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">AaraTech</h1>
      </div>
      <div style="padding: 32px 24px;">
        ${content}
      </div>
      <div style="padding: 20px 24px; background: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Aara Tech Pvt Ltd. All rights reserved.</p>
      </div>
    </div>
  `;
}

function actionButton(url, label) {
  return `
    <div style="text-align: center; margin: 28px 0;">
      <a href="${url}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">${label}</a>
    </div>
  `;
}

function createPasswordEmail(name, link) {
  return baseTemplate(`
    <h2 style="color: #1e293b; margin: 0 0 16px; font-size: 20px;">Welcome, ${name}!</h2>
    <p style="color: #4b5563; line-height: 1.6; margin: 0 0 8px;">Your admin account has been created. Please set your password to activate your account.</p>
    ${actionButton(link, "Set Your Password")}
    <p style="color: #9ca3af; font-size: 13px; margin: 0;">This link expires in 24 hours. If you did not expect this email, please ignore it.</p>
  `);
}

function resetPasswordEmail(name, link) {
  return baseTemplate(`
    <h2 style="color: #1e293b; margin: 0 0 16px; font-size: 20px;">Password Reset</h2>
    <p style="color: #4b5563; line-height: 1.6; margin: 0 0 8px;">Hi ${name}, we received a request to reset your password.</p>
    ${actionButton(link, "Reset Password")}
    <p style="color: #9ca3af; font-size: 13px; margin: 0;">This link expires in 1 hour. If you did not request this, you can safely ignore this email.</p>
  `);
}

function adminInviteEmail(name, invitedBy, link) {
  return baseTemplate(`
    <h2 style="color: #1e293b; margin: 0 0 16px; font-size: 20px;">You've Been Invited!</h2>
    <p style="color: #4b5563; line-height: 1.6; margin: 0 0 8px;">Hi ${name}, <strong>${invitedBy}</strong> has invited you to join the AaraTech admin panel.</p>
    <p style="color: #4b5563; line-height: 1.6; margin: 0 0 8px;">Click below to set your password and activate your account.</p>
    ${actionButton(link, "Accept Invitation")}
    <p style="color: #9ca3af; font-size: 13px; margin: 0;">This link expires in 24 hours.</p>
  `);
}

module.exports = { createPasswordEmail, resetPasswordEmail, adminInviteEmail };
