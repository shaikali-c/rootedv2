import { Props } from "@/types/global";

export default function Divider({ children }: Props) {
  return (
    <div className="relative my-6.5 md:hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center font-sans"
      >
        <div className="w-full border-t border-neutral-900" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-neutral-950 px-2 text-sm text-neutral-500 font-sans">
          {children}
        </span>
      </div>
    </div>
  );
}
export function ButtonsDivider({ children }: Props) {
  return (
    <div className="relative my-6.5 hidden md:block ">
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center font-sans"
      >
        <div className="w-full border-t border-neutral-900" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-neutral-950 px-2 text-sm text-neutral-500 font-sans">
          {children}
        </span>
      </div>
    </div>
  );
}
