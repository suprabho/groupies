import Link from "next/link";

export default function TopBar() {
  return (
    <div className="border-b border-(--a-ink)/10 bg-(--a-bg)">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-2.5 text-[13px] md:px-10">
        <Link href="/" className="flex items-center gap-2 text-(--a-ink)">
          <span className="h-2 w-2 rounded-full bg-[#e8ff47]" aria-hidden />
          Groupies
        </Link>
        <p className="hidden text-(--a-muted) sm:block">A concept artist world for the Groupies pilot</p>
        <Link href="/" className="text-(--a-muted) hover:text-(--a-ink)">
          Back to Groupies
        </Link>
      </div>
    </div>
  );
}
