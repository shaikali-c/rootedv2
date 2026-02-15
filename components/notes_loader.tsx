import { getNotes } from "@/app/actions/note";
import NotesContainer from "@/components/ui/notes_container";

export default async function NotesLoader() {
  const notes = await getNotes();
  return <NotesContainer fetch_notes={notes} />;
}
