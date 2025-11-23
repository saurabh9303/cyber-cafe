export function isAdminEmail(email) {
  const admins = process.env.ADMIN_EMAILS?.split(",").map(e => e.trim().toLowerCase());
  return admins?.includes(email.toLowerCase());
}
