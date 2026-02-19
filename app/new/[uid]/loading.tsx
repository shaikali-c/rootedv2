import { Loader } from "lucide-react";

export default function LoadingNoteEditor() {
  return (
    <main className="h-dvh w-screen flex justify-center items-center flex-col gap-3">
      <Loader className="animate-spin" />
    </main>
  );
}
