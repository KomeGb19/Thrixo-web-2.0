// lib/email.ts
import { Resend } from "resend";
import { site } from "@/lib/data";

const BRAND = "Thrixo Agency";
const SITE_URL = "https://www.thrixoagency.com.ng";
const LOGO_URL = `${SITE_URL}/logo.png`; // already live on your site

const C = {
  ink: "#0b0b0f",
  lime: "#c8f31d",
  paper: "#f6f4ee",
  paper2: "#ebe8df",
  brand: "#4338ca",
  line: "#cfccc2",
  muted: "#6b6b6b",
};

// Email clients can't load your web fonts, so these are the closest safe fallbacks.
const FONT = `'Helvetica Neue',Helvetica,Arial,sans-serif`;
const MONO = `'JetBrains Mono','SFMono-Regular',Menlo,Consolas,'Courier New',monospace`;

export type Lead = {
  name: string;
  email: string;
  message: string;
  services: string[];
  budget: string | null;
};

// Everything the visitor typed ends up in HTML, so escape it.
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Strip line breaks from anything that goes into a subject line.
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

/* ---------- building blocks (mirror the site: mono labels, pills, big rounded cards) ---------- */

const label = (text: string, color = C.muted) =>
  `<p style="margin:0 0 6px;font-family:${MONO};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${color}">${text}</p>`;

const pill = (text: string) =>
  `<span style="display:inline-block;border:1px solid ${C.line};border-radius:999px;padding:6px 14px;margin:0 6px 6px 0;font-size:14px;color:${C.ink}">${text}</span>`;

const button = (href: string, text: string) =>
  `<a href="${href}" style="display:inline-block;background:${C.brand};color:#ffffff;border-radius:999px;padding:14px 28px;font-family:${FONT};font-size:16px;font-weight:600;text-decoration:none">${text}</a>`;

function briefCard(lead: Lead, linkEmail: boolean) {
  const services = lead.services.length
    ? lead.services.map((s) => pill(esc(s))).join("")
    : `<span style="color:${C.muted}">Not specified</span>`;
  const emailHtml = linkEmail
    ? `<a href="mailto:${esc(lead.email)}" style="color:${C.brand}">${esc(lead.email)}</a>`
    : esc(lead.email);

  const fields: [string, string][] = [
    ["01 · Name", esc(lead.name)],
    ["02 · Email", emailHtml],
    ["03 · What they need", services],
    ["04 · Rough budget", esc(lead.budget ?? "Not specified")],
    ["05 · The brief", `<div style="white-space:pre-wrap">${esc(lead.message)}</div>`],
  ];

  const rows = fields
    .map(
      ([l, v], i) =>
        `<div style="margin:0 0 ${i === fields.length - 1 ? 0 : 22}px">${label(l)}<div style="font-family:${FONT};font-size:16px;line-height:1.55;color:${C.ink}">${v}</div></div>`,
    )
    .join("");

  return `<div style="background:${C.paper2};border-radius:28px;padding:32px">${rows}</div>`;
}

function shell(preheader: string, inner: string) {
  const year = new Date().getFullYear();
  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:${C.paper};font-family:${FONT};color:${C.ink}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.paper}">
    <tr><td align="center" style="padding:32px 16px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">
        <tr><td style="padding:0 0 24px">
          <a href="${SITE_URL}" style="text-decoration:none;color:${C.ink}">
            <img src="${LOGO_URL}" alt="Thrixo" height="36" style="height:36px;width:auto;vertical-align:middle;border:0" />
            <span style="font-family:${FONT};font-size:22px;font-weight:800;letter-spacing:-0.5px;vertical-align:middle;margin-left:8px">thrixo.</span>
          </a>
        </td></tr>
        <tr><td>${inner}</td></tr>
        <tr><td style="padding:40px 0 0;text-align:center">
          <p style="margin:0 0 20px;font-family:${MONO};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${C.muted}">Don't overthink it ✺ Ship it ✺ Make it weird ✺ Make it work</p>
          <p style="margin:0 0 4px;font-size:14px;color:${C.ink}">Modern automation infrastructure, wrapped in good taste.</p>
          <p style="margin:0 0 4px;font-size:14px;color:${C.muted}">Lagos, Nigeria · <a href="mailto:${esc(site.email)}" style="color:${C.muted}">${esc(site.email)}</a></p>
          <p style="margin:0;font-size:12px;color:${C.muted}">${BRAND} © ${year}. All rights reserved.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ---------- the two emails ---------- */

