"use server";

import { supabase } from "@/lib/supabase/client";
import { headers } from "next/headers";
import { nanoid } from "nanoid";
import { Content } from "@/types/global";
import { derive_key } from "@/lib/cryptography/key";
import { encrypt_note } from "@/lib/cryptography/encrypt";
import { decrypt_note } from "@/lib/cryptography/decrypt";
import { date_f } from "@/lib/date";

export async function createNote() {
  const username = (await headers()).get("x-username");
  const noteId = nanoid();
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

export async function getNotes() {
  const uname = (await headers()).get("x-username");
  const { data: currentUser, error } = await supabase
    .from("users")
    .select("username, salt")
    .eq("username", uname)
    .single();
  if (!currentUser?.salt) {
    return { notes: [], error: 403 }; // or { error: 401 } depending on function
  }
  try {
    const salt = new Uint8Array(Buffer.from(currentUser?.salt, "base64"));
    const key = await derive_key(process.env.MASTER_KEY!, salt);
    const { data, error: note_get_error } = await supabase
      .from("notes")
      .select("*")
      .eq("owner", uname);

    const filter_data = data?.filter((elem) => elem.payload);

    const notes = await Promise.all(
      filter_data?.map(async (elem) => {
        const decrypted = await decrypt_note(JSON.parse(elem.payload), key);
        const note = JSON.parse(decrypted);
        return {
          uid: elem.uid,
          ...note,
        };
      }) ?? [],
    );
    const filtered = notes.filter((elem) => elem.title && elem.note);
    return { notes: filtered, error: null };
  } catch (err) {
    return { notes: [], error: 403 };
  }
}

export async function getNote(uid: string) {
  const uname = (await headers()).get("x-username");
  const { data: currentUser, error } = await supabase
    .from("users")
    .select("username, salt")
    .eq("username", uname)
    .single();
  try {
    const salt = new Uint8Array(Buffer.from(currentUser?.salt, "base64"));
    const key = await derive_key(process.env.MASTER_KEY!, salt);
    const { data, error: note_get_error } = await supabase
      .from("notes")
      .select("*")
      .eq("uid", uid)
      .single();
    if (note_get_error) {
      return { error: 404 };
    }
    const decrypted = await decrypt_note(JSON.parse(data.payload), key);
    const note = JSON.parse(decrypted);
    return note;
  } catch (err) {
    return { error: 403 };
  }
}
