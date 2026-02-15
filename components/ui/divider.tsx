export default function Divider({ text = "That's all" }) {
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-neutral-900" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-neutral-950 px-2 text-sm text-neutral-500">
          {text}
        </span>
      </div>
    </div>
  );
}
