import { NextResponse } from "next/server";
import { profile } from "../../data";

/**
 * Formulaire de contact : envoie le message par e-mail via l'API Resend (https://resend.com).
 * Variables d'environnement :
 * - RESEND_API_KEY (obligatoire pour envoyer)
 * - CONTACT_TO   (destinataire, défaut : profile.email)
 * - CONTACT_FROM (expéditeur vérifié chez Resend, défaut : l'adresse de test Resend)
 */

const LIMITS = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Limite simple par IP, en mémoire : 5 messages par tranche de 10 minutes et par instance.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Champ piège invisible : un humain le laisse vide, un robot le remplit. On fait comme si tout allait bien.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  if (
    !name || name.length > LIMITS.name ||
    !EMAIL_RE.test(email) || email.length > LIMITS.email ||
    message.length < 10 || message.length > LIMITS.message
  ) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO || profile.email],
      reply_to: email,
      subject: `Portfolio : message de ${name}`,
      text: `De : ${name} <${email}>\n\n${message}`,
      html: `<p><strong>De :</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
