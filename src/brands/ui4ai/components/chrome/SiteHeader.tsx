import { AnimatePresence, motion } from "framer-motion";
import Image from '@ui4ai/components/ui/Image'
import { useEffect, useState } from "react";
import { AGENTS } from "@ui4ai/lib/agents";
import { cn, EASE } from "@ui4ai/lib/utils";

const NAV = [
  { label: "Agents", href: "#agents" },
  { label: "Inspiration", href: "#inspiration" },
  { label: "Find yours", href: "#diagnostic" },
];

/**
 * The Rothian wordmark, as supplied. It already reads "rothian", so the header
 * sets it on its own rather than repeating the name in type beside it — the
 * only thing added is what this particular site is.
 */
function Wordmark({ className }: { className?: string }) {
  return (
    <Image
      src="/ui4ai/icons/rothian-wordmark.png"
      alt="Rothian"
      width={466}
      height={138}
      priority
      className={cn("w-auto object-contain", className)}
    />
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-hairline bg-obsidian-950/78 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
      style={{ height: "var(--nav-h)" }}
    >
      <div className="container flex h-full items-center justify-between gap-6">
        <a
          href="#top"
          className="group flex items-center gap-3.5 transition-opacity duration-300 hover:opacity-80 sm:gap-4"
          aria-label="Rothian — back to top"
        >
          <Wordmark className="h-[19px] sm:h-[21px]" />
          <span aria-hidden className="hidden h-4 w-px bg-white/14 sm:block" />
          <span className="hidden font-mono text-2xs uppercase tracking-mono text-white/38 sm:inline">
            AI Agents
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative px-4 py-2 text-[14px] text-white/56 transition-colors hover:text-paper"
            >
              {item.label}
              {/* a hairline that draws in, rather than a pill that pops on */}
              <span
                aria-hidden
                className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 transition-transform duration-300 ease-expo group-hover:scale-x-100"
                style={{ background: "rgb(var(--agent-accent))" }}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#choose" className="group btn btn-agent hidden !px-5 !py-2.5 !text-[13.5px] sm:inline-flex">
            Find your specialist
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-paper lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute left-0 h-px w-4 bg-current transition-all duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-px w-4 bg-current transition-opacity duration-200",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-4 bg-current transition-all duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-x-0 top-[var(--nav-h)] z-50 border-y border-hairline bg-obsidian-950/97 backdrop-blur-2xl lg:hidden"
            style={{ maxHeight: "calc(100vh - var(--nav-h))", overflowY: "auto" }}
          >
            <div className="container py-8">
              <p className="u4-eyebrow mb-4">Sections</p>
              <div className="grid gap-1">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-hairline-soft py-3.5 font-display text-display-sm text-paper"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <p className="u4-eyebrow mb-4 mt-9">The four agents</p>
              <div className="grid gap-2.5">
                {AGENTS.map((agent) => (
                  <a
                    key={agent.id}
                    href={agent.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-hairline bg-white/[0.03] px-4 py-3.5"
                  >
                    <span>
                      <span className="block font-display text-[19px] text-paper">{agent.name}</span>
                      <span className="block font-mono text-2xs uppercase tracking-mono text-white/40">
                        {agent.domain}
                      </span>
                    </span>
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: agent.color.primary }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
