import { createNote } from "../actions/note";
import { redirect } from "next/navigation";

export default async function NotePage() {
  const note_id = await createNote();
  redirect(`/note/${note_id}`);
}
