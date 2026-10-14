import { DraggableWall } from "@/components/fx/draggable-wall";
import { SplitText } from "@/components/fx/reveal";

export function Wall() {
  return (
    <section className="px-5 pb-28 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SplitText text="Play with *our* brain." className="text-5xl font-semibold tracking-[-0.04em] md:text-8xl" />
          <p className="max-w-sm text-lg text-ink/65">A messy desk is a creative desk. Grab a sticker and move it around. This is basically how our briefs start.</p>
        </div>
        <DraggableWall />
      </div>
    </section>
  );
}
