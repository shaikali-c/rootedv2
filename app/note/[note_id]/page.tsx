import NoteEditor from "@/components/ui/note_editor";

export default async function NotePage({
  params,
}: {
  params: Promise<{ note_id: string }>;
}) {
  const { note_id } = await params;
  return <NoteEditor note_id={note_id} />;
}
