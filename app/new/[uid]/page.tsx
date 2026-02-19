import { getNote } from "@/app/actions/note";
import NoteEditor from "@/components/ui/note_editor";
export default async function UIDPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const note = await getNote(uid);
  if (!note.error) {
    return <NoteEditor note_id={uid} initial_content={note} />;
  }
  return <NoteEditor note_id={uid} />;
}
