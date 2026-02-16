import { getNote } from "@/app/actions/note";
import Divider from "@/components/ui/divider";
import { Asterisk, Rose } from "lucide-react";
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
      <div className="md:p-30 p-7 pt-5 flex justify-center flex-col gap-4 items-center">
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
    <>
      <Divider>
        <Rose />
      </Divider>
      <div className="md:p-30 p-7 font-secondary flex flex-col gap-5 md:h-dvh md:overflow-y-auto no-scrollbar md:pb-45 pb-45 pt-5">
        <div className="flex flex-col gap-3.5 mb-4">
          <p className="text-xs text-muted-foreground font-sans">{date}</p>
          <h2 className="md:text-4xl font-charter text-3xl">{title}</h2>
        </div>
        <p className="leading-6.5 text-neutral-300/90 md:text-lg font-sans tracking-wide whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </>
  );
}
