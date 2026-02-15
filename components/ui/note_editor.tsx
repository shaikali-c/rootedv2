"use client";

import { updateNote } from "@/app/actions/note";
import { useEffect, useRef, useState } from "react";
import { DropdownMenuComponent } from "@/components/build/drop-down";

import { hashText } from "@/lib/hash";
import { wordCount } from "@/lib/wordCount";
import { date_f } from "@/lib/date";

import { Content } from "@/types/global";
import { CheckCheck, Dot, LoaderCircle } from "lucide-react";

import useDebounce from "@/hooks/useDebounce";

export default function NoteEditor({ note_id }: { note_id: string }) {
  const [content, setContent] = useState<Content>({
    title: "",
    note: "",
    uid: note_id,
    date: date_f,
  });

  const [isSaving, setIsSaving] = useState(false);

  const debouncedContent = useDebounce(content, 3000);
  const lastHashRef = useRef<bigint | null>(null);
  const savingRef = useRef(false);
  const isFirstRun = useRef(true);

  const wordsCount = wordCount(content.note);
  console.log(wordsCount);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const serialized =
      debouncedContent.title.trim() + "\n" + debouncedContent.note.trim();

    let cancelled = false;

    (async () => {
      const newHash = await hashText(serialized);

      if (newHash === lastHashRef.current) return;
      if (savingRef.current) return; // prevent overlapping saves

      savingRef.current = true;
      setIsSaving(true);

      try {
        await updateNote(note_id, debouncedContent);
        if (!cancelled) lastHashRef.current = newHash;
      } finally {
        if (!cancelled) setIsSaving(false);
        savingRef.current = false;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [debouncedContent, note_id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="w-full h-dvh flex justify-center font-sans">
      <section className="md:max-w-5xl w-full h-full bg-neutral-950 grid grid-rows-[50px_1fr_20px] md:p-10 md:px-7 p-5 px-6 gap-5">
        <header className="flex w-full justify-between items-center font-semibold text-lg text-neutral-200">
          <h2 className="flex items-center">
            Rooted
            <Dot />
            <span className="text-muted-foreground text-sm">
              Friday 19, Oct
            </span>
          </h2>
          <DropdownMenuComponent />
        </header>

        <section className="flex flex-col gap-2 md:mt-15 mt-10">
          <input
            autoFocus
            value={content.title}
            name="title"
            onChange={handleChange}
            placeholder="Title"
            className="md:text-4xl text-3xl w-full font-secondary outline-0 text-neutral-100 pb-5"
          />

          <textarea
            name="note"
            value={content.note}
            onChange={handleChange}
            spellCheck={false}
            placeholder="Start writing from here..."
            className="w-full h-full resize-none font-diary text-xl leading-relaxed tracking-wide outline-0 text-neutral-100"
          />
        </section>

        <footer className="flex justify-between items-center text-muted-foreground text-sm">
          {isSaving ? (
            <div className="flex items-center gap-1.5">
              <LoaderCircle
                className="animate-spin text-emerald-500"
                size={15}
              />
              <span>Saving</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <CheckCheck className="text-emerald-500" size={15} />
              <span>Saved</span>
            </div>
          )}

          <p>
            {wordsCount} {wordsCount === 1 ? "word" : "words"}
          </p>
        </footer>
      </section>
    </main>
  );
}
