"use server";

import { supabase } from "@/lib/supabase/client";
import { headers } from "next/headers";
import { nanoid } from "nanoid";
import { Content } from "@/types/global";
import { derive_key } from "@/lib/cryptography/key";
import { encrypt_note } from "@/lib/cryptography/encrypt";
import { decrypt_note } from "@/lib/cryptography/decrypt";

export async function createNote() {
  const userId = (await headers()).get("x-user-id");
  const noteId = nanoid();
  const { data: currentUser, error } = await supabase
    .from("users")
    .select("username")
    .eq("id", userId)
    .single();
  const { data: note, error: note_insert_error } = await supabase
    .from("notes")
    .insert({
      owner: currentUser,
      uid: noteId,
    })
    .select()
    .maybeSingle();
  return note?.uid;
}
export async function updateNote(noteId: string, content: Content) {
  const userId = (await headers()).get("x-user-id");
  const { data: currentUser, error } = await supabase
    .from("users")
    .select("username, salt")
    .eq("id", userId)
    .single();
  const salt = new Uint8Array(Buffer.from(currentUser?.salt, "base64"));
  const key = await derive_key(process.env.MASTER_KEY!, salt);
  const e_note = await encrypt_note(JSON.stringify(content), key);
  const { error: note_insert_error } = await supabase
    .from("notes")
    .update({
      payload: e_note,
    })
    .eq("uid", noteId);
  if (note_insert_error) console.log(note_insert_error);
}
