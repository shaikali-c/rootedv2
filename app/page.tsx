import { Asterisk, Cat } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen flex justify-center relative min-h-dvh bg-neutral-950">
      <div className="min-h-dvh justify-center relative grid md:grid-cols-[65%_35%] font-sans w-full max-w-350">
        <section className="h-dvh p-10 flex flex-col justify-between bg-transparent text-neutral-100">
          <header className="w-full flex justify-between items-center">
            <h2 className="font-semibold text-lg flex items-center">ROOTED</h2>
          </header>
          <section className="flex flex-col gap-5.5">
            <h2
              className={`md:text-7xl capitalize text-4xl md:leading-20 leading-12 font-secondary`}
            >
              Private notes <br />
              Built for Privacy
            </h2>
            <p className="text-lg text-neutral-400 max-w-100">
              Write notes, share with friends secured by cryptography.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href={"/notes"}
                className="px-5 py-3 bg-brand hover:bg-brand/90 transition-colors hover:text-neutral-200 text-white w-fit rounded-md font-semibold "
              >
                Get Started
              </Link>
            </div>
          </section>
          <footer className="flex justify-between items-center text-sm text-neutral-500 md:text-neutral-200 md:text-base">
            <Link
              href={"https://github.com/shaikali-c"}
              className="flex items-center gap-1.5 hover:underline"
            >
              <Cat className="hidden md:block" size={17} /> Shaik Marwaan
            </Link>
            <p className="block md:hidden">Privacy</p>
            <p className="block md:hidden">GitHub</p>
          </footer>
        </section>
        <div className="h-full md:flex gap-7 justify-center flex-col items-center md:p-0 p-5 border-t border-neutral-900 text-neutral-100 hidden">
          <Asterisk className="hover:animate-spin" size={80} />
        </div>
      </div>
    </main>
  );
}
