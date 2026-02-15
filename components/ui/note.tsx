import { NoteProp } from "@/types/global";
import Link from "next/link";

export default function Note({ active = false, note }: NoteProp) {
  return (
    <Link
      href={`/notes/${note.uid}`}
      className={`w-full h-full rounded-md py-7.5 md:px-5.5 px-2 flex flex-col md:gap-3 gap-4 hover:bg-neutral-900/50 transition-colors ${active ? "md:bg-neutral-900/50" : "bg-neutral-950"}`}
    >
      <p className="text-xs text-muted-foreground font-sans">{note.date}</p>
      <h2 className={`font-medium md:text-2xl text-[21.6px] font-secondary `}>
        {note.title}
      </h2>
      <p className="font-sans text-muted-foreground line-clamp-3">
        {note.note}
      </p>
    </Link>
  );
}
