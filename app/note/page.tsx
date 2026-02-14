"use client";
import { DropdownMenuComponent } from "@/components/build/drop-down";
import { hashText } from "@/lib/hash";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";

type User = {
  title: string;
  note: string;
};

export default function Note() {
  const [content, setContent] = useState<User>({ title: "", note: "" });
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
  const hashit = async () => {
    const text = "SHAIKALI";
    const hash = await hashText(text);
    console.log(hash);
  };
  useEffect(() => {}, [content]);
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
            className="w-full h-full resize-none font-diary text-xl leading-relaxed tracking-wide outline-0 text-neutral-300"
          />
        </section>
        <footer className="flex justify-between items-center text-muted-foreground text-sm">
          <p>Saved just now</p>
          <p>16 words</p>
        </footer>
      </section>
    </main>
  );
}
