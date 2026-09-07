import Image from '@ui4ai/components/ui/Image'
import type { Agent } from "@ui4ai/lib/agents";
import { cn } from "@ui4ai/lib/utils";

/**
 * An agent's brand lockup: the lowercase name over a two-part accent bar,
 * right-aligned under the last letters.
 *
 * Albert, Isaac and Marie use the supplied artwork. Amelia has no wordmark yet,
 * so hers is set in Poppins — the face the supplied marks appear to use — with
 * the same bar geometry, so the four read as one set. Drop an `amelia.png` into
 * `public/icons/wordmarks/` and add `wordmark` to her record to replace it.
 *
 * `height` is in pixels and drives the whole lockup, matching the 138px-tall
 * source artwork.
 */
export function AgentWordmark({
  agent,
  height = 34,
  className,
}: {
  agent: Agent;
  height?: number;
  className?: string;
}) {
  if (agent.wordmark) {
    return (
      <Image
        src={agent.wordmark.src}
        alt={agent.name}
        width={agent.wordmark.width}
        height={agent.wordmark.height}
        className={cn("w-auto object-contain", className)}
        style={{ height }}
      />
    );
  }

  // Ratios measured off the supplied artwork (marie.png, 364x138): text ink is
  // 0.775 of the lockup, a 0.072 gap, then a 0.159-tall accent rule made of a
  // short block and a long one, flush right. The type is set 0.90 of the lockup
  // height, which is the size at which Poppins matches the width of the
  // supplied marks (calibrated against "isaac" and "marie").
  const textBox = height * 0.775;
  const gap = height * 0.072;
  const barH = height * 0.159;
  const blockW = height * 0.13;
  const barGap = height * 0.051;
  const longW = height * 0.587;

  return (
    <span
      /* `flex`, not `inline-flex`: the supplied marks render as <img>, which
         Tailwind's preflight sets to display:block. An inline lockup would sit
         on the preceding line instead of starting its own. */
      className={cn("flex w-fit flex-col items-end", className)}
      style={{ height }}
      aria-label={agent.name}
      role="img"
    >
      <span
        className="font-[family-name:var(--font-wordmark)] text-[#FFFAF0]"
        style={{
          fontSize: height * 0.9,
          lineHeight: `${textBox}px`,
          fontWeight: 400,
          letterSpacing: "-0.005em",
        }}
      >
        {agent.name.toLowerCase()}
      </span>
      <span className="flex items-center" style={{ gap: barGap, marginTop: gap }}>
        <span style={{ width: blockW, height: barH, background: agent.markAccent }} />
        <span style={{ width: longW, height: barH, background: agent.markAccent }} />
      </span>
    </span>
  );
}
