"use client";
import { usePathname } from "next/navigation";
import Note from "./note";
import { Button } from "./button";
import { File } from "lucide-react";
import Link from "next/link";
import { nanoid } from "nanoid";

export default function NotesContainer({ fetch_notes }: any) {
  const pathname = usePathname();
  const active = pathname.split("/")[2];
  const hide = pathname.startsWith("/notes/") && pathname !== "/page";
  const uid = nanoid();
  return (
    <div
      className={`flex-col md:gap-7 gap-15 mt-0 ${hide ? "hidden md:flex" : "flex"}`}
    >
      {fetch_notes?.map((elem: any, index: number) => (
        <Note actie={elem.uid === active} note={elem} key={index} />
      ))}
      {fetch_notes.length === 0 && (
        <div className="mx-auto md:my-50 my-40 flex flex-col justify-center items-center gap-3.5">
          <File size={45} className="text-muted-foreground" />
          <p className="text-muted-foreground max-w-50 text-center">
            Create your first secure note to get started.
          </p>
          <Button variant={"secondary"} asChild>
            <Link href={`/new/${uid}`}>Add note</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
