import { LoaderCircle } from "lucide-react";

export default function NoteLoading() {
  return (
    <p className="font-sans h-dvh w-screen flex justify-center items-center flex-col gap-2">
      <LoaderCircle className="animate-spin" />
      Creating a private note
    </p>
  );
}
