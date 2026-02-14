export default function Note({ active = false }) {
  return (
    <div
      className={`w-full h-full rounded-md py-7 md:px-5 px-2 flex flex-col md:gap-3 gap-4 hover:bg-neutral-900/50 transition-colors ${active ? "md:bg-neutral-900/50" : "bg-neutral-950"}`}
    >
      <p className="text-xs text-muted-foreground font-sans">Friday 19, Jan</p>
      <h2 className={`font-medium md:text-2xl text-[21.6px] font-secondary `}>
        The best day in my life
      </h2>
      <p className="font-sans text-muted-foreground line-clamp-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  );
}
