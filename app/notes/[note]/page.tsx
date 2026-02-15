import { getNote } from "@/app/actions/note";

export default async function Note({
  params,
}: {
  params: Promise<{ note: string }>;
}) {
  const { note } = await params;
  const { title, note: content, error } = await getNote(note);
  if (error) return <p className="md:p-30 p-7">Note not found!</p>;
  return (
    <div className="md:p-30 p-7 font-secondary flex flex-col gap-5 md:h-dvh md:overflow-y-auto no-scrollbar md:pb-45 pb-45">
      <p className="text-xs text-muted-foreground font-sans">Friday 19, Jan</p>
      <h2 className="md:text-4xl font-charter text-3xl">{title}</h2>
      <p className="leading-6.5 text-neutral-300/90 font-sans tracking-wide whitespace-pre-wrap ">
        {content}
      </p>
    </div>
  );
}
