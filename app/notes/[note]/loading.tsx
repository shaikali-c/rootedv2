import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="md:p-30 p-7 md:my-1 mt-5">
      <div className="flex flex-col gap-5 w-full">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-70 w-full" />
      </div>
    </section>
  );
}
