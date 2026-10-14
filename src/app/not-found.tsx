import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/50">Error 404</p>
        <h1 className="mt-4 text-[22vw] font-semibold leading-[0.8] tracking-[-0.06em] md:text-[16vw]">
          lost<span className="font-serif font-normal italic text-brand">?</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-xl text-ink/65">This page took a gut-feeling detour. Let&apos;s get you back on the road.</p>
        <Link href="/" className="mt-10 inline-flex h-14 items-center rounded-full bg-ink px-8 text-lg font-medium text-paper transition-colors hover:bg-brand">Back home</Link>
      </div>
    </section>
  );
}
