"use client";
import { usePathname } from "next/navigation";
import Note from "./note";

export default function NotesContainer({ fetch_notes }: any) {
  const pathname = usePathname();
  const active = pathname.split("/")[2];
  const hide = pathname.startsWith("/notes/") && pathname !== "/page";
  return (
    <div
      className={`flex-col md:gap-7 gap-15 mt-0 pb-15 ${hide ? "hidden md:flex" : "flex"}`}
    >
      {fetch_notes?.map((elem: any, index: number) => (
        <Note active={elem.uid === active} note={elem} key={index} />
      ))}
    </div>
  );
}
