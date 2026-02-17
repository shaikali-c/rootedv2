"use server";

import { supabase } from "@/lib/supabase/client";
import { cookies, headers } from "next/headers";
import { CachedUser, Content } from "@/types/global";
import { derive_key } from "@/lib/cryptography/key";
import { encrypt_note } from "@/lib/cryptography/encrypt";
import { decrypt_note } from "@/lib/cryptography/decrypt";
import { date_f } from "@/lib/date";
import { jwtVerify } from "jose";

const userCache = new Map<string, CachedUser>();
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
const tokenCache = new Map<string, { userId: string; username: string }>();

async function resolveUser() {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) throw new Error("No auth token");
  let decoded = tokenCache.get(token);
  if (!decoded) {
    const { payload } = await jwtVerify(token, secret);

    const userId = payload.sub as string;
    const username = payload.username as string;

    if (!userId || !username) throw new Error("Bad token");

    decoded = { userId, username };
    tokenCache.set(token, decoded);
  }
  const { userId, username } = decoded;

  if (!userId || !username) throw new Error("Bad token");

  let cached = userCache.get(userId);
  if (cached) return cached;

  const { data: user, error } = await supabase
    .from("users")
    .select("salt, username")
    .eq("id", userId)
    .single();

  if (error || !user) throw new Error("User fetch failed");

  const salt = new Uint8Array(Buffer.from(user.salt, "base64"));
  const key = await derive_key(process.env.MASTER_KEY!, salt);

  cached = { username: user.username, key };
  userCache.set(userId, cached);

  return cached;
}

export async function createNote(noteId: string) {
  const { username } = await resolveUser();
  const { data: note, error: note_insert_error } = await supabase
    .from("notes")
    .insert({
      owner: username,
      uid: noteId,
      date: date_f,
    })
    .select()
    .maybeSingle();
  return note?.uid;
}
export async function updateNote(noteId: string, content: Content) {
  if (!content.title.trim() && !content.note.trim()) return;
  const { key, username } = await resolveUser();
  const encrypted = await encrypt_note(JSON.stringify(content), key);
  const { error } = await supabase.from("notes").upsert(
    {
      uid: noteId,
      owner: username,
      payload: encrypted,
      date: date_f,
    },
    {
      onConflict: "uid",
    },
  );
  if (error) throw error;
}

export async function getNotes() {
  const { key, username } = await resolveUser();
  const { data, error } = await supabase
    .from("notes")
    .select("uid, payload")
    .eq("owner", username);
  if (error || !data) return { notes: [], error: 403 };
  const notes = await Promise.all(
    data
      .filter((n) => n.payload)
      .map(async (n) => {
        const decrypted = await decrypt_note(JSON.parse(n.payload), key);
        const parsed = JSON.parse(decrypted);
        return { uid: n.uid, ...parsed };
      }),
  );
  return {
    notes: notes.filter((n) => n.title && n.note),
    error: null,
  };
}

export async function getNote(uid: string) {
  const { key, username } = await resolveUser();

  const { data, error } = await supabase
    .from("notes")
    .select("payload")
    .eq("uid", uid)
    .eq("owner", username)
    .single();

  if (error || !data?.payload) return { error: 404 };

  const decrypted = await decrypt_note(JSON.parse(data.payload), key);
  return JSON.parse(decrypted);
}
