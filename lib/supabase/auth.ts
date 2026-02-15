import { createSupabaseClient } from "@/lib/supabase/client";

const supabase = createSupabaseClient();
export async function login(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return error?.message;
}

export async function signup(email: string, password: string) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return error?.message;
}
