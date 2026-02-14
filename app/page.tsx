import { Asterisk, Cat } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen flex justify-center relative min-h-dvh bg-neutral-950">
      <div className="min-h-dvh justify-center relative grid md:grid-cols-[65%_35%] font-sans w-full max-w-350">
        <section className="h-dvh p-10 flex flex-col justify-between bg-transparent text-neutral-100">
          <header className="w-full flex justify-between items-center">
            <h2 className="font-semibold text-lg flex items-center">
              <Asterisk className="hover:animate-spin" /> ROOTED
            </h2>
          </header>
          <section className="flex flex-col gap-5.5">
            <h2
              className={`md:text-7xl capitalize text-4xl md:leading-20 leading-12 font-secondary`}
            >
              Private notes <br />
              Built for Privacy
            </h2>
            <p className="text-lg text-neutral-400 max-w-100">
              Write notes, share with friends secured by cryptography using
              zero-knowledge design.
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
          <div
            className={`max-w-100 w-full min-h-120 bg-neutral-900 rounded-lg p-7 transition-all flex flex-col gap-5 border border-neutral-800/80 relative z-1`}
          >
            <div className="hidden md:block absolute top-0 -z-1 h-full w-full ">
              <div className="absolute bottom-auto -right-4 -top-7 h-125 w-125 rounded-full bg-neutral-900 opacity-50 blur-[100px]"></div>
            </div>
            <p className="text-neutral-400 text-sm">Saturday 19, Jan</p>
            <h2 className="text-3xl font-sans">
              Midnight Thoughts on Building Something Private
            </h2>
            <p className="text-neutral-400 text-base">
              Every word written here should belong only to you and the people
              you choose to share it with. No readable data should exist on the
              server.
            </p>
            <p className="text-neutral-400 text-base">
              If someone intercepts this message, it should look like
              meaningless noise. Only the correct key should turn it back into
              something human.
            </p>
            <Link
              href={"/login"}
              className="mt-auto  bg-neutral-800 py-2.5 rounded-md hover:bg-accent transition-colors font-semibold flex items-center justify-center gap-2"
            >
              Write a note
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
