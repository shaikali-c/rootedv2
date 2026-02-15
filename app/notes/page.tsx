export default async function NotesPage() {
  return (
    <div className="md:p-30 p-7 font-secondary md:flex hidden flex-col gap-5 ">
      <p className="text-xs text-muted-foreground font-sans">Friday 19, Jan</p>
      <h2 className="md:text-4xl font-charter text-3xl">
        Hey, how's your day?
      </h2>
      <p className="leading-6.5 text-neutral-300/90 font-sans tracking-wide whitespace-pre-wrap ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        Lorem ipsum dolor sit amet, consectetur
        {"\n\n\n"}So my days went off.
      </p>
    </div>
  );
}
