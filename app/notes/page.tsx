import Divider from "@/components/ui/divider";
import { date_f } from "@/lib/date";
import { Asterisk } from "lucide-react";

export default async function NotesPage() {
  return (
    <div className="md:p-30 p-7 pt-5 font-secondary md:flex hidden flex-col gap-5 ">
      <Divider>
        <Asterisk />
      </Divider>
      <p className="text-xs text-muted-foreground font-sans">{date_f}</p>
      <h2 className="md:text-4xl font-charter text-3xl">
        Private notes, cryptographically secured by design.
      </h2>
      <p className="leading-6.5 text-neutral-300/90 font-sans tracking-wide whitespace-pre-wrap ">
        Rooted is a secure note-taking application built around a simple
        principle: your notes should belong only to you. Every note is encrypted
        so that no third party, including the server, can read its contents.
        Rooted turns ordinary note-taking into a privacy-first workflow,
        protecting personal notes, ideas, and data from exposure.
      </p>
    </div>
  );
}
