import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, Flame, Heart } from "lucide-react";
import { DropdownMenuComponentNotes } from "@/components/build/drop-down-notes";
import { Props } from "@/types/global";
import { Suspense } from "react";
import NotesLoader from "@/components/notes_loader";
import NotesSkeleton from "@/components/ui/notesskeleton";

export default async function NotesLayout({ children }: Props) {
  return (
    <main className="w-screen min-h-dvh flex justify-center">
      <section className="w-full min-h-dvh md:grid md:grid-cols-[37%_1fr] max-w-7xl md:max-h-dvh md:overflow-y-auto">
        <div className="md:p-10 p-6 flex flex-col md:gap-6 gap-4 pt-5 md:max-h-dvh md:overflow-y-auto no-scrollbar relative md:border-r border-neutral-900">
          <header className="font-semibold text-lg font-sans flex items-center justify-between h-10">
            <h2>Rooted</h2>
            <DropdownMenuComponentNotes />
          </header>
          <input
            type="text"
            placeholder="Search anything..."
            className="py-2.5 px-4.5 rounded-md outline-0 bg-neutral-900"
          />
          <TabsLine />
          <Suspense fallback={<NotesSkeleton />}>
            <NotesLoader />
          </Suspense>
        </div>
        {children}
      </section>
    </main>
  );
}

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
