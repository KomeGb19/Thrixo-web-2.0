// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendLeadEmails } from "@/lib/email";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
  services?: string[];
  budget?: string;
  company?: string; // honeypot: real people never fill this
};

// Server-only client. Uses the service-role key, so never expose it to the browser.
function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Payload | null;

  // Bots fill the hidden field: pretend it worked, save nothing, send nothing.
  if (body?.company) return NextResponse.json({ ok: true });

  const name = body?.name?.trim();
  const email = body?.email?.trim().toLowerCase();
  const message = body?.message?.trim();

  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
  if (name.length > 120 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ ok: false, error: "Too long" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.error("[contact] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }

  const lead = {
    name,
    email,
    message,
    services: Array.isArray(body?.services) ? body!.services.slice(0, 10) : [],
    budget: body?.budget?.slice(0, 60) || null,
  };

  // Save first: the database is the source of truth.
  const { error } = await supabase.from("leads").insert(lead);

  if (error) {
    console.error("[contact] Supabase insert failed:", error.message);
    return NextResponse.json({ ok: false, error: "Could not save" }, { status: 500 });
  }

  // Then email. Must be awaited: serverless functions can be frozen
  // as soon as the response is returned. sendLeadEmails never throws.
  await sendLeadEmails(lead);

  return NextResponse.json({ ok: true });
}