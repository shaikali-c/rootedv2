import { Skeleton } from "@/components/ui/skeleton";
export default function NotesSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="h-50 w-full" />
      <Skeleton className="h-50 w-full" />
      <Skeleton className="h-50 w-full" />
    </div>
  );
}
