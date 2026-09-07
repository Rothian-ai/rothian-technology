import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useScene } from "@ui4ai/components/scene/SceneProvider";
import { AGENTS } from "@ui4ai/lib/agents";
import { cn, EASE } from "@ui4ai/lib/utils";

/**
 * A semi-persistent specialist selector.
 *
 * On desktop it sits at the left edge as a vertical index; on mobile it docks
 * to the bottom as a compact bar. Choosing an agent scrolls to that agent's
 * chapter, which in turn hands the scene its colour — so selecting reads as
 * changing specialist, not as navigating away.
 */
export function AgentRail() {
  const { active, select } = useScene();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const end = document.body.scrollHeight - window.innerHeight - 640;
      setVisible(y > window.innerHeight * 0.85 && y < end);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: (typeof AGENTS)[number]["id"]) => {
    select(id);
    document.getElementById(`agent-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* desktop — left edge index */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            aria-label="Choose a specialist"
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
          >
            <ul className="flex flex-col gap-1.5">
              {AGENTS.map((agent) => {
                const on = active === agent.id;
                return (
                  <li key={agent.id}>
                    <button
                      type="button"
                      onClick={() => go(agent.id)}
                      aria-current={on ? "true" : undefined}
                      className="group flex w-full items-center gap-3 rounded-full py-1.5 pl-1.5 pr-3 transition-colors hover:bg-white/[0.05]"
                    >
                      <span className="relative grid h-7 w-7 place-items-center">
                        <span
                          className="absolute inset-0 rounded-full border transition-all duration-500"
                          style={{
                            borderColor: on ? agent.color.primary : "rgba(255,255,255,0.14)",
                            transform: on ? "scale(1)" : "scale(0.72)",
                            opacity: on ? 1 : 0.7,
                          }}
                        />
                        <span
                          className="h-1.5 w-1.5 rounded-full transition-all duration-500"
                          style={{
                            background: on ? agent.color.primary : "rgba(255,255,255,0.34)",
                            boxShadow: on ? `0 0 14px ${agent.color.primary}` : "none",
                          }}
                        />
                      </span>
                      <span className="overflow-hidden">
                        <span
                          className={cn(
                            "block whitespace-nowrap text-left font-mono text-2xs uppercase tracking-mono transition-all duration-500",
                            on
                              ? "max-w-[9rem] opacity-100"
                              : "max-w-0 opacity-0 group-hover:max-w-[9rem] group-hover:opacity-70",
                          )}
                          style={{ color: on ? agent.color.glow : "rgba(255,255,255,0.6)" }}
                        >
                          {agent.name} · {agent.domain}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* mobile — bottom dock */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            aria-label="Choose a specialist"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-x-3 bottom-3 z-40 xl:hidden"
          >
            <ul className="glass flex items-center justify-between gap-1 rounded-full p-1.5">
              {AGENTS.map((agent) => {
                const on = active === agent.id;
                return (
                  <li key={agent.id} className="flex-1">
                    <button
                      type="button"
                      onClick={() => go(agent.id)}
                      aria-current={on ? "true" : undefined}
                      className="flex w-full flex-col items-center gap-1 rounded-full px-2 py-2 transition-colors"
                      style={{ background: on ? `${agent.color.primary}22` : "transparent" }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full transition-all duration-500"
                        style={{
                          background: on ? agent.color.primary : "rgba(255,255,255,0.3)",
                          boxShadow: on ? `0 0 12px ${agent.color.primary}` : "none",
                        }}
                      />
                      <span
                        className="font-mono text-[9.5px] uppercase tracking-[0.14em] transition-colors"
                        style={{ color: on ? agent.color.glow : "rgba(255,255,255,0.5)" }}
                      >
                        {agent.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
