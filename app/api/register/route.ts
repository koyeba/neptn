import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { email } = await req.json();

  const { error } = await supabase.from("subscribers").insert([{ email }]);

  if (error) {
    console.error("Erreur Supabase: ", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
