/**
 * Vercel Serverless Function — POST /api/contact
 *
 * Receives the portfolio contact form and sends it through Resend.
 * Runs server-side so RESEND_API_KEY is never shipped to the browser.
 *
 * Required env vars (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY      re_...  (secret — no VITE_ prefix, stays server-side)
 *   CONTACT_TO_EMAIL    where submissions land
 * Optional:
 *   CONTACT_FROM_EMAIL  verified sender. Defaults to Resend's shared onboarding
 *                       sender, which can only deliver to your own account email.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const DEFAULT_FROM = 'Portfolio Contact <onboarding@resend.dev>';

const LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort rate limit. Only spans a warm instance, so it blunts hammering
// from a single client without pretending to be a durable quota.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude bound on memory
  return false;
}

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );

/**
 * Builds the notification email.
 *
 * Deliberately old-school: tables for layout and every style inlined, because
 * Gmail strips <style> blocks and ignores most modern CSS. Colours mirror the
 * portfolio's dark/cyan theme.
 */
function renderEmail({ name, email, message }) {
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    message: escapeHtml(message).replace(/\r?\n/g, '<br />'),
  };

  const sentAt = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(new Date());

  const initial = safe.name.trim().charAt(0).toUpperCase() || '?';
  const replySubject = encodeURIComponent(`Re: your message on sharmaasahill.com`);

  const text = [
    'NEW PORTFOLIO MESSAGE',
    '',
    `From:    ${name}`,
    `Email:   ${email}`,
    `Sent:    ${sentAt} IST`,
    '',
    '---',
    '',
    message,
    '',
    '---',
    '',
    `Reply directly to this email to reach ${name}.`,
  ].join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light dark" />
<title>New portfolio message</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f4f7;">
  <!-- Preview text shown in the inbox list -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${safe.name} sent you a message from your portfolio.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f4f7;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 1px 3px rgba(16,24,40,0.1);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

          <!-- Header -->
          <tr>
            <td style="background-color:#0b0e14;padding:26px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#00eaff;padding-bottom:8px;">
                    New Message
                  </td>
                </tr>
                <tr>
                  <td style="font-size:21px;font-weight:600;color:#ffffff;letter-spacing:-0.3px;">
                    sharmaasahill.com
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Accent rule -->
          <tr><td style="height:3px;background-color:#00eaff;line-height:3px;font-size:0;">&nbsp;</td></tr>

          <!-- Sender -->
          <tr>
            <td style="padding:28px 32px 20px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td width="46" valign="top" style="padding-right:14px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="46" style="width:46px;height:46px;background-color:#0b0e14;border-radius:23px;">
                      <tr>
                        <td align="center" valign="middle" style="height:46px;color:#00eaff;font-size:18px;font-weight:600;">${initial}</td>
                      </tr>
                    </table>
                  </td>
                  <td valign="top">
                    <div style="font-size:17px;font-weight:600;color:#101828;padding-bottom:3px;">${safe.name}</div>
                    <div style="font-size:14px;">
                      <a href="mailto:${safe.email}" style="color:#0a7ea4;text-decoration:none;">${safe.email}</a>
                    </div>
                    <div style="font-size:12px;color:#8a94a6;padding-top:5px;">${sentAt} IST</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7f8fa;border-left:3px solid #00eaff;border-radius:0 8px 8px 0;">
                <tr>
                  <td style="padding:20px 22px;font-size:15px;line-height:1.7;color:#344054;">
                    ${safe.message}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reply button -->
          <tr>
            <td style="padding:26px 32px 30px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#0b0e14;border-radius:8px;">
                    <a href="mailto:${safe.email}?subject=${replySubject}"
                       style="display:inline-block;padding:12px 26px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                      Reply to ${safe.name}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #eaecf0;padding:18px 32px 22px 32px;">
              <div style="font-size:12px;line-height:1.6;color:#98a2b3;">
                Sent from the contact form on
                <a href="https://sharmaasahill.vercel.app" style="color:#667085;">sharmaasahill.vercel.app</a>.
                Hitting reply goes straight to ${safe.name}.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { html, text };
}

function readBody(req) {
  // The Node runtime parses JSON bodies for us, but be tolerant of a raw string.
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return null; }
  }
  return req.body && typeof req.body === 'object' ? req.body : null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    // Log the specifics for us; tell the visitor something actionable.
    console.error('[contact] misconfigured:', {
      hasApiKey: Boolean(apiKey),
      hasRecipient: Boolean(to),
    });
    return res.status(500).json({
      success: false,
      message: 'The contact form is not configured on the server.',
    });
  }

  const body = readBody(req);
  if (!body) {
    return res.status(400).json({ success: false, message: 'Invalid request body.' });
  }

  // Honeypot — a bot filled a field humans never see. Report success so the bot
  // moves on, but send nothing.
  if (body.botcheck) {
    return res.status(200).json({ success: true, message: 'Message sent.' });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email and message are all required.' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ success: false, message: 'That email address looks invalid.' });
  }
  for (const [field, max] of Object.entries(LIMITS)) {
    if ({ name, email, message }[field].length > max) {
      return res.status(400).json({ success: false, message: `${field} is too long (max ${max} characters).` });
    }
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (rateLimited(ip)) {
    return res.status(429).json({
      success: false,
      message: 'Too many messages in a short time. Please wait a minute and try again.',
    });
  }

  const { html, text } = renderEmail({ name, email, message });

  const payload = {
    from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
    to: [to],
    subject: `New portfolio message from ${name}`,
    // Lets you hit Reply in Gmail and answer the sender directly.
    reply_to: email,
    replyTo: email,
    text,
    html,
  };

  try {
    const r = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    let data = null;
    try { data = await r.json(); } catch { /* Resend returned no JSON */ }

    // Resend answers 200 with an { id } on success.
    if (r.ok && data?.id) {
      return res.status(200).json({ success: true, message: 'Message sent.' });
    }

    // Real failure. Log the upstream detail, return something a visitor can act on.
    console.error('[contact] resend rejected:', r.status, data);

    const detail = data?.message || data?.error?.message || '';
    const visitorMessage =
      r.status === 401 || r.status === 403
        ? 'The mail service rejected our credentials. Please email me directly.'
        : r.status === 422
          ? `The mail service rejected the message${detail ? `: ${detail}` : '.'}`
          : r.status === 429
            ? 'The mail service is rate limiting us. Please try again shortly.'
            : `The mail service returned an error (HTTP ${r.status})${detail ? `: ${detail}` : '.'}`;

    return res.status(502).json({ success: false, message: visitorMessage });
  } catch (err) {
    console.error('[contact] unexpected failure:', err);
    return res.status(502).json({
      success: false,
      message: 'Could not reach the mail service. Please try again or email me directly.',
    });
  }
}
