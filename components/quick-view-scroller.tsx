import type { ReactNode } from "react";
import { QuickViewScrollControls } from "@/components/quick-view-scroll-controls";

type QuickViewScrollerProps = {
  children: ReactNode;
};

const quickViewScrollerId = "quick-view-communities";

export function QuickViewScroller({ children }: QuickViewScrollerProps) {
  return (
    <div className="space-y-4">
      <QuickViewScrollControls targetId={quickViewScrollerId} />

      <div
        id={quickViewScrollerId}
        className="flex snap-x gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {children}
      </div>
    </div>
  );
}