function notificationHtml(lead: Lead) {
  const inner = `
    <div style="background:${C.ink};border-radius:28px;padding:36px;margin:0 0 16px">
      ${label("New brief", C.lime)}
      <h1 style="margin:0;font-family:${FONT};font-size:36px;line-height:1.1;font-weight:700;letter-spacing:-1px;color:${C.paper}">${esc(lead.name)} wants to talk.</h1>
    </div>
    ${briefCard(lead, true)}
    <div style="padding:24px 0 0">
      ${button(`mailto:${esc(lead.email)}?subject=${encodeURIComponent("Re: your brief to " + BRAND)}`, `Reply to ${esc(oneLine(lead.name).split(" ")[0] || "them")}`)}
    </div>`;
  return shell(`New brief from ${oneLine(lead.name)}`, inner);
}

function notificationText(lead: Lead) {
  return `New brief from ${oneLine(lead.name)}

Name: ${lead.name}
Email: ${lead.email}
Services: ${lead.services.join(", ") || "Not specified"}
Budget: ${lead.budget ?? "Not specified"}

${lead.message}

Hit reply to respond directly.`;
}

function autoreplyHtml(lead: Lead, firstName: string) {
  const inner = `
    <div style="background:${C.lime};border-radius:28px;padding:40px;margin:0 0 16px">
      <div style="width:56px;height:56px;border-radius:50%;background:${C.ink};color:${C.lime};text-align:center;line-height:56px;font-size:28px;font-weight:700;margin:0 0 24px">✓</div>
      <h1 style="margin:0 0 12px;font-family:${FONT};font-size:40px;line-height:1.05;font-weight:700;letter-spacing:-1.5px;color:${C.ink}">Brief received, ${esc(firstName)}.</h1>
      <p style="margin:0;font-size:18px;line-height:1.5;color:${C.ink};opacity:0.75">Expect a reply within 48 hours. Sooner if you ping us on WhatsApp.</p>
    </div>

    <a href="${esc(site.whatsapp)}" style="display:block;background:${C.ink};border-radius:28px;padding:28px 32px;text-decoration:none;margin:0 0 16px">
      ${label("Fastest reply", C.lime)}
      <span style="font-family:${FONT};font-size:26px;font-weight:700;letter-spacing:-0.5px;color:${C.paper}">Chat on WhatsApp →</span>
    </a>

    <p style="margin:24px 0 12px;font-family:${MONO};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${C.muted}">A copy of what you sent</p>
    ${briefCard(lead, false)}`;
  return shell(`We've got your brief, ${firstName}. Expect a reply within 48 hours.`, inner);
}

function autoreplyText(lead: Lead, firstName: string) {
  return `Brief received, ${firstName}.

Expect a reply within 48 hours. Sooner if you ping us on WhatsApp: ${site.whatsapp}

A copy of what you sent:
Services: ${lead.services.join(", ") || "Not specified"}
Budget: ${lead.budget ?? "Not specified"}

${lead.message}

Don't overthink it. Ship it.
${BRAND}, Lagos, Nigeria`;
}

/**
 * Sends the owner notification and the customer autoreply in one Resend
 * batch request (one API call, so it stays under the default 2 req/s limit).
 * Never throws: a failed email must not fail the form submission.
 */
export async function sendLeadEmails(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL; // e.g. "Thrixo <hello@thrixoagency.com.ng>"
  // One or more inboxes, comma-separated: "a@gmail.com,b@gmail.com"
  const notifyTo = (process.env.CONTACT_NOTIFY_EMAIL ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  if (!apiKey || !from || notifyTo.length === 0) {
    console.error(
      "[contact] Email skipped: set RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_NOTIFY_EMAIL",
    );
    return;
  }

  const resend = new Resend(apiKey);
  const firstName = oneLine(lead.name).split(" ")[0] || "there";

  try {
    const { error } = await resend.batch.send([
      {
        from,
        to: notifyTo,
        replyTo: lead.email, // replying goes straight to the customer
        subject: `New brief: ${oneLine(lead.name)}`,
        html: notificationHtml(lead),
        text: notificationText(lead),
      },
      {
        from,
        to: [lead.email],
        replyTo: site.email,
        subject: `We got your brief, ${firstName}`,
        html: autoreplyHtml(lead, firstName),
        text: autoreplyText(lead, firstName),
      },
    ]);

    if (error) console.error("[contact] Resend error:", error);
  } catch (err) {
    console.error("[contact] Resend request failed:", err);
  }
}   