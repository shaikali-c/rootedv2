import Note from "@/components/ui/note";
import { Bookmark, Flame, Heart, Plus } from "lucide-react";

export default async function NotesPage() {
  return (
    <main className="w-screen min-h-dvh flex justify-center">
      <section className="w-full min-h-dvh grid md:grid-cols-[37%_1fr] max-w-7xl mask-[linear-gradient(to_bottom,#f8f8f8_70%,transparent_100%)]">
        <div className="md:p-10 p-6 md:border-r flex flex-col md:gap-6 gap-4 pt-5 md:max-h-dvh md:overflow-y-auto no-scrollbar">
          <header className="font-semibold text-lg font-sans flex items-center justify-between">
            <h2>Rooted</h2>
            <Plus size={20} />
          </header>
          <input
            type="text"
            placeholder="Search anything..."
            className="py-2.5 px-4.5 rounded-md outline-0 bg-neutral-900"
          />
          <TabsLine />
          <div className="flex flex-col md:gap-7 gap-10 mt-0">
            <Note active={true} />
            <Note />
            <Note />
            <Note />
          </div>
        </div>
        <div className="md:p-30 p-7 font-secondary flex flex-col gap-5">
          <p className="text-xs text-muted-foreground font-sans">
            Friday 19, Jan
          </p>
          <h2 className="md:text-4xl font-charter text-3xl">
            Hey, how's your day?
          </h2>
          <p className="leading-6.5 text-neutral-300/90 font-sans tracking-wide whitespace-pre-wrap ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur
            {"\n\n\n"}So my days went off.
          </p>
        </div>
      </section>
    </main>
  );
}

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Divider } from "@/components/ui/_ext/divider";

export function TabsLine() {
  return (
    <Tabs defaultValue="overview" className="font-sans my-2">
      <TabsList variant="line">
        <TabsTrigger value="overview">
          <Flame />
          Newest
        </TabsTrigger>
        <TabsTrigger value="analytics">
          <Heart />
          Favourites
        </TabsTrigger>
        <TabsTrigger value="reports">
          <Bookmark />
          Saved
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
