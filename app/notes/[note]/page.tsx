import { getNote } from "@/app/actions/note";
import { Rose } from "lucide-react";
import Link from "next/link";

export default async function Note({
  params,
}: {
  params: Promise<{ note: string }>;
}) {
  const { note } = await params;
  const { title, note: content, date, error } = await getNote(note);
  if (error)
    return (
      <div className="md:p-30 p-7 flex justify-center flex-col gap-4 items-center pt-30">
        <Rose size={50} />
        <p>
          Note not found{" "}
          <Link href={"/notes"} className="text-brand underline">
            Refrest notes
          </Link>
        </p>
      </div>
    );
  return (
    <div className="md:p-30 p-7 font-secondary flex flex-col gap-5 md:h-dvh md:overflow-y-auto no-scrollbar md:pb-45 pb-45">
      <p className="text-xs text-muted-foreground font-sans">{date}</p>
      <h2 className="md:text-4xl font-charter text-3xl">{title}</h2>
      <p className="leading-6.5 text-neutral-300/90 font-sans tracking-wide whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}
