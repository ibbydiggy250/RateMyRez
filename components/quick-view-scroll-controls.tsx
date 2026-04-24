"use client";

type QuickViewScrollControlsProps = {
  targetId: string;
};

export function QuickViewScrollControls({ targetId }: QuickViewScrollControlsProps) {
  function scrollByDirection(direction: "left" | "right") {
    const scroller = document.getElementById(targetId);

    if (!scroller) {
      return;
    }

    scroller.scrollBy({
      left: direction === "left" ? -380 : 380,
      behavior: "smooth"
    });
  }

  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={() => scrollByDirection("left")}
        className="scroll-arrow"
        aria-label="Scroll communities left"
      >
        <span aria-hidden="true">{"<"}</span>
      </button>
      <button
        type="button"
        onClick={() => scrollByDirection("right")}
        className="scroll-arrow"
        aria-label="Scroll communities right"
      >
        <span aria-hidden="true">{">"}</span>
      </button>
    </div>
  );
}
