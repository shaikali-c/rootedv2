"use server";

import { supabase } from "@/lib/supabase/client";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function createJWT(userId: string, username: string) {
  return await new SignJWT({ sub: userId, username })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(secret);
}

export async function signUp(formData: FormData) {
  const username = (formData.get("username") as string).trim();
  const password = (formData.get("password") as string).trim();
  const c_password = (formData.get("c_password") as string).trim();

  if (!username || !password || !c_password) {
    return { error: "Missing fields" };
  }

  if (!(password === c_password)) {
    return { error: "Passwords don't match!" };
  }

  const { data: existing } = await supabase
    .from("users")
    .select("username")
    .eq("username", username)
    .maybeSingle();

  if (existing) {
    return { error: "Username already taken!" };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltBase64 = Buffer.from(salt).toString("base64");

  const { data, error } = await supabase
    .from("users")
    .insert({
      username,
      password: passwordHash,
      salt: saltBase64,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }
  const cookieStore = await cookies();
  const jwt = await createJWT(data?.id, username);
  cookieStore.set("auth_token", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return { success: true };
}

export async function signIn(formData: FormData) {
  const cookieStore = await cookies();
  const username = (formData.get("username") as string).trim();
  const password = (formData.get("password") as string).trim();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (!data) {
    return { error: "Failed to authenticate!" };
  }
  const valid = await bcrypt.compare(password, data?.password);
  if (!valid) {
    return { error: "Failed to authenticate!" };
  }
  const jwt = await createJWT(data?.id, username);
  cookieStore.set("auth_token", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    path: "/",
  });
  return { success: true };
}
