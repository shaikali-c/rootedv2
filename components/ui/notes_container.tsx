"use client";
import { usePathname } from "next/navigation";
import Note from "./note";
import { Button } from "./button";
import { Ghost } from "lucide-react";
import Link from "next/link";

export default function NotesContainer({ fetch_notes }: any) {
  const pathname = usePathname();
  const active = pathname.split("/")[2];
  const hide = pathname.startsWith("/notes/") && pathname !== "/page";
  return (
    <div
      className={`flex-col md:gap-7 gap-15 mt-0 ${hide ? "hidden md:flex" : "flex"}`}
    >
      {fetch_notes?.map((elem: any, index: number) => (
        <Note active={elem.uid === active} note={elem} key={index} />
      ))}
      {fetch_notes.length === 0 && (
        <div className="mx-auto md:my-50 my-40 flex flex-col justify-center items-center gap-4">
          <Ghost size={45} />
          <h2>No notes</h2>
          <Button variant={"secondary"} asChild>
            <Link href={"/note"}>Create new note</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
