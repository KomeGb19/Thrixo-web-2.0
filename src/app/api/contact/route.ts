import { NextResponse } from "next/server";

type Payload = { name?: string; email?: string; message?: string; services?: string[]; budget?: string };

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Payload | null;
  if (!body?.name || !body.email || !body.message || !/^\S+@\S+\.\S+$/.test(body.email)) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  // TODO: persist the lead. Example with Supabase:
  //   const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  //   await supabase.from("leads").insert({ ...body });
  // …and/or send a notification email / WhatsApp message.
  console.log("[thrixo:lead]", body);

  return NextResponse.json({ ok: true });
}
