import Image from '@ui4ai/components/ui/Image'
import { AGENTS } from "@ui4ai/lib/agents";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline py-14">
      <div className="container">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Image
              src="/ui4ai/icons/rothian-wordmark.png"
              alt="Rothian"
              width={466}
              height={138}
              className="h-6 w-auto object-contain"
            />
            <p className="mt-3 max-w-[32ch] text-[14px] text-white/42">
              Specialized intelligence for complex work.
            </p>
          </div>

          <nav aria-label="The agents">
            <p className="u4-eyebrow mb-4">The agents</p>
            <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-x-10">
              {AGENTS.map((agent) => (
                <li key={agent.id}>
                  <a
                    href={agent.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2.5 text-[14.5px] text-white/58 transition-colors hover:text-paper"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-150"
                      style={{ background: agent.color.primary }}
                    />
                    {agent.name}
                    <span className="font-mono text-2xs uppercase tracking-mono text-white/22">
                      {agent.domain}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-2xs uppercase tracking-mono text-white/26">
            © 2026 Rothian
          </p>
          <p className="max-w-[62ch] text-[12px] leading-relaxed text-white/26">
            Product interfaces shown on this page are illustrative recreations built for
            demonstration, using sample data.
          </p>
        </div>
      </div>
    </footer>
  );
}
