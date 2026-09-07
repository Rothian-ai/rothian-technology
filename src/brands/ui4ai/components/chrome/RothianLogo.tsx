import Image from '@ui4ai/components/ui/Image'

import { cn } from "@ui4ai/lib/utils";

/**
 * The Rothian brand marks.
 *
 * Both are the supplied brand artwork rather than a reconstruction: the
 * horizontal wordmark, and a monogram cut from the wordmark's own "r" with the
 * brand dot-and-dash accent beneath it. The artwork carries transparency, so it
 * sits directly on the page's obsidian foundation.
 *
 * The `reveal` flag applies the brand's own motion signature — a focus pull out
 * of blur — as a CSS animation, so it works in server components and is
 * neutralised by the reduced-motion rule in globals.css.
 */

/** Native artwork dimensions of /images/logos/rothian-wordmark.png. */
const WORDMARK = { width: 466, height: 138 };

export function RothianWordmark({
  className,
  priority = false,
  reveal = false,
}: {
  className?: string;
  priority?: boolean;
  reveal?: boolean;
}) {
  return (
    <Image
      src="/ui4ai/images/logos/rothian-wordmark.png"
      alt="Rothian"
      width={WORDMARK.width}
      height={WORDMARK.height}
      priority={priority}
      sizes="240px"
      className={cn("w-auto select-none", reveal && "brand-focus", className)}
    />
  );
}

export function RothianMonogram({ className }: { className?: string }) {
  return (
    <Image
      src="/ui4ai/images/logos/rothian-monogram.png"
      alt=""
      aria-hidden
      width={512}
      height={512}
      sizes="64px"
      className={cn("select-none", className)}
    />
  );
}
