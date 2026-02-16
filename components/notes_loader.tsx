import { getNotes } from "@/app/actions/note";
import NotesContainer from "@/components/ui/notes_container";
import { Frown } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function NotesLoader() {
  const { notes, error } = await getNotes();
  if (error) {
    return (
      <div className="mx-auto md:my-50 my-40 flex flex-col justify-center items-center gap-4">
        <Frown size={45} />
        <h2>Failed to fetch notes</h2>
      </div>
    );
  }
  return <NotesContainer fetch_notes={notes} />;
}
