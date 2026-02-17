import NoteEditor from "@/components/ui/note_editor";
export default async function UIDPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  return <NoteEditor note_id={uid} />;
}
