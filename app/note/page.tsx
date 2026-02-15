"use client";
import { DropdownMenuComponent } from "@/components/build/drop-down";
import useDebounce from "@/hooks/useDebounce";
import { hashText } from "@/lib/hash";
import { wordCount } from "@/lib/wordCount";
import { Content } from "@/types/global";
import { CheckCheck, Dot, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Note() {
  const [content, setContent] = useState<Content>({ title: "", note: "" });
  const [isSaving, setIsSaving] = useState(false);
  const wordsCount = wordCount(content.note);

  const lastHashRef = useRef<bigint | null>(null);
  const isFirstRun = useRef(true);
  const debouncedContent = useDebounce(content, 3000);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const run = async () => {
      const serialized = `${debouncedContent.title}\n${debouncedContent.note}`;

      const newHash = await hashText(serialized);

      if (newHash === lastHashRef.current) return;

      setIsSaving(true);
      await fakeSave(debouncedContent);
      lastHashRef.current = newHash;
      setIsSaving(false);
    };

    run();
  }, [debouncedContent]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="w-full h-dvh flex justify-center font-sans">
      <section className="md:max-w-5xl w-full h-full bg-neutral-950 grid grid-rows-[50px_1fr_20px] md:p-10 md:px-7 p-5 px-6 gap-5 ">
        <header
          className={`flex w-full justify-between items-center font-semibold text-lg transit  ion-all text-neutral-200`}
        >
          <h2 className="flex items-center">
            Rooted
            <Dot />
            <span className="text-muted-foreground text-sm">
              Friday 19, Oct
            </span>
          </h2>
          <div>
            <DropdownMenuComponent />
          </div>
        </header>
        <section className="flex flex-col gap-2 md:mt-15 mt-10">
          <input
            autoFocus
            value={content.title}
            name="title"
            type="text"
            onChange={handleChange}
            placeholder="Title"
            className="md:text-4xl text-3xl w-full font-secondary outline-0 text-neutral-100 py-0 pb-5"
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
              />{" "}
              <span>Saving</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <CheckCheck className="text-emerald-500" size={15} />
              <span>Saved</span>
            </div>
          )}
          <p>
            {wordsCount === 1 ? `${wordsCount} word` : `${wordsCount} words`}
          </p>
        </footer>
      </section>
    </main>
  );
}

async function fakeSave(data: Content) {
  return new Promise((r) => setTimeout(r, 3000));
}
