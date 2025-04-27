import { isServer } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

function Portal({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLBodyElement>(null);
  if (!isServer && containerRef.current === null) {
    containerRef.current = document.body as HTMLBodyElement;
  }
  return createPortal(children, containerRef.current!);
}

export default function LoadingScreen() {
  // TODO: use radix ui portal
  return (
    <Portal>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[2232323]">
        <div className="flex flex-col gap-2 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary font-bold text-xl">
          <LoaderCircle className="animate-spin" />
          Loading
        </div>
      </div>
    </Portal>
  );
}
